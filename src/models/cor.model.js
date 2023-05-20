import Sequelize from 'sequelize';
import connection from '../config/connection/connection.js';

const Cor = connection.define('COR', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NOME: Sequelize.STRING(30),
  HEX: Sequelize.STRING(6)
});

export default Cor;