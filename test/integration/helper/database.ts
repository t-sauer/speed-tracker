import { join } from 'path';
import * as fixtures from 'sequelize-fixtures';
import models, { sequelize } from '../../../src/models';

export async function resetDatabase() {
  return await sequelize.sync({ force: true });
}

export async function loadFixtures() {
  return await fixtures.loadFile(join(__dirname, '../fixtures/speedtests.yaml'), models);
}
