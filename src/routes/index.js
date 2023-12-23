import { rotationLuckRouter } from "../controller/rotation-luck/route.js";
import { authRouter } from "../controller/auth/route.js";
import { ExcelServiceRouter} from "../controller/excel/route.js";
import { orderRouter } from "../controller/order/route.js";

export default (app) => {
    app.use('/rotation-luck', rotationLuckRouter);
    app.use('/auth', authRouter);
    app.use('/excel-service', ExcelServiceRouter);
    app.use('/order', orderRouter);
}