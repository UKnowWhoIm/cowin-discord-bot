import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    districtID: { type: Number, require: true, unique: true },
    districtName: { type: String, require: true },
    state: {type: String, require: true}
});

export const DistrictModel = mongoose.model("DistrictModel", dataSchema);