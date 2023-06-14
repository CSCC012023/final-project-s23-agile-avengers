/*
Types needed for Learning models
*/

export interface Course {
  name: String;
  icon: String;
  units: Array<Unit>;
}

export interface Unit {
  name: String;
  createdAt: Date;
  updatedAt: Date;
  content: Array<Article | Video>;
}

export interface UnitProps {
  title: String;
  contents: Array<String>;
};

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
