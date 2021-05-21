import express from 'express';
import mongoose from "mongoose";
import { job } from "./cron.js";
import cron from "node-cron";   
import { DEBUG, mongoURL } from "./config.js";

const app = express();
const port = process.env.PORT ?? "3000";

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

app.get('/', (_, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// In debug mode send notif every minute
cron.schedule(DEBUG ? "* * * * *" : "0 * * * *", () => {
    console.log("Starting notifications");
    job();
});

import "./discord.js";
