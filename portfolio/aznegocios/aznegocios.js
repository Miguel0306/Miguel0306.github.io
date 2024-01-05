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
        
                if (key === "aznegociosinfo") {
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

    document.getElementById("FullImageView").style.display = "none"; 
    document.getElementById("CloseButton").style.display = "none"; 

    const nextallButton = document.getElementById("nextallButton");
    const nextsocialMediaButton = document.getElementById("nextsocialMediaButton");
    const nextmotionGraphicsButton = document.getElementById("nextmotionGraphicsButton");

    const previousallButton = document.getElementById("previousallButton");
    const previoussocialMediaButton = document.getElementById("previoussocialMediaButton");
    const previousmotionGraphicsButton = document.getElementById("previousmotionGraphicsButton");
   
    const activeFilter = sessionStorage.getItem('selectedCategory');

    if (activeFilter === "all") {
        nextallButton.style.display = "block";
        nextsocialMediaButton.style.display = "none";
        nextmotionGraphicsButton.style.display = "none";
        previousallButton.style.display = "block";
        previoussocialMediaButton.style.display = "none";
        previousmotionGraphicsButton.style.display = "none";
    } else if (activeFilter === "socialmedia") {
        nextallButton.style.display = "none";
        nextsocialMediaButton.style.display = "block";
        nextmotionGraphicsButton.style.display = "none";
        previousallButton.style.display = "none";
        previoussocialMediaButton.style.display = "block";
        previousmotionGraphicsButton.style.display = "none";
    } else if (activeFilter === "motiongraphics") {
        nextallButton.style.display = "none";
        nextsocialMediaButton.style.display = "none";
        nextmotionGraphicsButton.style.display = "block";
        previousallButton.style.display = "none";
        previoussocialMediaButton.style.display = "none";
        previousmotionGraphicsButton.style.display = "block";
    } else {
        nextallButton.style.display = "block";
        nextsocialMediaButton.style.display = "none";
        nextmotionGraphicsButton.style.display = "none";
        previousallButton.style.display = "block";
        previoussocialMediaButton.style.display = "none";
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

let currentImageIndex = 0; 
let currentImageSrc = null; 

function FullView(ImgLink) {
    currentImageSrc = ImgLink;
    document.getElementById("FullImage").src = ImgLink;
    document.getElementById("FullImageView").style.display = "flex";
    document.getElementById("CloseButton").style.display = "block";
    document.getElementById("FullImage").classList.add("scale-up");
    document.getElementById("CloseButton").removeEventListener("click", CloseFullView);
}

function CloseFullView() {
    const fullImageView = document.getElementById("FullImage");

    if (fullImageView.style.animation !== "none") {
       
        fullImageView.classList.add("scale-down");

      
        fullImageView.addEventListener("animationend", animationEndHandler);
    } else {
       
       
        document.getElementById("FullImageView").style.display = "none";
        document.getElementById("CloseButton").style.display = "none";
    }
}

function animationEndHandler() {
    const fullImageView = document.getElementById("FullImage");

    
    fullImageView.classList.remove("scale-down");

   
    fullImageView.removeEventListener("animationend", animationEndHandler);

   
    document.getElementById("FullImageView").style.display = "none";
    document.getElementById("CloseButton").style.display = "none";
}

function NextImage() {
    if (currentImageSrc === null) return; 

    const galleryImages = document.querySelectorAll('.image-container-other img, .image-container img');

    if (galleryImages.length === 0) return; 

    let fullImage; 

    for (let i = 0; i < galleryImages.length; i++) {
        if (galleryImages[i].src === currentImageSrc) {
            currentImageIndex = (i + 1) % galleryImages.length;

            const nextImageSrc = galleryImages[currentImageIndex].src;

            fullImage = document.getElementById("FullImage");
            fullImage.src = nextImageSrc;
            fullImage.classList.add("scale-up");
            currentImageSrc = nextImageSrc;
            break;
        }
    }

    fullImage.addEventListener("animationend", function() {
    
        fullImage.removeEventListener("animationend", this); 
    });

    fullImage.addEventListener("click", function() {
       
        CloseFullView();
    });
}

function PreviousImage() {
    if (currentImageSrc === null) return;

    const galleryImages = document.querySelectorAll('.image-container-other img, .image-container img');

    if (galleryImages.length === 0) return;

    let fullImage; 

    for (let i = 0; i < galleryImages.length; i++) {
        if (galleryImages[i].src === currentImageSrc) {
            currentImageIndex = (i - 1 + galleryImages.length) % galleryImages.length;

            const previousImageSrc = galleryImages[currentImageIndex].src;

            fullImage = document.getElementById("FullImage");
            fullImage.src = previousImageSrc;
            fullImage.classList.add("scale-up");
            currentImageSrc = previousImageSrc; 
            break;
        }
    }

    fullImage.addEventListener("animationend", function() {
       
        fullImage.removeEventListener("animationend", this);
    });

    fullImage.addEventListener("click", function() {
       
        CloseFullView();
    });
}

function openMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "0";
}

function closeMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "-250px";
}