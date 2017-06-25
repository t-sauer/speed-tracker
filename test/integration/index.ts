import app from '../../src/app';

import * as chai from 'chai';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /', () => {
  it('should return an empty object', async () => {
    const response = await chai.request(app).get('/');

    expect(response).to.have.status(200);
    expect(response).to.be.json;
  });
});
