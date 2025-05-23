document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');

    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');

            // Clear any existing error messages
            const existingErrors = this.parentNode.querySelectorAll('.error-message');
            existingErrors.forEach(error => error.remove());

            if(emailInput && emailInput.value) {
                // Better email validation
                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                    showError(this, "Please enter a valid email address");
                    return;
                }

                // Disable button and show loading state
                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";

                fetch("https://newsletter-api-one.vercel.app/api/subscribe", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email  // Use the validated email variable
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(data => {
                            throw new Error(data.error || `Server error: ${response.status}`);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    // Track the newsletter signup event
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'newsletter_signup', {
                            'event_category': 'engagement',
                            'event_label': 'newsletter_form'
                        });
                    }
                    
                    // Handle different success scenarios
                    let message = "Thanks! We'll notify you when we launch.";
                    if (data.alreadyExists) {
                        message = "You're already on our list! We'll keep you updated.";
                    }
                    
                    // Show success message
                    const successMessage = document.createElement('p');
                    successMessage.textContent = message;
                    successMessage.style.color = '#49535F';
                    successMessage.className = 'success-message';

                    // Hide the form
                    this.style.display = 'none';

                    // Show success message
                    this.parentNode.appendChild(successMessage);
                })
                .catch(error => {
                    console.error('Newsletter signup error:', error);
                    
                    // Re-enable button
                    submitButton.disabled = false;
                    submitButton.textContent = "Notify Me";
                    
                    // Show specific error messages
                    let errorMessage = "Something went wrong. Please try again.";
                    
                    if (error.message.includes('Failed to fetch')) {
                        errorMessage = "Connection problem. Please check your internet and try again.";
                    } else if (error.message.includes('already registered')) {
                        errorMessage = "You're already on our list!";
                    } else if (error.message.includes('Valid email required')) {
                        errorMessage = "Please enter a valid email address.";
                    }
                    
                    showError(this, errorMessage);
                });
            } else {
                showError(this, "Please enter your email address");
            }
        });
    }

    // Helper function for showing errors
    function showError(form, message) {
        const errorElement = document.createElement('p');
        errorElement.textContent = message;
        errorElement.style.color = '#ff3333';
        errorElement.className = 'error-message';
        form.insertAdjacentElement('afterend', errorElement);
    }

    // Logo animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        logo.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
});