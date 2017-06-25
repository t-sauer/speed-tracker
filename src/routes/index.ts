import { Router } from 'express';

import speedtests from './speedtests';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({});
});

routes.use('/speedtests', speedtests);

export default routes;
