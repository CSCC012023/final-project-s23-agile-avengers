
import { Schema, model } from "mongoose";
import { Course, Video, Article, Unit } from "./types/interface";

/*
The unit model from our database
*/
const UnitSchema = new Schema({
    name: {
        type: "String",
        required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
      immutable: true
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    content: [{ type: [Schema.Types.Mixed]}],
});


const modelUnit = model<Unit>("Unit", UnitSchema)
export default modelUnit;