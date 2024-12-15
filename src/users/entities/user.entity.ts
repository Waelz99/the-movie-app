import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Movie, (movie) => movie.users)
  @JoinTable()
  watchlist: Movie[];

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;
}
