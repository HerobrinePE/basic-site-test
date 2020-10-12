// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const fs = require("fs")
const parse = require('node-html-parser').parse;

// our default array of dreams

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.set('view engine', 'html');
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
  
});
app.use(express.urlencoded());
app.use(express.json());

app.post('/', function(req, res){
  let js = req.body
  let ip = js.ip
  let ct = js.country_name
  let format = `{"${ct}":"${ip}"}`
  console.log(format)
  fs.writeFile("./logging.json", format , (err)=>{
    if(err) console.log(err)
  })
  fs.readFile('./views/index.html', 'utf8', (err,html)=>{
   if(err){
      throw err;
   }

   const root = parse(html);

   const body = root.querySelector('body');
   body.appendChild(`<p>${ct}</p>`);

   console.log(root.toString()); // This you can write back to file!
 });
});
// send the default array of dreams to the webpage
  // express helps us take JS objects and send them as JSON

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
