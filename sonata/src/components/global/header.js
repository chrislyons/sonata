document.addEventListener('DOMContentLoaded', function() {
    // Check if we need to create the mobile toggle
    const header = document.querySelector('.header__content');
    const nav = document.querySelector('.header__nav');
    
    if (window.innerWidth <= 768 && !document.querySelector('.header__mobile-toggle')) {
      // Create mobile toggle button
      const mobileToggle = document.createElement('button');
      mobileToggle.className = 'header__mobile-toggle';
      mobileToggle.innerHTML = '☰';
      mobileToggle.setAttribute('aria-label', 'Toggle menu');
      
      // Insert before the nav element
      header.insertBefore(mobileToggle, nav);
      
      // Add event listener
      mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
      });
    }
    
    // Close mobile menu when clicking on a link
    const menuLinks = document.querySelectorAll('.header__menu-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
          nav.classList.remove('active');
          const mobileToggle = document.querySelector('.header__mobile-toggle');
          if (mobileToggle) {
            mobileToggle.innerHTML = '☰';
          }
        }
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        if (!document.querySelector('.header__mobile-toggle')) {
          // Create mobile toggle button if it doesn't exist
          const mobileToggle = document.createElement('button');
          mobileToggle.className = 'header__mobile-toggle';
          mobileToggle.innerHTML = '☰';
          mobileToggle.setAttribute('aria-label', 'Toggle menu');
          
          // Insert before the nav element
          header.insertBefore(mobileToggle, nav);
          
          // Add event listener
          mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
          });
        }
      } else {
        // Remove mobile toggle and reset nav on larger screens
        const mobileToggle = document.querySelector('.header__mobile-toggle');
        if (mobileToggle) {
          mobileToggle.remove();
        }
        nav.classList.remove('active');
      }
    });
  });