const router = require("express").Router();
const Controller = require("./category.controller");


router.get("/", async(req, res, next)=>{
    try {
        const {limit, page, name} = req.query;
        const search = {name}
        const result = await Controller.list(page, limit, search)
        res.json({data: result, msg:"success"});
    } catch (error) {
        next(error)
    }
})

router.post("/", async(req, res, next)=>{
    try {
        const result = await Controller.create(req.body)
        return res.json({data: result, msg:"success"})
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await Controller.getById(id, req.body)
        return res.json({data: result, msg:"success"})
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await Controller.updateById(id, req.body)
        return res.json({data: result, msg:"success"})
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await Controller.removeById(id)
        return res.json({data:result, msg:"success"})
    } catch (error) {
        next(error)
    }
})
module.exports = router;