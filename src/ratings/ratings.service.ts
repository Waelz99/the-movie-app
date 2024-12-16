// rate.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { AddRatingDto } from './dto/add-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  // Add or update rating for a movie
  async addRating(
    userId: number,
    movieId: number,
    addRatingDto: AddRatingDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    let rating = await this.ratingRepository.findOne({
      where: { userId, movieId },
    });

    const { ratingValue } = addRatingDto;

    if (rating) {
      // If rating exists, update it
      rating.ratingValue = ratingValue;
      this.ratingRepository.save(rating);
      return;
    }

    // If no rating exists, create a new one
    rating = this.ratingRepository.create({
      userId,
      movieId,
      ratingValue,
      user,
      movie,
    });

    this.ratingRepository.save(rating);
  }

  // Remove a rating for a movie
  async removeRating(userId: number, movieId: number): Promise<void> {
    const rating = await this.ratingRepository.findOne({
      where: { userId, movieId },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    await this.ratingRepository.remove(rating);
  }

  // Get the rating for a movie by a user
  async getRating(userId: number, movieId: number): Promise<Rating> {
    const rating = await this.ratingRepository.findOne({
      where: { userId, movieId },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return rating;
  }

  // Get average rating for a movie
  async getAverageRating(movieId: number): Promise<number> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const ratings = await this.ratingRepository.find({ where: { movieId } });

    if (ratings.length === 0) {
      return 0;
    }

    const averageRating =
      ratings.reduce((sum, rating) => sum + Number(rating.ratingValue), 0) /
      ratings.length;

    return parseFloat(averageRating.toFixed(2));
  }
}
