import { DataModel } from "./models/dataSchema.js";
import { DistrictModel } from "./models/district.js";

// set
async function createUser(userID, userData) {
    const info = {
        userID: userID,
        district: userData.district,
        pin: userData.pin,
        age: userData.age,
        notify: userData.notify,
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
        let obj = await DataModel.findOne({"userID": userID});

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

async function getUsersByFilter(filter){
    try {
        let obj = await DataModel.find(filter);

        return obj;
    } catch (error) {
        console.log(error);
    }
}

async function getDistricts(){
    try {
        return await DistrictModel.find({});
    }catch(error){
        console.log(error);
    }
}

export { createUser, readUserData, updateUserData, deleteUserData, getDistricts, getUsersByFilter };
