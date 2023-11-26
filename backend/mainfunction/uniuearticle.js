const Article = require('../model/Data');

const generateUniqueArticleId = () => {
  return new Promise(async (resolve, reject) => {
    let articleId;
    let existingArticle;

    do {
      articleId = Math.random().toString(36).substring(7);
      existingArticle = await Article.findOne({ article_id: articleId });
    } while (existingArticle);

    resolve(articleId);
  });
};


module.exports = generateUniqueArticleId;
