if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((location) => {
    document.getElementById('longitude').innerHTML = location.coords.longitude;
    document.getElementById('latitude').innerHTML = location.coords.latitude;
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
