import mongoose from "mongoose";
import { config } from "dotenv";

config();

const url = process.env.MONGODB_SRV;

async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.log(error);
    }
}

start();
