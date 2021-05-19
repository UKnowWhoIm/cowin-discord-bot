import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    district: { type: String },
    pin: { type: Number },
    age: { type: Number },
    notify: { type: Boolean, default: false },
});

export const model = mongoose.model("DataModel", dataSchema);
