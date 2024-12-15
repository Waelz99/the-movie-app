import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      store: 'ioredis',
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 3600,
    }),
  ],
  providers: [RedisService],
})
export class RedisModule {}
