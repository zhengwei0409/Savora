document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const usernameFeedback = document.getElementById('usernameFeedback');
    const emailFeedback = document.getElementById('emailFeedback');
    const passwordFeedback = document.getElementById('passwordFeedback');
    const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInfo = document.getElementById('passwordInfo');
    const passwordTooltip = document.getElementById('passwordTooltip');
    const registrationForm = document.getElementById('registrationForm');

    // Username validation 
    usernameInput.addEventListener('blur', function() {
        const username = usernameInput.value.trim();
        
        if (username === '') {
            setInvalid(usernameInput, usernameFeedback, 'Username is required');
            return;
        }

        // Here you would make an API call to your MongoDB backend to check username availability
        // This would be implemented in your backend using something like:
        // GET /api/check-username?username=value
        
        // For demonstration purposes only - replace with actual API call
        checkUsernameAvailability(username);
    });

    // Function to check username availability - this would be replaced with an actual API call
    function checkUsernameAvailability(username) {
        // This is just a placeholder - in your actual implementation,
        // you would call your MongoDB backend API endpoint
        
        // BACKEND INTEGRATION REQUIRED:
        // Create an API endpoint that checks if a username exists in your MongoDB collection
        // Example endpoint: /api/check-username that returns { available: true/false }
    }

    // Email validation
    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            setInvalid(emailInput, emailFeedback, 'Email is required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setInvalid(emailInput, emailFeedback, 'Please enter a valid email address');
        } else {
            // BACKEND INTEGRATION REQUIRED:
            // Create an API endpoint to check if email already exists in your MongoDB collection
            // Example endpoint: /api/check-email that returns { available: true/false }
            
            // For now, just show as valid
            setValid(emailInput, emailFeedback, 'Email is valid');
        }
    });

    // Password validation
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        
        if (password === '') {
            setInvalid(passwordInput, passwordFeedback, 'Password is required');
            return;
        }

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const isLongEnough = password.length >= 8;

        if (isLongEnough && hasUppercase && hasLowercase && hasNumber) {
            setValid(passwordInput, passwordFeedback, 'Password available.');
        } else {
            setInvalid(passwordInput, passwordFeedback, 'Password not valid.');
        }
    });

    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        const confirmPassword = confirmPasswordInput.value;
        const password = passwordInput.value;
        
        if (confirmPassword === '') {
            setInvalid(confirmPasswordInput, confirmPasswordFeedback, 'Please confirm your password');
            return;
        }

        if (confirmPassword === password) {
            setValid(confirmPasswordInput, confirmPasswordFeedback, 'Passwords match');
        } else {
            setInvalid(confirmPasswordInput, confirmPasswordFeedback, 'Passwords do not match');
        }
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, this);
    });

    toggleConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, this);
    });

    function togglePasswordVisibility(inputField, button) {
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        
        // Toggle between eye and eye-slash icons
        const icon = button.querySelector('i');
        if (type === 'text') {

            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }

    // Show password tooltip on hover/focus
    passwordInfo.addEventListener('mouseenter', showPasswordTooltip);
    passwordInfo.addEventListener('mouseleave', hidePasswordTooltip);
    passwordInfo.addEventListener('focus', showPasswordTooltip);
    passwordInfo.addEventListener('blur', hidePasswordTooltip);

    function showPasswordTooltip() {
        passwordTooltip.style.display = 'block';
    }

    function hidePasswordTooltip() {
        passwordTooltip.style.display = 'none';
    }

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // BACKEND INTEGRATION REQUIRED:
        // This is where you would collect all form data and send it to your MongoDB backend
        // Example:
        // 1. Collect all data from form fields
        // 2. Validate all fields client-side
        // 3. Send data to your API endpoint using fetch or axios
        // 4. Handle the response (success/error)
        
        const formData = {
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
            // You might add additional fields here
        };
        
        console.log('Form submitted with data:', formData);
        alert('Form submitted! In a real application, this would be sent to your MongoDB backend.');
        
        // POST /api/register endpoint would be called here
    });

    // Helper functions for setting validation states
    function setValid(inputField, feedbackElement, message) {
        inputField.classList.remove('invalid-input');
        inputField.classList.add('valid-input');
        feedbackElement.classList.remove('invalid-feedback');
        feedbackElement.classList.add('valid-feedback');
        feedbackElement.textContent = message;
    }

    function setInvalid(inputField, feedbackElement, message) {
        inputField.classList.remove('valid-input');
        inputField.classList.add('invalid-input');
        feedbackElement.classList.remove('valid-feedback');
        feedbackElement.classList.add('invalid-feedback');
        feedbackElement.textContent = message;
    }
});