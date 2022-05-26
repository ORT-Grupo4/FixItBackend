const express = require("express");
//db connection
const cors = require("cors");
const { dbConnection } = require("./src/database/config");
const { application } = require("express");
require("dotenv").config();

//Server creation
const app = express();
dbConnection();


app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/auth", require("./src/routes/auth"));

app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});
