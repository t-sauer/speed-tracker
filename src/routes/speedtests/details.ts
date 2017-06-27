import { Request, Response } from 'express';

import Models from '../../models';
import { SpeedtestPresenter } from './index';

export default async (req: Request, res: Response) => {
  res.header('Content-Type', 'application/json');

  const item = await Models.Speedtest.findById(req.params.id);

  if (!item) {
    res.status(404);
    res.send({
      errors: [{
        status: 404
      }]
    });
    return;
  }

  res.send(SpeedtestPresenter.render(item));
};
