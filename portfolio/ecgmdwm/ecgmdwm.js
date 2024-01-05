document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const logoImage = document.querySelector(".logo1");

    function toggleDarkMode() {
        if (darkModeToggle.checked) {
            body.classList.add("light-mode");
            logoImage.src = "../../assets/logo2.webp";
            localStorage.setItem("darkMode", "true");
        } else {
            body.classList.remove("light-mode");
            logoImage.src = "../../assets/logo1.webp";
            localStorage.setItem("darkMode", "false");
        }
    }

    function loadLanguageData(language) {
        fetch(`../../${language}.json`)
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
                if (key === "ecgmdwminfo") {
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

    const nextallButton = document.getElementById("nextallButton");
    const nextmotionGraphicsButton = document.getElementById("nextmotionGraphicsButton");
 
    const previousallButton = document.getElementById("previousallButton");
    const previousmotionGraphicsButton = document.getElementById("previousmotionGraphicsButton");
 
    const activeFilter = sessionStorage.getItem('selectedCategory');
 
    if (activeFilter === "all") {
        nextallButton.style.display = "block";
        nextmotionGraphicsButton.style.display = "none";
        previousallButton.style.display = "block";
        previousmotionGraphicsButton.style.display = "none";
    } else if (activeFilter === "socialmedia") {
        nextallButton.style.display = "none";
        nextmotionGraphicsButton.style.display = "none";
        previousallButton.style.display = "none";
        previousmotionGraphicsButton.style.display = "none";
    } else if (activeFilter === "motiongraphics") {
        nextallButton.style.display = "none";
        nextmotionGraphicsButton.style.display = "block";
        previousallButton.style.display = "none";
        previousmotionGraphicsButton.style.display = "block";
    } else {
        nextallButton.style.display = "block";
        nextmotionGraphicsButton.style.display = "none";
        previousallButton.style.display = "block";
        previousmotionGraphicsButton.style.display = "none";
    }

    const hasAcceptCookie = document.cookie.indexOf("accept=true") !== -1;

    const hasDeclineCookie = document.cookie.indexOf("decline=true") !== -1;
    
    if (!hasAcceptCookie && !hasDeclineCookie) {
        window.location.href = "../../index.html";
        return;
    }

    document.getElementById("openMenuButton").addEventListener("click", openMenu);

    document.getElementById("closeMenuButton").addEventListener("click", closeMenu);

});

function openMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "0";
}

function closeMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "-250px";
}