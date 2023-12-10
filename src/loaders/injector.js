import mongoose from "mongoose";


export function MongooseInjector(dependencyName) {
    // This is the decorator factory
    return (target, key, index) => {
        const connection = mongoose.connection; // This is the dependency
        target[key] = connection; // This is the injection
    }; // This is the decorator
}