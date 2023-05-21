import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASS, DB_PATH, DB_PORT, DB_USER } from '../const.js';

/*
const connection = new Sequelize({
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mariadb'
});
*/

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH
});

export default connection;