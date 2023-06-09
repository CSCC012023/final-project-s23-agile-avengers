import { model, Schema } from "mongoose"
import { Article } from "./types/interface";

/*
The article model from our database
*/
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
});

const modelArticle = model<Article>('Article', ArticleSchema);
export default modelArticle;
