const express = require("express");
const app = express();
const fs = require("fs");
const api = require("covidapi");
const weather = require("weather-js");
const NewsAPI = require("newsapi");
var key = new NewsAPI("df48a88c18cf4a1c8e8178e43e3bd927");
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
async function ait(){
await app.post("/", async (req, res) => {
  let js = await req.body;
  let ip = js.ip;
  let ct = await js.country_name
  console.log(js.country_name)
  await app.get("/news", (req, res) => {
    let jsp = ["covid", "covid news", "covid 19", "covid 19 news", "world health organization"]
    let mat = jsp[Math.floor(Math.random() * jsp.length)]
    key.v2.everything({ q: mat, language: "en" }).then(response => {
       res.json(response)
    });
  });
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
}
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
  ait()
});
