document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const printBtn = document.getElementById('printBtn');
    const acceptBtn = document.getElementById('acceptBtn');
    const tocList = document.getElementById('tocList');
    const termsSections = document.querySelectorAll('.terms-section');
    const updateDate = document.getElementById('updateDate');
    
    // Set current date
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    updateDate.textContent = currentDate.toLocaleDateString('en-US', options);
    
    // Generate Table of Contents
    termsSections.forEach(section => {
        const id = section.id;
        const title = section.querySelector('h2').textContent;
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = title;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    // Highlight active TOC item while scrolling
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const tocLink = document.querySelector(`.toc-sidebar a[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                tocLink.classList.add('active');
            } else {
                tocLink.classList.remove('active');
            }
        });
    }, observerOptions);
    
    termsSections.forEach(section => {
        observer.observe(section);
    });
    
    // Print functionality
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Accept terms functionality
    acceptBtn.addEventListener('click', function() {
        // In a real application, this would save acceptance to database
        // and potentially redirect to another page
        
        // For demo purposes, show confirmation
        this.innerHTML = '<i class="fas fa-check-circle"></i> Terms Accepted';
        this.disabled = true;
        
        // Show confirmation message
        const confirmation = document.createElement('div');
        confirmation.className = 'confirmation-message';
        confirmation.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Thank you for accepting our Terms of Service</span>
        `;
        
        this.parentNode.insertBefore(confirmation, this.nextSibling);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});