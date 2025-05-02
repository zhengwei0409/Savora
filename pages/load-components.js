document.addEventListener("DOMContentLoaded", () => {
    // Load header
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      });
});

const userImage = ''; // Assume fetched from DB
const img = document.getElementById('user-image');
img.src = userImage || '/images/person-circle.png';

const userName = ''; // Assume fetched from DB
const nameElement  = document.getElementById('username');
nameElement.textContent = userName || 'Guest';

const userEmail = ''; // Assume fetched from DB
const emailElement  = document.getElementById('useremail');
emailElement.textContent = userEmail || 'No email is provided';