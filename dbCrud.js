import mongoose from "mongoose";
import { config } from "dotenv";

import { DataModel } from "./models/dataSchema";


config();

const url = process.env.MONGODB_SRV;
const db = process.env.DB_NAME;

const DISTRICT = "district";
const PIN = "pin";
const AGE = "age";
const NOTIFY = "notify";

async function getDBObject() {
    try {
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return { db: conn.db(db), conn: conn };
    } catch (error) {
        console.log(error);
    }
}

// help
async function createUser(
    user,
    district = "",
    pin = null,
    age = null,
    notify = false
) {
    const info = {
        userID: user.id,
        serverID: user.guild.id,
        district: district,
        pin: pin,
        age: age,
        notify: notify,
    };

    try {
        let dbObj = await getDBObject();
        let obj = await DataModel.create(info);
        obj.save();
        dbObj.conn.close();
        return String(obj.insertedId);
    } catch (error) {
        console.log(error);
    }
}

// check
async function readUserData(user) {
    try {
        let dbObj = await getDBObject();
        let obj = await DataModel.findOne({ userID: user.id });

        if (!obj) createUser(user);

        dbObj.conn.close();
        return obj;
    } catch (error) {
        console.log(error);
    }
}

// set
async function updateUserData(id, type, data) {
    let updateData = {};

    if (type === DISTRICT) updateData.district = data;
    if (type === PIN) updateData.pin = data;
    if (type === AGE) updateData.age = data;
    if (type === NOTIFY) updateData.notify = data;

    try {
        let dbObj = await getDBObject();
        await DataModel.findOneAndUpdate({ userID: id }, updateData, {
            upsert: true,
        });

        dbObj.conn.close();
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserData(id) {
    try {
        let dbObj = await getDBObject();
        await DataModel.deleteOne({ userID: id });
        dbObj.conn.close();
    } catch (error) {
        console.log(error);
    }
}

export { createUser, readUserData, updateUserData, deleteUserData };
