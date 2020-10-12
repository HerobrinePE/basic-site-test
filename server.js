// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const ap = [];
const express = require("express");
const app = express();
const fs = require("fs");
const parse = require("node-html-parser").parse;
const api = require("covidapi")
api.settings({
    baseUrl: 'https://disease.sh' | 'https://api.caw.sh' | 'https://corona.lmao.ninja'
})
// our default array of dreams

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.set("view engine", "html");
// https://expressjs.com/en/starter/basic-routing.html

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function(req, res) {
  let js = req.body;
  let ip = js.ip;
  let ct = js.country_name;
  let format = `{"${ct}":"${ip}"}` + "\n";
  console.log(format);
  fs.writeFile("./logging.json", format, err => {
    if (err) console.log(err);
  });
  app.get("/covid", (req, res)=>{
    api.countries({country:ct}).then(val =>{
      res.json(val)
      console.log(val)
    })
  })
});
// send the default array of dreams to the webpage
// express helps us take JS objects and send them as JSON

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
