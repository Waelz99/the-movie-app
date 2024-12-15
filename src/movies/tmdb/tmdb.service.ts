import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TMDBHelpers } from './helpers/tmdb-helpers';
import { Movie } from '../entities/movie.entity';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class TmdbService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly maxPageCount: number;

  constructor(
    private readonly tmdbHelpers: TMDBHelpers,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY');
    this.baseUrl = this.configService.get<string>('TMDB_BASE_URL');
    this.maxPageCount = this.configService.get<number>('TMDB_MAX_PAGE_COUNT');
  }

  async syncWithTMDB(): Promise<{ movies: Movie[]; genres: Genre[] }> {
    Logger.log(
      `For simplicity, syncing with TMDB will fetch up to ${this.maxPageCount} pages`,
    );

    const genres = await this.getTMDBGenres();

    const moviesList = await this.getTmdbMovies();

    return { movies: moviesList, genres: genres };
  }

  async getTMDBGenres(): Promise<Genre[]> {
    const genreResponse = await this.tmdbHelpers.getRequestByEndpoint(
      this.baseUrl,
      'genre/movie/list',
      this.apiKey,
    );

    if (!this.tmdbHelpers.isValidRequest(genreResponse.status)) {
      Logger.log(
        `Invalid status code for genre request: ${genreResponse.status}`,
      );
      return null;
    }

    const genres = genreResponse.data.genres;

    return genres;
  }

  async getTmdbMovies(): Promise<Movie[]> {
    const moviesList: Movie[] = [];

    for (let page = 1; page <= this.maxPageCount; page++) {
      const response = await this.tmdbHelpers.getRequestByEndpoint(
        this.baseUrl,
        `discover/movie?language=en-US&page=${page.toString()}`,
        this.apiKey,
      );

      if (!this.tmdbHelpers.isValidRequest(response.status)) {
        Logger.log(`Failed to retrieve page number ${page.toString()}`);
        continue;
      }

      const responseData = response.data.results;

      moviesList.push(...responseData);
    }

    return moviesList;
  }
}
