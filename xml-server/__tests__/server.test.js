const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../app');

// Set up a temporary XML file for testing
const testXmlDir = path.join(__dirname, '..', 'static', 'xml-api');
const testXmlPath = path.join(testXmlDir, '123.xml');
const testXmlContent = `<Data><id>123</id><name>Test</name><description>Test XML</description></Data>`;

beforeAll(() => {
  if (!fs.existsSync(testXmlDir)) {
    fs.mkdirSync(testXmlDir, { recursive: true });
  }
  fs.writeFileSync(testXmlPath, testXmlContent);
});

afterAll(() => {
  if (fs.existsSync(testXmlPath)) {
    fs.unlinkSync(testXmlPath);
  }
});

describe('XML API Server', () => {
  it('should return 200 on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Success');
  });

  it('should return XML content if file exists', async () => {
    const res = await request(app).get('/xml-api/123.xml');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('application/xml');
    expect(res.text).toContain('<Data>');
  });

  it('should return 404 if file does not exist', async () => {
    const res = await request(app).get('/xml-api/9999.xml');
    expect(res.statusCode).toBe(404);
    expect(res.text).toMatch(/not found/i);
  });
});
