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