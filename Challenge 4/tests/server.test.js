const request = require('supertest');
const app = require('../server');
const {bewoners, beschikkingen, taxiBedrijven, rides} = require('../mockData');

const filteredRides = [{"bewonerId": 1, "kilometers": 10, "taxiBedrijf": "Taxi A"}]


describe('GET /bewoners', () => {
  it('should return all bewoners', async () => {
    const response = await request(app).get('/bewoners');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(bewoners);
  });
});

describe('POST /boek-rit', () => {
  it('should book a ride for a bewoner with valid beschikking and sufficient budget', async () => {
    const bewonerId = 1;
    const kilometers = 10;
    const response = await request(app)
      .post('/boek-rit')
      .send({ bewonerId, kilometers });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Rit successfully booked');
    expect(response.body.remainingBudget).toBe(90); // Assuming initial budget is 100
  });

  it('should return 404 if bewoner does not have a valid beschikking', async () => {
    const bewonerId = 3;
    const kilometers = 10;
    const response = await request(app)
      .post('/boek-rit')
      .send({ bewonerId, kilometers });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Beschikking not found or invalid');
  });

  it('should return 400 if bewoner does not have sufficient budget', async () => {
    const bewonerId = 1;
    const kilometers = 110;
    const response = await request(app)
      .post('/boek-rit')
      .send({ bewonerId, kilometers });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Insufficient budget');
  });
});

describe('GET /rides', () => {
  it('should return all rides for a specific taxi bedrijf', async () => {
    const taxiBedrijf = 'Taxi A';
    const response = await request(app).get('/rides').query({ taxiBedrijf });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredRides); // Assuming you have defined filteredRides
  });
});

describe('POST /reset-budgetten', () => {
  it('should reset the budget for all beschikkingen', async () => {
    const response = await request(app).post('/reset-budgetten');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Budgetten successfully reset');
    // Add additional assertions to check if the budget has been reset correctly
  });
});