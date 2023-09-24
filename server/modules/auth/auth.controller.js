const bcrypt = require("bcrypt");

const userModel = require("../users/user.model");
const authModel = require("./auth.model");
const { generateOTP, verifyOTP } = require("../../utils/otp");
const { mailer } = require("../../services/mail");
const { generateJWT } = require("../../utils/jwt");

const create = async (payload) => {
  const { password, roles, ...rest } = payload;
  if (
    password.length < 8 ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password)
  )
    throw new Error(
      "Password must be 8 characters long with at least one uppercase, lowercase and number"
    );
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  const token = generateOTP();
  await authModel.create({ email: payload.email, token });
  await mailer(payload.email, token);
  return await userModel.create(rest);
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");
  if (!user.isActive) throw new Error("User is blocked.");
  if (!user.isEmailVerified) throw new Error("Email not verified.");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Email or password invalid");
  // JWT token generate
  const payload = {email: user?.email, roles: user?.roles ?? []};
  const token = generateJWT(payload)
  return {token};
};

const verifyEmail = async (emailP, tokenP) => {
  // check email exist
  const user = await authModel.findOne({ email: emailP });
  if (!user) throw new Error("User not found");
  //  token validity
  const isValidToken = verifyOTP(tokenP);
  if (!isValidToken) throw new Error("Token invalid");
  // token compare
  const isValid = user.token === tokenP;
  if (!isValid) throw new Error("Token expired");
  // user isEmailVerified true
  await userModel.findOneAndUpdate(
    { email: emailP },
    { isEmailVerified: true },
    { new: true }
  );
  // authModel email doc delete
  await authModel.deleteOne({ email: emailP });
  return true;
};

const regenerateToken = async (email) => {
  const user = await authModel.findOne({ email });
  if (!user) throw new Error("User not found");
  const token = generateOTP();
  await authModel.create({ email }, { token }, {new:true});
  await mailer(email, token)
  return true;
};

module.exports = { create, login, verifyEmail, regenerateToken };
