import {
  Project,
  MethodDeclaration,
  SourceFile,
  ImportDeclarationStructure,
  StructureKind,
  ClassDeclaration,
} from 'ts-morph';

function generateDtoEntitySwagger() {
  const project = new Project();
  const dtoSourceFiles = project.addSourceFilesAtPaths('./*.dto.ts');
  const entitySourceFiles = project.addSourceFilesAtPaths('./*.entity.ts');
  const dtoImportDeclaration: ImportDeclarationStructure = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: '@nestjs/swagger',
    namedImports: ['ApiProperty'],
  };

  // Ajouter l'import dans tous les fichiers DTO
  dtoSourceFiles.forEach((sourceFile) => {
    const hasSwaggerImport = sourceFile.getImportDeclaration(
      (importDeclaration) =>
        importDeclaration.getModuleSpecifierValue() === '@nestjs/swagger',
    );

    if (!hasSwaggerImport) {
      sourceFile.addImportDeclaration(dtoImportDeclaration);
    }
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
