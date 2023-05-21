import { Router } from 'express';
import CorRoutes from './routes/cor.route.js';
import MarcaRoutes from './routes/marca.route.js';

const routes = Router();

routes
  .get('/', function(request, response) {
    response.send({
      success: true,
      message: 'Hello, World!'
    });
  })
  .use('/cor', CorRoutes)
  .use('/marca', MarcaRoutes);

export default routes;