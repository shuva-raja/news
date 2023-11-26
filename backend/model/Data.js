const mongoose = require("mongoose");

// Define the schema for your data
const articleSchema = new mongoose.Schema({
  article_id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    unique: true,
  },
  keywords: [String],
  creator: [String],
  description: String,
  content: String,
  pubDate: Date,
  image_url: String,
  country: [String],
  category: [String],
  language: String,
});

// Create a model using the schema
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
