import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import moviesOrmConfig from './config/movies.db.config';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(moviesOrmConfig),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
