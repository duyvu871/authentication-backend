import mongoose from 'mongoose';
import database from "../models/index.js";
import DB_CONFIG from "../configs/db.config.js";
// cons database = require("../models");
const Role = database.role;

export default async () => {

    try {
        const connection = await mongoose.connect(`${DB_CONFIG.URL}`, {
            // useNewUrlParser: true, // For deprecation warnings
            // useUnifiedTopology: true, // For deprecation warnings
            // useCreateIndex: true, // For deprecation warnings
            // useFindAndModify: false, // For deprecation warnings
            // useNewUrlParser: true,
        }).then((res) => {
            console.log("Connected to Database");
            // if (process.env.NODE_ENV === "development") {
            //     database.User.deleteMany({}).then(() => {
            //         console.log("Deleted all users");
            //     }).catch((err) => {
            //         console.log("Error deleting users", err);
            //     });
            // }

            initial();
            return res; // Return the connection
        });
        // console.log("connection", connection)
        return connection.connection.db; // Return the connection
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

// connect success create collection in database
function initial() {
    // the estimatedDocumentCount() function is used to count the number of documents in the collection.
    const documentCount = Role.estimatedDocumentCount({
        // name: {
        //     $in: ["user", "admin", "moderator"]
        // }
    });

    // console.log("documentCount", documentCount)
    // check if the collection is empty
    if (documentCount) {
        return false;
    } else {
        // create new collection
        Role.create({
            role_name: "user",
            permissions: [
                "read",
                "write",
                "delete"
            ]
        })

        Role.create({
            role_name: "moderator",
            permissions: [
                "read",
                "write"
            ]
        })

        Role.create({
            role_name: "admin",
            permissions: [
                "read",
                "write",
                "delete"
            ]
        })
    }

}