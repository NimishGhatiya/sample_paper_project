const express = require("express");
const cors = require("cors");
const samplePapers = require("./routes/samplePapers");
const classes=require("./routes/classesRoute")
const app = express();

app.use(cors('*'));
app.use(express.json());

app.use("/api/samplePapers",samplePapers );
app.use("/api",classes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

module.exports = app;
