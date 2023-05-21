import { Router } from 'express';
import CorRoutes from './routes/cor.route.js';

const routes = Router();

routes
  .get('/', function(request, response) {
    response.send({
      success: true,
      message: 'Hello, World!'
    });
  })
  .use('/cor', CorRoutes);

export default routes;