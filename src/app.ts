import * as express from 'express';

import { sequelize } from './models';

// import SpeedtestRunner from './utils/speedtest-runner';

const port: number = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function startServer() {
  try {
    await sequelize.sync();

    app.listen(port, async () => {
      console.log(`speed-tracker API started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }

}

startServer();
// const runner = new SpeedtestRunner(500);
