const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./test.controller.ts']; // Chemin vers vos fichiers de contrôleur

swaggerAutogen(outputFile, endpointsFiles);
