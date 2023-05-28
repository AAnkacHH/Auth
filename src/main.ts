import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const swaggerBuilder = new DocumentBuilder()
      .setTitle("Auth server")
      .setDescription('Auth server documentation.')
      .setVersion('1.0.0')
      .setContact('Ing Andrii Plyskach', '', 'ankach.ua@gmail.com');
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerBuilder.build());
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();
