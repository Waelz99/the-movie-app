import { Controller, Param, Post, Delete, Get } from '@nestjs/common';
import { WatchlistsService } from './watchlists.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Watchlist')
@Controller('users/:userId/watchlist')
export class WatchlistsController {
  constructor(private readonly watchlistsService: WatchlistsService) {}

  // Add a movie to the user's watchlist
  @Post('movies/:movieId')
  async addToWatchlist(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number,
  ) {
    return this.watchlistsService.addToWatchlist(userId, movieId);
  }

  // Remove a movie from the user's watchlist
  @Delete('movies/:movieId')
  async removeFromWatchlist(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number,
  ) {
    return this.watchlistsService.removeFromWatchlist(userId, movieId);
  }

  // Get the user's watchlist
  @Get()
  async getWatchlist(@Param('userId') userId: number) {
    return this.watchlistsService.getWatchlist(userId);
  }
}
