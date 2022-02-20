const bcrypt = require("bcrypt");

const SALT_ROUNDS = process.env.SALT_ROUNDS;
// const HASH_KEY = process.env.HASH_KEY;

exports.getHashedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    return error;
  }
};

exports.isPasswordMatch = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    return error;
  }
};
