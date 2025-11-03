require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const userRoute = require('./routes/userRoute')
const cors = require("cors");
const connectToDb = require("./db/db");

connectToDb();

app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users',userRoute)

app.get('/',(req,res)=>{
    res.send("Welcome");
})


module.exports = app;