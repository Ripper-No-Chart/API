import { Router } from 'express';
import Token from '../../../auth/token';
import Contacts from '../controllers/contacts.controllers';

const router: Router = Router();
const token: Token = new Token();

router.post('/get', token.validate, Contacts.get);
router.post('/update', token.validate, Contacts.update);

export default router;
