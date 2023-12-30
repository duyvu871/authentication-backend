import OrderModel from "../../src/models/order.model.js";
import {CollectionModel, CollectionTimeModal} from "../models/collection.model.js";
import AppConfig from "../configs/app.config.js";

export class OrderService {
    constructor() {
        this.orders = [];
        this.OrderModel = OrderModel;
        this.collection = CollectionModel;
        this.collectionTime = CollectionTimeModal;

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

    createCollection(collection) {
        const collectionData = {
            result: collection.result,
            totalBet: collection.totalBet,
            totalBetFee: collection.totalBetFee,
            totalBetWin: collection.totalBetWin,
            timeStart: collection.timeStart,
            timeEnd: collection.timeEnd,
            status: collection.status,
        }
        const newOrder = new this.collection(collectionData);
        return newOrder.save();
    }
    async createCollectionTime(start, end) {
        if (start > end) {
            return {
                message: 'Start time must be less than end time'
            };
        }
        if (!this.collectionTime.findOne()) {
            return {
                message: 'Collection time already exist'
            };
        }
        const collectionTimeData = {
            timeStart: start || new Date().getTime(),
            timeEnd: end || new Date().getTime() + AppConfig.wait_time, // 30 minutes
        }
        const collectionTime = new this.collectionTime(collectionTimeData);
        // const  = await this.collectionTime.findOne();
        return await collectionTime.save();
    }

    async updateCollectionTime(start, end) {
        if (start > end) {
            return {
                message: 'Start time must be less than end time'
            };
        }
        if (start && end) {
            const collectionTimeData = await this.collectionTime.findOne();
            collectionTimeData.timeStart = new Date();
            collectionTimeData.timeEnd = new Date() + AppConfig.wait_time;
        }
        const collectionTimeData = await this.collectionTime.findOne();
        collectionTimeData.timeStart = start;
        collectionTimeData.timeEnd = end;
        return await collectionTimeData.save();
    }

    async getCollectionTime() {
        return this.collectionTime.findOne();
    }

    async getAllCollectionByTimeRange(){
        const collectionTimeData = await this.collectionTime.findOne();
        const collectionTime = new Date()
        console.log("start: ", collectionTimeData.timeStart)
        return this.collection.find({
            createdAt: {
                $gte: new Date(collectionTimeData.timeStart).toISOString(), //new Date('2021-05-01T00:00:00.000Z'),
                $lte: new Date(collectionTimeData.timeEnd).toISOString() //new Date('2021-05-31T00:00:00.000Z')
            }
        });
    }
}