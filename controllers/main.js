exports.getHomepage = (req, res) => {
  res.render("homepage", { title: "Welcome to blogspot" });
};
