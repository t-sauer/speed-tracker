import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Speedtest = sequelize.define('Speedtest', {
    server_id: {
      type: dataTypes.INTEGER
    }
  });

  return Speedtest;
};
