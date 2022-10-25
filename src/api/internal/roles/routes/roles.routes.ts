import { Router } from 'express';
import Roles from '../controllers/roles.controllers';
import Token from '../../../../auth/token';

const router: Router = Router();
const token: Token = new Token();

router.post('/get', token.validate, token.isAdmin, Roles.get);
router.post('/assign', token.validate, token.isAdmin, Roles.assign);

export default router;
