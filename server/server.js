const express = require("express");
const path = require("path");
const router = require("./router/subscribers");
const app = express();

clientPath = path.join(__dirname, "..", "client");

app.use(express.static(path.join(clientPath)));
app.use("/", router);
app.listen(3000, () => {
  console.log("running function");
});
