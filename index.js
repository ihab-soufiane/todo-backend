const express = require("express");
require("./db/connect");

const logger = require("./middlewares/logger");
const { errorHandler, notFound } = require("./middlewares/errors");
const dotenv = require("dotenv");
dotenv.config();
const helmet =require("helmet");
const path =require("path");
const cors=require("cors");

//init app
const app = express();

//port 
const port = process.env.PORT || 3000;
//apply midlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger)

//helmet
app.use(helmet());
//cors
app.use(cors());
//set view engine
app.set('view engine', 'ejs');
app.use("/getimage",express.static('./uploads'));
    //Routes
app.use("/api/todos", require("./routers/todos"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/users",require("./routers/users"));
app.use("/password",require("./routers/password"));
app.use("/api/upload",require("./routers/upload"));
app.use("/api/hotels", require("./routers/hotels"));
app.use("/api/voitures", require("./routers/voitures"))
//Error Handler Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server is running in ${process.env.NODE_ENV} on port ${port}!`));