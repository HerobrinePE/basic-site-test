///rt("Note if you did not get results refresh the page")

$.getJSON("https://ipapi.co/json/", async function(data) {
  let pa = await JSON.stringify(data);
  
 await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: pa
  });
});

            
data();
async function data() {
  await fetch("/covid").then(async res => {
    await res.json().then(va => {
      document.getElementById("covid").innerHTML = `${va.country}`;
      document.getElementById(
        "csd"
      ).innerHTML = `Covid cases for ${va.country}`;
      let ee = (document.getElementById(
        "pop"
      ).innerHTML = `population(${va.population})`);
      document.getElementById("data").innerHTML = `total Cases|${va.cases}|`;
      document.getElementById(
        "data1"
      ).innerHTML = `Cases today |${va.todayCases}|`;
      document.getElementById("data2").innerHTML = `Deaths |${va.deaths}|`;
      document.getElementById(
        "data3"
      ).innerHTML = `Deaths Today |${va.todayDeaths}|`;
      document.getElementById(
        "data4"
      ).innerHTML = `Recoveries |${va.recovered}|`;
      document.getElementById(
        "data5"
      ).innerHTML = `Recoveries Today |${va.todayRecovered}|`;
      document.getElementById("data6").innerHTML = `Active |${va.active}|`;
      document.getElementById("data7").innerHTML = `Critical |${va.critical}|`;
      let title = document.getElementById("titles");
      title.innerHTML = va.country + " Covid Cases " + va.cases;
      document.getElementById("country").src = va.countryInfo.flag;
    });
  });
  await fetch("/weather").then(async res => {
    await res.json().then(val => {
      document.getElementById("Weather").src = val.current.imageUrl;
      document.getElementById("WD").innerHTML =
        "Weather Data for " + val.location.name;
      document.getElementById("date").innerHTML =
        val.forecast[0].day + " " + val.current.date;
      document.getElementById("cdata").innerHTML =
        "Temperature |" +
        val.current.temperature +
        "°" +
        val.location.degreetype +
        "|";
      document.getElementById("cdata1").innerHTML =
        "Today's Condition |" + val.forecast[0].skytextday + "|";
      document.getElementById("cdata2").innerHTML =
        "Current conditions |" + val.current.skytext + "|";
      document.getElementById("cdata3").innerHTML =
        "Humidity |" + val.current.humidity + "%|";
      document.getElementById("cdata4").innerHTML =
        "Precipitation |" + val.forecast[0].precip + " mm|";
      document.getElementById("cdata5").innerHTML =
        "WindDisplay |" + val.current.winddisplay + "|";
    });
  });
  await fetch("/news").then(async res => {
    await res.json().then(val => {
      let data = val.articles;

      let i = 0;
      for (i in data) {
        let con = data[i];
        let settings = `
<p>Name:  ${con.source.name}  <br /> Author:${con.author}<br \> Published at ${con.publishedAt}</p> 
<br />
<h5>Title:   ${con.title} <br \><br \> Description: ${con.description}<h5>
<a href="${con.url}"><img style="width:75%;" src="${con.urlToImage}"><a>
      <hr style="width:100%;text-align:left;margin-left:0" />

`;
        let doc = document.createElement("div")
        doc.innerHTML=settings
        document.getElementById("list").appendChild(doc)
        
      }
      
    });
  });
}
