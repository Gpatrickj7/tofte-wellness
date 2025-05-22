document.addEventListener('DOMContentLoaded', function() {
    // simple form handling
    const newsletterForm = document.getElementById('newsletter-form');

    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if(emailInput && emailInput.value) {
                //Create form data to send to formspree
                const formData = new FormData(this);
                //send data form to formspree
                fetch("https://newsletter-api-one.vercel.app/api/subscribe", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                    
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');

                })

                .then (data => {
                    //handle success

                    //success message 
                    const successMessage = document.createElement('p');
                    successMessage.textContent = "Thanks! we'll notify you when we launch.";
                    successMessage.style.color = '#49535F';

                    //hide the form
                    this.style.display = 'none';

                    //show success message
                    this.parentNode.appendChild(successMessage);

                })
                .catch(error => {
                    //Handle error
                    console.error('Error:', error);
                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = "Oops! Something went wrong. Please try again.";
                    errorMessage.style.color = '#ff3333';

                    newsletterForm.insertAdjacentElement('afterend', errorMessage);


                });
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