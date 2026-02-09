const express = require('express');

const router = express.Router();

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth/auth.middleware');
const { UserRole } = require('@prisma/client');

router.get('/',authMiddleware([UserRole.ADMIN]), getUsers);
router.get('/:id', authMiddleware([UserRole.ADMIN, UserRole.USER]), getUserById);
router.put('/:id', authMiddleware([UserRole.ADMIN, UserRole.USER]), updateUser);
router.delete('/:id', authMiddleware([UserRole.ADMIN]), deleteUser);

module.exports = router;