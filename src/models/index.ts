import * as fs from 'fs';
import * as path from 'path';

import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize('speed-tracker', '', '', {
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

const db: { [modelName: string]: any } = fs
  .readdirSync(__dirname)
  .filter((file) => file.includes('.') && !file.endsWith('.map') && file !== 'index.js')
  .reduce((obj: { [modelName: string]: any }, file) => {
    const model = sequelize.import(path.join(__dirname, file)) as any;
    obj[model.name as string] = model;

    return obj;
  }, {});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
