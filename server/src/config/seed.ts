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

import { Article } from '../types/learning';

type MockArticle = {
  title: string;
  createdAt: string;
  image: string;
  author: string;
  text: string;
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
      const [day, month, year] = createdAt.split('/').map(Number);
      let slug = slugify(title, slugifyConfig);
      while (contentSlugs.includes(slug))
        slug =
          slugify(title, slugifyConfig) +
          '-' +
          randomBytes(20).toString('hex').slice(0, 5);

      contentSlugs.push(slug);

      return {
        title: title.trim(),
        slug,
        createdAt: new Date(+year, month - 1, +day),
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
