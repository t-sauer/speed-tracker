import Speedtest from '../../../src/utils/speedtest';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Speedtest', () => {

  it('should contain the correct data after the test is run', async () => {
    const test = new Speedtest(() => ({
      on(evt: string, cb: (obj: any) => void) {
        if (evt === 'done') {
          cb({
            bestServer: {
              name: 'Awesome Server'
            },
            speedTestDownloadSpeed: 42,
            speedTestUploadSpeed: 3.14
          });
        }
      }
    }));

    await test.start();

    expect(test.downloadSpeed).to.equal(42);
    expect(test.uploadSpeed).to.equal(3.14);
    expect(test.server).to.deep.equal({ name: 'Awesome Server' });
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
});
