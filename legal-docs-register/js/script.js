document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const registerForm = document.getElementById('registerForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerBtn = document.getElementById('registerBtn');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        
        // Reset classes
        passwordStrength.className = 'password-strength';
        
        if (password.length > 0) {
            passwordStrength.classList.add(strength);
        }
    });

    // Form validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        document.querySelectorAll('.error').forEach(el => {
            el.style.display = 'none';
            el.previousElementSibling?.classList?.remove('error');
        });
        
        // Validate full name
        const fullName = document.getElementById('fullName').value;
        if (!fullName || fullName.length < 3) {
            showError('fullName', 'nameError', 'Please enter your full name');
            return;
        }
        
        // Validate email
        const email = document.getElementById('email').value;
        if (!email || !validateEmail(email)) {
            showError('email', 'emailError', 'Please enter a valid email address');
            return;
        }
        
        // Validate password
        const password = passwordInput.value;
        if (!password || password.length < 8) {
            showError('password', 'passwordError', 'Password must be at least 8 characters');
            return;
        }
        
        // Validate password strength
        const strength = checkPasswordStrength(password);
        if (strength === 'weak') {
            showError('password', 'passwordError', 'Please choose a stronger password');
            return;
        }
        
        // Validate confirm password
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
            return;
        }
        
        // Validate terms checkbox
        const termsChecked = document.getElementById('terms').checked;
        if (!termsChecked) {
            showError('terms', 'termsError', 'You must agree to the terms and conditions');
            return;
        }
        
        // Simulate registration (in a real app, this would be an API call)
        simulateRegistration(fullName, email, password);
    });

    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function checkPasswordStrength(password) {
        // Check for length, special chars, numbers, uppercase/lowercase
        const hasLength = password.length >= 8;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        
        let strength = 0;
        if (hasLength) strength++;
        if (hasSpecialChar) strength++;
        if (hasNumber) strength++;
        if (hasUpper && hasLower) strength++;
        
        if (strength < 2) return 'weak';
        if (strength < 4) return 'medium';
        return 'strong';
    }
    
    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(errorId);
        const inputContainer = input.closest('.input-with-icon') || input.closest('.checkbox-group');
        
        if (inputContainer) inputContainer.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.focus();
    }
    
    function simulateRegistration(fullName, email, password) {
        // Show loading state
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        registerBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset button state
            registerBtn.textContent = 'Create Account';
            registerBtn.disabled = false;
            
            // For demo purposes, just show success
            alert(`Registration successful for ${email}\n\nIn a real application, this would redirect to the dashboard.`);
            
            // In a real app, you would redirect:
            // window.location.href = '/dashboard.html';
        }, 2000);
    }
});