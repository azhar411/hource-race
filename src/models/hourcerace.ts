import * as mongoose from "mongoose";
import { model } from "mongoose";
const hourceRaceSchema = new mongoose.Schema({
  event: { type: String, required: false },
  horse: { type: Object, required: false },
  time: { type: Number, required: false },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("race", hourceRaceSchema);
