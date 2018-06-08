exports.isLogged = (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You need to log in first");
    return res.render("homepage", {
      flashes: req.flash()
    });
  }
  next();
};
