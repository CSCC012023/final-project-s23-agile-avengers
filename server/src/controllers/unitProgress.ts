import { Request, Response } from 'express';
import { modelUser } from '../models/Account/user';
import { modelProgress } from '../models/Learning/progress';

/**
 * Retrieves progress of all the units of a user
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 *
 * @return {Response} - Response Object with an Error or user Progress
 */
export const getUnitProgress = async (req: Request, res: Response) => {
  // Checks if userID is part of the query
  if (!req.query.userID)
    return res.status(400).send({ message: 'Missing UserAuthID' });

  const userAuthID = req.query.userID as string;

  const userDbID = await modelUser
    .findOne({ userID: userAuthID })
    .select('_id');
  if (!userDbID)
    return res.status(400).json({ message: 'userDatabaseID does not exist' });

  const userIdAsString = userDbID ? userDbID._id.toString() : null;

  const progress = await modelProgress
    .findOne({ userID: userIdAsString })
    .populate({
      path: 'units',
      populate: {
        path: 'unitID',
        model: 'Unit',
      },
    })
    .exec();
  if (!progress) return res.status(404).json({ message: 'Progress not found' });

  const unitProgress = progress.units;
  if (!unitProgress)
    return res.status(404).json({ message: 'Unit progress not found' });

  return res.status(200).json(unitProgress);
};
