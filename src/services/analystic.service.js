import mongoose from 'mongoose';


export class AnalystService {
    private databaseURl = 'mongodb://localhost:27017/analyst-service';
    private Services = [];
    constructor() {
        // create database for each service
        this.MongooseDB = mongoose.connect(
            this.databaseURl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
    }

    async createAnalystServiceComponent(serviceName = "service" + this.Services.length + 1) {
        try {
            const analystComponent = new AnalystServiceComponent(this.databaseURl, serviceName);
            this.Services.push(analystComponent);
            return analystComponent
        } catch (error) {
            return error;
        }
    }
}

export class AnalystServiceComponent {

    databaseURl = 'mongodb://localhost:27017/analyst-service';
    constructor(analystServiceUrl, serviceName) {
        const databaseURl = `${analystServiceUrl}/${serviceName}`;
        // create database for this service
        this.MongooseDB = mongoose.connect(
            this.databaseURl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

    }

    setDatabase(databaseURl) {
        this.databaseURl = databaseURl;
    }

    wrapper(payload = {}, handleData = () => {}) {
        try {
            // get keys and values from payload
            const keys = Object.keys(payload);
            // get values from payload
            const values = Object.values(payload);
            const data = handleData(payload);
            // create database for each service
            const result = this.MongooseDB.create({
                keys,
                values,
                data
            });

            return (id, condition) => {
                // modified data
                // const
                // save data to database

            }
        } catch (error) {
            return error;
        }
    }



    static generateTimeStamps() {
        return new Date().getTime();
    }

    static generateToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }



}