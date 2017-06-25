import { Request, Response } from 'express';

import Models from '../../models';
import { SpeedtestPresenter } from './index';

export default async (req: Request, res: Response) => {
  res.header('Content-Type', 'application/json');
  const items = await Models.Speedtest.findAll();

  res.send(SpeedtestPresenter.render(items, { meta: { count: items.length } }));
};
