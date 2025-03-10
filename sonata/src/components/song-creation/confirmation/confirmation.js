document.addEventListener('DOMContentLoaded', function() {
    // Generate a random order number
    function generateOrderNumber() {
        const prefix = 'SON-';
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        return prefix + randomNum;
    }
    
    // Set order number
    const orderNumberElement = document.getElementById('order-number');
    if (orderNumberElement) {
        orderNumberElement.textContent = generateOrderNumber();
    }
    
    // Display order details from stored form data
    if (window.FormStorage) {
        const songDetails = FormStorage.getFormDataById('songDetails');
        const packageDetails = FormStorage.getFormDataById('package');
        const genreDetails = FormStorage.getFormDataById('genre');
        
        // Update order details
        if (songDetails) {
            // Set recipient name
            const recipientNameElement = document.getElementById('recipient-name');
            if (recipientNameElement && songDetails.recipientName) {
                recipientNameElement.textContent = songDetails.recipientName;
            }
            
            // Set occasion
            const occasionElement = document.getElementById('occasion');
            if (occasionElement) {
                let occasionText = songDetails.occasion;
                if (songDetails.occasion === 'other' && songDetails.otherOccasion) {
                    occasionText = songDetails.otherOccasion;
                }
                occasionElement.textContent = occasionText;
            }
        }
        
        // Set package
        if (packageDetails) {
            const packageElement = document.getElementById('package');
            if (packageElement && packageDetails.packageName) {
                packageElement.textContent = packageDetails.packageName;
            }
        }
        
        // Set genre
        if (genreDetails) {
            const genreElement = document.getElementById('genre');
            if (genreElement && genreDetails.genre) {
                genreElement.textContent = genreDetails.genre;
            }
        }
    }
    
    // Clear form data after displaying it
    // This ensures a fresh start if the user creates another song
    setTimeout(() => {
        if (window.FormStorage) {
            FormStorage.clearFormData();
        }
    }, 1000);
});