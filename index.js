import mongoose from "mongoose";
import { config } from "dotenv";
import { job } from "./cron.js";
import cron from "node-cron";   

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

cron.schedule("* * * * *", () => {
    console.log("Starting notifications");
    job();
});

import "./discord.js";
