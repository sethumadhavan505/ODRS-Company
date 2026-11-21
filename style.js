const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');

registerTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.add('toggled');
});

loginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.remove('toggled');
});

/* Firebase handles login submission; no localStorage password checks are used. */

/* ===== PASSWORD VISIBILITY TOGGLE ===== */

function togglePassword(inputId, button) {
    const passwordInput = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

        button.setAttribute("aria-label", "Hide password");
    } else {
        passwordInput.type = "password";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

        button.setAttribute("aria-label", "Show password");
    }
}
