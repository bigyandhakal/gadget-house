const router = require("express").Router();
const userRouter = require("../modules/users/user.route")
const authRouter = require("../modules/auth/auth.route")
const categoryRouter = require("../modules/categories/category.route")
const productRouter = require("../modules/products/product.route")
const orderRouter = require("../modules/orders/order.route")

router.get("/", ({ req, res, next }) => {
  res.json({ data: "", msg: "API working" });
});

router.use("/auth", authRouter)
router.use("/users", userRouter)

router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/orders", orderRouter)

router.all("*", ({ req, res, next }) => {
  try {
    res.status(404).json({ data: "", msg: "Page not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
