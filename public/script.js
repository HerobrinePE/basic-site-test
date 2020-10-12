var xhr = new XMLHttpRequest();

$.getJSON("https://ipapi.co/json/", async function(data) {
  let pa = JSON.stringify(data);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: pa
  });
});
