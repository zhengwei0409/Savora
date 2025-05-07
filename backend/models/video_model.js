const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  embedUrl: String,
  title: String,
  author: String,
  views: String,
  publishedDate: String,
  description: String,
});

module.exports = mongoose.model("Video", videoSchema);