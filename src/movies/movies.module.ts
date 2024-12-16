import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Genre } from './entities/genre.entity';
import { User } from 'src/users/entities/user.entity';
import { RedisModule } from 'src/redis/redis.module';
import { RatingsModule } from 'src/ratings/ratings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre, User]),
    ScheduleModule.forRoot(),
    TmdbModule,
    RedisModule,
    RatingsModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [TypeOrmModule],
})
export class MoviesModule {}
