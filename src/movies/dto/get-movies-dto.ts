import { IsOptional, IsString, IsInt, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    example: 'Inception',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
