import * as compression from 'compression';
import * as express from 'express';
import * as Yayson from 'yayson';

import Models, { sequelize } from './models';

import SpeedtestRunner from './utils/speedtest-runner';

const port: number = process.env.PORT || 3000;
const app = express();
app.use(compression());

const { Presenter } = Yayson({
  adapter: 'sequelize'
});

app.get('/', (req, res) => {
  res.send('');
});

class SpeedtestPresenter extends Presenter {
  public type = 'speedtest';
}

app.get('/speedtests/:id', async (req, res) => {
  res.header('Content-Type', 'application/json');

  try {
    const item = await Models.Speedtest.findById(req.params.id);

    if (!item) {
      res.status(404);
      res.send('Not found');
      return;
    }

    res.send(SpeedtestPresenter.render(item));
  } catch (error) {
    res.status(500);
    res.send('Internal Server Error');
  }
});

app.get('/speedtests', async (req, res) => {
  res.header('Content-Type', 'application/json');
  const items = await Models.Speedtest.findAll();
  res.send(SpeedtestPresenter.render(items, { meta: items.length }));
});

async function startServer() {
  try {
    await sequelize.sync();
    const timeout = 1000 * 60 / 100;
    const runner = new SpeedtestRunner(timeout);
    runner.onTestFinished((speedtest) => {
      try {
        speedtest.save();
      } catch (error) {
        console.error(error);
      }
    });

    app.listen(port, async () => {
      console.log(`speed-tracker API started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }

}

startServer();
