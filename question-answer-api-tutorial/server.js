const express = require("express");
const dotenv = require("dotenv");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const routers= require("./routers");
const connectDatabase = require("./helpers/database/connectDatabase");
const path = require("path");
dotenv.config({
    path:"./config/env/config.env"
});

// LOCALHOLST:5000/api/questions

//MongoDb Connection

connectDatabase();


const app = express();
//Express - Body -middleWare

app.use(express.json());

const PORT = process.env.PORT;


//routhers middleware

app.use("/api",routers);
//Error Handler
app.use(customErrorHandler);


// Static Files

app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT,()=>{
    console.log(`App Started On ${PORT}: ${process.env.NODE_ENV} `);

})