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

app.post("/articles", (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });

  newArticle.save((err) => {
    if (!err) {
      res.send("success add new article");
    } else {
      res.send(err);
    }
  });
});

app.delete("/articles", (req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send("succes delete all data");
    } else {
      res.send(err);
    }
  });
});

app.get("/", (req, res) => {
  console.log("hai");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
