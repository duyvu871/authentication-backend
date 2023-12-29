import express from 'express';
import mongoose from 'mongoose';
import {celebrate} from 'celebrate';
import { CreditRecharge } from './dto.js';
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
import CreditService from '../../services/credit.service.js';
import { authenticateJWT, checkAdminRole } from '../../scripts/authenticateJWT.js';
import jwt from "jsonwebtoken";
// import {createStdioLogger} from "mongodb/src/mongo_logger.js";
import AppConfig from "../../configs/app.config.js";

const creditRouter = express.Router();

creditRouter.post('/recharge-by-admin', checkAdminRole, (req, res) => {
    const uid = req.user_id;
    const {amount, rechargeFor} = req.body;

    const creditService = new CreditService();

})