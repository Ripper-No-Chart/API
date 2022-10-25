import { Router } from 'express';
import Users from '../controllers/users.controllers';
import Token from '../../../../auth/token';

const router: Router = Router();
const token: Token = new Token();

router.post('/get', token.validate, Users.get);
router.post('/active', token.validate, token.isAdmin, Users.active);
router.post('/create', token.validate, token.isAdmin, Users.create);

export default router;
