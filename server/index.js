require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const indexRouter = require('./routes');
const PORT = +process.env.PORT || 5000;
const cors = require("cors")

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database connected")
})

app.use(cors());

app.use(express.json());
app.use("/", indexRouter);


app.use((err, req, res, next)=>{
    err = err ? err.toString() : "Something went wrong";
    res.status(500).json({data: "", msg:err})
})

app.listen(PORT, ()=>{
    console.log(`App runing on port ${PORT}`)
})
