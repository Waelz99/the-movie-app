import { Injectable, Logger } from '@nestjs/common';
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
