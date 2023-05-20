import Sequelize from 'sequelize';
import connection from '../config/connection/connection.js';

const Modelo = connection.define('MODELO', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  DESCRICAO: Sequelize.STRING(50),
  ANO: Sequelize.INTEGER,
  POLEGADA_RODA: Sequelize.DECIMAL(5, 2),
  PESO: Sequelize.DECIMAL(6, 2),
  MARCA_ID: Sequelize.INTEGER
});

export default Modelo;