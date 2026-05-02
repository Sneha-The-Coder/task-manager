// =======================
// 🔐 LOGIN
// =======================
async function login() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`https://captivating-simplicity-production-ebd2.up.railway.app/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);

    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}


// =======================
// 📝 SIGNUP
// =======================
async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const res = await fetch("https://captivating-simplicity-production-ebd2.up.railway.app/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Signup failed");
      return;
    }

    alert("Signup successful");
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}


// =======================
// 🔒 LOGOUT
// =======================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}