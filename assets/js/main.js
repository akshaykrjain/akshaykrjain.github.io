// Enhanced website functionality with analytics tracking
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
    
    // Initialize analytics tracking
    initAnalytics();
});

// Analytics tracking functions
function initAnalytics() {
    // Track page view with custom parameters
    trackPageView();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track external link clicks
    trackExternalLinks();
    
    // Track skill interactions
    trackSkillClicks();
    
    // Track professional sections
    trackSectionViews();
    
    // Track time spent on site
    trackTimeOnSite();
}

function trackPageView() {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'custom_parameter_1': 'portfolio_site',
            'user_engagement': 'high_intent'
        });
        
        // Track as a professional portfolio view
        gtag('event', 'portfolio_view', {
            'event_category': 'professional',
            'event_label': 'devops_engineer',
            'value': 1
        });
    }
    
    // Simple visitor counter (localStorage)
    const visits = localStorage.getItem('siteVisits') || 0;
    const newVisits = parseInt(visits) + 1;
    localStorage.setItem('siteVisits', newVisits);
    localStorage.setItem('lastVisit', new Date().toISOString());
    
    // Track returning visitors
    if (newVisits > 1) {
        trackEvent('user_engagement', 'returning_visitor', `visit_${newVisits}`);
    }
}

function trackSectionViews() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('h2')?.textContent || 'unknown';
                trackEvent('section_view', 'portfolio_section', sectionTitle.toLowerCase().replace(/[^a-z0-9]/g, '_'));
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

function trackTimeOnSite() {
    const startTime = Date.now();
    
    // Track time milestones
    setTimeout(() => trackEvent('time_on_site', '30_seconds'), 30000);
    setTimeout(() => trackEvent('time_on_site', '1_minute'), 60000);
    setTimeout(() => trackEvent('time_on_site', '2_minutes'), 120000);
    setTimeout(() => trackEvent('time_on_site', '5_minutes'), 300000);
    
    // Track when user leaves
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('session_duration', 'total_time', `${timeSpent}_seconds`);
    });
}

function trackScrollDepth() {
    let maxScroll = 0;
    let tracked25 = false, tracked50 = false, tracked75 = false, tracked100 = false;
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track scroll milestones
            if (scrollPercent >= 25 && !tracked25) {
                tracked25 = true;
                trackEvent('scroll_depth', '25_percent');
            } else if (scrollPercent >= 50 && !tracked50) {
                tracked50 = true;
                trackEvent('scroll_depth', '50_percent');
            } else if (scrollPercent >= 75 && !tracked75) {
                tracked75 = true;
                trackEvent('scroll_depth', '75_percent');
            } else if (scrollPercent >= 100 && !tracked100) {
                tracked100 = true;
                trackEvent('scroll_depth', '100_percent');
            }
        }
    });
}

function trackExternalLinks() {
    document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.href;
            let linkType = 'external';
            let eventValue = 1;
            
            if (href.includes('linkedin.com')) {
                linkType = 'linkedin_profile';
                eventValue = 5; // Higher value for professional networking
            } else if (href.includes('github.com')) {
                linkType = 'github_profile';
                eventValue = 4; // High value for technical portfolio
            } else if (href.startsWith('mailto:')) {
                linkType = 'email_contact';
                eventValue = 10; // Highest value for direct contact
            } else if (href.startsWith('tel:')) {
                linkType = 'phone_contact';
                eventValue = 8; // High value for phone contact
            }
            
            // Track with professional context
            if (typeof gtag !== 'undefined') {
                gtag('event', 'professional_link_click', {
                    'event_category': 'networking',
                    'event_label': linkType,
                    'value': eventValue,
                    'custom_parameter_1': 'career_opportunity'
                });
            }
            
            trackEvent('link_click', linkType, href);
        });
    });
}

function trackSkillClicks() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const skillName = this.textContent.trim();
            
            // Track skill interest with professional context
            if (typeof gtag !== 'undefined') {
                gtag('event', 'skill_interest', {
                    'event_category': 'technical_skills',
                    'event_label': skillName.toLowerCase(),
                    'value': 2,
                    'custom_parameter_1': 'skill_evaluation'
                });
            }
            
            trackEvent('skill_interaction', 'skill_click', skillName);
        });
        
        // Also track hover events for skill interest
        tag.addEventListener('mouseenter', function() {
            const skillName = this.textContent.trim();
            trackEvent('skill_hover', 'skill_interest', skillName);
        });
    });
}

function trackEvent(action, category, label = '') {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': 1
        });
    }
    
    // Console log for debugging (remove in production)
    console.log('Analytics Event:', { action, category, label });
}

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
        
        // Track form submission attempt with professional context
        if (typeof gtag !== 'undefined') {
            gtag('event', 'lead_generation', {
                'event_category': 'professional_inquiry',
                'event_label': data.subject || 'general',
                'value': 15, // High value for contact form submissions
                'custom_parameter_1': 'potential_opportunity'
            });
        }
        
        trackEvent('form_submit', 'contact_form', data.subject || 'general');
        
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
            
            // Track successful form processing
            trackEvent('form_success', 'contact_form', data.subject || 'general');
            
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
        
        // Track form field interactions
        input.addEventListener('focus', function() {
            trackEvent('form_interaction', 'field_focus', this.name || this.id);
        });
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
