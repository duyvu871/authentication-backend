import OrderModel from "../../models/order.model.js";
import mongoose from "mongoose";


export class OrderService {
    constructor() {
        this.orders = [];
        this.OrderModel = OrderModel;
    }
    addOrder(order) {
        const newOrder = new this.OrderModel(order);
        return newOrder.save();
    }

    getAllOrders() {
        return this.OrderModel.find();
    }
    getOrdersByUserID(from) {
        return this.OrderModel.find({from: from});
    }
    getOrdersByUserIDAndStatus(from, status) {
        return this.OrderModel.find({from: from, status: status});
    }
    getOrdersByStatus(status) {
        return this.OrderModel.find({status: status});
    }
    getOrders() {
        return this.OrderModel.find();
    }
    getOrderList() {
        return this.OrderModel.find().populate('from');
    }

    getLastOrderByUserID(id) {
        return this.OrderModel.findOne({from: id}).sort({createdAt : -1});
    }
    createOrder(order) {
        const orderData = {
            orderID: order.orderID,
            from: order.from,
            result: order.result,
            time: order.time,
            status: order.status,
        }
        const newOrder = new this.OrderModel(orderData);
        return newOrder.save();
    }

    getResult(id) {
        return 41112;
    }
}