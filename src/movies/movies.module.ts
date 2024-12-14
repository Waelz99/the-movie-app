import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import moviesOrmConfig from './config/movies.db.config';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { TmdbService } from './tmdb/tmdb.service';
import { TMDBHelpers } from './helpers/tmdb-helpers';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(moviesOrmConfig),
    TypeOrmModule.forFeature([Movie]),
    TmdbModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, TmdbService, TMDBHelpers],
})
export class MoviesModule {}
