import express from 'express';
import mongoose from 'mongoose';
import {celebrate} from 'celebrate';
import { authSchema, registrySchema } from './dto.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AuthService from '../../services/auth.service.js';
import { authenticateJWT } from '../../scripts/authenticateJWT.js';
import jwt from "jsonwebtoken";
// import {createStdioLogger} from "mongodb/src/mongo_logger.js";
import AppConfig from "../../configs/app.config.js";

export const authRouter = express.Router();

console.log("authRouter path: /auth");
authRouter.post(
    '/sign-in',
    celebrate(authSchema), // validate request body
    // passport.authenticate("local", {
    //     successRedirect: "/luck-rotation-page", // redirect to the secure profile section
    //     failureRedirect: "/sign-in-page", // redirect back to the signup page if there is an error
    //     failureFlash: true, // allow flash messages
    // }), // authenticate user
    async (req, res) => {
        try {
            // Get username and password from request body
            const { email, password } = req.body;
            // console.log("email: ", email);
            // console.log("password: ", password);
            // Get ip address
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            // Setup auth service
            const authController = new AuthService();
            // Login
            const result = await authController.checkUser(email, password, ip);
            if (result === null) {
                return res.status(401).json({message: "Username or password is incorrect"});
            }

            const accessTokenLife = AppConfig.access_token_life;
            const accessTokenSecret = AppConfig.access_token_secret;

            const accessToken = await authController.generateJWT(result.response._id, accessTokenSecret, accessTokenLife);

            if (!accessToken) {
                return res
                    .header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({message: "Đng nhập không thành công"});
            }

            let refreshToken = await authController.generateRefreshToken(result.response._id);

            if (!result.refreshToken) {
                await authController.updateRefreshToken(result.response._id, refreshToken);
            } else {
                refreshToken = result.refreshToken;
            }
            // Return result
            return res.header("Access-Control-Allow-Origin", "*").status(200).json({
                ...result,
                accessToken,
                refreshToken,
            });
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
);

authRouter.post(
    '/logout',
    passport.authenticate("local", {
        successRedirect: "/", // redirect to the secure profile section
        failureRedirect: "/", // redirect back to the signup page if there is an error
        failureFlash: true, // allow flash messages
    }), // authenticate user
    (req, res) => {
    // Logout
    req.logout();
    // Redirect to login page
    return res.redirect('/');
});


authRouter.post(
    "/sign-up",
    celebrate(registrySchema),
    async (req, res) => {
        const authController = new AuthService();
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userInsertData = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            phone: req.body.phone,
            // address: req.body.address,
            refresh_token: "",
            ip: ip,
            role: "USER",
            rotation_transaction: [],
        }

        const signUp = await authController.signup(userInsertData);
        // console.log("signUp: ", signUp);
        if (signUp.status === 400) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .send(JSON.stringify(signUp));
        }

        return res
            .header("Access-Control-Allow-Origin", "*")
            .status(200)
            .send(JSON.stringify(signUp));
    }
);

authRouter.get("/profile", authenticateJWT, async (req, res) => {
    try {
        const authController = new AuthService();
        const result = await authController.getProfile(req.user.id);
        if (result.status !== 200) {
            return res.status(400).json({message: result.message});
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

// get access token
authRouter.get(
    '/get-access-token',
    async (req, res) => {
    // Check user authenticated
    const accessTokenFromHeader = req.headers["x-access-token"];
    if (!accessTokenFromHeader) {
        return res.status(400).json({message: "Unauthorized - not found access token"});
    }

    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).json({message: "Unauthorized - not found refresh token"});
    }

    const accessTokenSecret = AppConfig.access_token_secret;
    const accessTokenLife = AppConfig.access_token_life;

    const authController = new AuthService();

    const decoded = authController.decodeToken(accessTokenFromHeader, accessTokenSecret);
    if (!decoded) {
        return res.status(400).json({message: "Unauthorized - access token is invalid"});
    }

    const userId = decoded.id;
    const user = await authController.getUserById(userId);
    if (!user) {
        return res.status(400).json({message: "Unauthorized - user not found"});
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).json({message: "Unauthorized - refresh token is invalid"});
    }

    // Create new access token
    const newAccessToken = await authController.generateJWT(userId, accessTokenSecret, accessTokenLife);
    if (!newAccessToken) {
        return res.status(400).json({message: "Unauthorized - create new access token failed"});
    }

    return res.status(200).json({accessToken: newAccessToken});

});

// passport.use(
//     "local",
//     new LocalStrategy(
//         {
//             passReqToCallback: true, // allows us to pass back the entire request to the callback
//         },
//         async (req, email, password, done) => {
//             console.log("email: ", email);
//             console.log("password: ", password);
//             await loginAttempt();
//
//             async function loginAttempt() {
//                 try {
//                     const { email, password } = req.body;
//                     const authController = new AuthService();
//                     const result = await authController.checkUser(email, password);
//                     if (result.status !== 200) {
//                         return done(null, false, { message: "Username or password is incorrect" });
//                     }
//                     return done(null, result);
//                 } catch (error) {
//                     return done(null, false, { message: error.message });
//                 }
//             }
//         }
//     )
// );


