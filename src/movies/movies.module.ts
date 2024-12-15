import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { TmdbService } from './tmdb/tmdb.service';
import { TMDBHelpers } from './tmdb/helpers/tmdb-helpers';
import { ScheduleModule } from '@nestjs/schedule';
import { Genre } from './entities/genre.entity';
import { RatingsService } from 'src/ratings/ratings.service';
import { Rating } from 'src/ratings/entities/rating.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre, Rating, User]),
    ScheduleModule.forRoot(),
    TmdbModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, TmdbService, TMDBHelpers, RatingsService],
})
export class MoviesModule {}
