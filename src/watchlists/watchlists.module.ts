import { Module } from '@nestjs/common';
import { WatchlistsService } from './watchlists.service';
import { WatchlistsController } from './watchlists.controller';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MoviesModule, UsersModule],
  controllers: [WatchlistsController],
  providers: [WatchlistsService],
})
export class WatchlistsModule {}
