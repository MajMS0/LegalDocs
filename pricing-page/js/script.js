document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Billing Toggle
    billingToggle.addEventListener('change', function() {
        if (this.checked) {
            // Show annual pricing
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'block');
        } else {
            // Show monthly pricing
            monthlyPrices.forEach(price => price.style.display = 'block');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });
    
    // FAQ Accordion
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            } else {
                faqItem.classList.remove('active');
            }
        });
    });
    
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
    
    // Initialize with monthly pricing showing
    annualPrices.forEach(price => price.style.display = 'none');
});