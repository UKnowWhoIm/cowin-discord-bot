import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    userID: { type: Number, require: true },
    district: { type: String },
    pin: { type: Number },
    age: { type: Number },
    notify: { type: Boolean, default: false },
});

export const DataModel = mongoose.model("DataModel", dataSchema);
