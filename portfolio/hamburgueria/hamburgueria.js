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
                if (key === "hamburgueriainfo") {
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

    const slider = document.getElementById('slider');
    const image2 = document.querySelector('.image2');

    slider.addEventListener('input', function() {
        const value = slider.value;
        image2.style.transition = 'clip-path 0.1s';
        image2.style.clipPath = `polygon(${value}% 0, ${value}% 100%, 100% 100%, 100% 0)`;
    });

    slider.value = 100;
    image2.style.clipPath = 'polygon(100% 0, 100% 100%, 100% 100%, 100% 0)';

    document.getElementById("FullImageView").style.display = "none";
    document.getElementById("CloseButton").style.display = "none";

    const firstImage = document.querySelector(".image1");

    const imgHoverEffect = document.querySelector(".img-hover-effect");

    const sliderContainer = document.querySelector(".slidercontainer");

    function updateElementDimensions() {
    if (firstImage && imgHoverEffect) {
        const imageWidth = firstImage.offsetWidth;
        const imageHeight = firstImage.offsetHeight;

        imgHoverEffect.style.width = `${imageWidth}px`;
        imgHoverEffect.style.height = `${imageHeight}px`;
        slider.style.width = `${imageWidth}px`;
        sliderContainer.style.width = `${imageWidth}px`;
        }
    }

    updateElementDimensions();
  
    window.addEventListener('resize', updateElementDimensions);

    slider.addEventListener('mouseup', function() {
        const currentValue = parseInt(slider.value, 10);
    
        if (currentValue < 40) {
            slider.value = 0;
            imgHoverEffect.classList.add('nohover');
            firstImage.classList.add('nohover2');
            firstImage.removeAttribute('onclick');
        } else if (currentValue > 60) {
            slider.value = 100;
            imgHoverEffect.classList.remove('nohover');
            firstImage.classList.remove('nohover2');
            firstImage.setAttribute('onclick', 'FullView(this.src)');
        } else {
            slider.value = 50;
            imgHoverEffect.classList.add('nohover');
            firstImage.classList.add('nohover2');
            firstImage.removeAttribute('onclick');
        }
    
        const value = slider.value;
        image2.style.transition = 'clip-path 0.1s';
        image2.style.clipPath = `polygon(${value}% 0, ${value}% 100%, 100% 100%, 100% 0)`;
    });
    
    const nextallButton = document.getElementById("nextallButton");
    const nextsocialMediaButton = document.getElementById("nextsocialMediaButton");

    const previousallButton = document.getElementById("previousallButton");
    const previoussocialMediaButton = document.getElementById("previoussocialMediaButton");

    const activeFilter = sessionStorage.getItem('selectedCategory');

    if (activeFilter === "all") {
        nextallButton.style.display = "block";
        nextsocialMediaButton.style.display = "none";
        previousallButton.style.display = "block";
        previoussocialMediaButton.style.display = "none";
    } else if (activeFilter === "socialmedia") {
        nextallButton.style.display = "none";
        nextsocialMediaButton.style.display = "block";
        previousallButton.style.display = "none";
        previoussocialMediaButton.style.display = "block";
    } else if (activeFilter === "motiongraphics") {
        nextallButton.style.display = "none";
        nextsocialMediaButton.style.display = "none";
        previousallButton.style.display = "none";
        previoussocialMediaButton.style.display = "none";
    } else {
        nextallButton.style.display = "block";
        nextsocialMediaButton.style.display = "none";
        previousallButton.style.display = "block";
        previoussocialMediaButton.style.display = "none";
    }
    
    const hasAcceptCookie = document.cookie.indexOf("accept=true") !== -1;

    const hasDeclineCookie = document.cookie.indexOf("decline=true") !== -1;
 
    if (!hasAcceptCookie && !hasDeclineCookie) {
        window.location.href = "../../index.html";
        return;
    }

    updateImagesHeight();
  
    window.addEventListener('resize', function() {
        updateImagesHeight();
    });
  
    function updateImagesHeight() {

        var image1 = document.querySelector('.image1');
        var sliderContainer = document.querySelector('.slidercontainer');
        var imagesDiv = document.querySelector('.images');
  
        var totalHeight = image1.offsetHeight + sliderContainer.offsetHeight;
  
        imagesDiv.style.height = totalHeight + 'px';
    }
    
    document.getElementById("openMenuButton").addEventListener("click", openMenu);

    document.getElementById("closeMenuButton").addEventListener("click", closeMenu);

});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (languageData.hasOwnProperty(key)) {
            if (key === "hamburgueriainfo") {
                element.insertAdjacentHTML('afterbegin', languageData[key]);
            } else {
                element.textContent = languageData[key];
            }
        }
    });
}

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

function openMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "0";
}

function closeMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "-250px";
}