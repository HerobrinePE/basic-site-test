var xhr = new XMLHttpRequest();
$.getJSON("https://ipapi.co/json/", async function(data) {
  let pa = JSON.stringify(data);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: pa
  });
  $("comms").append(pa.org)
});


fetch("/covid").then(res => {
  res.json().then(va => {
    let ele = document.getElementById("covid").innerHTML =`${va.country}`
    let ee = document.getElementById("pop").innerHTML =`population(${va.population})`     
    document.getElementById("data").innerHTML =`total Cases{${va.cases}}`
    document.getElementById("data1").innerHTML =`Cases today{${va.todayCases}}`
    document.getElementById("data2").innerHTML =`Deaths {${va.deaths}}`
    document.getElementById("data3").innerHTML =`Deaths Today {${va.todayDeaths}}`
    document.getElementById("data4").innerHTML =`Recoveries {${va.recovered}}`
    document.getElementById("data5").innerHTML =`Recoveries Today {${va.todayRecovered}}`
    document.getElementById("data6").innerHTML =`Active {${va.active}}`
    document.getElementById("data7").innerHTML =`Critical {${va.critical}}`
    let title = document.getElementById("titles");
    title.innerHTML=va.country+" Covid Cases "+ va.cases;
    document.getElementById("country").src = va.countryInfo.flag
  })
});
