import { rotationLuckRouter } from "../controller/rotation-luck/route.js";
import { authRouter } from "../controller/auth/route.js";

export default (app) => {
    app.use('/rotation-luck', rotationLuckRouter);
    app.use('/auth', authRouter);
}