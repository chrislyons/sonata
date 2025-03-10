/**
 * Utility functions for storing and retrieving form data across pages
 */

const FormStorage = {
  /**
   * Save form data to localStorage
   * @param {string} formId - Identifier for the form
   * @param {Object} data - Form data to save
   */
  saveFormData: function(formId, data) {
    try {
      const existingData = this.getFormData();
      const updatedData = { ...existingData, [formId]: data };
      localStorage.setItem('sonataFormData', JSON.stringify(updatedData));
      return true;
    } catch (error) {
      console.error('Error saving form data:', error);
      return false;
    }
  },

  /**
   * Get all stored form data
   * @returns {Object} All stored form data
   */
  getFormData: function() {
    try {
      const data = localStorage.getItem('sonataFormData');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error retrieving form data:', error);
      return {};
    }
  },

  /**
   * Get form data for a specific form
   * @param {string} formId - Identifier for the form
   * @returns {Object} Form data for the specified form
   */
  getFormDataById: function(formId) {
    const allData = this.getFormData();
    return allData[formId] || {};
  },

  /**
   * Clear all stored form data
   */
  clearFormData: function() {
    localStorage.removeItem('sonataFormData');
  },

  /**
   * Clear form data for a specific form
   * @param {string} formId - Identifier for the form
   */
  clearFormDataById: function(formId) {
    const allData = this.getFormData();
    if (allData[formId]) {
      delete allData[formId];
      localStorage.setItem('sonataFormData', JSON.stringify(allData));
    }
  },

  /**
   * Populate form fields with stored data
   * @param {string} formId - Identifier for the form
   * @param {HTMLFormElement} formElement - The form element to populate
   */
  populateForm: function(formId, formElement) {
    const formData = this.getFormDataById(formId);
    
    if (!formData || Object.keys(formData).length === 0) {
      return;
    }
    
    // Iterate through form elements and set values
    Array.from(formElement.elements).forEach(element => {
      if (element.name && formData[element.name] !== undefined) {
        const value = formData[element.name];
        
        if (element.type === 'checkbox') {
          element.checked = value;
        } else if (element.type === 'radio') {
          element.checked = (element.value === value);
        } else if (element.tagName === 'SELECT') {
          element.value = value;
          // Trigger change event for select elements to handle conditional fields
          const event = new Event('change');
          element.dispatchEvent(event);
        } else if (element.tagName === 'TEXTAREA') {
          element.value = value;
        } else {
          element.value = value;
        }
      }
    });
  }
};

// Make FormStorage available globally
window.FormStorage = FormStorage; 