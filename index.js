/**
 * main server file
 */

const app = require("express")();
const bodyParser = require("body-parser");
const routes = require("./routes/");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10MB" }));
app.use("/", routes);
app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + server.address().port);
});

process
  .on("uncaughtException", function(e) {
    console.log("uncaughtException: Node NOT Exiting..." + e);
  })
  .on("unhandledRejection", function(e) {
    console.log("uncaughtException: Node NOT Exiting..." + e);
  });

module.exports = app;
