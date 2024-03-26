const express = require("express");
const cors = require("cors");
const router = require("./router/router");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
