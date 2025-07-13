const express = require('express');
const xml2js = require('xml2js');
const Company = require('./entities/Company');
const axios = require('axios');

const app = express();
//const XML_API_BASE_URL = process.env.XML_API_URL || 'http://xml-server:4000';

const parser = new xml2js.Parser({ explicitArray: false });


/**
 * Health check endpoint
 * @route GET /health
 * @returns 200 OK
 */
app.get('/health', (req, res) => {
    res.status(200).send("Success");
});

/**
 * GET /companies/:id
 * Fetches company XML by ID, converts it to JSON and returns a Company DTO.
 */
app.get('/companies/:id', async (req, res) => {
  const { id } = req.params;
  const xmlUrl = `http://xml-server:4000/xml-api/${id}.xml`;

  try {
   // Fetch XML from external XML API
    const xmlResponse = await axios.get(xmlUrl, {
      headers: { Accept: 'application/xml' },
    });

    // Parse XML to JSON
    const parsed = await parser.parseStringPromise(xmlResponse.data);

      // Return formatted JSON using DTO
    const company = new Company(parsed.Data);
    return res.status(200).json(company);

  } catch (err) {

    if (err.response?.status === 404) {
        // Handle not found error from XML API
       return res.status(404).json({
          error: 'Not Found',
          error_description: `Company with id ${id} not found`,
        });
    } else {
        // Log and return 500 for any other errors
        console.error('Failed to fetch company XML:', err.message);
        return res.status(500).json({
          error: 'Internal Server Error',
          error_description: 'Unexpected error occurred',
        });
    }
  }
  
});

module.exports = app;