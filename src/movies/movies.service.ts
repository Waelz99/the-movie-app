import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TmdbService } from './tmdb/tmdb.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

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
    private readonly tmdbService: TmdbService,
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
  ): Promise<any> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    // Searching by movie title
    if (search) {
      queryBuilder.andWhere('movie.title LIKE :search', {
        search: `%${search}%`,
      });
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
    const moviesList = await this.tmdbService.syncWithTMDB();
    this.movieRepository.clear();
    this.movieRepository.save(moviesList);
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
