import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'perla.com',
      database: 'gatos',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],

  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
