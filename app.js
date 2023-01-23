const express  = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const routes = require("./routes/Routes");


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors());
app.use("/", routes);




module.exports =  app