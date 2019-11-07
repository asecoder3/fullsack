
if ("geolocation" in navigator) {
  alert('getting locaion');
  navigator.geolocation.getCurrentPosition((location) => {
    alert('location got, making map...');
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
    alert('map made');
  });
  alert('idk sumthing');
} else {
  alert('couldnt get location');
  throw new Error('location not available');
}

async function getData() {
  const response = await fetch('api/paikat');
  const json = await response.json();
  console.log(json[0]);
}
getData();

function openLocationForm() {
  document.getElementById('placerating').style.display = 'block';
}
function cancelLocationSave() {
  document.getElementById('placerating').style.display = 'none';
  document.getElementById('placerating-form').reset();
}
function savelocation() {
  document.getElementById('placerating').style.display = 'none';
  const d = JSON.stringify({
    place: document.getElementById('place').value,
    review: document.getElementById('review').value,
    timestamp: Date.now(),
  });
  console.log(d);
  document.getElementById('placerating-form').reset();
}
