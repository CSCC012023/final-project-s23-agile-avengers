import { Types } from 'mongoose';

/*
Types needed for Learning models
*/
export interface Article {
  title: String;
  slug: String;
  createdAt: Date;
  updatedAt: Date;
  image?: String;
  author: String;
  contentType: String;
}

export interface Video {
  title: String;
  slug: String;
  createdAt: Date;
  updatedAt: Date;
  link: String;
  author: String;
  description?: String;
  contentType: String;
}

export interface Unit {
  name: String;
  slug: String;
  createdAt: Date;
  updatedAt: Date;
  content: [Types.ObjectId];
  model_type: String;
}

export interface Course {
  name: String;
  slug: String;
  icon: String;
  units: [Types.ObjectId];
}
