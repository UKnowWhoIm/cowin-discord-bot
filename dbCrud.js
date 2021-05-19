import { DataModel } from "./models/dataSchema.js";

const DISTRICT = "district";
const PIN = "pin";
const AGE = "age";
const NOTIFY = "notify";

// set
async function createUser(
    userID,
    district = "",
    pin = null,
    age = null,
    notify = false
) {
    const info = {
        userID: userID,
        district: district,
        pin: pin,
        age: age,
        notify: notify,
    };

    try {
        let obj = await DataModel.create(info);
        obj.save();
        return String(obj);
    } catch (error) {
        console.log(error);
    }
}

// check
async function readUserData(userID) {
    try {
        let obj = await DataModel.findOne(userID);

        return obj;
    } catch (error) {
        console.log(error);
    }
}

// set
async function updateUserData(userID, data) {
    const filter = { userID: userID };
    try {
        await DataModel.findOneAndUpdate(filter, data, { upsert: true });
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserData(userID) {
    try {
        await DataModel.deleteOne(userID);
    } catch (error) {
        console.log(error);
    }
}

export { createUser, readUserData, updateUserData, deleteUserData };
