import { DataModel } from "./models/dataSchema.js";

const DISTRICT = "district";
const PIN = "pin";
const AGE = "age";
const NOTIFY = "notify";

// set
async function createUser(
    username,
    userDiscriminator,
    district = "",
    pin = null,
    age = null,
    notify = false
) {
    const info = {
        username: username,
        userDiscriminator,
        userDiscriminator,
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
async function readUserData(username, userDiscriminator) {
    try {
        let obj = await DataModel.findOne({
            username: username,
            userDiscriminator: userDiscriminator,
        });

        return obj;
    } catch (error) {
        console.log(error);
    }
}

// set
async function updateUserData(username, userDiscriminator, data) {
    const filter = { username: username, userDiscriminator: userDiscriminator };
    try {
        await DataModel.findOneAndUpdate(filter, data, { upsert: true });
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserData(username, userDiscriminator) {
    try {
        await DataModel.deleteOne(username, userDiscriminator);
    } catch (error) {
        console.log(error);
    }
}

export { createUser, readUserData, updateUserData, deleteUserData };
