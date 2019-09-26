if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((location) => {
    document.getElementById('longitude').innerHTML = location.coords.longitude;
    document.getElementById('latitude').innerHTML = location.coords.latitude;
    const map = L.map('map').setView([location.coords.longitude, location.coords.latitude], 5);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    	id: 'mapbox.streets',
    	accessToken: 'your.mapbox.access.token'
    }).addTo(map);
  });
} else {
  throw new Error('location not available');
}
