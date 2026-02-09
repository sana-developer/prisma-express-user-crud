 
const jwt = require("jsonwebtoken");
const db = require("../../db");

const authMiddleware = (allowedRoles) => async (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) return res.status(401).json({message: "Access Denied"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id } = decoded;

        const user = await db.user.findFirst({
            where: {
                id,
                deleted: false
            }
        });

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        if(user.deleted) {
            return res.status(404).json({message: "User not found"});
        }

        req.userId = id;

        return allowedRoles.includes(user.role)
            ? next()
            : res.status(403).json({message: "Access Denied!"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = authMiddleware;