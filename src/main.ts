import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ValidationError } from '@nestjs/class-validator';
import { HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
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
