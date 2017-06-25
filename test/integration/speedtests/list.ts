import app from '../../../src/app';

import * as chai from 'chai';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /speedtests', () => {
  it('should return all tests', async () => {
    const response = await chai.request(app).get('/speedtests');
    expect(response).to.have.status(200);
    expect(response).to.be.json;
    expect(response.body).to.have.property('data').with.lengthOf(5);
    expect(response.body).to.have.property('meta').which.deep.equals({
      count: 5
    });
  });
});
