import { config } from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
config({ path: `./.env.${env}` });

export default new DataSource({
  type: 'mysql',
  host: `${process.env.DB_HOST}`,
  port: Number(process.env.DB_PORT),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  synchronize: false,
  entities: [User],
  migrationsRun: true,
  migrations: [
    './src/db/typeorm-migrations/*.ts',
    './src/db/typeorm-migrations/*.js',
  ],
});
