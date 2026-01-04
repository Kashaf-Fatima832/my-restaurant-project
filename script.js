const searchicon1 = document.querySelector('#searchicon1');
const search1 = document.querySelector('#searchinput1');

if (searchicon1) {
    searchicon1.addEventListener('click', function () {
        search1.style.display = (search1.style.display === 'flex') ? 'none' : 'flex';
    });
}

const searchicon2 = document.querySelector('#searchicon2');
const search2 = document.querySelector('#searchinput2');

if (searchicon2) {
    searchicon2.addEventListener('click', function () {
        search2.style.display = (search2.style.display === 'flex') ? 'none' : 'flex';
    });
}

const bar = document.querySelector('.fa-bars');
const cross = document.querySelector('#hdcross');
const headerbar = document.querySelector('.headerbar');

if (bar) {
    bar.addEventListener('click', function () {
        headerbar.style.right = '0%';
    });
}

if (cross) {
    cross.addEventListener('click', function () {
        headerbar.style.right = '-100%';
    });
}

// Helper for messages
function showMessage(elementId, message, type) {
    const msgElement = document.getElementById(elementId);
    if (msgElement) {
        msgElement.style.display = 'block';
        msgElement.textContent = message;
        msgElement.className = 'signin-message ' + (type === 'success' ? 'msg-success' : 'msg-error');

        // Auto hide after 3 seconds
        setTimeout(() => {
            msgElement.style.display = 'none';
        }, 3000);
    }
}


// ====== SIGN-UP FUNCTIONALITY ======
const signupForm = document.getElementById('signupform');

if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;

        // Fetch users from localStorage or create empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            showMessage('signupMessage', "⚠️ Email already exists! Please use a different email.", 'error');
            return;
        }

        if (password !== confirm) {
            showMessage('signupMessage', "⚠️ Passwords do not match!", 'error');
            return;
        }

        // Add new user
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        showMessage('signupMessage', "✅ Account created successfully! Redirecting...", 'success');
        signupForm.reset();

        setTimeout(() => {
            window.location.href = "sign-in.html";
        }, 1500);
    });
}

// ====== SIGN-IN FUNCTIONALITY ======
const signinForm = document.getElementById('signinForm');

if (signinForm) {
    signinForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check credentials
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            showMessage('signinMessage', `✅ Welcome back, ${user.name}!`, 'success');
            // Store login status
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            showMessage('signinMessage', "⚠️ Invalid email or password!", 'error');
        }
    });
}

// ====== LOGOUT FUNCTIONALITY ======
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
}

// ====== CHECK LOGIN STATUS ON HOMEPAGE ======
window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Update Header Icons if logged in
    if (loggedInUser) {
        const userIcons = document.querySelectorAll('.fa-user');
        userIcons.forEach(icon => {
            icon.style.color = 'var(--gold)'; // Highlight user icon
            icon.parentElement.href = "#"; // Disable link to signin
            icon.parentElement.title = `Logged in as ${loggedInUser.name}`;

            // Optional: Add logging out on click or double click
            icon.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm(`Hi ${loggedInUser.name}! Do you want to logout?`)) {
                    logout();
                }
            });
        });

        // If we want to show a specific message somewhere
        const statusMsg = document.getElementById('loginStatus');
        if (statusMsg) {
            // We are hiding this ugly element now via CSS or removing it from HTML, 
            // but if it exists, let's just hide it or make it a toast.
            statusMsg.style.display = 'none';
        }
    }
});
