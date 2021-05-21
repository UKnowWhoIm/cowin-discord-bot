import mongoose from "mongoose";
import { job } from "./cron.js";
import cron from "node-cron";   
import { DEBUG, mongoURL } from "./config.js";

async function start() {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.log(error);
    }
}

start();
if(DEBUG)
    console.log("DEBUG Mode");

// In debug mode send notif every minute
cron.schedule(DEBUG ? "* * * * *" : "0 * * * *", () => {
    console.log("Starting notifications");
    job();
});

import "./discord.js";
