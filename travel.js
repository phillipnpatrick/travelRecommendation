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
        document.getElementById("confirmation").innerHTML = "";
    } else {
        document.getElementById("btnContact").classList.remove("active-page");
        document.getElementById("divContact").style.display = "none";
    }
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

    if (employeeCard.innerText === ""){
        let url = window.location.href;
        employeeCard.innerHTML = "";
    
        if (url.indexOf("github.io") > 0){
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    employeeCard.innerHTML = getEmployeeCards(data.employees);
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
        } else {
            employeeCard.innerHTML = getEmployeeCards(employees[0].employees);
        }
    }
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

function sendEmail(event) {
    alert("Thank you for contacting us. We will respond at our earliest convenience.");
}
