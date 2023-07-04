import { Request, Response } from 'express';
import { modelProgress } from '../models/Learning/progress';

/*Retrieves progress of all the units of a user.
 */
export const getUnitProgress = async (req: Request, res: Response) => {
  const { userID } = req.body;
  const progress = await modelProgress.findOne({ userID });
  if (!progress) {
    return res.status(404).json({ message: 'Progress not found' });
  }
  const unitProgress = progress.units;
  if (!unitProgress) {
    return res.status(404).json({ message: 'Unit progress not found' });
  }
  return res.json(unitProgress);
  // res.json(progress);
};

/*Updates progress of a unit of a user when the user accesses a new content*/
export const putUnitProgress = async (req: Request, res: Response) => {

};
