const fs = require('fs');
const yaml = require('js-yaml');

// Charger le fichier JSON existant
const swaggerFile = fs.readFileSync('../swagger.json', 'utf8');
const swaggerData = JSON.parse(swaggerFile);

// Parcourir les endpoints et générer des fichiers YAML séparés
Object.entries(swaggerData.paths).forEach(([path, pathData]) => {
  Object.entries(pathData).forEach(([method, methodData]) => {
    const endpointData = {
      paths: {
        [path]: {
          [method]: methodData,
        },
      },
    };
    const endpointYaml = yaml.dump(endpointData);
    const filename = `${path.replace(/\//g, '')}${method}.yaml`;
    fs.writeFileSync(filename, endpointYaml);
  });
});
