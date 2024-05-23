const express = require("express");
const errorHandler = require("./middleware/errorHanlder");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactroutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port, () => {
    console.log(`app working on ${port}`)
})