/* eslint-disable @typescript-eslint/no-var-requires */

import { randomBytes } from 'crypto';
import mongoose from 'mongoose';
import slugify from 'slugify';

import { connectDB } from './db';

import modelArticle from '../models/Learning/article';
import modelCourse from '../models/Learning/course';
import modelProgress from '../models/Learning/progress';
import modelUnit from '../models/Learning/unit';
import modelVideo from '../models/Learning/video';

import { Article, Video } from '../types/learning';

type MockArticle = {
  title: string;
  createdAt: string;
  image: string;
  author: string;
  text: string;
};

type MockVideo = {
  name: string;
  createdAt: string;
  videoID: string;
  author: string;
  description: string;
};

const slugifyConfig = {
  replacement: '-', // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: false, // strip special characters except replacement, defaults to `false`
  locale: 'en', // language code of the locale to use
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
};

const contentSlugs: string[] = [];

const convertDateStrToDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(+year, month - 1, +day);
};

const generateSlug = (input: string, type: 'article' | 'video') => {
  let slug = `${type}/${slugify(input, slugifyConfig)}`;
  while (contentSlugs.includes(slug))
    slug = `${type}/${slugify(input, slugifyConfig)}-${randomBytes(20)
      .toString('hex')
      .slice(0, 5)}`;
  contentSlugs.push(slug);
  return slug.split('/')[1];
};

const clearDB = async () => {
  await modelProgress
    .deleteMany({})
    .then(() => console.info('Progress Collection Erased! ❌'));
  await modelArticle
    .deleteMany({})
    .then(() => console.info('Article Collection Erased! ❌'));
  await modelVideo
    .deleteMany({})
    .then(() => console.info('Video Collection Erased! ❌'));
  await modelUnit
    .deleteMany({})
    .then(() => console.info('Unit Collection Erased! ❌'));
  await modelCourse
    .deleteMany({})
    .then(() => console.info('Course Collection Erased! ❌'));
};

const seedDB = async () => {
  console.info('Seeding Articles...');
  const mockArticles: MockArticle[] = require('../mock/articles.json');
  const processedArticles = mockArticles.map(
    ({ title, createdAt, image, author, text }) => {
      return {
        title: title.trim(),
        slug: generateSlug(title, 'article'),
        createdAt: convertDateStrToDate(createdAt),
        image: image.trim(),
        author: author.trim(),
        text: text.trim(),
      };
    }
  );

  await modelArticle
    .insertMany(processedArticles)
    .then((result: Article[]) => {
      console.info('Articles Seeded! ✅');
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });

  console.info('Seeding Videos...');
  const mockVideos: MockVideo[] = require('../mock/videos.json');
  const processedVideos = mockVideos.map(
    ({ name, createdAt, videoID, author, description }) => {
      return {
        name: name.trim(),
        slug: generateSlug(name, 'video'),
        createdAt: convertDateStrToDate(createdAt),
        videoID: videoID.trim(),
        author: author.trim(),
        description: description.trim(),
      };
    }
  );

  await modelVideo
    .insertMany(processedVideos)
    .then((result: Video[]) => {
      console.info('Articles Seeded! ✅');
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

connectDB().then(async () => {
  await clearDB()
    .then(() => console.info('----Database cleared----'))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

  await seedDB()
    .then(() => {
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
    });
});
