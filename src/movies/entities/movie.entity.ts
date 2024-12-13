import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 845781,
    description: 'The unique ID of the movie in the database',
  })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'Red One', description: 'The title of the movie' })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    example: 'Red One',
    description: 'The original title of the movie',
  })
  originalTitle: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example:
      "After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas.",
    description: 'The overview or synopsis of the movie',
    nullable: true,
  })
  overview?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    example: '/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
    description: 'The path to the movie poster image',
    nullable: true,
  })
  posterPath?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    example: '/rOmUuQEZfPXglwFs5ELLLUDKodL.jpg',
    description: 'The path to the movie backdrop image',
    nullable: true,
  })
  backdropPath?: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: false,
    description: 'Indicates whether the movie is for adults only',
  })
  adult: boolean;

  @Column({ type: 'varchar', length: 10 })
  @ApiProperty({
    example: 'en',
    description: 'The original language of the movie',
  })
  originalLanguage: string;

  @Column({ type: 'simple-array', nullable: true })
  @ApiProperty({
    example: [35, 28, 14],
    description: 'An array of genre IDs associated with the movie',
    nullable: true,
  })
  genreIds?: number[];

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0 })
  @ApiProperty({
    example: 1231.712,
    description: 'The popularity score of the movie',
  })
  popularity: number;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    example: '2024-10-31',
    description: 'The release date of the movie',
    nullable: true,
  })
  releaseDate?: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2024-12-10T23:59:59.999Z',
    description: 'The date the movie record was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2024-12-11T23:59:59.999Z',
    description: 'The date the movie record was last updated',
  })
  updatedAt: Date;
}
