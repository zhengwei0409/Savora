const userImage = ''; // Assume fetched from DB
const img = document.getElementById('user-image');
img.src = userImage || '/images/person-circle.png';

const userName = ''; // Assume fetched from DB
const nameElement  = document.getElementById('username');
nameElement.textContent = userName || 'Guest';

const userEmail = ''; // Assume fetched from DB
const emailElement  = document.getElementById('useremail');
emailElement.textContent = userEmail || 'No email is provided';

const userOcc = ''; // Assume fetched from DB
const occElement  = document.getElementById('user-Occ');
occElement.textContent = userOcc || 'No occupation';

const userIncome = ''; // Assume fetched from DB
const incomeElement  = document.getElementById('user-Income');
incomeElement.textContent = userIncome || 'No Income';

const userCountry = ''; // Assume fetched from DB
const countryElement  = document.getElementById('user-Country');
countryElement.textContent = userCountry || 'Country not provided';

const userGender = ''; // Assume fetched from DB
const genderElement  = document.getElementById('user-Gender');
genderElement.textContent = userCountry || 'Gender not provided';

const userDOB = ''; // Assume fetched from DB
const dobElement  = document.getElementById('user-DOB');
dobElement.textContent = userDOB || 'Date of birth not provided';


document.getElementById("logout-btn").addEventListener("click", function() {
    let floatingTab = document.getElementById("floatingTab1");
    let backgroundOverlay = document.getElementById("backgroundOverlay");

    floatingTab.style.display = "flex";
    backgroundOverlay.style.display = "block";

    document.body.style.overflow = "hidden";
});

document.getElementById("delete-btn").addEventListener("click", function() {
    let floatingTab = document.getElementById("floatingTab2");
    let backgroundOverlay = document.getElementById("backgroundOverlay");


    floatingTab.style.display = "flex";
    backgroundOverlay.style.display = "block";

    document.body.style.overflow = "hidden";

});

document.getElementById("cancelLogout").addEventListener("click", function() {
    let floatingTab = document.getElementById("floatingTab2");
    let backgroundOverlay = document.getElementById("backgroundOverlay");

    floatingTab.style.display = "none";
    backgroundOverlay.style.display = "none";

    document.body.style.overflow = "auto";
});

document.getElementById("cancelLogout").addEventListener("click", function() {
    let floatingTab = document.getElementById("floatingTab1");
    let backgroundOverlay = document.getElementById("backgroundOverlay");

    floatingTab.style.display = "none";
    backgroundOverlay.style.display = "none";

    document.body.style.overflow = "auto";


});document.getElementById("canceldelete").addEventListener("click", function() {
    let floatingTab = document.getElementById("floatingTab2");
    let backgroundOverlay = document.getElementById("backgroundOverlay");

    floatingTab.style.display = "none";
    backgroundOverlay.style.display = "none";

    document.body.style.overflow = "auto";
});