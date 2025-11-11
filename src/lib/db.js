import mongoose from 'mongoose';

const globalWithMongoose = global;

const cached = globalWithMongoose._mongooseConnection || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  globalWithMongoose._mongooseConnection = cached;
  return cached.conn;
}

export function disconnectFromDatabase() {
  if (cached.conn) {
    mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}
