const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      console.log(err);
    }
  });
});

app.get("/", (req, res) => {
  console.log("hai");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
