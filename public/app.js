
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((location) => {
    document.getElementById('longitude').innerHTML = location.coords.longitude.toFixed(8);
    document.getElementById('latitude').innerHTML = location.coords.latitude.toFixed(8);
    const crd = [location.coords.latitude, location.coords.longitude];
    const map = L.map('map').setView(crd, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      minZoom: 0,
      maxZoom: 19,
    }).addTo(map);
    $('br').remove();
    L.marker(crd).addTo(map);
  });
} else {
  throw new Error('location not available');
}
let places = [];

async function getData() {
  const response = await fetch('api/paikat');
  const json = await response.json();
  console.log(json[0]);
  return json;
}
getData().then(d => {
  places = d;
  updatePlaceTable(places);
});


function openLocationForm() {
  document.getElementById('placerating').style.display = 'block';
}
function cancelLocationSave() {
  document.getElementById('placerating').style.display = 'none';
  document.getElementById('placerating-form').reset();
}
function savelocation() {
  document.getElementById('placerating').style.display = 'none';
  const d = {
    place: document.getElementById('place').value,
    rating: document.getElementById('review').value,
  };
  console.log(d);
  document.getElementById('placerating-form').reset();
  places.push({ place: d.place, rating: d.rating, });
  updatePlaceTable(places);
}
/*function createRatingPopup(data) {

}*/
function updatePlaceTable(data) {
  const table = document.getElementById('places-table');
  table.innerHTML = '';
  data.forEach(place => {
    const row = table.insertRow(0);
    row.insertCell(0).innerHTML = place.place;
    row.insertCell(1).innerHTML = place.rating;
  });
}
