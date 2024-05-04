const fs = require('fs');
const path = require('path');

const CONTROLLER_FILE_EXTENSION = '.controller.ts';

function traverseDirectory(dirPath, callback) {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      traverseDirectory(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

function addSwaggerAnnotations(filePath) {
  if (!filePath.endsWith(CONTROLLER_FILE_EXTENSION)) {
    return;
  }

  console.log(`Processing file: ${filePath}`);

  try {
    let sourceCode = fs.readFileSync(filePath, 'utf8');

    // Expression régulière pour rechercher les méthodes de contrôleur
    const methodRegex =
      /(@(?:Get|Post|Put|Delete|Patch)\(\)|async\s*(?:function)?\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\))\s*{/g;

    let match;
    while ((match = methodRegex.exec(sourceCode)) !== null) {
      const decoratorIndex = match.index;

      const hasSwaggerDecorators = sourceCode.includes(`@ApiOperation({`);
      if (!hasSwaggerDecorators) {
        const decorators = `
  @ApiOperation({ summary: '', description: '' })
  @ApiResponse({})
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({})
  @ApiInternalServerErrorResponse()
  @ApiHeader({})
`;

        sourceCode =
          sourceCode.slice(0, decoratorIndex) +
          decorators +
          sourceCode.slice(decoratorIndex);
      }
    }

    fs.writeFileSync(filePath, sourceCode);
    console.log(`Swagger annotations added to file: ${filePath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}: ${err}`);
  }
}

// Modifier le chemin du répertoire selon votre structure de projet
const directoryPath = './';

traverseDirectory(directoryPath, addSwaggerAnnotations);
