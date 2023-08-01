import { Request, Response } from 'express';

import modelArticle from '../../models/Learning/article';

import { Article, Unit } from '../../types/learning';

import modelCourse from '../../models/Learning/course';
import modelUnit from '../../models/Learning/unit';
import { Course } from '../../types/learning';
import { createError } from '../../utils/error';
import { validateInput } from '../../utils/validate';

/**
 * Retrieves an Article with a matching `slug`
 *
 * @param {Request} req - Must contain `articleSlug` in query
 * @param {Response} res - Response Object
 *
 * @return {Promise} Response Object with an Error or Article
 */
export const getArticleBySlug = async (req: Request, res: Response) => {
  try {
    const articleSlug = req.query.articleSlug as string;
    const { status, error } = validateInput('slug', articleSlug, 'articleSlug');

    if (!status) return res.status(400).json(error);

    const article = await modelArticle.findOne<Article>({
      slug: articleSlug,
    });

    if (article) return res.status(200).json(article);

    res
      .status(404)
      .json(
        createError(
          'ArticleDoesNotExist',
          `Failed to find Article with slug: ${articleSlug}`,
        ),
      );
  } catch (error) {
    res
      .status(500)
      .json(createError('InternalServerError', 'Failed to retrieve Article'));
  }
};

export const getUnitFromArticle = async (article: Article) => {
  try{
    const unit = await modelUnit.findOne<Unit>({content: article._id});
    return unit;
  } catch(error){
    console.error("Cannot retrieve unit from article!")
  }
}

export const getCourseFromUnit = async (unit: Unit) => {
  try{
    const course = await modelCourse.findOne<Course>({units: unit._id});
    return course;
  } catch(error){
    console.error('Cannot retrieve course from unit!');
  }
}

export const getFavouriteArticles = async (req: Request, res: Response) => {
  try {
    const favouriteArticles = await modelArticle.find<Article>({isFavourited: true});
    console.log('Fav art:', favouriteArticles)

    const data: any = []
    if(favouriteArticles){
      console.log('here1');
      favouriteArticles.map(async (itemArticle:Article) => {
        console.log('here2')
        try{
          const unit = await getUnitFromArticle(itemArticle);
          if(unit){
            const course = await getCourseFromUnit(unit);
            if(unit){
              data.push({
              article: itemArticle,
              courseSlug: course?.slug
             })
            }
          }
        } catch(error){
          res
          .status(500)
          .json(createError('InternalServerError', 'Failed to retrieve relevant details from each article!'));
        }
      })
      console.log('data:', data)
      res.status(200).json(data);
    } else{
      res
          .status(500)
          .json(createError('InternalServerError', 'Failed to retrieve relevant details from each article!'));
    }
  
  } catch(error) {
    res
    .status(500)
    .json(createError('InternalServerError', 'Failed to retrieve Favourite Articles'));
  }
};