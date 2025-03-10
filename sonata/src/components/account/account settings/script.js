document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Toggle Password Visibility
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password Validation (can be expanded)
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordRequirements = document.querySelectorAll('.password-tips li');
    
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', validatePassword);
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }
    
    function validatePassword() {
        const password = newPasswordInput.value;
        
        // Check length (at least 8 characters)
        passwordRequirements[0].classList.toggle('valid', password.length >= 8);
        passwordRequirements[0].classList.toggle('invalid', password.length < 8);
        
        // Check for uppercase letter
        const hasUppercase = /[A-Z]/.test(password);
        passwordRequirements[1].classList.toggle('valid', hasUppercase);
        passwordRequirements[1].classList.toggle('invalid', !hasUppercase);
        
        // Check for number
        const hasNumber = /[0-9]/.test(password);
        passwordRequirements[2].classList.toggle('valid', hasNumber);
        passwordRequirements[2].classList.toggle('invalid', !hasNumber);
        
        // Check for special character
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        passwordRequirements[3].classList.toggle('valid', hasSpecial);
        passwordRequirements[3].classList.toggle('invalid', !hasSpecial);
        
        // Check for common passwords (simplified)
        const isCommon = ['password', '123456', 'qwerty', 'admin', 'welcome'].includes(password.toLowerCase());
        passwordRequirements[4].classList.toggle('valid', !isCommon);
        passwordRequirements[4].classList.toggle('invalid', isCommon);
    }
    
    function validatePasswordMatch() {
        const password = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                confirmPasswordInput.setCustomValidity("Passwords don't match");
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        }
    }
    
    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message or handle form submission
            const formType = this.classList[0];
            showNotification(`${formType.split('-')[0].charAt(0).toUpperCase() + formType.split('-')[0].slice(1)} updated successfully!`, 'success');
        });
    });
    
    // Delete Account Modal
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const deleteAccountModal = document.getElementById('delete-account-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const deleteConfirmationInput = document.getElementById('delete-confirmation');
    const modalClose = document.querySelector('.modal-close');
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            deleteAccountModal.classList.add('active');
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            deleteAccountModal.classList.remove('active');
            deleteConfirmationInput.value = '';
            confirmDeleteBtn.disabled = true;
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            deleteAccountModal.classList.remove('active');
            deleteConfirmationInput.value = '';
            confirmDeleteBtn.disabled = true;
        });
    }
    
    if (deleteConfirmationInput) {
        deleteConfirmationInput.addEventListener('input', function() {
            confirmDeleteBtn.disabled = this.value !== 'delete my account';
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            // Handle account deletion
            showNotification('Your account has been scheduled for deletion.', 'success');
            deleteAccountModal.classList.remove('active');
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: '#fff',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.3s, transform 0.3s'
        });
        
        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.backgroundColor = '#4CD964';
                break;
            case 'error':
                notification.style.backgroundColor = '#EF4444';
                break;
            case 'warning':
                notification.style.backgroundColor = '#FFCC00';
                notification.style.color = '#2D2E40';
                break;
            default:
                notification.style.backgroundColor = '#647DEE';
        }
        
        // Make it visible with animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // File Upload Preview
    const profileUpload = document.getElementById('profile-upload');
    const profilePicture = document.querySelector('.profile-picture');
    
    if (profileUpload) {
        profileUpload.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Create an image element and style it for the profile picture
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    
                    // Remove existing content and add the image
                    profilePicture.innerHTML = '';
                    profilePicture.appendChild(img);
                }
                
                reader.readAsDataURL(file);
            }
        });
    }
});