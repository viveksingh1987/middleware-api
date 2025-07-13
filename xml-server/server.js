const app = require('./app');

// Configure swagger with OpenAPI specification
const setupSwagger = require('./swagger/swagger');
setupSwagger(app, 'openapi-xml.yaml');

// Set the port for the server
// Default to 4000 if not specified in environment variables
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});