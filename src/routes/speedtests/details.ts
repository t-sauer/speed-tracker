import { Request, Response } from 'express';

import Models from '../../models';
import { SpeedtestPresenter } from './index';

export default async (req: Request, res: Response) => {
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
};
