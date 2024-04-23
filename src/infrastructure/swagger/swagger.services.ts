import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './swagger.config';

export class SwaggerService {
  initialiseSwagger(app: any) {
    const document = SwaggerModule.createDocument(app, SwaggerConfig);
    return SwaggerModule.setup('api', app, document);
  }
}
