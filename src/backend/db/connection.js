"use server";

import mongoose from "mongoose";

const globalRef = globalThis;

if (!globalRef._mongooseConnection) {
  globalRef._mongooseConnection = { conn: null, promise: null };
}

const cached = globalRef._mongooseConnection;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

