if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((location) => {
    document.getElementById('longitude').innerHTML = location.coords.longitude;
    document.getElementById('latitude').innerHTML = location.coords.latitude;
    const map = L.map('map').setView([location.coords.latitude, location.coords.longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 19,
    }).addTo(map);
    $('br').remove();
  });
} else {
  throw new Error('location not available');
}
