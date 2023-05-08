const mongoos = require("mongoose");

const Schema = mongoos.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoos.model("User", Schema);
module.exports = User;
