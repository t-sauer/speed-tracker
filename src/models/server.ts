import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Server = sequelize.define('Server', {
    bestPing: dataTypes.INTEGER,
    cc: dataTypes.STRING,
    country: dataTypes.STRING,
    dist: dataTypes.INTEGER,
    distMi: dataTypes.INTEGER,
    host: dataTypes.STRING,
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER
    },
    lat: dataTypes.STRING,
    lon: dataTypes.STRING,
    name: dataTypes.STRING,
    sponsor: dataTypes.STRING,
    url: dataTypes.STRING,
    url2: dataTypes.STRING
  });

  return Server;
};
