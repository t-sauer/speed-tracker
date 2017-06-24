import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Speedtest = sequelize.define('Speedtest', {
    downloadSpeed: dataTypes.FLOAT,
    endTime: dataTypes.FLOAT,
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER
    },
    ping: dataTypes.INTEGER,
    startTime: dataTypes.INTEGER,
    uploadSpeed: dataTypes.INTEGER
  });

  return Speedtest;
};
