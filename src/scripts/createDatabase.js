import MongoCli from 'mongodb';

const MongoClient = MongoCli.MongoClient;

export default class Mongo {
  constructor() {
    this.db = null;
  }

  async connect() {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = client.db(process.env.MONGO_DB);
  }

  async getCollection(collectionName) {
    if (!this.db) {
      await this.connect();
    }
    return this.db.collection(collectionName);
  }

  async insert(collectionName, data) {
    const collection = await this.getCollection(collectionName);
    return collection.insertOne(data);
  }

  async update(collectionName, query, data) {
    const collection = await this.getCollection(collectionName);
    return collection.updateOne(query, { $set: data });
  }

  async delete(collectionName, query) {
    const collection = await this.getCollection(collectionName);
    return collection.deleteOne(query);
  }

  async find(collectionName, query) {
    const collection = await this.getCollection(collectionName);
    return collection.find(query).toArray();
  }

  async findOne(collectionName, query) {
    const collection = await this.getCollection(collectionName);
    return collection.findOne(query);
  }
}