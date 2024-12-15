import { Module } from '@nestjs/common';
import { WatchlistsService } from './watchlists.service';
import { WatchlistsController } from './watchlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, User])],
  controllers: [WatchlistsController],
  providers: [WatchlistsService],
})
export class WatchlistsModule {}
