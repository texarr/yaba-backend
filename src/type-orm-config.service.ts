import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { entities } from './entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connectionManager: ConnectionManager = getConnectionManager();
    let options: any;
    if (connectionManager.has('yaba-backend')) {
      options = connectionManager.get('yaba-backend').options;
      await connectionManager.get('yaba-backend').close();
    } else {
      options = {
        name: 'yaba-db',
        type: 'mysql',
        host: String(process.env.TYPEORM_HOST),
        port: 3306,
        username: String(process.env.TYPEORM_USERNAME),
        password: process.env.TYPEORM_PASSWORD,
        database: String(process.env.TYPEORM_DATABASE),
        entities: entities,
        synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
        logging: process.env.TYPEORM_LOGGING === 'true',
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      } as TypeOrmModuleOptions;
    }
    return options;
  }
}
