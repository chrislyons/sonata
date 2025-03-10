document.addEventListener('DOMContentLoaded', function() {
    // Action button dropdown functionality
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create dropdown menu if it doesn't exist
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('action-dropdown')) {
                const dropdown = document.createElement('div');
                dropdown.className = 'action-dropdown';
                dropdown.innerHTML = `
                    <ul>
                        <li><a href="#"><i class="fas fa-eye"></i> View Details</a></li>
                        <li><a href="#"><i class="fas fa-edit"></i> Edit Order</a></li>
                        <li><a href="#"><i class="fas fa-comment"></i> Contact Customer</a></li>
                        <li class="danger"><a href="#"><i class="fas fa-trash"></i> Cancel Order</a></li>
                    </ul>
                `;
                
                // Add dropdown to the DOM
                this.parentNode.style.position = 'relative';
                this.parentNode.appendChild(dropdown);
                
                // Style for the dropdown
                dropdown.style.position = 'absolute';
                dropdown.style.right = '0';
                dropdown.style.top = '30px';
                dropdown.style.backgroundColor = 'white';
                dropdown.style.border = '1px solid #E4E6F0';
                dropdown.style.borderRadius = '8px';
                dropdown.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                dropdown.style.zIndex = '10';
                dropdown.style.minWidth = '180px';
                
                // Style dropdown items
                const items = dropdown.querySelectorAll('li');
                items.forEach(item => {
                    item.style.padding = '10px 15px';
                    item.style.fontSize = '14px';
                    item.style.cursor = 'pointer';
                    
                    item.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#F5F5F7';
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = 'transparent';
                    });
                    
                    if (item.classList.contains('danger')) {
                        item.style.color = '#EF4444';
                    }
                    
                    const icon = item.querySelector('i');
                    if (icon) {
                        icon.style.marginRight = '8px';
                        icon.style.width = '16px';
                    }
                });
            } else {
                // Remove dropdown if it already exists (toggle)
                this.parentNode.removeChild(this.nextElementSibling);
            }
        });
    });
    
    // Click outside to close dropdown
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.action-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.parentNode.removeChild(dropdown);
        });
    });
    
    // Filter dropdown functionality
    const filterDropdown = document.querySelector('.filter-dropdown');
    if (filterDropdown) {
        filterDropdown.addEventListener('click', function() {
            // Check if dropdown already exists
            if (!document.querySelector('.filter-options')) {
                const options = document.createElement('div');
                options.className = 'filter-options';
                options.innerHTML = `
                    <ul>
                        <li>All Orders</li>
                        <li>New Orders</li>
                        <li>In Progress</li>
                        <li>Completed</li>
                        <li>Cancelled</li>
                    </ul>
                `;
                
                // Add dropdown to the DOM
                this.parentNode.style.position = 'relative';
                this.parentNode.appendChild(options);
                
                // Style for the dropdown
                options.style.position = 'absolute';
                options.style.right = '0';
                options.style.top = '50px';
                options.style.backgroundColor = 'white';
                options.style.border = '1px solid #E4E6F0';
                options.style.borderRadius = '8px';
                options.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                options.style.zIndex = '10';
                options.style.minWidth = '150px';
                
                // Style options
                const items = options.querySelectorAll('li');
                items.forEach(item => {
                    item.style.padding = '10px 15px';
                    item.style.fontSize = '14px';
                    item.style.cursor = 'pointer';
                    
                    item.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#F5F5F7';
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = 'transparent';
                    });
                    
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        filterDropdown.querySelector('span').textContent = `Filter: ${this.textContent}`;
                        options.parentNode.removeChild(options);
                    });
                });
            } else {
                // Remove dropdown if it already exists (toggle)
                document.querySelector('.filter-options').parentNode.removeChild(document.querySelector('.filter-options'));
            }
        });
    }
    
    // Upload button functionality
    const uploadButton = document.querySelector('.upload-button');
    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            const selectedOption = document.querySelector('.upload-order-selector select').value;
            
            if (selectedOption === 'Select order...') {
                // Create alert for no selection
                const alert = document.createElement('div');
                alert.className = 'alert';
                alert.textContent = 'Please select an order before uploading';
                
                // Style the alert
                alert.style.backgroundColor = '#FEF2F2';
                alert.style.color = '#EF4444';
                alert.style.padding = '10px 15px';
                alert.style.borderRadius = '8px';
                alert.style.marginTop = '10px';
                alert.style.fontSize = '14px';
                
                // Add alert to DOM
                const uploadSection = document.querySelector('.upload-section');
                
                // Remove existing alert if there is one
                const existingAlert = uploadSection.querySelector('.alert');
                if (existingAlert) {
                    uploadSection.removeChild(existingAlert);
                }
                
                uploadSection.appendChild(alert);
                
                // Remove alert after 3 seconds
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 3000);
            } else {
                // Simulate file upload dialog
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'audio/mpeg';
                fileInput.click();
                
                fileInput.addEventListener('change', function() {
                    if (this.files.length > 0) {
                        // Show success message (in a real app, you'd handle the file upload here)
                        const alert = document.createElement('div');
                        alert.className = 'alert success';
                        alert.textContent = `File "${this.files[0].name}" uploaded successfully for ${selectedOption}`;
                        
                        // Style the alert
                        alert.style.backgroundColor = '#ECFDF5';
                        alert.style.color = '#10B981';
                        alert.style.padding = '10px 15px';
                        alert.style.borderRadius = '8px';
                        alert.style.marginTop = '10px';
                        alert.style.fontSize = '14px';
                        
                        // Add alert to DOM
                        const uploadSection = document.querySelector('.upload-section');
                        
                        // Remove existing alert if there is one
                        const existingAlert = uploadSection.querySelector('.alert');
                        if (existingAlert) {
                            uploadSection.removeChild(existingAlert);
                        }
                        
                        uploadSection.appendChild(alert);
                        
                        // Remove alert after 3 seconds
                        setTimeout(() => {
                            if (alert.parentNode) {
                                alert.parentNode.removeChild(alert);
                            }
                        }, 3000);
                    }
                });
            }
        });
    }
    
    // Sidebar menu item click
    const menuItems = document.querySelectorAll('.menu ul li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Simulate data loading with a subtle animation
    const simulateDataLoading = () => {
        // Add loading state to stats
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            stat.style.opacity = '0.5';
            
            // After a short delay, update to full opacity
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transition = 'opacity 0.5s ease';
            }, 800);
        });
        
        // Add loading state to table
        const tableRows = document.querySelectorAll('.table-row');
        tableRows.forEach((row, index) => {
            row.style.opacity = '0.5';
            
            // Staggered animation for rows
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transition = 'opacity 0.5s ease';
            }, 400 + (index * 200));
        });
    };
    
    // Run the loading animation when page loads
    simulateDataLoading();
    
    // Add refresh button functionality to header
    const refreshButton = document.createElement('div');
    refreshButton.className = 'icon-circle refresh-button';
    refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
    refreshButton.style.cursor = 'pointer';
    refreshButton.setAttribute('title', 'Refresh data');
    
    // Add to header next to other icons
    document.querySelector('.header-icons').prepend(refreshButton);
    
    // Add click event to refresh button
    refreshButton.addEventListener('click', function() {
        this.querySelector('i').classList.add('fa-spin');
        simulateDataLoading();
        
        // Stop spinning after a delay
        setTimeout(() => {
            this.querySelector('i').classList.remove('fa-spin');
        }, 1000);
    });
});