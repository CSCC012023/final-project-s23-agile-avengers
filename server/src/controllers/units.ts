import { Request, Response } from 'express';
import modelCourse from '../models/Learning/course';
import modelUnit from '../models/Learning/unit';
import { Course, Unit, Article, Video } from '../types/learning';
import { Types } from 'mongoose';
import modelArticle from '../models/Learning/article';
import modelVideo from '../models/Learning/video';


type PopulatedUnit = {
  name: String,
  contents: (Article | null)[],
}
type AllUnitsResponse = {
  name: String,
  units: PopulatedUnit,
} 

/*Retrieves an Article or Video based on the given content ID*/
const populateContent = async (contentId: Types.ObjectId):Promise<Article | Video | null> => {
   const video: Video | null = await modelVideo.findById(contentId);
   const article: Article | null = await modelArticle.findById(contentId);
   return video ? video : article;
}

/*Retrieves a course with the specified slug, populates its units with contents (Articles or Videos), 
and returns the course information*/
export const getCourse = async (req: Request, res: Response) => {
  const courseSlug = req.body.slug;

  // Check if slug parameter is missing
  if (!courseSlug) return res.status(422).send({ message: "Invalid parameter name: slug is missing" });
  
  // Verify slug using Regex (lowercase letters followed by a hyphen and three digits)
  const slugRegex = /^[a-z]+-\d{3}$/; 
  if (!slugRegex.test(courseSlug)) return res.status(400).send({message: "Invalid Course Slug"});

  // Find course with the specified slug
  const course = await modelCourse.findOne<Course>({ slug: courseSlug });

  // Check if course exists
  if (!course) return res.status(404).send({message: "Course Slug not found"})

  const unitId: Types.ObjectId[] = course.units;
  let units: PopulatedUnit[] = [];

  // Populate each unit with its contents
  for (let i = 0; i < unitId.length; i++) {
    const unit: Unit | null = await modelUnit.findById(unitId[i]);
    if (unit) {
      const populatedUnit: PopulatedUnit = {
        name: unit.name,
        contents: await Promise.all(unit.content.map(async (id) => await populateContent(id)))
        };
        units.push(populatedUnit);
      }
    };

  // Return course information
  return res.status(200).json({
    name: course?.name,
    units: units
  });

}