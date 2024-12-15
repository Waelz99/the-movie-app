import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from './genre.entity';
import { User } from 'src/users/entities/user.entity';
import { Rating } from 'src/ratings/entities/rating.entity';

@Entity('movies')
export class Movie {
  @PrimaryColumn()
  @ApiProperty({
    example: 845781,
    description: 'The unique ID of the movie in the database',
  })
  id: number;

  @ManyToMany(() => Genre, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => User, (user) => user.watchlist)
  watchlist: User[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ example: 'Red One', description: 'The title of the movie' })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    example: 'Red One',
    description: 'The original title of the movie',
  })
  original_title: string;

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
  poster_path?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    example: '/rOmUuQEZfPXglwFs5ELLLUDKodL.jpg',
    description: 'The path to the movie backdrop image',
    nullable: true,
  })
  backdrop_path?: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  @ApiProperty({
    example: false,
    description: 'Indicates whether the movie is for adults only',
  })
  adult: boolean;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @ApiProperty({
    example: 'en',
    description: 'The original language of the movie',
  })
  original_language: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    default: 0,
    nullable: true,
  })
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
  release_date?: string;

  @CreateDateColumn({ nullable: true })
  @ApiProperty({
    example: '2024-12-10T23:59:59.999Z',
    description: 'The date the movie record was created',
  })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @ApiProperty({
    example: '2024-12-11T23:59:59.999Z',
    description: 'The date the movie record was last updated',
  })
  updatedAt: Date;

  genre_ids?: number[];
}
