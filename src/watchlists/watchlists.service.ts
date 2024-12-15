import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchlistsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  // Add a movie to the user's watchlist
  async addToWatchlist(userId: number, movieId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['watchlist'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    // Check if the movie is already in the user's watchlist
    if (user.watchlist.some((m) => m.id === movie.id)) {
      throw new Error('Movie is already in the watchlist');
    }

    // Add the movie to the watchlist
    user.watchlist.push(movie);
    this.userRepository.save(user);
  }

  // Remove a movie from the user's watchlist
  async removeFromWatchlist(userId: number, movieId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['watchlist'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const isMovieInWatchlist = user.watchlist.some(
      (movie) => movie.id === movieId,
    );

    if (!isMovieInWatchlist) {
      throw new NotFoundException(
        `Movie with ID ${movieId} is not added to user ${userId} watchlist`,
      );
    }

    // Remove the movie from the watchlist
    user.watchlist = user.watchlist.filter((m) => m.id !== movie.id);
    await this.userRepository.save(user);
  }

  // Get the user's watchlist
  async getWatchlist(userId: number): Promise<Movie[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['watchlist'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.watchlist;
  }
}
