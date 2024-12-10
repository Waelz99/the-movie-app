import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'tmdb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // automatically synchronize the database (development only)
};

export default typeOrmConfig;
