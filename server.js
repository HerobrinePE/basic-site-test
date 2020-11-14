const express = require("express");
const app = express();
const fs = require("fs");
const api = require("covidapi");
const weather = require("weather-js");
const NewsAPI = require("newsapi");
const locate = require("ip-to-location");
var key = new NewsAPI("df48a88c18cf4a1c8e8178e43e3bd927");
let keys = [];
api.settings({
  baseUrl:
    "https://disease.sh" | "https://api.caw.sh" | "https://corona.lmao.ninja"
});
app.use(express.static("public"));
app.set("view engine", "html");
app.use(express.urlencoded());
app.use(express.json());

app.get("/", async (req, res) => {
  await res.sendFile(__dirname + "/views/index.html");
});

app.post("/", async (req, res) => {
  let ipData = await req.body;
  let ip = ipData.ipdata[0].split("ip=").slice(1)[0];
  locate.fetch(ip).then(async data => {
    await keys.push(data);
    console.log(data)
    console.log(ip)
  });
});
app.get("/news", (req, res) => {
  let jsp = [
    "covid",
    "covid news",
    "covid 19",
    "covid 19 news",
    "world health organization"
  ];
  let mat = jsp[Math.floor(Math.random() * jsp.length)];
  key.v2.everything({ q: mat, language: "en" }).then(async response => {
    res.json(response);
  });
});
setTimeout(() => {
  data();
}, 1000);
async function data() {
  await app.get("/weather", (req, res) => {
    weather.find({ search: keys[0].country_name, degreeType: "C" }, function(
      err,
      result
    ) {
      if (err) console.log(err);
      let resu = result[0];
      res.json(resu);
    });
  });
  await app.get("/covid", (req, res) => {
    api.countries({ country: keys[0].country_name }).then(val => {
      res.json(val);
      setTimeout(() => {
        keys.splice(0, keys.length);
        console.log(keys)
      }, 500);
    });
  });
}

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
