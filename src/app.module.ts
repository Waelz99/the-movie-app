import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchlistsModule } from './watchlists/watchlists.module';
import postgresOrmConfig from './config/postgres.db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresOrmConfig),
    MoviesModule,
    UsersModule,
    WatchlistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
