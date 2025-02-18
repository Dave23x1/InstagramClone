import { MongoClient } from "mongodb";

// MongoDB connection URI
const client = new MongoClient(process.env.MONGODB_URI);

let database;
let clientPromise; // Declare clientPromise

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to persist the connection across requests
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection each time
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  if (!database) {
    database = client.db("mongo_db"); // Replace 'mongo_db' with your actual database name
  }
  return { client, database };
}
