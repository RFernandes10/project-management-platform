import { Router } from 'express';
import { register, login, getMe, refreshAccessToken, updateProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.get('/me', authMiddleware, getMe);
router.put('/profile', authMiddleware, upload.single('avatar'), updateProfile);

export default router;
