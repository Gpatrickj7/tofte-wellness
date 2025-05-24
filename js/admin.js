 document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const messageDiv = document.getElementById('message');

    //Clear any existing messages
    function clearMessage() {
        messageDiv.innerHTML = '';
    }

    //Show error message
    function showError(message) {
        messageDiv.innerHTML = `<div class="error-message">${message}</div>`;
    }

    //Show success message
    function showSuccess(message) {
        messageDiv.innerHTML = `<div class="success-message">${message}</div>`;
    }

    //Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearMessage();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        //basic validation
        if (!email || !password) {
            showError('Please enter both email and password');
            return;
        }

        //Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }


        //Disable button and show loading 
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';

        //Call login API
        fetch('https://newsletter-api-one.vercel.app/api/auth/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
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
            //Store the JWT token
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.user));

            //Show success message
            showSuccess('Login successful! Redirecting...');

            //Redirect to dashboard after short delay
            setTimeout(() => {
                window.location.href = '../dashboard/';
            }, 1500);

        })
        .catch (error => {
            console.error('Login error:', error);

            //Re-enable button
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login';

            //Show specific error messages
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.message.includes('Invalid credentials')) {
                errorMessage = 'Invalid email or password';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Connection problem. Please check your internet and try again.';
            }
            
            showError(errorMessage);
        });
    });

    //Check if user is already logged in
    if (localStorage.getItem('adminToken')) {
        window.location.href = '../dashboard/';
    }

 });
