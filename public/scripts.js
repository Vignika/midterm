document.getElementById('open-login').addEventListener('click', function() {
    document.getElementById('login-modal').style.display = 'block';
});

document.getElementById('open-register').addEventListener('click', function() {
    document.getElementById('register-modal').style.display = 'block';
});

document.getElementById('close-login').addEventListener('click', function() {
    document.getElementById('login-modal').style.display = 'none';
});

document.getElementById('close-register').addEventListener('click', function() {
    document.getElementById('register-modal').style.display = 'none';
});

document.getElementById('show-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('login-modal').style.display = 'block';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('login-modal')) {
        document.getElementById('login-modal').style.display = 'none';
    }
    if (event.target === document.getElementById('register-modal')) {
        document.getElementById('register-modal').style.display = 'none';
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            // Clear the form
            document.getElementById('registerForm').reset();
        } else {
            alert(result.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred during registration');
    }
});
