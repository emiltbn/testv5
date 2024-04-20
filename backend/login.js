document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('auth-token', data.token);
                    window.location.href = '/path/to/another/page';
                } else {
                    alert(data.message || 'Đăng nhập không thành công');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Đăng nhập thất bại: ' + error.message);
            });
    });
});