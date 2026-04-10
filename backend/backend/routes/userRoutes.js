const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { createUploader } = require('../middleware/upload');

const upload = createUploader('users');

router.post('/login', loginUser);
router.get('/', verifyAdmin, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', upload.single('photo'), createUser);
router.put('/:id', verifyToken, upload.single('photo'), updateUser);
router.delete('/:id', verifyAdmin, deleteUser);

module.exports = router;
