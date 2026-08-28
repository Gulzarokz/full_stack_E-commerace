import express from 'express';
import { Allusers, changePassword, forgotPassword, getUserById, logout, loginUser, registerUser, reverify, verify, verifyOtp, updateUser } from '../Controllers/userController.js';
import { isAdmin, isAuthenticate } from '../middleware/isAuthenticated.js';



const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verify)
router.post('/reVerify', reverify)
router.post('/login', loginUser)
router.post('/logout', isAuthenticate, logout)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp/:email', verifyOtp)
router.post('/change-password/:email', changePassword)

// crud operations 
router.get('/get-Allusers', isAuthenticate, isAdmin, Allusers)
router.get('/get-userById/:id', isAuthenticate, isAdmin, getUserById)
router.put('/update-user/:userId', isAuthenticate, updateUser)



export default router;