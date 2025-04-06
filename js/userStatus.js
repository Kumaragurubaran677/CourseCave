document.addEventListener("DOMContentLoaded", function () {
    const userDisplay = document.getElementById("userDisplay");

    // Check if user data exists
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        // Show username and logout button
        userDisplay.innerHTML = `
            <button id="logoutBtn" style="margin-left:10px; margin-top:10px; background: none; border: none; color: red; cursor: pointer;">Logout</button>
        `;

        // Logout functionality
        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("user"); // Clear user data
            window.location.reload(); // Refresh page to update UI
        });

        // Remove user data when the page is refreshed
        //window.addEventListener("beforeunload", function () {
            //localStorage.removeItem("user");
        //});

    } else {
        // Show login button if no user is found
        userDisplay.innerHTML = `<a href="login.html">Login</a>`;
    }
});
