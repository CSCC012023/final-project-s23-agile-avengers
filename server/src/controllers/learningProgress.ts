import { Request, Response } from 'express';
import { modelUser } from '../models/Account/user';

export const getLearningProgress = async (req: Request, res: Response) => {
  if (!req.query.userID) {
    return res.status(400).json({
      message: 'Please provide userID',
    });
  }

  const user = await modelUser.findOne({
    userID: req.query.userID,
  });
  if (!user) {
    return res.status(400).json({
      message: 'User not found with the given userID',
    });
  }
  res.send(user._id);
};
