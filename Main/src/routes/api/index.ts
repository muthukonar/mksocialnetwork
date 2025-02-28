import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js'; 
import friendRoutes from './friendRoutes.js';


router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', friendRoutes);

export default router;
