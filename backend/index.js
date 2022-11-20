const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

const app = express();
app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())
app.use(morgan("common"))
const port = 8000

dotenv.config()
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("Connected to Mongo");
})

//routes
app.use("/v1/user",userRoute)

app.listen(port, () => {
    console.log("Conneted successfully");
})

