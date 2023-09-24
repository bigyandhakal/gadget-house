const router = require("express").Router();
const UserController = require("./user.controller");
const secureAPI = require("../../utils/secure");

router.get("/", secureAPI(["admin"]), async(req, res, next)=>{
    try {
        const result = await UserController.list();
        return res.json({data: result, msg:"success"})
    } catch (error) {
        next(error)
    }
})

module.exports = router;
