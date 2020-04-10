const express = require("express");
const server = express();
const projectRouter = require("./data/routers/projectRouter");
const actionRouter = require("./data/routers/actionRouter");

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);


server.get("/", (req, res) => {
  res.send(`<h2>Node Sprint Challenge 1</h2>`);
});

function logger(req, res, next) {
    console.log(`logger: ${req.method} to ${req.originalUrl}`);
    next();
  }

module.exports = server;