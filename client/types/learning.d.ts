/*
Types needed for Learning models
*/

export interface Course {
  name: string;
  slug: string;
  icon: string;
}

export interface AllCourseProps {
  name: string;
  slug: string;
  icon: string;
}

type CourseProps = {
  params: {
    courseID?: string;
  };
};

export interface Unit {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  content: Array<Article | Video>;
}

export interface UnitProps {
  title: string;
  contents: Array<string>;
}

export interface UnitListItemProps {
  title: string;
}

export interface Article {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  author: string;
}

export interface Video {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  link: string;
  author: string;
  description?: string;
}
