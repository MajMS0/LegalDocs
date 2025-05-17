// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');
const createDocBtn = document.getElementById('createDocBtn');
const viewDocBtns = document.querySelectorAll('.view-docs');
const documentModal = document.getElementById('documentModal');
const successModal = document.getElementById('successModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const generateDocBtn = document.getElementById('generateDocBtn');
const documentForm = document.getElementById('documentForm');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    navLinks.style.display = isExpanded ? 'none' : 'flex';
    authButtons.style.display = isExpanded ? 'none' : 'flex';
});

// View Document Buttons
viewDocBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        alert(`Showing all ${category} documents`);
    });
});

// Create Document Button
createDocBtn.addEventListener('click', () => {
    documentModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close Modals
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        documentModal.style.display = 'none';
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === documentModal || e.target === successModal) {
        documentModal.style.display = 'none';
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Generate Document
generateDocBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (documentForm.checkValidity()) {
        // In a real app, this would send data to backend
        const formData = new FormData(documentForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Document data:', data);
        
        // Show success modal
        documentModal.style.display = 'none';
        successModal.style.display = 'flex';
    } else {
        alert('Please fill in all required fields');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize tooltips (would use a library in production)
const initTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(e) {
        const tooltipText = e.target.dataset.tooltip;
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }
    
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
};

// Initialize the app
const init = () => {
    initTooltips();
    console.log('LegalEase app initialized');
};

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);