setInterval(function () {
  document.getElementById('screensaver').style.cssText = `left: ${Math.random() * 800}px; top: ${Math.random() * 400}px; background-color: #${(111111 + Math.random() * 1000000).toString(16)};`;
}, 500);
