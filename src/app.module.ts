import { MoviesModule } from './movies/movies.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/database.config';
import { UserModule } from './user/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MoviesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
