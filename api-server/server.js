const app = require('./src/app'); 

// Configure swagger with OpenAPI specification
const setupSwagger = require('./src/swagger/swagger');
setupSwagger(app, 'openapi-companies.yaml');

// Set the port for the server
// Default to 3000 if not specified in environment variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});