import { Request, Response } from 'express';

import modelArticle from '../models/Learning/article';
import modelCourse from '../models/Learning/course';
import modelUnit from '../models/Learning/unit';
import modelVideo from '../models/Learning/video';

import { Article, Unit, Video } from '../types/learning';

type PopulatedUnit = {
  name: String;
  slug: String;
  contents: Array<Article | Video | null>;
};

/**
 * Retrieves all Units related to a course
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
  let course = await modelCourse.findOne({ slug: courseSlug });

  // Check if course exists
  if (!course)
    return res.status(404).send({ message: 'Course does not exist.' });

  course = await course.populate('units');

  const units: PopulatedUnit[] = [];

  // Populate each unit with its contents
  for (const unitID of course.units) {
    const unit: Unit | null = await modelUnit.findById(unitID);
    if (unit)
      units.push({
        name: unit.name,
        slug: unit.slug,
        contents: await Promise.all(
          unit.content.map(async (id) => {
            const requiredFields = 'name slug contentType';
            const video: Video | null = await modelVideo
              .findById(id)
              .select(requiredFields);
            const article: Article | null = await modelArticle
              .findById(id)
              .select(requiredFields);
            return video ? video : article;
          }),
        ),
      });
  }

  // Return course information
  return res.status(200).json({
    name: course?.name,
    units: units,
  });
};
