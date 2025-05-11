const userImage = '';
const img = document.getElementById('user-profile');
img.src = userImage || '/images/person-circle.png';

const userName = ''; 
const nameElement  = document.querySelector('#user-name input');
nameElement.value = userName || 'Guest';

const userEmail = ''; 
const emailElement  = document.querySelector('#user-email input');
emailElement.value = userEmail || 'No email is provided';

const userOcc = ''; 
const occElement  = document.querySelector('#user-Occ input');
occElement.value = userOcc || 'No occupation';

const userIncome = ''; 
const incomeElement  = document.querySelector('#user-Inc input');
incomeElement.value = userIncome || '0';

document.querySelector('.custom-btn').addEventListener('click', function (event) {
    event.preventDefault(); 

    
    const nameInput = document.querySelector('#user-name input');
    const updatedName = nameInput ? nameInput.value.trim() : '';

    // Optional: Save to localStorage (or send to backend)
    // if (updatedName) {
    //     localStorage.setItem('userName', updatedName);
    // }

    window.location.replace('profile.html');
});

document.querySelector('.close-btn').addEventListener('click',function(event){
    event.preventDefault();
    window.location.replace('profile.html');
});