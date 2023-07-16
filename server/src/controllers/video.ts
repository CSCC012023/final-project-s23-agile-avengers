import { Request, Response } from 'express';
import { Video } from '../types/learning';

import { modelUser } from '../models/Account/user';
import modelCourse from '../models/Learning/course';
import { modelProgress } from '../models/Learning/progress';
import modelUnit from '../models/Learning/unit';
import modelVideo from '../models/Learning/video';

/**
 * Retrives a Video with a matching `slug`
 *
 * @param {Request} req - Must contain `videoSlug` in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Error or Video
 */
export const getVideoBySlug = async (req: Request, res: Response) => {
  // Checks if the field `videoSlug` is included in the query
  if (!req.query.videoSlug)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "videoSlug".' });

  const video = await modelVideo.findOne<Video>({ slug: req.query.videoSlug });

  return !video
    ? res.status(404).send({ message: 'Not Found: Video does not exist.' })
    : res.status(200).json({ video: video });
};

/**
 * Retrives the progress of a video with 'videoId' and 'user'
 *
 * @param {Request} req - Must contain `videoId` and 'user' in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Error or Video Progress value
 */
export const getVideoProgress = async (req: Request, res: Response) => {
  // Checks if the field `videoID` is included in the query
  if (!req.query.userID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "userID".' });

  if (!req.query.videoID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "videoID".' });

  const user = await modelUser.findOne({ userID: req.query.userID });
  if (!user) return res.status(404).json({ message: 'user not found' });

  const video = await modelVideo.findOne({ videoId: req.query.videoID });
  if (!video) return res.status(404).json({ message: 'video not found' });

  const progress = await modelProgress
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
    });

  // const progressObj = progress.toObject();
  // if (checkIfVideoExists(video._id, progress)) {
  //   const progressPercentageCurrent = progressObj.videos.find((elem) => elem.videoID.toString() == video._id.toString()).progressPercent;
  // }

  return res.status(200).json({ progress });
};

/**
 * Checks if a video exists in the progress of a user
 * @param {Types.ObjectId} videoId Video ID
 * @param {LearningProgress} progress Progress object for the user
 * @return {Boolean}

const checkIfVideoExists = (
  videoId: Types.ObjectId,
  progress: LearningProgress
) => {
  for (let i = 0; i < progress.videos.length; i++)
    if (progress.videos[i].videoID !== videoId) return true;
  return false;
}; */

// // eslint-disable-next-line require-jsdoc
// const checkIfUnitExists = (unitId: Types.ObjectId, progress: LearningProgress) => {

//   for (let i = 0; i < progress.units.length; i++)
//     if (progress.units[i].unitID !== unitId)
//       return true;
//   return false;
// }

// // eslint-disable-next-line require-jsdoc
// const checkIfCourseExists = (courseId: Types.ObjectId, progress: LearningProgress) => {

//   for (let i = 0; i < progress.courses.length; i++)
//     if (progress.courses[i].courseID !== courseId)
//       return true;
//   return false;
// }

/**
 * Retrives the progress of a video with 'videoId' and 'user'
 *
 * @param {Request} req - Must contain `videoId` and 'user' in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Error
 */
export const updateVideoProgress = async (req: Request, res: Response) => {
  // Checks if the field `videoID` is included in the query
  if (!req.body.userID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "userID".' });

  if (!req.body.videoID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "videoID".' });

  if (!req.body.videoProgressPercent)
    return res.status(400).json({
      message: 'Invalid Request: Missing field "videoProgressPercent".',
    });

  const progressPercentageCurrent: number = parseFloat(
    req.body.videoProgressPercent.toString()
  );
  const user = await modelUser.findOne({ userID: req.body.userID });
  if (!user) return res.status(404).json({ message: 'user not found' });

  const video = await modelVideo.findOne({ _id: req.body.videoID });
  if (!video) return res.status(404).json({ message: 'video not found' });

  const progress = await modelProgress.findOne({
    userID: user._id,
  });

  const parentUnit = await modelUnit.findOne({
    content: { $all: [video._id.toString()] },
  });
  if (!parentUnit)
    return res.status(404).send({ message: 'Does not have parent Unit' });
  const parentCourse = await modelCourse.findOne({
    units: { $all: [parentUnit._id] },
  });
  if (!parentCourse)
    return res.status(404).send({ message: 'Does not have parent Course' });

  if (!progress) {
    const completed = progressPercentageCurrent >= 70 ? 1 : 0;
    // eslint-disable-next-line new-cap
    const newCreation = new modelProgress({
      userID: user._id,
      courses: [
        {
          courseID: parentCourse._id,
          progress: completed,
        },
      ],
      units: [
        {
          unitID: parentUnit._id,
          progress: completed,
        },
      ],
      videos: [
        {
          videoID: video._id,
          progressPercent: progressPercentageCurrent,
          isComplete: progressPercentageCurrent >= 70,
        },
      ],
    });
    await newCreation.save();
    return res.send(newCreation);
  }
  const indexVideo = progress.videos.findIndex(
    (elem) => elem.videoID.toString() == video._id.toString()
  );
  const indexUnit = progress.units.findIndex(
    (elem) => elem.unitID.toString() == parentUnit._id.toString()
  );
  const indexCourse = progress.courses.findIndex(
    (elem) => elem.courseID.toString() == parentCourse._id.toString()
  );
  console.log(
    progressPercentageCurrent >= 70 &&
      ((indexVideo != -1 && !progress.videos[indexVideo].isComplete) ||
        indexVideo == -1)
  );
  const isJustComplete =
    progressPercentageCurrent >= 70 &&
    ((indexVideo != -1 && !progress.videos[indexVideo].isComplete) ||
      indexVideo == -1);
  const increment = isJustComplete ? 1 : 0;
  // eslint-disable-next-line new-cap
  const updatedObject = new modelProgress({
    _id: progress._id,
    userID: user._id,
    courses:
      indexCourse !== -1
        ? progress.courses.map((elem) => {
            return elem.courseID.toString() != parentCourse._id.toString()
              ? elem
              : { ...elem, progress: elem.progress + increment };
          })
        : [
            ...progress.courses,
            {
              courseID: parentCourse._id,
              progress: 1,
            },
          ],
    units:
      indexUnit !== -1
        ? progress.units.map((elem) => {
            return elem.unitID.toString() != parentUnit._id.toString()
              ? elem
              : { ...elem, progress: elem.progress + increment };
          })
        : [
            ...progress.units,
            {
              unitID: parentUnit._id,
              progress: 1,
            },
          ],
    videos:
      indexVideo !== -1
        ? progress.videos.map((elem) => {
            return elem.videoID.toString() == video._id.toString()
              ? {
                  ...elem,
                  progressPercent: progressPercentageCurrent,
                  isComplete: isJustComplete,
                }
              : elem;
          })
        : [
            ...progress.videos,
            {
              videoID: video._id,
              progressPercent: progressPercentageCurrent,
              isComplete: isJustComplete,
            },
          ],
  });
  updatedObject.isNew = false;
  await updatedObject?.save();
  return res.send(updatedObject);

  /* if (checkIfVideoExists(video._id, progress)) {
    const progressObj = progress.toObject();
    const updatedObject = new modelProgress({
      ...progressObj,
      videos: progressObj.videos.map((elem) => {
        if (elem.videoID.toString() != video._id.toString()) return elem;
        elem.progressPercent = progressPercentageCurrent;
        return elem;
      }),
    });

    const newObj = await modelProgress.updateOne(
      { userID: user._id },
      updatedObject
    );
    return res.send(newObj);
  }

  const newProgressVideo: VideoProgress = {
    videoID: video._id,
    progressPercent: progressPercentageCurrent,
  };
  const updatedObject = {
    ...progress,
    videos: [...progress.videos, newProgressVideo],
    courses: [],
  };

  const newObj = await modelProgress.updateOne(
    { userID: user.id },
    updatedObject
  );
  return res.send(200).json(newObj);*/
};
