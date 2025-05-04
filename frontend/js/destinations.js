const params = new URLSearchParams(window.location.search);
const tripId = params.get('id');

showTripDetails();
submitDestinationForm();

function showDestinations() {

    fetch(`http://localhost:8080/destination?tripId=${tripId}`, {
        method: "GET",
        credentials: "include"
    }).then(response => {
            if (!response.ok){
                throw new Error("Error");
            }
            return response.json();
        }
    ).then(data => {
        const list = document.getElementById('allDestinations');

        data.forEach(destination => {
            const mainDiv = document.createElement('div');
            mainDiv.classList.add("card", "my-3", "shadow");
            mainDiv.style.cursor = "pointer";

            const cardBody = document.createElement('div');
            cardBody.classList.add("card-body");

            const detailsDiv = document.createElement('div');
            detailsDiv.setAttribute("aria-expanded", "false");
            detailsDiv.setAttribute("aria-controls", `collapse${destination.id}`);
            detailsDiv.setAttribute("data-bs-toggle", "collapse");
            detailsDiv.setAttribute("data-bs-target", `#collapse${destination.id}`);

            const nameTag = document.createElement('h5');
            nameTag.className = "card-title text-primary";
            nameTag.textContent = `${destination.name}`;

            const startDateObj = new Date(destination.startDate);
            const startDate = startDateObj.toISOString().split('T')[0];
            const startTime = startDateObj.toTimeString().slice(0,5);

            const divStart = document.createElement('div')
            divStart.className = "card-taxt";
            divStart.textContent = `Starts: ${startDate} at ${startTime}`;

            const endDateObj = new Date(destination.endDate);
            const endDate = startDateObj.toISOString().split('T')[0];
            const endTime = startDateObj.toTimeString().slice(0,5);

            const divEnd = document.createElement('div')
            divEnd.className = "card-text";
            divEnd.textContent = `End: ${endDate} at ${endTime}`;

            const collapseDiv = document.createElement('div');
            collapseDiv.classList.add("collapse");
            collapseDiv.id = `collapse${destination.id}`;
            collapseDiv.appendChild(showDestinationFormChanges(destination.id));

            detailsDiv.appendChild(nameTag);
            detailsDiv.appendChild(divStart);
            detailsDiv.appendChild(divEnd);
            cardBody.appendChild(detailsDiv);
            cardBody.appendChild(collapseDiv);

            mainDiv.appendChild(cardBody);
            list.appendChild(mainDiv);
        })
    });
}

function showTripDetails() {
    fetch(`http://localhost:8080/trip/${tripId}`, {
        method: "GET",
        credentials: "include"
    })
        .then(response => {
            if (response.status === 401) {
                window.location.href = "login.html";
            }
            else if (!response.ok) {
                throw new Error("Error");
            }
            return response.json();
        })
        .then(data => {
            const name = document.getElementById("city");
            name.textContent = `${data.name}`;
            showDestinations();
        });
}

function submitDestinationForm(){
    document.getElementById('add-button').addEventListener('click', async function (e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const startDateStr = document.getElementById('startDate').value;
        const endDateStr = document.getElementById('endDate').value;

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const trip_id = tripId;

        if (startDate <= endDate) {
            await fetch('http://localhost:8080/destination', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({tripId, name, startDate, endDate})
            }).catch(error => console.error("Błąd: " + error));
            location.reload();
        } else {
            document.getElementById('invalid-date').hidden = false;
        }
    })
}

function showDestinationFormChanges(id){
    const formDiv = document.createElement("div");
    const nameInput = document.createElement("input");
    const nameLabel = document.createElement("label");

    nameInput.classList.add("form-control", "mb-3");
    nameInput.setAttribute("type", "text");
    nameInput.id = `name${id}`;
    nameInput.name = "name";

    nameLabel.classList.add("form-label", "mt-4");
    nameLabel.setAttribute("for", `name${id}`);
    nameLabel.textContent = "Location";

    const startInput = document.createElement("input");
    const startLabel = document.createElement("label");

    startInput.classList.add("form-control", "mb-3");
    startInput.setAttribute("type", "datetime-local");
    startInput.id = `startDate${id}`;
    startInput.name = "startDate";

    startLabel.classList.add("form-label");
    startLabel.setAttribute("for", `startDate${id}`);
    startLabel.textContent = "Start:";

    const endInput = document.createElement("input");
    const endLabel = document.createElement("label");

    endInput.classList.add("form-control", "mb-3");
    endInput.setAttribute("type", "datetime-local");
    endInput.id = `endDate${id}`;
    endInput.name = "endDate";

    endLabel.classList.add("form-label");
    endLabel.setAttribute("for", `endDate${id}`);
    endLabel.textContent = "End:";

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("btn", "btn-success");
    submitBtn.id = `submit${id}`;
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit changes";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger", "mx-2");
    deleteBtn.id = `delete${id}`;
    deleteBtn.type = "submit";
    deleteBtn.textContent = "Delete";

    submitBtn.addEventListener("click", () => {
        submitDestinationChanges(id,nameInput.value, startInput.value, endInput.value);
    });

    deleteBtn.addEventListener("click", () => {
        deleteDestination(id);
    });

    formDiv.appendChild(nameLabel);
    formDiv.appendChild(nameInput);
    formDiv.appendChild(startLabel);
    formDiv.appendChild(startInput);
    formDiv.appendChild(endLabel);
    formDiv.appendChild(endInput);
    formDiv.appendChild(submitBtn);
    formDiv.appendChild(deleteBtn);

    return formDiv;
}

async function submitDestinationChanges(id, name, startDate, endDate){
    await fetch(`http://localhost:8080/destination/${id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body:JSON.stringify({name, startDate, endDate})
    }).catch(error => console.error("Błąd: " + error));
    location.reload();
}

async function deleteDestination(id){
    await fetch(`http://localhost:8080/destination/${id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }).catch(error => console.error("Błąd: " + error));
    location.reload();
}