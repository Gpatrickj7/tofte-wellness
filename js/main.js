document.addEventListener('DOMContentLoaded', function() {
    // simple form handling
    const newsletterForm = document.getElementById('newsletter-form');

    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if(emailInput && emailInput.value) {
                //Display Success message for the time being
                //will eventually send to backend

                //success message 
                const successMessage = document.createElement('p');
                successMessage.textContent = "Thanks! we'll notify you when we launch.";
                successMessage.style.color = '#49535F';

                //hide the form
                this.style.display = 'none';

                //show success message
                this.parentNode.appendChild(successMessage);

            }
        });
}


    //subtle logo animation

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