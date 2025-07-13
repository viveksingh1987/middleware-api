const request = require('supertest');
const app = require('../app');
const axios = require('axios');
jest.mock('axios');

describe('GET /companies/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return company JSON if XML is found', async () => {
    const xmlData = `
      <Data>
        <id>1</id>
        <name>MWNZ</name>
        <description>..is awesome</description>
      </Data>
    `;

    axios.get.mockResolvedValue({ data: xmlData });

    const res = await request(app).get('/companies/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'MWNZ',
      description: '..is awesome',
    });
  });

  it('should return 404 if XML file not found', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });

    const res = await request(app).get('/companies/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: 'Not Found',
      error_description: 'Company with id 999 not found',
    });
  });

  it('should return 500 if server error occurs', async () => {
    axios.get.mockRejectedValue(new Error('Some internal error'));

    const res = await request(app).get('/companies/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: 'Internal Server Error',
      error_description: 'Unexpected error occurred',
    });
  });
});