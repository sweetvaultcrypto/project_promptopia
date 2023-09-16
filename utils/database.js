import mongoose from 'mongoose';

let isConnected = false; //track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "sharePrompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDB Connected');
    } catch (error) {
        console.log('Error Connecting to MongoDB', error);
        
    }
}

