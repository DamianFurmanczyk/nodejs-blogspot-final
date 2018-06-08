const mongoose = require("mongoose");
require("dotenv/config");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLABS);

mongoose
  .connection
  .on("error", err => {
    console.error(`☠☠☠☠☠
        ☠☠☠☠☠
        ☠☠☠☠☠error occured during connecting to db: \n >${err.message}
        ☠☠☠☠☠
        ☠☠☠☠☠
        ☠☠☠☠☠`);
  });

require("./models/user");
require("./models/post");

const app = require("./appConfig");

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`⏩ PORT  ${server.address().port} ⏪`);
  console.log(`⏩ PORT  ${server.address().port} ⏪`);
  console.log(`⏩ PORT  ${server.address().port} ⏪`);
});
