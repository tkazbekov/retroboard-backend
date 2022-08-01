import *  as mongodb from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: { boards?: mongodb.Collection, notes?: mongodb.Collection } = {};

export const connectToDatabase = async () => {
    dotenv.config();

    const client: mongodb.MongoClient = new mongodb.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongodb.Db = client.db(process.env.DB_NAME);

    const boardsCollection: mongodb.Collection = db.collection(process.env.BOARDS_COLLECTION_NAME);

    const notesColleciton: mongodb.Collection = db.collection(process.env.NOTES_COLLECTION_NAME);

    collections.boards = boardsCollection;

    collections.notes = notesColleciton;

    console.log(`Database "${db.databaseName}" connected successfully`);
}