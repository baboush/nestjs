import { AppDataSource } from '@infrastructure/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from '@interface/message';
@Module({
  imports: [MessageModule, TypeOrmModule.forRoot({ ...AppDataSource() })],
  controllers: [],
  providers: [],
})
export class AppModule {}
