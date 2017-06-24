import Speedtest from '../../../src/utils/speedtest';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

const successFullTester = () => ({
  on(evt: string, cb: (obj: any) => void) {
    if (evt === 'done') {
      cb({
        bestServer: {
          bestPing: 12,
          name: 'Awesome Server'
        },
        speedTestDownloadSpeed: 42,
        speedTestUploadSpeed: 3.14
      });
    }
  }
});

describe('Speedtest', () => {

  it('should contain the correct data after the test is run', async () => {
    const test = new Speedtest(successFullTester);

    await test.start();

    expect(test.downloadSpeed).to.equal(42);
    expect(test.uploadSpeed).to.equal(3.14);
    expect(test.ping).to.equal(12);
    expect(test.server).to.deep.equal({ name: 'Awesome Server', bestPing: 12 });
    expect(test.startTime).to.not.be.undefined;
    expect(test.endTime).to.not.be.undefined;
  });

  it(`shoul reject if an error occurs`, () => {
    const test = new Speedtest(() => ({
      on(evt: string, cb: (obj: any) => void) {
        if (evt === 'error') {
          cb('Some error');
        }
      }
    }));

    expect(test.start()).to.be.rejected;
  });

  it('should not be possible to start the test twice', async () => {
    const test = new Speedtest(successFullTester);

    await test.start();
    expect(() => test.start()).to.throw('Speedtest already ran!');
  });
});
