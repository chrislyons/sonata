document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const toSignupLink = document.getElementById('to-signup');
    const toLoginLink = document.getElementById('to-login');

    function switchTab(tabId) {
        // Update tab buttons
        tabBtns.forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update tab contents
        tabContents.forEach(content => {
            if (content.id === `${tabId}-content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // Link to switch between tabs
    toSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('signup');
    });

    toLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('login');
    });

    // Checkbox Logic
    const rememberCheckbox = document.getElementById('remember-checkbox');
    const agreeCheckbox = document.getElementById('agree-checkbox');

    function toggleCheckbox(checkbox) {
        checkbox.classList.toggle('checked');
    }

    rememberCheckbox.addEventListener('click', () => {
        toggleCheckbox(rememberCheckbox);
    });

    agreeCheckbox.addEventListener('click', () => {
        toggleCheckbox(agreeCheckbox);
    });

    // Form Validation
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validatePassword(password) {
        // At least 8 characters long
        return password.length >= 8;
    }
    
    function showError(inputElement, message) {
        // Remove any existing error message
        const existingError = inputElement.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        // Add red border to input
        inputElement.style.borderColor = '#ff4444';
        inputElement.style.backgroundColor = 'rgba(255, 68, 68, 0.05)';
        
        // Insert error message after input
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    }
    
    function clearError(inputElement) {
        const existingError = inputElement.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        inputElement.style.borderColor = '';
        inputElement.style.backgroundColor = '';
    }
    
    // Login form validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        const loginEmail = document.getElementById('login-email');
        const loginPassword = document.getElementById('login-password');
        
        // Clear previous errors
        clearError(loginEmail);
        clearError(loginPassword);
        
        // Validate email
        if (!loginEmail.value.trim()) {
            showError(loginEmail, 'Email is required');
            isValid = false;
        } else if (!validateEmail(loginEmail.value)) {
            showError(loginEmail, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!loginPassword.value) {
            showError(loginPassword, 'Password is required');
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would submit to your backend here
            console.log('Login form is valid, submitting...');
            
            // For demo purposes, simulate a successful login
            alert('Login successful! Redirecting to dashboard...');
            
            // In a real application, you would redirect based on the server response
            // window.location.href = '/dashboard';
        }
    });
    
    // Signup form validation
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        const signupName = document.getElementById('signup-name');
        const signupEmail = document.getElementById('signup-email');
        const signupPassword = document.getElementById('signup-password');
        const signupConfirmPassword = document.getElementById('signup-confirm-password');
        
        // Clear previous errors
        clearError(signupName);
        clearError(signupEmail);
        clearError(signupPassword);
        clearError(signupConfirmPassword);
        
        // Validate name
        if (!signupName.value.trim()) {
            showError(signupName, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (!signupEmail.value.trim()) {
            showError(signupEmail, 'Email is required');
            isValid = false;
        } else if (!validateEmail(signupEmail.value)) {
            showError(signupEmail, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!signupPassword.value) {
            showError(signupPassword, 'Password is required');
            isValid = false;
        } else if (!validatePassword(signupPassword.value)) {
            showError(signupPassword, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Validate password confirmation
        if (signupPassword.value !== signupConfirmPassword.value) {
            showError(signupConfirmPassword, 'Passwords do not match');
            isValid = false;
        }
        
        // Check if terms are accepted
        if (!agreeCheckbox.classList.contains('checked')) {
            alert('You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would submit to your backend here
            console.log('Signup form is valid, submitting...');
            
            // For demo purposes, simulate a successful signup
            alert('Account created successfully! Redirecting to dashboard...');
            
            // In a real application, you would redirect based on the server response
            // window.location.href = '/dashboard';
        }
    });
    
    // Add focus/blur effects for inputs
    const allInputs = document.querySelectorAll('.form-input');
    
    allInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--purple-gradient-start)';
            input.style.boxShadow = '0 0 0 3px rgba(127, 83, 172, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    });
});