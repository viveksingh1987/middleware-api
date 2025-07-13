
const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

/**
 * Function to setup Swagger UI for the Express application
 * @param {*} app 
 * @param {*} specPath 
 */
function setupSwagger(app, specPath) {

    // Load the OpenAPI specification
    const spec = YAML.load(path.join(__dirname, specPath));
    
    // Setup Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
    
}

module.exports = setupSwagger;