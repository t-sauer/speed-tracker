import Speedtest from '../../../src/utils/speedtest';
import SpeedtestRunner from '../../../src/utils/speedtest-runner';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('speedtest-runner', () => {

  let sandbox: sinon.SinonSandbox;
  let runner: SpeedtestRunner;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Speedtest.prototype, 'start').callsFake(function(): Promise<Speedtest> {
      this._isFinished = true;
      return Promise.resolve(this);
    });
  });

  afterEach(() => {
    sandbox.restore();

    runner.stop();
  });

  it('should trigger a speedtest', (done) => {
    runner = new SpeedtestRunner(10000);

    runner.onTestFinished((result) => {
      expect(result).to.be.an.instanceOf(Speedtest);
      done();
    });
  });

  it('should trigger multiple speedtests after each is done', (done) => {
    runner = new SpeedtestRunner(100);
    let counter = 0;

    runner.onTestFinished((result) => {
      expect(result).to.be.an.instanceOf(Speedtest);
      counter++;
      if (counter > 1) {
        done();
      }
    });
  });
});
