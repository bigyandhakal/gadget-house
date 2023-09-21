const router = require("express").Router();
const userRouter = require("../modules/users/user.route")
const authRouter = require("../modules/auth/auth.route")

router.get("/", ({ req, res, next }) => {
  res.json({ data: "", msg: "API working" });
});

router.use("/auth", authRouter)
router.use("/users", userRouter)

router.all("*", ({ req, res, next }) => {
  try {
    res.status(404).json({ data: "", msg: "Page not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
