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
        document.getElementById("divHome").style.display = "block";
    } else {
        document.getElementById("divHome").style.display = "none";
    }
}

function showAboutUs(show) {
    if (show) {
        document.getElementById("divAbout").style.display = "block";
    } else {
        document.getElementById("divAbout").style.display = "none";
    }
}

function showContactUs(show) {
    if (show) {
        document.getElementById("divContact").style.display = "block";
    } else {
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