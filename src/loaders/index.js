import expressLoader from './expressLoader.js';
import mongooseLoader from './mongooseLoader.js';

export default async function Loaders ({ expressApp }) {
    const mongoConnection = await mongooseLoader(process.env.MONGODB_URL);
    console.log('MongoDB Initialized');

    await expressLoader({ app: expressApp });
    console.log('Express Initialized');

    // ... more loaders can be here
}
