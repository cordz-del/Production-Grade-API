// src/index.js (Swagger integration snippet)
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();

const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ... other middleware and routes

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
