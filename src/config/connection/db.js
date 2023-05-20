import { Sequelize } from 'sequelize';
import connection from './connection.js';
import Cor from '../../models/cor.model.js';
import Marca from '../../models/marca.model.js';
import Modelo from '../../models/modelo.model.js';
import Veiculo from '../../models/veiculo.model.js';

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

db.cor = Cor;
db.marca = Marca;
db.modelo = Modelo;
db.veiculo = Veiculo;

db.modelo.belongsTo(db.marca, { foreignKey: 'MARCA_ID' });
db.veiculo.belongsTo(db.cor, { foreignKey: 'COR_ID' });
db.veiculo.belongsTo(db.modelo, { foreignKey: 'MODELO_ID' });

export default db;