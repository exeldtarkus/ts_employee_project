/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import app from '../../src/app';

describe('Running Testing API for Service', () => {
  it('Running BASE API Test', async () => {
    const indexRouteTest = await request(app).get('/');
    expect(indexRouteTest.status).toBe(200);
    expect(indexRouteTest.body.title).toBe('Service is Running');
  });
});
