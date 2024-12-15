import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TmdbService } from './tmdb/tmdb.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { RatingsService } from 'src/ratings/ratings.service';

@Injectable()
export class MoviesService {
  /**
   * Injectable constructor
   * @param movieRepository Database interface for inserting Movies data.
   * @param tmdbService TMDBService to fetch Movies data from TMDB APIs
   */
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    private readonly tmdbService: TmdbService,
    private readonly ratingsService: RatingsService,
  ) {}

  /**
   * Retrieve movies page from the database.
   * @param page the requested page to be retrieved from the database.
   * @param limit the maximum number of rows to be retrieved.
   * @param sortBy the column to sort the result.
   * @param search if specified, search by movie title.
   * @returns Movies page.
   */
  async getMovies(
    page: number = 1,
    limit: number = 25,
    sortBy: string = 'popularity',
    search?: string,
    genres?: string[], // Add genres as an optional filter
  ): Promise<any> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    // Searching by movie title
    if (search) {
      queryBuilder.andWhere('movie.title LIKE :search', {
        search: `%${search}%`,
      });
    }

    // Filtering by genres
    if (genres && genres.length > 0) {
      if (typeof genres === 'string') {
        queryBuilder
          .innerJoin('movie.genres', 'genre')
          .andWhere('LOWER(genre.name) = :genre', {
            genre: (genres as string).toLowerCase(),
          })
          .groupBy('movie.id')
          .having('COUNT(genre.id) >= :genreCount', {
            genreCount: 1,
          });
      } else {
        queryBuilder
          .innerJoin('movie.genres', 'genre')
          .andWhere('LOWER(genre.name) IN (:...genres)', {
            genres: genres.map((genre) => genre.toLowerCase()),
          })
          .groupBy('movie.id')
          .having('COUNT(genre.id) >= :genreCount', {
            genreCount: genres.length,
          });
      }
    }

    // Sorting by specified field (popularity, release_date, etc.)
    if (sortBy) {
      queryBuilder.orderBy(`movie.${sortBy}`, 'DESC');
    }

    // Apply pagination
    const [movies, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    for (const movie of movies) {
      movie['averageRating'] = await this.ratingsService.getAverageRating(
        movie.id,
      );
    }

    // Return the paginated result
    return {
      page,
      limit,
      total_results: total,
      total_pages: Math.ceil(total / limit),
      movies,
    };
  }

  /**
   * Get movie details by movieId
   * @param movieId the id of the requested movie
   * @returns requested movie's details
   */
  async getMovieDetails(movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    movie['averageRating'] = await this.ratingsService.getAverageRating(
      movie.id,
    );

    return movie;
  }

  /*
    TMDB related functions, responsible for retrieving TMDB data periodically.
    To keep MoviesDB in sync with TMDB APIs.
  */

  /**
   * Retrieves TMDB data from TMDB APIs and insert it in MoviesRepository
   */
  async syncWithTMDBInternal() {
    const { movies, genres } = await this.tmdbService.syncWithTMDB();

    await this.clearTables();

    await this.genreRepository
      .createQueryBuilder()
      .insert()
      .orIgnore(true)
      .into(Genre)
      .values(genres)
      .updateEntity(false)
      .execute();

    const filteredMovies: Movie[] = this.filterDuplicateMovies(movies);

    const moviesWithGenre: Movie[] =
      await this.enrichMoviesWithGenres(filteredMovies);

    await this.movieRepository.save(moviesWithGenre);
  }

  async clearTables() {
    await this.movieRepository.query('TRUNCATE TABLE movies CASCADE');

    await this.genreRepository.query('TRUNCATE TABLE genres CASCADE');
  }

  filterDuplicateMovies(movies: Movie[]): Movie[] {
    const seenIds = new Set<number>();

    return movies.filter((movie) => {
      if (seenIds.has(movie.id)) {
        return false;
      } else {
        seenIds.add(movie.id);
        return true;
      }
    });
  }

  async enrichMoviesWithGenres(movies: Movie[]): Promise<Movie[]> {
    const moviesWithGenre: Movie[] = [];

    for (const movie of movies) {
      const movieGenres = await this.genreRepository.findBy({
        id: In(movie.genre_ids),
      });

      movie.genres = movieGenres;

      moviesWithGenre.push(movie);
    }

    return moviesWithGenre;
  }

  /**
   * Cron job to fetch TMDB data daily.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncWithTMDB() {
    const now = new Date();
    Logger.log(`Started Cron function at ${now.toISOString()}`);

    this.syncWithTMDBInternal();
  }

  /***
   * Sync MoviesDB data with TMDB APIs on service initialize.
   */
  async onModuleInit() {
    this.syncWithTMDBInternal();
  }
}
