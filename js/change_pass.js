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