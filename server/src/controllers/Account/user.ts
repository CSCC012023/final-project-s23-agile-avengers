import { Request, Response } from 'express';

import { MongoServerError } from 'mongodb';

import { WebhookEvent } from '@clerk/clerk-sdk-node';

import modelUser from '../../models/Account/user';

/**
 * Add User to Database
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 *
 * @return {Response} - Response Object with an Error or Success
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body as WebhookEvent;

    if (type === 'user.created') {
      await modelUser.create({ userID: data.id });
      return res.status(201).json({ message: 'User created successfully!' });
    }
    res.status(404).json({ error: 'UnknownEvent', message: 'Unknown Event' });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000)
      // error code 11000 : duplicate entry
      res
        .status(400)
        .json({ error: 'DuplicateUserID', message: error.message });
    else
      res.status(500).json({
        error: 'InternalServerError',
        message: 'Failed to Add New User',
      });
  }
};
