const INDEX_COUNTRIES = "countries";
const INDEX_TEMPLES  = "temples";
const INDEX_BEACHES  = "beaches";

document.addEventListener('keyup', function(event) {
    const activePages = document.getElementsByClassName("active-page");

    if (activePages && activePages[0]){
        const activePage = activePages[0].id;

        if (activePage === "btnContact") {
            handleContactUs();
        }
    }

    if (document.getElementById("keywords").value === "") {
        clearSearch();
    } else {
        document.getElementById("btnSearchIcon").disabled = false;
        document.getElementById("btnSearch").disabled = false;
        document.getElementById("btnClear").disabled = false;

        if (event.key === 'Enter') {
            search();
        }
    }
});

function search() {
    getDestinations(getKeyword(document.getElementById("keywords").value.toLowerCase()));
}

function getKeyword(searchInput) {
    const searchKeys = ["beach", "country", "countries", "temple"];
    let destinationType = "";

    searchKeys.forEach(keyword => {
        if (searchInput.indexOf(keyword) >= 0){
            if (searchInput.indexOf("country") >= 0 || searchInput.indexOf("countries") >= 0) {
                destinationType = INDEX_COUNTRIES;
            } else if (searchInput.indexOf("temple") >= 0) {
                destinationType = INDEX_TEMPLES;
            } else if (searchInput.indexOf("beach") >= 0) {
                destinationType = INDEX_BEACHES;
            }
        }
    });

    return destinationType;
}

function getDestinations(destinationType) {
    let url = window.location.href;

    // url = "https://phillipnpatrick.github.io/travelRecommendation/";

    if (url.indexOf("github.io") > 0){
        console.log(`url.lastIndexOf("/") = ` + url.lastIndexOf("/"));
        console.log("url.length = " + url.length);
        if (url.lastIndexOf("/") != (url.length - 1)) {
            console.log("Original url: " + url);
            url += "/";
            console.log("Add slash to end of url: " + url);
        }
        url += "travel_rec_api.json";
        console.log("Fetching JSON data from " + url);
        fetch(url)
            .then(response => { 
                console.log(response);
                if (!response.ok) {
                    throw new Error("Network response was not ok ... " + response);
                }
                return response.json();
            })
            .then(data => {
                console.log("Retrieved data...");
                console.log(data);
                destinations =  getJSONarray(data, destinationType);

                displayResults(destinationType, destinations);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    } else {
        destinations = getArray(destinationType);
        displayResults(destinationType, destinations);
    }
}

function getJSONarray(data, destinationType) {
    if (destinationType === INDEX_BEACHES) {
        return data.beaches;
    } else if (destinationType === INDEX_COUNTRIES) {
        return data.countries;
    } else if (destinationType === INDEX_TEMPLES) {
        return data.temples;
    }
}

function getArray(destinationType) {
    if (destinationType === INDEX_BEACHES) {
        return beaches[0].beaches;
    } else if (destinationType === INDEX_COUNTRIES) {
        return countries[0].countries;
    } else if (destinationType === INDEX_TEMPLES) {
        return temples[0].temples;
    }
}

function displayResults(destinationType, destinations) {
    const results = document.getElementById("divResults");
    let html = "";

    if (destinationType.length > 0) {
        if (destinationType === INDEX_COUNTRIES) {
            const index = Math.floor(Math.random() * destinations.length);
            html = getDestinationHTML(destinations[index].cities);
        } else {
            html = getDestinationHTML(destinations);
        }
    } else {
        const icon = "https://freesvg.org/img/Arnoud999-Right-or-wrong-3.png";
        html = `<div class="no-results">`;
        html += `<img src="${icon}" alt="Sad face"></img>`;
        html += `<p>No results found that match your query.</p>`;
        html += `</div>`;
    }
    results.innerHTML = html;
    results.style.display = "block";
}

function getDestinationHTML(destinations) {
    let html = "";
    
    destinations.forEach((destination) => {
        html += `<div class="w3-container destination-container">`;
        html += `<div class="destination-photo">`;
        html += `<img src="${destination.imageUrl}" alt="Destination Photo"></img>`;
        html += `</div>`;
        html += `<div class="destination-card">`;
        html += `<span><strong>${destination.name}</strong></span>`;
        html += `<p>${destination.description}</p>`;
        html += `<button onclick="alert('Enjoy your trip to ${destination.name}!');">Visit</button>`;
        html += `</div>`;
        html += `</div>`;
    });

    return html;
}

function clearSearch() {
    document.getElementById("keywords").value = "";
    document.getElementById("divResults").style.display = "none";
    document.getElementById("btnSearchIcon").disabled = true;
    document.getElementById("btnSearch").disabled = true;
    document.getElementById("btnClear").disabled = true;
}

function displayHome() {
    showSearchBox(true);

    showHome(true);
    showAboutUs(false);
    showContactUs(false);
}

function displayAboutUs() {
    showSearchBox(false);

    showHome(false);
    showContactUs(false);
    showAboutUs(true);
}

function displayContactUs() {
    showSearchBox(false);

    showHome(false);
    showAboutUs(false);
    showContactUs(true);
}

function showHome(show){
    if (show) {
        document.getElementById("btnHome").classList.add("active-page");
        document.getElementById("divHomeContainer").style.display = "block";
    } else {
        document.getElementById("btnHome").classList.remove("active-page");
        document.getElementById("divHomeContainer").style.display = "none";
    }
    clearSearch();
}

function showAboutUs(show) {
    if (show) {
        document.getElementById("btnAbout").classList.add("active-page");
        document.getElementById("divAbout").style.display = "block";

        getEmployees();
    } else {
        document.getElementById("btnAbout").classList.remove("active-page");
        document.getElementById("divAbout").style.display = "none";        
    }
}

function showContactUs(show) {
    if (show) {
        document.getElementById("btnContact").classList.add("active-page");
        document.getElementById("divContact").style.display = "block";
        document.getElementById("confirmation").innerHTML = "";
    } else {
        document.getElementById("btnContact").classList.remove("active-page");
        document.getElementById("divContact").style.display = "none";
    }

    resetContactUs();
}

function showSearchBox(show) {
    if (show) {
        document.getElementById("searchBox").style.display = "-webkit-inline-box";
    } else {
        document.getElementById("searchBox").style.display = "none";
    }
}

function getEmployees() {
    const employeeCard = document.getElementById("employeeCards");

    employeeCard.innerHTML = getEmployeeCards(employees[0].employees);
}

function getEmployeeCards(employees) {
    let html = "";

    employees.forEach((employee) => {
        html += `<div class="employee-card-container">`;
        html += `<div class="employee-avatar">`;
        html += `<img src="${employee.photo}" alt="Employee Avatar" width="40" height="40"></img>`;
        html += `</div>`;
        html += `<div class="employee-card">`;
        html += `<span><strong>${employee.firstName} ${employee.lastName}</strong></span>`;
        html += `<p>${employee.shortBio}</p>`;
        html += `<button onclick="alert('${employee.bio}');">${employee.title}</button>`;
        html += `</div>`;
        html += `</div>`;
    });

    return html;
}

function resetContactUs() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    document.getElementById("btnSendEmail").disabled = true;
}

function sendEmail(event) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    alert(`${name}, thank you for contacting us. We will respond to ${email} at our earliest convenience.`);

    resetContactUs();
}

function handleContactUs() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if ((name != "") && (email != "") && (message != "")) {
        document.getElementById("btnSendEmail").disabled = false;
    }
}
