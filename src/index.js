const express = require("express");
const cors = require("cors");

const port = process.env.PORT;
const managerRouter = require("./routers/managerRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(managerRouter);

app.listen(port, () => console.log("Server connected, port:", port));