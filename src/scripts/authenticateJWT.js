import jwt from "jsonwebtoken";
import AppConfig from "../configs/app.config.js";

const authenticateJWT = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.sendStatus(401);

    jwt.verify(token, AppConfig.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export { authenticateJWT }