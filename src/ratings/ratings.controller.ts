// rate.controller.ts
import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';
import { AddRatingDto } from './dto/add-rating.dto';

@ApiBearerAuth()
@ApiTags('Ratings')
@Controller('movies/:movieId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // Add or update rating for a movie
  @Post('users/:userId')
  @ApiOperation({ summary: 'Add or update a rating for a movie' })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user who is rating the movie',
    type: Number,
  })
  @ApiParam({
    name: 'movieId',
    description: 'The ID of the movie being rated',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Rating added or updated successfully',
    type: Rating,
  })
  @ApiResponse({
    status: 404,
    description: 'User or Movie not found',
  })
  async addRating(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number,
    @Body() addRatingDto: AddRatingDto,
  ) {
    return this.ratingsService.addRating(userId, movieId, addRatingDto);
  }

  // Remove a rating for a movie
  @Delete('users/:userId')
  @ApiOperation({ summary: 'Remove a rating for a movie' })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user who rated the movie',
    type: Number,
  })
  @ApiParam({
    name: 'movieId',
    description: 'The ID of the movie being removed from the ratings',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Rating removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Rating not found for this user and movie',
  })
  async removeRating(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number,
  ) {
    return this.ratingsService.removeRating(userId, movieId);
  }

  // Get rating for a movie by a user
  @Get('users/:userId')
  @ApiOperation({ summary: 'Get the rating given by a user for a movie' })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user who rated the movie',
    type: Number,
  })
  @ApiParam({
    name: 'movieId',
    description: 'The ID of the movie being rated',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the rating for the movie by the user',
    type: Rating,
  })
  @ApiResponse({
    status: 404,
    description: 'Rating not found for this user and movie',
  })
  async getRating(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number,
  ) {
    return this.ratingsService.getRating(userId, movieId);
  }

  // Get average rating for a movie
  @Get()
  @ApiOperation({ summary: 'Get the average rating for a movie' })
  @ApiParam({
    name: 'movieId',
    description: 'The ID of the movie to get the average rating for',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the average rating for the movie',
    type: Number,
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found',
  })
  async getAverageRating(@Param('movieId') movieId: number) {
    return this.ratingsService.getAverageRating(movieId);
  }
}
