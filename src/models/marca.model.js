import Sequelize from 'sequelize';
import connection from '../config/connection/connection.js';

const Marca = connection.define('MARCA', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  DESCRICAO: Sequelize.STRING(50),
  SLOGAN: Sequelize.STRING(100),
  ANO_CRIACAO: Sequelize.INTEGER
});

export default Marca;