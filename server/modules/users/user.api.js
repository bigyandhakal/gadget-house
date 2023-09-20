const router = require("express").Router();
const UserController = require("./user.controller");

router.post("/", async (req, res, next) => {
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

module.exports = router;
