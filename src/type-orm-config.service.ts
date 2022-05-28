import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { DATABASE_URL, NODE_ENV } = process.env;

    let extra = null;
    if (NODE_ENV.toLowerCase() !== 'dev') {
      extra = {
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }

    return {
      type: 'postgres',
      url: DATABASE_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra,
    };
  }
}
