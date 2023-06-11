import { Types } from 'mongoose';

/*
Types needed for Learning models
*/
export interface Article {
  title: String;
  createdAt: Date;
  updatedAt: Date;
  image?: String;
  author: String;
}

export interface Video {
  title: String;
  createdAt: Date;
  updatedAt: Date;
  link: String;
  author: String;
  description?: String;
}

export interface Unit {
  name: String;
  createdAt: Date;
  updatedAt: Date;
  content: [Types.ObjectId];
  model_type: String;
}

export interface Course {
  [x: string]: any;
  image: any;
  name: String;
  icon: String;
  units: [Types.ObjectId];
}
