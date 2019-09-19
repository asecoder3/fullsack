if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((location) => {
    const loc = {
      longtitude: location.coords.longitude,
      latitude: location.coords.latitude,
    };
    document.getElementById('longtitude').innerHTML = loc.longtitude;
    document.getElementById('latitude').innerHTML = loc.latitude;
  });
} else {
  throw new Error('location not available');
}
