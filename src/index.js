import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";
import { job } from "./cron.js";
import cron from "node-cron";
import { DEBUG, mongoURL } from "./config.js";

const app = express();
const port = process.env.PORT ?? "3000"; // jshint ignore:line

async function start() {
    try {
        await mongoose.connect(mongoURL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.log(error);
    }
}

start();
if (DEBUG) console.log("DEBUG Mode");

const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line

app.use(express.static(__dirname + "/public"));
app.get("/", (_, res) => {
    res.sendFile(join(__dirname + "/index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// In debug mode send notif every minute
cron.schedule(DEBUG ? "*/5 * * * *" : "*/15 * * * *", () => {
    console.log("Starting notifications");
    job();
},
{
    "timezone": "Asia/Kolkata"
}
);

import "./discord.js";
