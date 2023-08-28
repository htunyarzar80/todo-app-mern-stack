const exprees = require("express");
const app = exprees();
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
var cors = require("cors");
const bodyParser = require("body-parser")


const todoRoutes = require("./routes/todoRoutes")

//database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(morgan("dev"))
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cors());
app.use("/api",todoRoutes)

const port = process.env.PORT || 8181;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})