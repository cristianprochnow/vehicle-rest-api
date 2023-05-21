import { Router } from 'express';
import CorController from '../controllers/cor.controller.js';

const CorRoutes = Router();

CorRoutes.get('/', CorController.list);
CorRoutes.get('/:id', CorController.show);
CorRoutes.post('/', CorController.create);
CorRoutes.put('/:id', CorController.update);
CorRoutes.delete('/:id', CorController.delete);

export default CorRoutes;