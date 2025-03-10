document.addEventListener('DOMContentLoaded', function() {
    // Handle genre selection
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            genreCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
        });
    });

    // Navigation functionality
    const backButton = document.getElementById('back-button');
    const continueButton = document.getElementById('continue-button');

    backButton.addEventListener('click', function() {
        // Navigate back to package selection page
        window.location.href = './packages.html';
    });

    continueButton.addEventListener('click', function() {
        // Get the selected genre
        const selectedGenre = document.querySelector('.genre-card.selected h3').textContent;
        
        // Store the selected genre in session storage or local storage
        sessionStorage.setItem('selectedGenre', selectedGenre);
        
        // Navigate to the song details page
        window.location.href = './details.html';
    });

    // Support for keyboard navigation (accessibility)
    genreCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            // Select on Enter or Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                
                // Remove selected class from all cards
                genreCards.forEach(c => c.classList.remove('selected'));
                
                // Add selected class to this card
                this.classList.add('selected');
            }
        });
    });

    // Validate selection before proceeding
    continueButton.addEventListener('click', function(e) {
        const selectedCard = document.querySelector('.genre-card.selected');
        
        if (!selectedCard) {
            e.preventDefault();
            alert('Please select a genre before continuing.');
        }
    });
});