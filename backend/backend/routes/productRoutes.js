const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { createUploader } = require('../middleware/upload');

const upload = createUploader('products');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', verifyAdmin, upload.single('image'), createProduct);
router.put('/:id', verifyAdmin, upload.single('image'), updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);

module.exports = router;
