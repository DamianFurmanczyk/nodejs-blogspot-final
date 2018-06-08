const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require('cors');
require("dotenv/config");
const user = mongoose.model("user");

// non-node_modules requires
const routes = require("./routes/routes");
const helpers = require("./shared/helpers");

const app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(cors());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressValidator());

app.use(cookieParser());

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// passport

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, function (email, password, done) {
  user
    .findOne({
      email
    }, function (err, user) {
      console.log("err appConfig passport");
      console.log(email);
      if (err) {
        console.log("err with passport, appConfig");
        console.log(err);
      }
      if (!user) {
        console.log("user not found passport, appConfig");
        return done(null, false);
      }
      return done(null, user);
    });
}));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// custom middleware

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  next();
});

// routes handling
app.use("/", routes);

module.exports = app;
