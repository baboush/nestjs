import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './swagger.config';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export class SwaggerService {
  initialiseSwagger(app: any) {
    const document = SwaggerModule.createDocument(app, SwaggerConfig);
    const yamlString = yaml.dump(document);
    fs.writeFileSync('swagger.yaml', yamlString);
    return SwaggerModule.setup('api', app, document);
  }
}
