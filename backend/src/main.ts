import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corOptions : CorsOptions =
  {
    origin: (origin, callback) => {
      callback(null, true)
    },
    credentials: true
  }

  app.enableCors(corOptions);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  await app.listen(env.PORT || 3000);
}
bootstrap();
