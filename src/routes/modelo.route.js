import { Router } from 'express';
import ModeloController from '../controllers/modelo.controller.js';

const ModeloRoutes = Router();

ModeloRoutes.get('/', ModeloController.list);
ModeloRoutes.get('/:id', ModeloController.show);
ModeloRoutes.post('/', ModeloController.create);
ModeloRoutes.put('/:id', ModeloController.update);
ModeloRoutes.delete('/:id', ModeloController.delete);

export default ModeloRoutes;