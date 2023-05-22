import { Router } from 'express';
import VeiculoController from '../controllers/veiculo.controller.js';

const VeiculoRoutes = Router();

VeiculoRoutes.get('/', VeiculoController.list);
VeiculoRoutes.get('/:id', VeiculoController.show);
VeiculoRoutes.post('/', VeiculoController.create);
VeiculoRoutes.put('/:id', VeiculoController.update);
VeiculoRoutes.delete('/:id', VeiculoController.delete);

export default VeiculoRoutes;