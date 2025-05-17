document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Form Validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error').forEach(el => {
            el.style.display = 'none';
        });
        
        // Validate name
        const name = document.getElementById('name').value;
        if (!name || name.length < 2) {
            showError('nameError', 'Please enter your full name');
            return;
        }
        
        // Validate email
        const email = document.getElementById('email').value;
        if (!email || !validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            return;
        }
        
        // Validate subject
        const subject = document.getElementById('subject').value;
        if (!subject) {
            showError('subjectError', 'Please select a subject');
            return;
        }
        
        // Validate message
        const message = document.getElementById('message').value;
        if (!message || message.length < 10) {
            showError('messageError', 'Please enter a message (at least 10 characters)');
            return;
        }
        
        // If all validations pass
        submitForm();
    });
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.previousElementSibling.focus();
    }
    
    function submitForm() {
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // In a real application, this would be an AJAX call to your backend
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! We'll get back to you soon.</p>
            `;
            
            // Insert before form
            contactForm.parentNode.insertBefore(successMessage, contactForm);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
                successMessage.remove();
            }, 3000);
        }, 1500);
    }
    
    // Mobile menu toggle (would need implementation)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', function() {
        alert('Mobile menu would open here in a full implementation');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});