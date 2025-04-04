document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/signup", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Signup successful") {
            alert("Signup Successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});
