const users = [
    { email: "sawani.wh@gmail.com", password: "1" },
    { email: "thiwandika.whs@gmail.com", password: "123" }
];

// Function to check credentials
function checkCredentials(email, password) {
    return users.some(user => user.email === email && user.password === password);
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.querySelector('.email');
    const passwordInput = document.querySelector('.pass');
    const email = emailInput.value;
    const password = passwordInput.value;

    if (checkCredentials(email, password)) {
        alert('Login successful!');
        // Redirect to the desired page, e.g., dashboard.html
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Adding event listener to the login button
document.querySelector('.login_btn').addEventListener('click', handleLogin);