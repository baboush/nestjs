'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var ts_morph_1 = require('ts-morph');
// Créer un nouveau projet TypeScript
var project = new ts_morph_1.Project();
// Charger tous les fichiers TypeScript dans le dossier src (ou votre dossier de contrôleurs)
project.addSourceFilesAtPaths('../utils/');
// Parcourir tous les fichiers chargés
project.getSourceFiles().forEach(function (sourceFile) {
  // Parcourir toutes les classes dans le fichier
  sourceFile.getClasses().forEach(function (classDeclaration) {
    // Vérifier si la classe est un contrôleur NestJS
    if (classDeclaration.getDecorator('Controller')) {
      // Parcourir toutes les méthodes de la classe
      classDeclaration.getMethods().forEach(function (method) {
        var _a;
        // Récupérer le nom de la méthode
        var methodName = method.getName();
        // Récupérer le chemin de l'URL à partir de l'annotation @Get, @Post, etc.
        var httpMethodDecorator = method.getDecorator(function (d) {
          return d.getText().includes('@Get') || d.getText().includes('@Post');
        });
        var path =
          (_a =
            httpMethodDecorator === null || httpMethodDecorator === void 0
              ? void 0
              : httpMethodDecorator.getArguments()[0]) === null || _a === void 0
            ? void 0
            : _a.getText();
        // Générer l'annotation Swagger
        var swaggerAnnotation = '@Api'
          .concat(
            httpMethodDecorator === null || httpMethodDecorator === void 0
              ? void 0
              : httpMethodDecorator.getText().replace('@', ''),
            "('",
          )
          .concat(path, "')");
        // Imprimer l'annotation Swagger
        console.log(
          'M\u00E9thode: '
            .concat(methodName, ', Annotation Swagger: ')
            .concat(swaggerAnnotation),
        );
      });
    }
  });
});
