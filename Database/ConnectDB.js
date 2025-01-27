import mongoose from "mongoose";

export async function connectDB(mongodbUri,options) {
   await mongoose.connect(mongodbUri,options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
}


