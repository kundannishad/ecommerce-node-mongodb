const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dotEnv =require("dotenv").config();
const PORT = process.env.PORT || 4000
const {dbConnect} = require('./config/dbConnect') 
const userAuthRoute = require('./routes/userRoute');
const { notFound, errHnadler } = require('./middlewares/errorHandler');

dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/api/user",userAuthRoute)

app.use(notFound);
app.use(errHnadler);

app.listen(PORT,()=>{ 
    console.log(`server is running at ${PORT}`);
}) 