import app from '../../../src/app';

import * as chai from 'chai';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /speedtests/1', () => {
  it('should return the specific test', async () => {
    const response = await chai.request(app).get('/speedtests/1');

    expect(response).to.have.status(200);
    expect(response).to.be.json;
    expect(response.body).to.have.property('data').deep.equal({
      attributes: {
        createdAt: '2017-06-25T22:52:38.613Z',
        downloadSpeed: 30.563299200954468,
        endTime: 1498431158586,
        ping: 54.412027,
        startTime: 1498431101341,
        updatedAt: '2017-06-25T22:52:38.613Z',
        uploadSpeed: 1.8809014660492491
      },
      id: '1',
      type: 'speedtest'
    });
  });
});
