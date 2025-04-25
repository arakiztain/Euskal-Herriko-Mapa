import { Router } from 'express';
import { isLoggedIn } from '../middleware/auth.js';
import { getMunicipalitys, addMunicipality, deleteMunicipality } from '../controllers/municipios_controller.js';

const router = Router();

router.use(isLoggedIn); // Todas las rutas requieren autenticación

router.get('/', getMunicipalitys);
router.post('/', addMunicipality);
router.delete('/:id', deleteMunicipality);

export default router;