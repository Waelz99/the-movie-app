import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsIn,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetMoviesDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of results per page',
    example: 25,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @ApiProperty({
    description: 'Sort movies by field (e.g., popularity, release_date)',
    example: 'popularity',
    required: false,
  })
  @IsOptional()
  @IsIn(['popularity', 'release_date', 'rating'])
  sortBy?: string = 'popularity';

  @ApiProperty({
    description: 'Search query for movie title',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Optional list of genres associated with the movie',
    type: [String],
    example: ['Action', 'Adventure', 'Drama'],
  })
  @IsOptional()
  @IsArray({ message: 'Genres must be an array of strings' })
  @IsString({ each: true, message: 'Each genre must be a string' })
  genres?: string[];
}
