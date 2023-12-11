import express from 'express';
import mongoose from 'mongoose';
import {celebrate} from 'celebrate';
import { authSchema, registrySchema } from './dto.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AuthService from '../../services/auth.service.js';
// import {createStdioLogger} from "mongodb/src/mongo_logger.js";

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
            // Return result
            return res.status(200).json(result).redirect('/home.html');
        } catch (error) {
            return res.status(500).json({message: error.message}).redirect('/sign-in-page');
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
            ip: ip,
            role: "USER",
            rotation_transaction: [],
        }


        const signUp = await authController.signup(userInsertData);
        console.log("signUp: ", signUp)
        if (signUp.status !== 400) {
            return res.status(400).redirect('/sign-up-page');
        }

        res.status(200).redirect('/sign-in-page');
    }
);

authRouter.get(
    '/session',
    passport.authenticate("local", {
        successRedirect: "/rotation-luck-page", // redirect to the secure profile section
        failureRedirect: "/login", // redirect back to the signup page if there is an error
        failureFlash: true, // allow flash messages
    }), // authenticate user
    (req, res) => {
    // Check user authenticated
    if (req.isAuthenticated()) {
        console.log(" -> authenticate success <-");
        // Check user role
        if (("ADMIN" === req.session._passport.user.name_role)) {
            console.log("[auth]: ", req.session._passport.user);
            // Redirect to product manager page
            return res.redirect("/product-manager");
        } else {
            // Redirect to game page
            return res.redirect('/rotation-luck-page');
        }
    } else {
        // Redirect to login page
        return res.redirect('/login');
    }
});

passport.use(
    "local",
    new LocalStrategy(
        {
            passReqToCallback: true, // allows us to pass back the entire request to the callback
        },
        async (req, email, password, done) => {
            console.log("email: ", email);
            console.log("password: ", password);
            await loginAttempt();

            async function loginAttempt() {
                try {
                    const { email, password } = req.body;
                    const authController = new AuthService();
                    const result = await authController.checkUser(email, password);
                    if (result.status !== 200) {
                        return done(null, false, { message: "Username or password is incorrect" });
                    }
                    return done(null, result);
                } catch (error) {
                    return done(null, false, { message: error.message });
                }
            }
        }
    )
);


