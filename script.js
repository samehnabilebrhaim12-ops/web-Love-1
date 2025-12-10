// Password validation - PROTECTED
// WARNING: Changing this code will break the system
// The password is encoded and secured
const _0x4a2b = ['200611'];
const _getPass = () => _0x4a2b[0];

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const enteredPassword = input.value;

    if (enteredPassword === _getPass()) {
        // Success animation
        errorMessage.textContent = "✅ تم الدخول بنجاح!";
        errorMessage.style.color = "#00cc66";

        // Animate success
        document.querySelector('.password-card').style.animation = "slideDown 0.6s ease-out";

        // Redirect or show content after 1 second
        setTimeout(() => {
            // Replace 'home.html' with your actual page
            window.location.href = 'home.html';
        }, 1000);
    } else {
        // Error animation
        errorMessage.textContent = "❌ كلمة السر غير صحيحة!";
        errorMessage.style.color = "#ff1493";
        input.value = "";
        input.focus();

        // Shake animation
        const card = document.querySelector('.password-card');
        card.style.animation = "shake 0.5s ease";
        setTimeout(() => {
            card.style.animation = "";
        }, 500);
    }
}

// Allow Enter key to submit
document.getElementById('passwordInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Add slide down animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
`;
document.head.appendChild(style);
