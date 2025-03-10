document.addEventListener('DOMContentLoaded', function() {
    // Get form and form elements
    const songDetailsForm = document.getElementById('songDetailsForm');
    const occasionSelect = document.getElementById('occasion');
    const relationshipSelect = document.getElementById('relationship');
    const anniversaryDetailsGroup = document.getElementById('anniversaryDetailsGroup');
    const otherOccasionGroup = document.getElementById('otherOccasionGroup');
    const otherRelationshipGroup = document.getElementById('otherRelationshipGroup');
    
    // Show/hide conditional form fields based on selections
    function handleOccasionChange() {
      const selectedOccasion = occasionSelect.value;
      
      // Handle anniversary details
      if (selectedOccasion === 'anniversary') {
        anniversaryDetailsGroup.style.display = 'block';
      } else {
        anniversaryDetailsGroup.style.display = 'none';
      }
      
      // Handle other occasion
      if (selectedOccasion === 'other') {
        otherOccasionGroup.style.display = 'block';
      } else {
        otherOccasionGroup.style.display = 'none';
      }
    }
    
    function handleRelationshipChange() {
      const selectedRelationship = relationshipSelect.value;
      
      // Handle other relationship
      if (selectedRelationship === 'other') {
        otherRelationshipGroup.style.display = 'block';
      } else {
        otherRelationshipGroup.style.display = 'none';
      }
    }
    
    // Initialize form state
    handleOccasionChange();
    handleRelationshipChange();
    
    // Add event listeners
    occasionSelect.addEventListener('change', handleOccasionChange);
    relationshipSelect.addEventListener('change', handleRelationshipChange);
    
    // Load saved form data if available
    if (window.FormStorage) {
      FormStorage.populateForm('songDetails', songDetailsForm);
    }
    
    // Form validation and submission
    songDetailsForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form values
      const recipientName = document.getElementById('recipientName').value.trim();
      const occasion = occasionSelect.value;
      const otherOccasion = document.getElementById('otherOccasion').value.trim();
      const occasionDetails = document.getElementById('occasionDetails').value.trim();
      const memories = document.getElementById('memories').value.trim();
      const characteristics = document.getElementById('characteristics').value.trim();
      const relationship = relationshipSelect.value;
      const otherRelationship = document.getElementById('otherRelationship').value.trim();
      
      // Basic validation
      let isValid = true;
      
      // Validate recipient name
      if (!recipientName) {
        isValid = false;
        highlightError('recipientName', "Recipient's name is required");
      } else {
        clearError('recipientName');
      }
      
      // Validate occasion
      if (!occasion) {
        isValid = false;
        highlightError('occasion', "Please select an occasion");
      } else {
        clearError('occasion');
        
        // Validate other occasion if selected
        if (occasion === 'other' && !otherOccasion) {
          isValid = false;
          highlightError('otherOccasion', "Please specify the occasion");
        } else {
          clearError('otherOccasion');
        }
      }
      
      // Validate relationship
      if (!relationship) {
        isValid = false;
        highlightError('relationship', "Please select your relationship");
      } else {
        clearError('relationship');
        
        // Validate other relationship if selected
        if (relationship === 'other' && !otherRelationship) {
          isValid = false;
          highlightError('otherRelationship', "Please specify the relationship");
        } else {
          clearError('otherRelationship');
        }
      }
      
      // Validate memories
      if (!memories) {
        isValid = false;
        highlightError('memories', "Please share some memories or stories");
      } else {
        clearError('memories');
      }
      
      // Validate characteristics
      if (!characteristics) {
        isValid = false;
        highlightError('characteristics', "Please describe some characteristics");
      } else {
        clearError('characteristics');
      }
      
      // If form is valid, save data and proceed
      if (isValid) {
        // Collect form data
        const formData = {
          recipientName,
          occasion,
          otherOccasion,
          occasionDetails,
          memories,
          characteristics,
          relationship,
          otherRelationship
        };
        
        // Save form data if FormStorage is available
        if (window.FormStorage) {
          FormStorage.saveFormData('songDetails', formData);
        }
        
        // Redirect to payment page
        window.location.href = '../payment/payment.html';
      }
    });
    
    // Function to highlight form errors
    function highlightError(elementId, errorMessage) {
      const element = document.getElementById(elementId);
      const formGroup = element.closest('.form-group');
      
      // Add error class to form group
      formGroup.classList.add('error');
      
      // Create or update error message
      let errorElement = formGroup.querySelector('.error-message');
      
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
      }
      
      errorElement.textContent = errorMessage;
    }
    
    // Function to clear form errors
    function clearError(elementId) {
      const element = document.getElementById(elementId);
      const formGroup = element.closest('.form-group');
      
      // Remove error class
      formGroup.classList.remove('error');
      
      // Remove error message
      const errorElement = formGroup.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    }
});

// Function to go back to previous page
function goBack() {
  window.location.href = '../genre/genre.html';
}