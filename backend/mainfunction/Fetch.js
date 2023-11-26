const axios = require("axios");
const Article = require("../model/Data");
const generateUniqueArticleId = require("./uniuearticle");

async function fetchAndSaveData(page = 0, apiUrl, category = null) {
  try {
    // Fetch data from the News API for the current page
    const pageParam = page === 0 ? "" : `&page=${page}`;
    const hitUrl = `${apiUrl}${pageParam}`;
    const response = await axios.get(hitUrl);
    const newsData = response.data;
    const results = newsData.results;
    
    // Save the data for the current page to the database
    for (let i = 0; i < results.length; i++) {
      const articleId = await generateUniqueArticleId();
      const articleData = {
        article_id: articleId,
        title: results[i].title,
        keywords: results[i].keywords,
        creator: results[i].creator,
        description: results[i].description,
        content: results[i].content,
        pubDate: results[i].pubDate,
        image_url: results[i].image_url,
        country: results[i].country,
        category: category ? [category] : results[i].category,
        language: results[i].language,
      };
      const existingArticle = await Article.findOne({
        title: articleData.title,
      });
      if (!existingArticle) {
        try {
          const createdArticle = await Article.create(articleData);
        } catch (error) {
          if (error.code === 11000) {
            console.log(
              `Duplicate key error for article_id: ${articleData.article_id}. Skipping...`
            );
          } else {
            console.error(`Error saving article: ${error}`);
            throw error;
          }
        }
      } else {
        console.log(
          `Duplicate article found with title: ${articleData.title}. Skipping...`
        );
      }
    }

    // Check if there is a next page
    if (newsData.nextPage) {
      // If there is a next page, recursively fetch and save data for the next page
      await fetchAndSaveData(newsData.nextPage, apiUrl,category);
    } else {
      // If there are no more pages, return a response
      return { message: "All pages fetched and saved successfully" };
    }
  } catch (error) {
    console.error("Error fetching and saving data:", error);
    throw error;
  }
}
module.exports = fetchAndSaveData;
