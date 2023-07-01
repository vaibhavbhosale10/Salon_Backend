const express = require("express"); //npm i express
const bodyParser = require("body-parser"); //npm i body-parser
const cors = require("cors"); //npm i cors
require("dotenv").config(); //npm i dotenv
require("./v1/Models/DataBase");

const app = express();
app.use(cors());
app.use(express.static("Uploads"));
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-accessToken, x-refreshToken");
  next();
});

app.use(bodyParser.json());

const port = process.env.PORT || 9090;

app.use("/api/users", require("./v1/Routes/User-Route"));
app.use("/api/auth", require("./v1/Routes/Auth-Route"));
app.use("/api/appointments", require("./v1/Routes/Appointment-Route"));
app.use("/api/resumes", require("./v1/Routes/Resume-Route"));
app.use("/api/contacts", require("./v1/Routes/Contact-Route"));
app.use("/api/admin", require("./v1/Routes/Admin-Route")); //create admin
app.use("/api/adminAuth", require("./v1/Routes/Admin-Auth-Route")); //admin auth

app.listen(port, () => console.log(`Server is listening on ${port}`));
