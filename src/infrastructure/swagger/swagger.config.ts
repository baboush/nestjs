import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Portofolio Api v1')
  .setDescription('Simple Api Portofolio')
  .setVersion('1.0.0')
  .build();
