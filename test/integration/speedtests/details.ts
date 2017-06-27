import app from '../../../src/app';
import { loadFixtures, resetDatabase } from '../helper/database';

import * as chai from 'chai';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /speedtests/1', () => {

  before(async () => {
    await resetDatabase();
    await loadFixtures();
  });

  it('should return the specific test', async () => {
    const response = await chai.request(app).get('/speedtests/1');
    const { body } = response;

    expect(response).to.have.status(200);
    expect(response).to.be.json;

    expect(body).to.have.nested.property('data.attributes.ping', 10.34);
    expect(body).to.have.nested.property('data.attributes.endTime', 1498581858564);
    expect(body).to.have.nested.property('data.attributes.startTime', 1498581758564);
    expect(body).to.have.nested.property('data.attributes.uploadSpeed', 54.321);
    expect(body).to.have.nested.property('data.attributes.downloadSpeed', 12.345);

    expect(body).to.have.nested.property('data.id', '1');
    expect(body).to.have.nested.property('data.type', 'speedtest');

    return response;
  });
});
