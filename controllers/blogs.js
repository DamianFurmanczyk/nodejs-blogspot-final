const _ = require("lodash");
const mongoose = require("mongoose");
const post = mongoose.model("post");
const user = mongoose.model("user");

exports.gAddNewPost = (req, res) => {
  res.render("addPost");
};

exports.pAddPost = (req, res, next) => {
  let errCount = 0;
  const tagsRegex = /^(([A-Z]|[0-9]|[a-z]|\s)+,\s*)*([A-Z]|[0-9]|[a-z]| )+$/;

  _.map(req.body, val => {
    req.sanitizeBody(val);
  });

  req.body.date = Date.now();
  req.body._user = req.user.id;

  req.checkBody("title", "title field cannot be empty!").notEmpty();
  req.checkBody("content", "content field cannot be empty!").notEmpty();

  const errs = req.validationErrors();

  if (errs) {
    _.map(errs, err => {
      req.flash("error", err.msg);
      errCount++;
    });
  }

  if (!tagsRegex.test(req.body.tags) && req.body.tags.length > 0) {
    req.flash("error", "Wrong tags format");
    errCount++;
  }

  req.body.tags =
    req.body.tags !== "" ? req.body.tags.split(",").map(tag => tag.trim()) : [];

  if (errCount > 0) {
    return res.render("addPost", {
      flashes: req.flash(),
      post: req.body
    });
  }

  new post(req.body)
    .save()
    .then(newP => {
      res.redirect(`browse/blog/${req.user.id}`);
    })
    .catch(err => {
      req.flash("error", "Error during adding the post");
      console.log(err);

      return res.render("addPost", {
        flashes: req.flash()
      });
    });
};

exports.showBlog = async (req, res) => {
  const { userID } = req.params;

  const posts = await post.find({ _user: userID }).sort({ date: -1 });
  const owner = await user.findById(req.params.userID);

  console.log(posts);

  return res.render("blog", {
    posts,
    owner
  });
};

exports.showBlogs = async (req, res) => {
  const users = await user
    .find({ ispublic: true })
    .sort({ dateRegistered: -1 });

  res.render("blogs", {
    blogs: users
  });
};
