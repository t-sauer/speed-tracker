import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Speedtest = sequelize.define('Speedtest', {
    downloadSpeed: dataTypes.NUMBER,
    endTime: dataTypes.NUMBER,
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER
    },
    ping: dataTypes.NUMBER,
    startTime: dataTypes.NUMBER,
    uploadSpeed: dataTypes.NUMBER
  });

  return Speedtest;
};
