document.addEventListener("DOMContentLoaded", () => {
    // Load header
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      });
});