// auth-admin.js

document.addEventListener("DOMContentLoaded", function () {
    const adminToken = localStorage.getItem("adminToken");

    // Redirect to admin login page if not authenticated
    if (!adminToken) {
        // Save the current page for redirect after successful login
        localStorage.setItem("redirectAfterLogin", window.location.href);
        window.location.href = "login-admin.html";
    } else {
        // Optional: Update the nav or UI for logged-in admin
        const loginLink = document.getElementById("loginLink");
        if (loginLink) {
            loginLink.innerHTML = `<i class="bi bi-person-circle"></i>`;
            loginLink.href = "#"; // Can be changed to admin profile page if needed
        }
    }
});
