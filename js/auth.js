document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    // Redirect to login page if user is not authenticated
    if (!user || !user.token) {
        // Save the current page to redirect back after login
        localStorage.setItem("redirectAfterLogin", window.location.href);
        window.location.href = "login.html";
    } else {
        // Update Navbar: Change "Login" to Profile Icon
        const loginLink = document.getElementById("loginLink");
        if (loginLink) {
            loginLink.innerHTML = `<i class="bi bi-person-circle"></i>`;
            loginLink.href = "profile.html"; // Redirect to the user profile page
        }
    }
});
