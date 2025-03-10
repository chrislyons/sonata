document.addEventListener('DOMContentLoaded', function() {
    // Handle payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForm = document.getElementById('payment-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove selected class from all methods
            paymentMethods.forEach(m => m.classList.remove('selected'));
            
            // Add selected class to clicked method
            this.classList.add('selected');
            
            // Update hidden payment method input
            document.getElementById('payment-method').value = this.dataset.method;
        });
    });
    
    // Display order summary from stored data
    if (window.FormStorage) {
        const songDetails = FormStorage.getFormDataById('songDetails');
        const packageDetails = FormStorage.getFormDataById('package');
        const genreDetails = FormStorage.getFormDataById('genre');
        
        // Update order summary
        if (songDetails && packageDetails) {
            // Set recipient name
            const recipientNameElement = document.getElementById('summary-recipient');
            if (recipientNameElement && songDetails.recipientName) {
                recipientNameElement.textContent = songDetails.recipientName;
            }
            
            // Set occasion
            const occasionElement = document.getElementById('summary-occasion');
            if (occasionElement) {
                let occasionText = songDetails.occasion;
                if (songDetails.occasion === 'other' && songDetails.otherOccasion) {
                    occasionText = songDetails.otherOccasion;
                }
                occasionElement.textContent = occasionText;
            }
            
            // Set package
            const packageElement = document.getElementById('summary-package');
            if (packageElement && packageDetails.packageName) {
                packageElement.textContent = packageDetails.packageName;
            }
            
            // Set genre
            const genreElement = document.getElementById('summary-genre');
            if (genreElement && genreDetails && genreDetails.genre) {
                genreElement.textContent = genreDetails.genre;
            }
            
            // Set price
            const priceElement = document.getElementById('summary-price');
            if (priceElement && packageDetails.price) {
                priceElement.textContent = `$${packageDetails.price}`;
            }
        }
    }
    
    // Handle complete payment button
    const completePaymentBtn = document.getElementById('complete-payment-btn');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form first
            if (validatePaymentForm()) {
                // Get payment details
                const paymentMethod = document.getElementById('payment-method').value;
                const cardNumber = document.querySelector('input[placeholder="1234 5678 9012 3456"]').value;
                const cardholderName = document.querySelector('input[placeholder="John Smith"]').value;
                const expiryDate = document.querySelector('input[placeholder="MM / YY"]').value;
                const cvv = document.querySelector('input[placeholder="123"]').value;
                
                // Save payment data
                if (window.FormStorage) {
                    FormStorage.saveFormData('payment', {
                        paymentMethod,
                        cardNumber,
                        cardholderName,
                        expiryDate,
                        cvv,
                        timestamp: new Date().toISOString()
                    });
                }
                
                // Show loading state
                if (completePaymentBtn) {
                    completePaymentBtn.disabled = true;
                    completePaymentBtn.textContent = 'Processing...';
                }
                
                // Simulate payment processing
                console.log('Processing payment...');
                
                // Submit form data to backend (in a real implementation)
                // For now, we'll simulate this with a timeout
                setTimeout(() => {
                    // Redirect to confirmation page
                    window.location.href = '../confirmation/confirmation.html';
                }, 1500);
            }
        });
    }
    
    // Form validation function
    function validatePaymentForm() {
        const cardNumber = document.querySelector('input[placeholder="1234 5678 9012 3456"]').value;
        const cardholderName = document.querySelector('input[placeholder="John Smith"]').value;
        const expiryDate = document.querySelector('input[placeholder="MM / YY"]').value;
        const cvv = document.querySelector('input[placeholder="123"]').value;
        const paymentMethod = document.getElementById('payment-method').value;
        
        // Check if payment method is selected
        if (!paymentMethod) {
            alert('Please select a payment method');
            return false;
        }
        
        // Simple validation
        if (!cardNumber || !cardholderName || !expiryDate || !cvv) {
            alert('Please fill in all payment details');
            return false;
        }
        
        // Validate card number format (simple check)
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }
        
        // Validate expiry date format (MM/YY)
        if (!/^\d{2}\s*\/\s*\d{2}$/.test(expiryDate)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return false;
        }
        
        // Validate CVV (3-4 digits)
        if (!/^\d{3,4}$/.test(cvv)) {
            alert('Please enter a valid CVV code (3-4 digits)');
            return false;
        }
        
        return true;
    }
});

// Function to go back to previous page
function goBack() {
    window.location.href = '../song-details/song-details.html';
}