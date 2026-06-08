import express from 'express';
import { loginUser, registerUser, reverify, verify } from '../Controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verify)
router.post('/reVerify', reverify)
router.post('/login', loginUser)


export default router;