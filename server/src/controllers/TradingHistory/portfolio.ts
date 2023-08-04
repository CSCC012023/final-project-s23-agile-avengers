import { Request, Response } from 'express';

import modelUser from '../../models/Account/user';
import modelPortfolio from '../../models/Trading/portfolio';
import { createError } from '../../utils/error';
import { validateUserID } from '../../utils/validate';

/**
 * Retrieves all Courses
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 *
 * @return {Promise} Response Object with an Error or portfolio of user
 */
export const getPortfolio = async (req: Request, res: Response) => {
  const userID = req.query.userID as string;
  const { status, error } = validateUserID(userID);

  if (!status) return res.status(400).json(error);

  const user = await modelUser.findOne({ userID: userID });
  //
  if (!user)
    return res
      .status(404)
      .json(
        createError(
          'UserDoesNotExist',
          `User with ID: ${userID} does not exist`,
        ),
      );
  const portfolio = await modelPortfolio.findOne({
    userID: user._id,
  });
  if (portfolio == null) return res.status(400).send({});

  return res.send(portfolio);
};
