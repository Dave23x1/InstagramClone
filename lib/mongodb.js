import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

let database;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  if (!database) {
    database = client.db("mongo_db");
  }
  return { client, database };
}
