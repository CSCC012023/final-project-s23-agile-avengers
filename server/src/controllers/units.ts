import { Request, Response } from 'express';
import { Types } from 'mongoose';

import modelArticle from '../models/Learning/article';
import modelCourse from '../models/Learning/course';
import modelUnit from '../models/Learning/unit';
import modelVideo from '../models/Learning/video';

import { Article, Course, Unit, Video } from '../types/learning';

type PopulatedUnit = {
  name: String;
  slug: String;
  contents: Array<Article | Video | null>;
};

/**
 * Retrieves an Article/Video
 *
 * @param {ObjectId} contentId  - ID of Article/Video Object
 *
 * @return {Promise} Video/Article or null
 */
const populateContent = async (
  contentId: Types.ObjectId
): Promise<Article | Video | null> => {
  const requiredFields = 'name slug contentType -_id';
  const video: Video | null = await modelVideo
    .findById(contentId)
    .select(requiredFields);
  const article: Article | null = await modelArticle
    .findById(contentId)
    .select(requiredFields);
  return video ? video : article;
};

/**
 * Retrives all Units related to a course
 *
 * @param {Request} req - Must contain `courseSlug` in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Error or All Units
 */
export const getAllUnitsBySlug = async (req: Request, res: Response) => {
  // Checks if courseSlug is part of the query
  if (!req.query.courseSlug)
    return res.status(400).send({ message: 'Missing courseSlug.' });

  const courseSlug = req.query.courseSlug as string;

  // Verify slug using Regex (lowercase letters followed by a hyphen)
  const slugRegex = /^[a-z0-9-]+$/;
  if (!slugRegex.test(courseSlug))
    return res.status(400).send({ message: 'Invalid courseSlug.' });

  // Find course with the specified slug
  const course = await modelCourse.findOne<Course>({ slug: courseSlug });

  // Check if course exists
  if (!course)
    return res.status(404).send({ message: 'Course does not exist.' });

  const unitID: Array<Types.ObjectId> = course.units;
  const units: Array<PopulatedUnit> = [];

  // Populate each unit with its contents
  for (let i = 0; i < unitID.length; i++) {
    const unit: Unit | null = await modelUnit.findById(unitID[i]);
    if (unit)
      units.push({
        name: unit.name,
        slug: unit.slug,
        contents: await Promise.all(
          unit.content.map(async (id) => await populateContent(id))
        ),
      });
  }

  // Return course information
  return res.status(200).json({
    name: course?.name,
    units: units,
  });
};
