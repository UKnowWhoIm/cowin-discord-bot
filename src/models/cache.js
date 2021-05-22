import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    district: { type: Number, require: true, unique: true },
    data: { type:  Object, require: true }
});

export const CacheModel = mongoose.model("Cache", dataSchema);
