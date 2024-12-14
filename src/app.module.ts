import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
