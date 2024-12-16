import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Movie } from 'src/movies/entities/movie.entity';
import { Rating } from 'src/ratings/entities/rating.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Movie, (movie) => movie.watchlist)
  @JoinTable()
  watchlist: Movie[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;
}
