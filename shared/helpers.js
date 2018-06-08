const moment = require("moment");
const dump = msg => {
  return JSON.stringify(msg, undefined, 2);
};

const _ = require("lodash");

module.exports = {
  moment,
  dump,
  _
};
