const express = require("express");
const passport = require("passport");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const middleware = require("../middleware");

const mainC = require("../controllers/main");
const usersC = require("../controllers/users");
const blogsC = require("../controllers/blogs");
const emailC = require("../controllers/email");

router.get('/email', emailC.emailRender);
router.post('/email', emailC.postEmail);

router.get("/", mainC.getHomepage);

router.get("/register", usersC.gregister);
router.post("/register", usersC.usernameToLowerCase, usersC.valReg, usersC.register2DB, usersC.authUser);

router.get("/logout", middleware.isLogged, usersC.logout);
router.get("/login", usersC.login);
router.post("/login", usersC.usernameToLowerCase, usersC.authUser);

router.get("/editAccount", middleware.isLogged, usersC.showEditAccount);
router.post("/editAccount", middleware.isLogged, usersC.updateAccountDetails);

// blogs

router.get("/newPost", middleware.isLogged, blogsC.gAddNewPost);
router.post("/addPost", middleware.isLogged, blogsC.pAddPost, blogsC.showBlog);

router.get("/browse", blogsC.showBlogs);
router.get("/browse/blog/:userID", blogsC.showBlog);
router.get("/blog/:userID", blogsC.showBlog);

module.exports = router;
