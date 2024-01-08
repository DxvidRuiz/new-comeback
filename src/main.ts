/* eslint-disable prettier/prettier */
import { ValidationError } from '@nestjs/class-validator';
import { ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import * as multer from 'multer';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // excluir propiedades de enpoint
  const reflector = app.get(Reflector);
  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  // -- end
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(morgan('dev'));
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: {},
          error: HttpStatus[HttpStatus.BAD_REQUEST],
        };
        //config structure errors
        errors.forEach((error) => {
          const field = error.property;
          const constraints = Object.values(error.constraints);
          response.message[field] = constraints[0];
        });

        return response;
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
