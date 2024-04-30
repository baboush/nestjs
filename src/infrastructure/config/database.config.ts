import { Project } from '@domain/entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message } from 'src/domain/entities/message.entity';

export function AppDataSource(): TypeOrmModuleOptions {
  return {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: '',
    password: '',
    database: 'test_data',
    synchronize: true,
    logging: true,
    entities: [Message, Project],
    subscribers: [],
    migrations: [],
  };
}
