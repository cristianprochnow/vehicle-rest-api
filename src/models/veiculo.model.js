import Sequelize from 'sequelize';
import connection from '../config/connection/connection.js';

const Veiculo = connection.define('VEICULO', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PLACA: Sequelize.STRING(10),
  RENAVAM: Sequelize.STRING(11),
  COR_ID: Sequelize.INTEGER,
  MODELO_ID: Sequelize.INTEGER
});

export default Veiculo;