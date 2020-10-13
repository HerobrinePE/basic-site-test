const express = require("express");
const app = express();
const fs = require("fs");
const api = require("covidapi");
const weather = require("weather-js");

api.settings({
  baseUrl:
    "https://disease.sh" | "https://api.caw.sh" | "https://corona.lmao.ninja"
});
app.use(express.static("public"));
app.set("view engine", "html");
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.post("/", async (req, res) => {
  let js = req.body;
  let ip = js.ip;
  let ct = js.country_name;

  await app.get("/weather", (req, res) => {
    weather.find({ search: ct, degreeType: "C" }, function(err, result) {
      if (err) console.log(err);
      let resu = result[0];
      res.json(resu);
    });
  });
  await app.get("/covid", (req, res) => {
    api.countries({ country: ct }).then(val => {
      res.json(val);
    });
  });
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
