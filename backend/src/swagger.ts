    // src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API com Swagger',
      version: '1.0.0',
      description: 'Documentação gerada automaticamente com Swagger e TypeScript',
    },
  },
  apis: ['./src/routes/**/*.ts'], // Aponta para seus arquivos TypeScript
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
