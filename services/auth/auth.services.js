const bcrypt = require("bcrypt");

hashingPassword = async ({ password }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

verifyPassword = async ({ commingPassword, usersPassword }) => {
  const validPassword = await bcrypt.compare(commingPassword, usersPassword);
  return validPassword;
};

module.exports = {
  verifyPassword,
  hashingPassword
}