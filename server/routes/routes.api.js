const router = require("express").Router();

router.get("/", ({req, res, next})=>{
    res.json({data:"", msg:"API working"})
})

router.all("*", ({req, res, next})=>{
    res.status(404).json({data:"", msg:"Page not found"})
})

module.exports = router;