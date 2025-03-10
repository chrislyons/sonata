// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ question buttons
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add click event to each question
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        // Get the answer element (next sibling)
        const answer = this.nextElementSibling;
        
        // Check if this question is already active
        const isActive = this.classList.contains('active');
        
        // Close all FAQs first
        faqQuestions.forEach(q => {
          q.classList.remove('active');
          q.nextElementSibling.classList.remove('active');
        });
        
        // If the clicked FAQ wasn't active, open it
        if (!isActive) {
          this.classList.add('active');
          answer.classList.add('active');
        }
      });
    });
  });