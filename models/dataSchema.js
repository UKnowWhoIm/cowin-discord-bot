import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    username: { type: String, require: true },
    userDiscriminator: { type: String, require: true },
    district: { type: String },
    pin: { type: Number },
    age: { type: Number },
    notify: { type: Boolean, default: false },
});

export const DataModel = mongoose.model("DataModel", dataSchema);
