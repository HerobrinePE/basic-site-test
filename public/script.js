var xhr = new XMLHttpRequest();
$.getJSON("https://ipapi.co/json/", async function(data) {
  let pa = JSON.stringify(data);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: pa
  });
});
fetch("/covid").then(res => {
  res.json().then(va => {
   // alert(JSON.stringify(va, null, 2));
    let ele = document.getElementById("covid");
    ele.innerHTML = "Cases " + va.cases
    let title = document.getElementById("titles");
    title.innerHTML=va.country+" Cases";
    document.getElementById("country").src = va.countryInfo.flag

  })
});
