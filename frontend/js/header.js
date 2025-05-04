fetch('header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        const mainPageBtn = document.getElementById("main-page-link");
        const logoutBtn = document.getElementById("logout");
        const profileBtn = document.getElementById("profile");

        if(mainPageBtn) {
            mainPageBtn.addEventListener("click", function (e){
                e.preventDefault();
                window.location.href = "main.html";
            })
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", function(){
                fetch("http://localhost:8080/logout", {
                    method: "POST",
                    credentials: 'include'
                }).then(response => {
                    if (response.ok){
                        window.location.href = "login.html";
                    }
                    else {
                        throw new Error("Error");
                    }
                })
            });
        }

        if (profileBtn) {
            profileBtn.addEventListener("click", function(){
                window.location.href = "profile.html";
            });
        }
    });
