document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const logoImage = document.querySelector(".logo1");

    function toggleDarkMode() {
        if (darkModeToggle.checked) {
            body.classList.add("light-mode");
            logoImage.src = "../assets/logo2.webp";
            localStorage.setItem("darkMode", "true");
        } else {
            body.classList.remove("light-mode");
            logoImage.src = "../assets/logo1.webp";
            localStorage.setItem("darkMode", "false");
        }
    }

    function loadLanguageData(language) {
        fetch(`../${language}.json`)
        .then(response => response.json())
        .then(data => {
            languageData = data;
            updateLanguage();
        })
        .catch(error => {
            console.error('Erro ao carregar os dados de idioma:', error);
        });
    }

    function updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (languageData.hasOwnProperty(key)) {
                if (key === "pp2info2" || key === "pp2info3" || key === "pp3info2" || key === "pp3info3" || key === "pc2info2" || key === "pc2info3" 
                || key === "pc2info4" || key === "pc2info5" || key === "pc3info2" || key === "pc3info3" || key === "pc3info4" || key === "pc3info5" 
                || key === "pc3info6" || key === "pc3info7" || key === "pc3info8" || key === "pc3info9" || key === "pc3info10" || key === "pc3info11" 
                || key === "pc3info12" || key === "pc3info13" || key === "pc3info14" || key === "pc3info15" || key === "pc3info16" || key === "pc3info17" 
                || key === "pc3info18" || key === "pc3info19" || key === "pc3info20" || key === "pc3info21" || key === "pc3info22" || key === "pc3info23" 
                || key === "pc3info24" || key === "pc3info25" || key === "pc3info26") {
                    element.innerHTML = languageData[key];
                } else {
                    element.textContent = languageData[key];
                }
            }
        });
    }

    document.getElementById('pt-button').addEventListener('click', () => {
        currentLanguage = 'pt';
        localStorage.setItem('selectedLanguage', currentLanguage);
        loadLanguageData(currentLanguage);
    });

    document.getElementById('en-button').addEventListener('click', () => {
        currentLanguage = 'en';
        localStorage.setItem('selectedLanguage', currentLanguage);
        loadLanguageData(currentLanguage);
    });

    const isDarkMode = localStorage.getItem("darkMode") === "true";

    darkModeToggle.checked = isDarkMode;

    darkModeToggle.addEventListener("change", toggleDarkMode);

    toggleDarkMode();

    let languageData = {};
   
    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const defaultLanguage = selectedLanguage || 'en';
  
    loadLanguageData(defaultLanguage);

    const hasAcceptCookie = document.cookie.indexOf("accept=true") !== -1;

    const hasDeclineCookie = document.cookie.indexOf("decline=true") !== -1;
    
    const hasLearnMoreCookie = document.cookie.indexOf("learnmore=true") !== -1;
    
    if (!hasAcceptCookie && !hasDeclineCookie && !hasLearnMoreCookie) {
        window.location.href = "../../index.html";
        return;
    }

    document.getElementById("openMenuButton").addEventListener("click", openMenu);

    document.getElementById("closeMenuButton").addEventListener("click", closeMenu);
});

const scrollPosition = sessionStorage.getItem('scrollPosition');

if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
}

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
});

function openMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "0";
}

function closeMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "-250px";
}