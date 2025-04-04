document.addEventListener("DOMContentLoaded", function () {
    const userDisplay = document.getElementById("userDisplay");

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        userDisplay.innerHTML = `
            <img src="images/profile-icon.png" id="profileIcon" alt="Profile" style="width:30px; cursor:pointer;">
            <button id="logoutBtn" style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">Logout</button>
        `;

        // Logout functionality
        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("user"); // Clear stored user data
            sessionStorage.removeItem("lastPage"); // Remove stored last page
            window.location.href = "login.html"; // Redirect to login page
        });
    }
});
