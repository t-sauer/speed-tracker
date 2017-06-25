import * as compression from 'compression';
import * as express from 'express';

import { sequelize } from './models';
import routes from './routes';

import Speedtest from './utils/speedtest';
import SpeedtestRunner from './utils/speedtest-runner';

const port: number = process.env.PORT || 3000;
const testInterval: number = (process.env.TEST_INTERVAL || 1) * 1000 * 60;
const app = express();

app.use(compression());
app.use('/', routes);

const speedtestFinishedHandler = (speedtest: Speedtest) => {
  try {
    speedtest.save();
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  try {
    await sequelize.sync();

    app.listen(port, async () => {

      if (process.env.NODE_ENV !== 'test') {
        const runner = new SpeedtestRunner(testInterval);
        runner.onTestFinished(speedtestFinishedHandler);
      }

      console.log(`speed-tracker API started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }

})();

export default app;
