document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const googleBtn = document.querySelector('.btn-social.google');
    const microsoftBtn = document.querySelector('.btn-social.microsoft');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        document.querySelectorAll('.error').forEach(el => {
            el.style.display = 'none';
            el.previousElementSibling.classList.remove('error');
        });
        
        // Validate email
        const email = document.getElementById('email').value;
        if (!email || !validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            return;
        }
        
        // Validate password
        const password = passwordInput.value;
        if (!password || password.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            return;
        }
        
        // Simulate login (in a real app, this would be an API call)
        simulateLogin(email, password);
    });
    
    // Social login buttons
    googleBtn.addEventListener('click', function() {
        alert('Google login would be implemented here');
    });
    
    microsoftBtn.addEventListener('click', function() {
        alert('Microsoft login would be implemented here');
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const inputContainer = field.closest('.input-with-icon');
        const errorElement = inputContainer.nextElementSibling;
        
        inputContainer.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.focus();
    }
    
    function simulateLogin(email, password) {
        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // For demo purposes, just show success
            alert(`Login successful for ${email}\n\nIn a real application, this would redirect to the dashboard.`);
            
            // In a real app, you would redirect:
            // window.location.href = '/dashboard.html';
        }, 1500);
    }
});