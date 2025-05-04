submitTripForm();
showTrips();

function submitTripForm() {
    document.getElementById('add-button').addEventListener('click', async function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const startDateStr = document.getElementById('startDate').value;
        const endDateStr = document.getElementById('endDate').value;

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        if (startDate <= endDate) {
            await fetch('http://localhost:8080/trip', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({name, startDate, endDate})
            }).catch(error => console.error("Błąd: " + error));
            location.reload();
        } else {
            document.getElementById('invalid-date').hidden = false;
        }
    })
}

function showTrips() {
    fetch('http://localhost:8080/trip', {
        method: "GET",
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
                window.location.href = "login.html";
            } else if (!response.ok) {
                throw new Error("Error")
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('allTrips');

            data.forEach(trip => {
                const mainDiv = document.createElement('div');
                mainDiv.classList.add("card", "my-3", "shadow");
                mainDiv.style.cursor = "pointer";

                mainDiv.addEventListener("click", () => {
                    window.location.href = `trip-details.html?id=${trip.id}`;
                });

                const cardBody = document.createElement('div');
                cardBody.classList.add("card-body");

                const nameTag = document.createElement('h5');
                nameTag.className = "card-title text-primary";
                nameTag.textContent = `${trip.name}`;

                const divStart = document.createElement('div')
                divStart.className = "card-taxt";
                divStart.textContent = `Starts: ${trip.startDate}`;

                const divEnd = document.createElement('div')
                divEnd.className = "card-text";
                divEnd.textContent = `End: ${trip.endDate}`;

                cardBody.appendChild(nameTag);
                cardBody.appendChild(divStart);
                cardBody.appendChild(divEnd);
                mainDiv.appendChild(cardBody);
                list.appendChild(mainDiv);
            })
        })
}