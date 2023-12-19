import jwt from "jsonwebtoken";
import AppConfig from "../configs/app.config.js";

const authenticateJWT = (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, AppConfig.jwtSecret, (err, payload) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user_id = payload.id;
        next();
    });
};

export { authenticateJWT }