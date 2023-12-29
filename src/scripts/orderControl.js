import {OrderService} from "../services/order.service.js";
import {responseTemplate} from "../ultis/responseWrapper.ultis.js";

export async function createOrder(req, res) {
    try {
        const userId = req.user_id;
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        const orderService = new OrderService();
        const lastOrder = await orderService.getLastOrderByUserID(userId);
        const orderID = lastOrder ? lastOrder.orderID : 0;
        const orderData = {
            result: orderService.getResult(),
            orderID: Number(orderID) + 1,
            amount: req.amount,
            ip: ip,
            balance_before: req.balance_before,
            balance_after: req.balance_after,
            from: userId,
            status: 'completed',
        }
        const result = await orderService.createOrder(orderData);
        return responseTemplate(res).status(200).json(result);
    } catch (error) {
        return responseTemplate(res).status(500).json({message: error.message});
    }
}