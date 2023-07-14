import { Request, Response } from 'express';

import modelVideo from '../../models/Learning/video';

import { Video } from '../../types/learning';

import { createError } from '../../utils/error';
import { validateInput } from '../../utils/validate';

/**
 * Retrieves a Video with a matching `videoSlug`
 *
 * @param {Request} req - Must contain `videoSlug` in query
 * @param {Response} res - Response Object
 *
 * @return {Promise} Response Object with an Error or Video
 */
export const getVideoBySlug = async (req: Request, res: Response) => {
  try {
    const videoSlug = req.query.videoSlug as string;
    const { status, error } = validateInput('slug', videoSlug, 'videoSlug');

    if (!status) return res.status(400).json(error);

    const video = await modelVideo
      .findOne<Video>({
        slug: videoSlug,
      })
      .select('-slug -contentType');

    if (video) return res.status(200).json(video);

    res
      .status(404)
      .json(
        createError(
          'VideoDoesNotExist',
          `Failed to find Video with slug: ${videoSlug}`
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(createError('InternalServerError', 'Failed to Retrieve Video'));
  }
};