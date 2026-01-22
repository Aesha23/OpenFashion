const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    email: "a@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
