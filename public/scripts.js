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
    if (event.target == document.getElementById('login-modal')) {
        document.getElementById('login-modal').style.display = 'none';
    }
    if (event.target == document.getElementById('register-modal')) {
        document.getElementById('register-modal').style.display = 'none';
    }
});
