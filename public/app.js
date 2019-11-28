
let map;
let lastCircle;
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((location) => {
    document.getElementById('longitude').innerHTML = location.coords.longitude.toFixed(8);
    document.getElementById('latitude').innerHTML = location.coords.latitude.toFixed(8);
    const crd = [location.coords.latitude, location.coords.longitude];
    map = L.map('map').setView(crd, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      minZoom: 0,
      maxZoom: 19,
    }).addTo(map);
    $('br').remove();
    L.marker(crd).addTo(map).bindPopup('You are here.');
    map.on('click', (e) => {
      console.log(e.latlng);
      document.getElementById('longitude').innerHTML = e.latlng.lng.toFixed(8);
      document.getElementById('latitude').innerHTML = e.latlng.lat.toFixed(8);
      if (lastCircle) lastCircle.remove();
      lastCircle = L.circle([e.latlng.lat, e.latlng.lng], {radius: 10, color: '#ff0000'}).addTo(map);
    });
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
  createRatingPopups(places);
});


function openLocationForm() {
  document.getElementById('placerating').style.display = 'block';
}
function cancelLocationSave() {
  document.getElementById('placerating').style.display = 'none';
  document.getElementById('placerating-form').reset();
}
async function savelocation() {
  const place = {
    place: document.getElementById('place').value,
    rating: document.getElementById('review').value,
    lat: parseFloat(document.getElementById('latitude').innerHTML) + 0.0001,
    long: parseFloat(document.getElementById('longitude').innerHTML),
  };
  if (place.place.length === 0) return alert('You didn\'t name the place!');
  if (place.rating.length === 0 || isNaN(parseInt(place.rating)) || ![1, 2, 3, 4, 5].includes(parseInt(place.rating))) {
    document.getElementById('review').value = '';
    return alert('You didn\'t rate the place or did it incorrectly!')
  }
  places.push(place);
  updatePlaceTable(places);
  createRatingPopups([place]);
  const status = await post(place);
  console.log(status);
  document.getElementById('placerating').style.display = 'none';
  document.getElementById('placerating-form').reset();
}
function post(place) {
  return new Promise(async (res, rej) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(place),
    };
    const response = await fetch('/api/rating', options);
    res(response.status);
  });
}
function createRatingPopups(places) {
  places.forEach(place => {
    const marker = L.marker([place.lat, place.long]).addTo(map);
    marker.bindPopup(`<b>${place.place}</b><br>${place.rating} Stars`).openPopup();
  });
}
function updatePlaceTable(data) {
  const table = document.getElementById('places-table');
  table.innerHTML = '';
  data.forEach(place => {
    const row = table.insertRow(0);
    row.insertCell(0).innerHTML = place.place;
    row.insertCell(1).innerHTML = place.rating;
  });
}
