const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

//Hosting build
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.static("public"));

// Use the correct service names for the other services
app.use("/api/events", proxy("http://events:4001/"));
app.use("/api/scrape", proxy("http://scrape:4002/"));
app.use("/api/user", proxy("http://user:4003/"));

app.listen(4000, () => {
  console.log("Gateway Working on port 4000");
});
