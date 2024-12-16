import { ApiProperty } from '@nestjs/swagger';

export class AddRatingDto {
  @ApiProperty({
    description: 'The rating value given by the user',
    example: 5,
  })
  ratingValue: number;
}
