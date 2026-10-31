const express = require("express");
const mongoose = require("mongoose");
const app = express()
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.error("MongoDB connection failed:", error.message));

app.get("/",(req,res) => {
    res.send("HELLO");
    res.end()
})

app.listen(process.env.PORT || 8000,() => {
    console.log("SERVER IS RUNNING ON PORT 8000");
})