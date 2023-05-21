import { Router } from 'express';
import MarcaController from '../controllers/marca.controller.js';

const MarcaRoutes = Router();

MarcaRoutes.get('/', MarcaController.list);
MarcaRoutes.get('/:id', MarcaController.show);
MarcaRoutes.post('/', MarcaController.create);
MarcaRoutes.put('/:id', MarcaController.update);
MarcaRoutes.delete('/:id', MarcaController.delete);

export default MarcaRoutes;