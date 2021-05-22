import { CacheModel } from "./models/cache.js";
import { DataModel } from "./models/dataSchema.js";
import { DistrictModel } from "./models/district.js";

// set
export async function createUser(userID, userData) {
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
export async function readUserData(userID) {
    try {
        let obj = await DataModel.findOne({ userID: userID });

        return obj;
    } catch (error) {
        console.log(error);
    }
}

// set
export async function updateUserData(userID, data) {
    const filter = { userID: userID };
    try {
        await DataModel.findOneAndUpdate(filter, data, { upsert: true });
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUserData(userID) {
    try {
        await DataModel.deleteOne(userID);
    } catch (error) {
        console.log(error);
    }
}

export async function getUsersByFilter(filter) {
    try {
        let obj = await DataModel.find(filter);

        return obj;
    } catch (error) {
        console.log(error);
    }
}

export async function getDistricts() {
    try {
        return await DistrictModel.find({});
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCachedDistricts() {
    try {
        return await CacheModel.find({});
    } catch (error) {
        console.log(error);
    }
}

export async function getCachedDistrict(districtId) {
    try {
        return await CacheModel.findOne({ district: districtId });
    } catch (error) {
        console.log(error);
    }
}

export async function createCacheDistrict(data) {
    try {
        let obj = await CacheModel.create(data);
        await obj.save();
    } catch (error) {
        console.log(error);
    }
}

export async function bulkCreateCacheDistrict(data) {
    try {
        await CacheModel.insertMany(data);
    } catch (error) {
        console.log(error);
    }
}

export async function clearCache() {
    try {
        await CacheModel.deleteMany({});
    } catch (error) {
        console.log(error);
    }
}
