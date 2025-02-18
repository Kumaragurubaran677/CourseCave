document.addEventListener("DOMContentLoaded", function () {
    const userDisplay = document.getElementById("userDisplay");
    const loginLink = document.getElementById("loginLink");

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        // Replace login link with username & logout button
        userDisplay.innerHTML = `
            
            <button id="logoutBtn" style="margin-left:10px;margin-top:10px; background: none; border: none; color: red; cursor: pointer;">Logout</button>
        `;

        // Logout functionality
        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("user"); // Clear user data
            location.reload(); // Refresh page
        });
    }
});
