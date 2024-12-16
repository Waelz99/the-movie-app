import { Module } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { ConfigModule } from '@nestjs/config';
import { TMDBHelpers } from './helpers/tmdb-helpers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [TmdbService, TMDBHelpers],
  exports: [TmdbService, TMDBHelpers, ConfigModule],
})
export class TmdbModule {}
