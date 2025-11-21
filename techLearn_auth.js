// Toggle between login and register forms
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    
    if (registerLink && loginLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.auth-form').style.display = 'none';
            registerForm.style.display = 'block';
        });
        
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            document.querySelector('.auth-form').style.display = 'block';
        });
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            // Simulate login (in a real app, this would call an API)
            simulateLogin(email, password);
        });
    }
    
    // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            
            // Validation
            if (!name || !email || !password || !confirm) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate registration (in a real app, this would call an API)
            simulateRegistration(name, email, password);
        });
    }
});

// Simulate login (frontend only)
function simulateLogin(email, password) {
    // Get existing users from localStorage or create empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Set current user
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Redirect to homepage
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
}

// Simulate registration (frontend only)
function simulateRegistration(name, email, password) {
    // Get existing users from localStorage or create empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password // In a real app, never store plain text passwords!
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Redirect to homepage
    window.location.href = 'index.html';
}

// Logout function
function logout(e) {
    if (e) e.preventDefault();
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Admin logout
const adminLogoutLink = document.getElementById('logout-link');
if (adminLogoutLink) {
    adminLogoutLink.addEventListener('click', logout);
}