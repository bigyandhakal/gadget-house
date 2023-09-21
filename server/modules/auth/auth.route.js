const router = require("express").Router();
const UserController = require("./auth.controller");

router.post("/register", async (req, res, next) => {
  try {
    const result = await UserController.create(req.body);
    return res.json({ data: result, msg: "success" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email or password is missing");
    const result = await UserController.login(email, password);
    return res.json({ data: result, msg: "success" });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", async (req, res, next) => {
  try {
    const { email, token } = req.body;
    if (!email || !token) throw new Error("Email or token is missing");
    const result = await UserController.verifyEmail(email, token);
    return res.json({ data: result, msg: "success" });
  } catch (error) {
    next(error);
  }
});

router.get("/regenerate", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is missing");
    const result = await UserController.regenerateToken(email);
    return res.json({ data: result, msg: "success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
