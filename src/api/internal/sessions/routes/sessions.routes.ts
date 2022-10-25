import { Router } from 'express';
import Sessions from '../controllers/sessions.controllers';
import Token from '../../../../auth/token';

const router: Router = Router();
const token: Token = new Token();

router.post('/login', token.generate, Sessions.login);
router.post('/user', token.validate, Sessions.user);
router.post('/get', token.validate, Sessions.get);

export default router;
