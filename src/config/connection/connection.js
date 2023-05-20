import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '../const.js';

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mariadb'
});

export default connection;