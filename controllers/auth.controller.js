const db = require("../db");
const jwt = require("jsonwebtoken");

const {
  hashingPassword,
  verifyPassword,
} = require("../services/auth/auth.services");

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role, age } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email & password are required" });
    }

    const hashedPassword = await hashingPassword({ password });

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        age,
        role: role || "USER",
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    try {
    const user = await db.user.findFirst({
      where: {
        email,
        deleted: false,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const validPass = await verifyPassword({
      commingPassword: password,
      usersPassword: user.password,
    });

    if (validPass) {
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        message: "Logged in Successfully",
        token,
        user,
      });
    } else {
      return res.status(400).json({ message: "Invalid password or email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
};
