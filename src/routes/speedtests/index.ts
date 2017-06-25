import { Router } from 'express';
import * as Yayson from 'yayson';

import details from './details';
import list from './list';

const { Presenter } = Yayson({
  adapter: 'sequelize'
});

export class SpeedtestPresenter extends Presenter {
  public type = 'speedtest';
}

const routes = Router();

routes.get('/', list);
routes.get('/:id', details);

export default routes;
