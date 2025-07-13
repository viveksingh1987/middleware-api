const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Constants
const STATIC_DIR = path.resolve(__dirname, 'static');
const XML_DIR = path.join(STATIC_DIR, 'xml-api');

// Serve static assets
app.use('/static', express.static(STATIC_DIR));

/**
 * Health check endpoint
 * @route GET /health
 * @returns 200 OK
 */
app.get('/health', (req, res) => {
    res.status(200).send("Success");
});

/**
 * Endpoint to serve XML files
 * @param {string} id - The company ID to fetch XML
 */
app.get('/xml-api/:id.xml', (req, res) => {

    const {id} = req.params;
    const xmlPath = path.join(XML_DIR, `${id}.xml`);

    console.log(`Request for XML file with id=${id} at path ${xmlPath}`);

    fs.stat(xmlPath, (err, stats) => {
        if (err || !stats.isFile()) {
            console.error(`Company XML file with id= ${id} not found`);

            return res
                    .status(404)
                    .send(`Company XML file with id= ${id} not found`);
        }

       return res
                .status(200)
                .setHeader('Content-Type', 'application/xml')
                .sendFile(xmlPath);
    });

});

module.exports = app;