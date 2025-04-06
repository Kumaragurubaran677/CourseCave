const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector(".sign-up form");
    const loginForm = document.querySelector(".sign-in form");

    // Handle Sign-Up
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = signupForm.querySelector("input[placeholder='Name']").value.trim();
        const email = signupForm.querySelector("input[placeholder='Email']").value.trim();
        const password = signupForm.querySelector("input[placeholder='Password']").value.trim();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        alert(result.message);
    });

    // Handle Login
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = loginForm.querySelector("input[placeholder='Email']").value.trim();
        const password = loginForm.querySelector("input[placeholder='Password']").value.trim();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login Successful!");
            localStorage.setItem("user", JSON.stringify({
                name: result.name || "",
                token: result.token
            }));
            window.location.href = "dashboard.html"; // redirect to dashboard for admin        
        } else {
            alert(result.message || "Invalid Credentials!");
        }
    });
});
