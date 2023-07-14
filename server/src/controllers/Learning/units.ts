import { Request, Response } from 'express';

import modelUser from '../../models/Account/user';
import modelArticle from '../../models/Learning/article';
import modelCourse from '../../models/Learning/course';
import modelProgress from '../../models/Learning/progress';
import modelUnit from '../../models/Learning/unit';
import modelVideo from '../../models/Learning/video';

import { Article, Unit, Video } from '../../types/learning';

import { createError } from '../../utils/error';
import { validateInput } from '../../utils/validate';

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
  try {
    const courseSlug = req.query.courseSlug as string;
    const { status, error } = validateInput('slug', courseSlug, 'courseSlug');

    if (!status) return res.status(400).json(error);

    let course = await modelCourse.findOne({ slug: courseSlug });

    if (!course)
      return res
        .status(404)
        .json(
          createError(
            'CourseDoesNotExist',
            `Failed to find Course with slug: ${courseSlug}`
          )
        );

    course = await course.populate('units');

    const units: PopulatedUnit[] = [];

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
            })
          ),
        });
    }

    return res.status(200).json({ name: course?.name, units });
  } catch (error) {
    res
      .status(500)
      .json(
        createError(
          'InternalServerError',
          'Failed to retrieve content for Course'
        )
      );
  }
};

/**
 * Retrieves progress for All Units for the User
 *
 * @param {Request} req - Must contain `userID` in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Empty
 */
export const getAllUnitProgress = async (req: Request, res: Response) => {
  if (!req.query.userID)
    return res.status(400).json({ message: 'Missing userID' });

  const userIDRegex = /^user_[A-z0-9]+/;
  if (!userIDRegex.test(req.query.userID as string))
    return res.status(400).json({ message: 'Invalid userID' });

  const user = await modelUser.findOne({
    userID: req.query.userID,
  });

  if (!user)
    return res.status(400).json({
      message: 'User not found with the given userID',
    });

  const learningProgress = await modelProgress
    .findOne({
      userID: user._id,
    })
    .populate({
      path: 'units',
      populate: {
        path: 'unitID',
        model: 'Unit',
      },
    })
    .select('units -_id');

  if (!learningProgress) return res.status(404).send({});

  const progressData = learningProgress?.units.map((unit: any) => {
    return {
      slug: unit.unitID.slug,
      progress: unit.progress,
    };
  });

  res.send(progressData);
};
