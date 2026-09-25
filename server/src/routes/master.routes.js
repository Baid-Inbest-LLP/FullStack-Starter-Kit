import { Router } from 'express';
import * as master from '../controllers/master.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/users', authorize('superadmin'), master.listUsers);
router.put('/users/:id', authorize('superadmin'), master.updateUser);
router.delete('/users/:id', authorize('superadmin'), master.deleteUser);
router.post('/users/:id/reset-password', authorize('superadmin'), master.resetPassword);

export default router;
