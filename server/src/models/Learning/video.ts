import { model, Schema } from "mongoose"
import { Video } from "./types/interface";

/*
The video model from our database
*/
const VideoSchema = new Schema({
  title : {
    type: String,
    required: true
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
  link: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
})

const modelVideo = model<Video>("Video", VideoSchema)
export default modelVideo;