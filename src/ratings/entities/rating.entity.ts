// rating.entity.ts
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity('ratings')
export class Rating {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  movieId: number;

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column('decimal', { precision: 2, scale: 1, nullable: true })
  ratingValue: number;
}
