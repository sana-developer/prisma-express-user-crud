const express = require("express");
const { RegisterUser, LoginUser } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth/auth.middleware");
const { UserRole } = require("@prisma/client");

const router = express.Router();

router.post('/register', authMiddleware([UserRole.ADMIN]), RegisterUser);
router.post('/login', LoginUser);

module.exports = router;