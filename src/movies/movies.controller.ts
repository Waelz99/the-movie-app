import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMoviesDto } from './dto/get-movies-dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of movies with optional filters and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the list of movies',
  })
  async getMovies(@Query() query: GetMoviesDto): Promise<any> {
    const { page, limit, sortBy, search } = query;
    return this.movieService.getMovies(page, limit, sortBy, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed information about a specific movie' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched movie details',
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async getMovieDetail(@Param('id') id: string): Promise<any> {
    return this.movieService.getMovieDetails(Number.parseInt(id));
  }
}
