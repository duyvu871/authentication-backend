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
            const { username, password } = req.body;
            // console.log("email: ", email);
            // console.log("password: ", password);
            // Get ip address
            const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            // Setup auth service
            const authController = new AuthService();
            // Login
            const result = await authController.checkUser(username.trim(), password.trim(), ip);
            // console.log("result:", username.trim());
            if (result.status === 400) {
                return res.status(401).json({message: "Username or password is incorrect"});
            }

            const accessTokenLife = AppConfig.access_token_life;  // access token life
            const accessTokenSecret = AppConfig.access_token_secret; // access token secret

            // access token
            const accessToken = await authController.generateJWT(
                result.response._id,
                result.response.role,
                accessTokenSecret,
                accessTokenLife
            );
            // console.log("accessToken: ", accessToken)
            // check access token
            if (!accessToken) {
                return res
                    .header("Access-Control-Allow-Origin", "*")
                    .status(400)
                    .json({message: "Đăng nhập không thành công"});
            }

            let refreshToken;

            if (!result.response.refresh_token) {
                // create new refresh token
                refreshToken = await authController.generateRefreshToken(result.response._id, AppConfig.jwtSecret);
                // console.log("refreshToken: ", refreshToken)
                await authController.updateRefreshToken(result.response._id, refreshToken);
            } else {
                refreshToken = result.response.refresh_token;
            }
            // console.log("refreshToken: ", refreshToken)

            // Return result
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(200)
                .json({
                    ...result,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });
        } catch (error) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(500)
                .json({message: error.message});
        }
    }
);

authRouter.post(
    '/logout',
    authenticateJWT,
    (req, res) => {
    const authController = new AuthService();
    // Redirect to login page
    return res.redirect('/');
});


authRouter.post(
    "/sign-up",
    celebrate(registrySchema),
    async (req, res) => {
        const authController = new AuthService();
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        const userInsertData = {
            email: req.body.email || "abc@gmail.com",
            password: req.body.password,
            username: req.body.username,
            phone: req.body.phone || "0123456789",
            balance: 1000000,
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

authRouter.post("/profile", authenticateJWT, async (req, res) => {
    try {
        // console.log("req.user_id: ", req.user_id)
        const authController = new AuthService();
        const result = await authController.getUserById(req.user_id);
        if (result.status !== 200) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({...result});
        }
        return res
            .header("Access-Control-Allow-Origin", "*")
            .status(200)
            .json(result);
    } catch (error) {
        return res
            .header("Access-Control-Allow-Origin", "*")
            .status(500)
            .json({...error});
    }
});

// get access token
authRouter.get(
    '/get-access-token',
    async (req, res) => {
    // Check user authenticated
        const accessTokenFromHeader = req.headers["x-access-token"];
        if (!accessTokenFromHeader) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({message: "Unauthorized - not found access token"});
        }

        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({message: "Unauthorized - not found refresh token"});
        }

        const accessTokenSecret = AppConfig.access_token_secret;
        const accessTokenLife = AppConfig.access_token_life;

        const authController = new AuthService();

        const decoded = authController.decodeToken(accessTokenFromHeader, accessTokenSecret);
        if (!decoded) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({message: "Unauthorized - access token is invalid"});
        }

        const userId = decoded.id;
        const user = await authController.getUserById(userId);
        if (!user) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({message: "Unauthorized - user not found"});
        }

        if (refreshTokenFromBody !== user.refreshToken) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({message: "Unauthorized - refresh token is invalid"});
        }

        // Create new access token
        const newAccessToken = await authController.generateJWT(userId, accessTokenSecret, accessTokenLife);
        if (!newAccessToken) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({message: "Unauthorized - create new access token failed"});
        }

        return res
            .header("Access-Control-Allow-Origin", "*")
            .status(200)
            .json({accessToken: newAccessToken});
    }
);

authRouter.post('/update/update-password', authenticateJWT, async (req, res) => {
    try {
        const authController = new AuthService();
        // const userData = await authController.getUserById(req.user_id);
        // const refreshToken = userData.response.refresh_token;
        const result = await authController.updatePassword(req.user_id, req.body.updatedPassword);
        if (result.status !== 200) {
            return res
                .header("Access-Control-Allow-Origin", "*")
                .status(400)
                .json({...result});
        }
        return res
            .header("Access-Control-Allow-Origin", "*")
            .status(200)
            .json(result);
    } catch (error) {
        return res
            .header("Access-Control-Allow-Origin", "*")
            .status(500)
            .json({...error});
    }
});


