import { model, Schema } from "mongoose"
import { Course } from "./types/interface";

/*
The course model from our database
*/
const CourseSchema = new Schema<Course>({
  name: {
      type: "String",
      required: true,
  },
  icon: {
    type: String,
    required: true
  },
  units: [{
    type: Schema.Types.ObjectId,
    ref: 'Unit'
  }],

});

const modelCourse = model<Course>("Course", CourseSchema)
export default modelCourse;