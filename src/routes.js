import { Router } from 'express';
import CorRoutes from './routes/cor.route.js';
import MarcaRoutes from './routes/marca.route.js';
import ModeloRoutes from './routes/modelo.route.js';
import VeiculoRoutes from './routes/veiculo.route.js';
import { route } from './utils/route.js';

const routes = Router();

routes
  .use(route('/api'), VeiculoRoutes)
  .use(route('/cores'), CorRoutes)
  .use(route('/marcas'), MarcaRoutes)
  .use(route('/modelos'), ModeloRoutes);

export default routes;