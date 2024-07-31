const express = require("express");
const cookieParser = require("cookie-parser");
const careerRoute = require("./routes/career.route");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use("/login", loginRoute);

app.listen(4000, () => {
  console.log(`server is running in port ${4000}`);
});
