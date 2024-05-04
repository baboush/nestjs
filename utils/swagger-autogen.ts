import {
  Project,
  MethodDeclaration,
  SourceFile,
  ImportDeclarationStructure,
  StructureKind,
  ClassDeclaration,
} from 'ts-morph';

// Créer un nouveau projet TypeScript

// Charger tous les fichiers TypeScript dans le dossier src (ou votre dossier de contrôleurs)

const project = new Project();
function generateControllerDoc() {
  const sourceFiles = project.addSourceFilesAtPaths(
    '../src/**/*.controller.ts',
  );

  // Importations Swagger nécessaires
  const swaggerImports: ImportDeclarationStructure[] = [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@nestjs/swagger',
      namedImports: [
        'ApiBearerAuth',
        'ApiOperation',
        'ApiResponse',
        'ApiHeader',
        'ApiBadRequestResponse',
        'ApiUnauthorizedResponse',
        'ApiNotFoundResponse',
        // Ajoutez d'autres imports au besoin
      ],
    },
  ];

  // Parcourir tous les fichiers chargés
  sourceFiles.forEach((sourceFile) => {
    // Vérifier si les imports Swagger sont déjà présents
    const existingSwaggerImports = sourceFile
      .getImportDeclarations()
      .filter(
        (importDeclaration) =>
          importDeclaration.getModuleSpecifierValue() === '@nestjs/swagger',
      );

    // Importer les décorateurs Swagger manquants
    swaggerImports.forEach((swaggerImport) => {
      const hasImport = existingSwaggerImports.some((existingImport) =>
        existingImport
          .getNamedImports()
          .some(
            (namedImport) =>
              namedImport.getName() === swaggerImport.namedImports[0],
          ),
      );

      if (!hasImport) {
        sourceFile.addImportDeclaration(swaggerImport);
      }
    });

    // Parcourir toutes les classes dans le fichier
    sourceFile.getClasses().forEach((classDeclaration) => {
      // Vérifier si la classe est un contrôleur NestJS
      if (classDeclaration.getDecorator('Controller')) {
        console.log('Traitement du contrôleur :', classDeclaration.getName());

        // Parcourir toutes les méthodes de la classe
        classDeclaration.getMethods().forEach((method) => {
          // Récupérer le nom de la méthode
          const methodName = method.getName();
          const methodType = method.getType().getText();
          console.table(`Traintement method methodName: ` + methodName);
          console.table(`Traintement method methodType: ` + methodType);
          // Analyser les caractéristiques de la méthode et ajouter les décorateurs appropriés avec les arguments précis

          // Exemple : Si la méthode nécessite une autorisation spécifique

          if (methodType.includes('Promise')) {
            method.addDecorator({ name: 'ApiBearerAuth' });
          }

          if (methodType.includes('Promise')) {
            method.addDecorator({
              name: 'ApiResponse',
              arguments: [`{ status: 200, description: "Réponse réussie" }`],
            });
          }

          if (methodType.includes('Promise')) {
            method.addDecorator({
              name: 'ApiOperation',
              arguments: [
                `{ summary: "Description de ${methodName}", type: "${methodType}" }`,
              ],
            });
          }

          if (methodType.includes('Promise')) {
            method.addDecorator({
              name: 'ApiNotFoundResponse',
              arguments: [`{ description: "Ressource non trouvée" }`],
            });
          }

          if (methodType.includes('Promise')) {
            method.addDecorator({
              name: 'ApiInternalServerError',
              arguments: [`{ description: "Erreur interne du serveur" }`],
            });
          }
          if (methodType.includes('Promise')) {
            // Récupérer les paramètres de la méthode
            const parameters = method.getParameters();

            // Parcourir tous les paramètres de la méthode
            parameters.forEach((parameter) => {
              // Vérifier si le paramètre est de type Request ou Response
              if (
                parameter.getType().getText() === 'Request' ||
                parameter.getType().getText() === 'Response'
              ) {
                // Ajouter le décorateur ApiHeader avec les arguments appropriés
                method.addDecorator({
                  name: 'ApiHeader',
                  arguments: [
                    `{ name: "${parameter.getName()}", description: "Description du header ${parameter.getName()}" }`,
                  ],
                });
              }
            });
          }
        });
        sourceFile.saveSync();
      }
    });
  });
}

function generateDtoEntitySwagger() {
  const dtoSourceFiles = project.addSourceFilesAtPaths('../src/**/*.dto.ts');
  const entitySourceFiles = project.addSourceFilesAtPaths(
    '../src/**/*.entity.ts',
  );
  const dtoImportDeclaration: ImportDeclarationStructure = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: '@nestjs/swagger',
    namedImports: ['ApiProperty'],
  };

  // Ajouter l'import dans tous les fichiers DTO
  dtoSourceFiles.forEach((sourceFile) => {
    sourceFile.getClasses().forEach((classDeclaration) => {
      const hasSwaggerImport = sourceFile.getImportDeclaration(
        (importDeclaration) =>
          importDeclaration.getModuleSpecifierValue() === '@nestjs/swagger',
      );
      // Vérifier si la classe est un DTO (par exemple, en utilisant un décorateur spécifique ou une convention de nommage)
      if (!hasSwaggerImport) {
        sourceFile.addImportDeclaration(dtoImportDeclaration);
      }

      // Parcourir les propriétés de la classe et ajouter le décorateur ApiProperty si nécessaire
      classDeclaration.getProperties().forEach((property) => {
        const propertyName = property.getName();
        const propertyType = property.getType().getText();
        const isDocumented = property.getDecorator('ApiProperty');

        if (!isDocumented) {
          property.addDecorator({
            name: 'ApiProperty',
            arguments: [
              `{ description: "${propertyName}", type: "${propertyType}" }`,
            ],
          });
        }
      });
    });

    sourceFile.saveSync();
  });
  // Parcourir tous les fichiers entité
  entitySourceFiles.forEach((sourceFile) => {
    // Ajouter l'import dans le fichier entité si nécessaire
    const hasSwaggerImport = sourceFile.getImportDeclaration(
      (importDeclaration) =>
        importDeclaration.getModuleSpecifierValue() === '@nestjs/swagger',
    );

    if (!hasSwaggerImport) {
      sourceFile.addImportDeclaration(dtoImportDeclaration);
    }

    // Parcourir toutes les classes dans le fichier entité
    sourceFile.getClasses().forEach((classDeclaration: ClassDeclaration) => {
      // Parcourir toutes les propriétés de la classe
      classDeclaration.getProperties().forEach((property) => {
        // Récupérer le nom et le type de la propriété
        const propertyName = property.getName();
        const propertyType = property.getType().getText();

        // Vérifier si la propriété est déjà documentée avec le décorateur ApiProperty
        const isDocumented = property.getDecorator(
          (d) => d.getName() === 'ApiProperty',
        );

        // Ajouter le décorateur ApiProperty si la propriété n'est pas déjà documentée
        if (!isDocumented) {
          property.addDecorator({
            name: 'ApiProperty',
            arguments: [
              `{ description: "${propertyName}", type: "${propertyType}" }`,
            ],
          });
        }
      });
    });

    sourceFile.saveSync();
  });
}
generateDtoEntitySwagger();
generateControllerDoc();
