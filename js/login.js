document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Login Successful!");
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});
