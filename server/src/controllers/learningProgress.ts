import { Request, Response } from 'express';
import { modelUser } from '../models/Account/user';
import { modelProgress } from '../models/Learning/progress';

/*

*/
/**
 * Endpoint to get a user's learning progress from their userId
 *
 * @param {ObjectId} userIdId  - clerk userId of user
 *
 * @return {Promise} LearningProgress with courses and units populated
 */
export const getLearningProgress = async (req: Request, res: Response) => {
  if (!req.query.userID)
    return res.status(400).json({
      message: 'Please provide userID',
    });

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
      path: 'courses',
      populate: {
        path: 'courseID',
        model: 'Course',
      },
    })
    .populate({
      path: 'units',
      populate: {
        path: 'unitID',
        model: 'Unit',
      },
    })
    .exec();

  if (!learningProgress) return res.send({});
  res.send(learningProgress);
};
