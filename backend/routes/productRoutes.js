import express from 'express';
import { addProduct, deleteProducts, getAllProducts, updateProducts } from '../Controllers/productController.js';
import { isAdmin, isAuthenticate } from '../middleware/isAuthenticated.js';
import { multipleFileUpload } from '../middleware/multer.js';

const router = express.Router();


router.post('/addproduct', isAuthenticate, multipleFileUpload, addProduct)
router.get('/getallproducts', getAllProducts)
router.delete('/delete/:productId', isAuthenticate, multipleFileUpload, deleteProducts);
router.put('/update/:productId', isAuthenticate, multipleFileUpload, updateProducts)

export default router;