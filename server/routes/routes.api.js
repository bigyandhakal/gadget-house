const router = require("express").Router();
const userRouter = require("../modules/users/user.api")

router.use("/users", userRouter)

router.get("/", ({ req, res, next }) => {
  res.json({ data: "", msg: "API working" });
});

router.all("*", ({ req, res, next }) => {
  try {
    res.status(404).json({ data: "", msg: "Page not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
