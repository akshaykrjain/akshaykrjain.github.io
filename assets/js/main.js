// Enhanced website functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Create and add scroll to top button
    createScrollToTopButton();
    
    // Add smooth reveal animations
    addScrollAnimations();
    
    // Add typing effect to subtitle
    addTypingEffect();
    
    // Add skill hover effects
    addSkillInteractions();
    
    // Initialize contact form
    initContactForm();
});

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation styles and observe sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

function addTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

function addSkillInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Enhanced contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual form handler)
        setTimeout(() => {
            // Create mailto link with form data
            const subject = encodeURIComponent(`Contact Form: ${data.subject || 'General Inquiry'}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Company: ${data.company || 'Not specified'}\n` +
                `Subject: ${data.subject || 'General Inquiry'}\n\n` +
                `Message:\n${data.message}`
            );
            
            // Open default email client
            window.location.href = `mailto:akshayjain.ecb@gmail.com?subject=${subject}&body=${body}`;
            
            // Reset form and button
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Email client opened! Please send the email to complete your message.', 'success');
            
        }, 1500);
    });
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidationError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearValidationError(e);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    let errorElement = formGroup.querySelector('.field-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.85em;
            margin-top: 5px;
            display: flex;
            align-items: center;
        `;
        formGroup.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right: 5px;"></i>${message}`;
    field.style.borderColor = '#e74c3c';
}

function clearValidationError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '#e9ecef';
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea, select')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Press 'B' to scroll to bottom
    if (e.key === 'b' || e.key === 'B') {
        if (!e.target.matches('input, textarea, select')) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
    
    // Press 'C' to scroll to contact form
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea, select')) {
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="margin-right: 10px;"></i>
        ${message}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9em;
        display: flex;
        align-items: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}
