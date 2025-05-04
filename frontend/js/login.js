document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    document.getElementById("incorrect-credentials").hidden = true;
    document.getElementById("empty-username").hidden = true;
    document.getElementById("username-div").classList.replace("mb-1", "mb-4");
    document.getElementById("empty-password").hidden = true;

    let login = true
    if (username === "") {
        document.getElementById("empty-username").removeAttribute("hidden");
        document.getElementById("username-div").classList.replace("mb-4", "mb-1");
        document.getElementById("username").classList.add("is-invalid");
        login = false;
    }
    if (password === "") {
        document.getElementById("empty-password").removeAttribute("hidden");
        document.getElementById("password-div").classList.replace("mb-4", "mb-1");
        document.getElementById("password").classList.add("is-invalid");
        login = false;
    }

    if (login) {
        fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({username, password})
        }).then(response => {
            if(response.ok){
                window.location.href = "main.html";
            }
            if(response.status === 403) {
                document.getElementById("incorrect-credentials").removeAttribute("hidden");
                document.getElementById("password-div").classList.replace("mb-4", "mb-1");
                document.getElementById("password").classList.add("is-invalid");
                document.getElementById("username").classList.add("is-invalid");
            }
        }).catch(error => console.error("Błąd: " + error));
    }

});