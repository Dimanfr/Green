// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('hidden');
        });
    }

    // Check for success parameter in URL (for Netlify redirects)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const kontaktForm = document.getElementById('kontaktForm');
        const successMessage = document.getElementById('successMessage');
        if (kontaktForm && successMessage) {
            kontaktForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Contact form handling
    const kontaktForm = document.getElementById('kontaktForm');
    const successMessage = document.getElementById('successMessage');
    
    if (kontaktForm) {
        kontaktForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(kontaktForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Show loading state
            const submitBtn = kontaktForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loadingText = submitBtn.querySelector('.loading-text');
            
            submitText.classList.add('hidden');
            loadingText.classList.remove('hidden');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Hide form and show success message
                kontaktForm.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Reset form
                kontaktForm.reset();
                
                // Reset button
                submitText.classList.remove('hidden');
                loadingText.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Optional: Send data to server/Netlify
                // For Netlify forms, you can use the following:
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                }).catch(error => {
                    console.log('Form submission error:', error);
                });
                
            }, 1500); // Simulate 1.5 second delay
        });
    }
    
    // Animation trigger on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('animate-on-load');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-load');
    animatedElements.forEach(el => observer.observe(el));
    
    // Trigger initial animations for elements already in view
    setTimeout(() => {
        animatedElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.remove('animate-on-load');
            }
        });
    }, 100);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('input, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-emerald-500');
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-emerald-500');
        });
    });
});

// Success message auto-hide after 10 seconds (optional)
function autoHideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage && !successMessage.classList.contains('hidden')) {
        setTimeout(() => {
            successMessage.classList.add('hidden');
            const kontaktForm = document.getElementById('kontaktForm');
            if (kontaktForm) {
                kontaktForm.style.display = 'block';
            }
        }, 10000); // 10 seconds
    }
}

// Call auto-hide function when success message is shown
document.addEventListener('DOMContentLoaded', function() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!successMessage.classList.contains('hidden')) {
                        autoHideSuccessMessage();
                    }
                }
            });
        });
        
        observer.observe(successMessage, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});
