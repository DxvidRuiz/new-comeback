import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants/jwt-constants';
import { FacebookStrategy } from './auth/passport/FacebookStrategy';
import { JwtStrategy } from './auth/passport/jwt.strategy';
import { Post } from './posts/entities/post.entity';
import { PostsModule } from './posts/posts.module';
import { UploadsModule } from './uploads/uploads.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      strategies: ['jwt', 'facebook-token'], // Agrega ambas estrategias

    }), // Registra Passport con estrategia JWT
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: false,
        migrationsRun: true,
        autoLoadEntities: true,
        migrations: ['src/migrations/*.ts'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        charset: 'utf8mb4',
        entities: [User, Post],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    UploadsModule,
    PostsModule,
    UserProfileModule,
  ],

  controllers: [AppController, UsersController],
  providers: [AppService, JwtStrategy, FacebookStrategy
    //    {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },

  ],
})
export class AppModule { }
