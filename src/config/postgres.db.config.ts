import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Genre } from 'src/movies/entities/genre.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { User } from 'src/users/entities/user.entity';

dotenv.config();

const postgresOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Movie, User, Genre, Rating],
  synchronize: process.env.NODE_ENV !== 'production',
};

export default postgresOrmConfig;
