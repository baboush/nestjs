import { AppDataSource } from '@infrastructure/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from '@interface/message';
import { APP_FILTER } from '@nestjs/core';
import { CatchAllExceptionFilterFilter } from '@infrastructure/utils/filter/catch-all-exception.filter';
@Module({
  imports: [MessageModule, TypeOrmModule.forRoot({ ...AppDataSource() })],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchAllExceptionFilterFilter,
    },
  ],
})
export class AppModule {}
