import { Request, Response } from 'express';
import { connection } from 'mongoose';

import { modelUser } from '../models/Account/user';

export const postCreateUser = (req: Request, res: Response) => {
  modelUser
    .create(req.body)
    .then((data) => res.json({ message: 'user added successfully', data }))
    .catch((err) => {
      err.code === 11000
        ? res
            .status(400)
            .json({ message: 'User already exists', error: err.message })
        : res
            .status(400)
            .json({ message: 'Failed to add user', error: err.message });
    });
};
