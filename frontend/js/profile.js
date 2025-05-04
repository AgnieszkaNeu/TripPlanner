fetch('http://localhost:8080/user', {
    method:"GET",
    credentials: 'include'
}).then(response => {
        if (response.status === 401) {
            window.location.href = "login.html";
        }
        else if (!response.ok) {
            throw new Error("Error")
        }
        return response.json();
    })
    .then(data => {
        const name = document.getElementById('username');
        name.textContent =`${data.username}`;
    })