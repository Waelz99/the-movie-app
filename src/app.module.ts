import { MoviesModule } from './movies/movies.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
