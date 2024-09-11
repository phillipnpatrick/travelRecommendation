function displayHome() {
    showSearchBox(true);

    showAboutUs(false);
    showContactUs(false);
    showHome(true);
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
        document.getElementById("divHome").style.display = "block";
    } else {
        document.getElementById("btnHome").classList.remove("active-page");
        document.getElementById("divHome").style.display = "none";
    }
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
    } else {
        document.getElementById("btnContact").classList.remove("active-page");
        document.getElementById("divContact").style.display = "none";
    }
}

function showSearchBox(show) {
    if (show) {
        document.getElementById("searchBox").style.display = "flex";
    } else {
        document.getElementById("searchBox").style.display = "none";
    }
}

function getEmployees() {
    const employeeCard = document.getElementById("employeeCards");

    if (employeeCard.innerText === ""){
        const url = window.location.href + "employees.json";
        employeeCard.innerHTML = "";
        let html = "";
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.employees.forEach((employee) => {
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
                employeeCard.innerHTML = html;
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
}