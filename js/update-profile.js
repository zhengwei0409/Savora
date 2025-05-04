const userImage = ''; // Assume fetched from DB
const img = document.getElementById('user-profile');
img.src = userImage || '/images/person-circle.png';