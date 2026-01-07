import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add MONGODB_URI to your environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In development, use a global variable so we don’t create
// a new connection on every hot reload
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
