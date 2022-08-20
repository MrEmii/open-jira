import mongoose from 'mongoose';

/*
  Mongoose is a MongoDB object modeling tool designed to work in an
  asynchronous environment. Mongoose uses Callbacks which
  are an essential part of the Node.js event loop.

  * 0. Disconnect from the database
  * 1. Connect to the database
  * 2. Connecting to the database
  * 3. Disconnecting from the database
*/

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected) return;
  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected) return;

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  mongoConnection.isConnected = 1;
  console.log('MongoDB connected 🚀');
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;
  if (mongoConnection.isConnected === 0) return;
  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('MongoDB disconnected 😿');
};
