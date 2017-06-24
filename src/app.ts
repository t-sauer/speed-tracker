import * as express from 'express';

const port: number = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`speed-tracker API started on port ${port}`);
});