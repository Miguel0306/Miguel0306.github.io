document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const logoImage = document.querySelector(".logo1");
    let typed;

    function getNamesByLanguage(language) {
        const names = {
            'en': ["Graphic Designer", "Web Developer", "Social Media Manager", "Motion Graphics Designer"],
            'pt': ["Designer Gráfico", "Desenvolvedor Web", "Gestor de Redes Sociais", "Motion Graphics Designer"]
        };

        return names[language];
    }

    function startTypedAnimation() {
        const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        const names = getNamesByLanguage(currentLanguage);

        if (typed) {
            typed.destroy();
        }

        const typedOptions = {
            strings: names,
            typeSpeed: 80,
            backSpeed: 80,
            loop: true,
            cursorChar: "",
            smartBackspace: false
        };

        typed = new Typed(".auto-input", typedOptions);
    }

    function toggleDarkMode() {
        if (darkModeToggle.checked) {
            body.classList.add("light-mode");
            logoImage.src = "assets/logo2.webp";
            localStorage.setItem("darkMode", "true");
        } else {
            body.classList.remove("light-mode");
            logoImage.src = "assets/logo1.webp";
            localStorage.setItem("darkMode", "false");
        }
    }

    function loadLanguageData(language) {
        fetch(`${language}.json`)
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
                if (key === "resume") {
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
        loadAndSetLanguageData();
        loadAndSetLanguageData2();
        startTypedAnimation();
    });

    document.getElementById('en-button').addEventListener('click', () => {
        currentLanguage = 'en';
        localStorage.setItem('selectedLanguage', currentLanguage);
        loadLanguageData(currentLanguage);
        loadAndSetLanguageData();
        loadAndSetLanguageData2();
        startTypedAnimation();
    });

    const isDarkMode = localStorage.getItem("darkMode") === "true";

    darkModeToggle.checked = isDarkMode;

    darkModeToggle.addEventListener("change", toggleDarkMode);

    toggleDarkMode();

    let languageData = {};

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const defaultLanguage = selectedLanguage || 'en';

    loadLanguageData(defaultLanguage);

    startTypedAnimation();

    loadAndSetLanguageData();

    loadAndSetLanguageData2();

    const bars = document.querySelectorAll('.progress-bar span');

    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
        bar.textContent = width;
    });

    const images = document.querySelectorAll('.clickable-image');

    images.forEach(image => {
        image.addEventListener('click', () => {
            images.forEach(img => img.classList.remove('transition-scale'));
            image.classList.add('transition-scale');
        });
    });

    const filterItems = document.querySelectorAll('.menu-portfolio2');
    const workItems = document.querySelectorAll('.work');
    const workList = document.querySelector('.work-list');

    let categoryToFilter = sessionStorage.getItem('selectedCategory');

    if (!categoryToFilter) {
        categoryToFilter = "all";
        sessionStorage.setItem('selectedCategory', categoryToFilter);
    }

    filterItems.forEach(function (filterItem) {
        if (filterItem.getAttribute('data-filter') === categoryToFilter) {
            filterItem.classList.add('active');
        } else {
            filterItem.classList.remove('active');
        }
    });

    workItems.forEach(function (workItem) {
        const classesOfWork = workItem.classList;

        if (categoryToFilter === "all" || classesOfWork.contains(categoryToFilter)) {
            workItem.style.display = 'block';
        } else {
            workItem.style.display = 'none';
        }
    });

    filterItems.forEach(function (filterItem) {
        filterItem.addEventListener('click', function () {
            if (!filterItem.classList.contains('active')) {
                filterItems.forEach(function (item) {
                    item.classList.remove('active');
                });

                filterItem.classList.add('active');
    
                workList.classList.add('hide-content');
    
                categoryToFilter = filterItem.getAttribute('data-filter');

                setTimeout(function () {
                    workItems.forEach(function (workItem) {
                        const classesOfWork = workItem.classList;
    
                        if (categoryToFilter === "all" || classesOfWork.contains(categoryToFilter)) {
                            workItem.style.display = 'block';
                        } else {
                            workItem.style.display = 'none';
                        }
                    });
    
                    sessionStorage.setItem('selectedCategory', categoryToFilter);
                }, 250);
    
                setTimeout(function () {
                    workList.classList.remove('hide-content');
                }, 250);
            }
        });
    });

    var formulario = document.getElementById("meuFormulario");
    var opcaoAceito = document.querySelector('input[name="opcao"][value="Aceito"]');
    var mensagemElement = document.querySelector('[data-translate="privacyformmessage"]');
      
    formulario.addEventListener("submit", function(event) {
        if (!opcaoAceito.checked) {
        event.preventDefault();
        var mensagem = mensagemElement.textContent;
        alert(mensagem);
        }
    });

    const cookieBox = document.querySelector(".wrappercookie"),
    acceptBtn = cookieBox.querySelector(".buttons button.acceptbtn"),
    declineBtn = cookieBox.querySelector(".buttons button.declinebtn");
    learnMoreBtn = document.querySelector(".learnmorebtn");
    
    acceptBtn.onclick = () => {
        const analyticsScript = document.createElement("script");
        analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-N6DXWGWBTK";
        analyticsScript.async = true;
    
        analyticsScript.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-N6DXWGWBTK');
        };
    
        document.head.appendChild(analyticsScript);
    
        document.cookie = "accept=true; max-age=" + 60 * 60 * 24 * 400;
        var cookieMessage = document.querySelector('[data-translate="cookieserrormessage"]');
    
        if (document.cookie.indexOf("learnmore=true") !== -1) {
        document.cookie = "learnmore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        if (document.cookie.indexOf("accept=true") !== -1) {
            cookieBox.classList.add("hide");
        } else {
            var cookiesmessage = cookieMessage.textContent;
            alert(cookiesmessage || "Cookie can't be set!");
        }
    };
    
    declineBtn.onclick = () => {
        document.cookie = "decline=true; max-age=" + 60 * 60 * 24 * 400;
        var cookieMessage = document.querySelector('[data-translate="cookieserrormessage"]');

        if (document.cookie.indexOf("learnmore=true") !== -1) {
        document.cookie = "learnmore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    
        if (document.cookie.indexOf("decline=true") !== -1) {
            cookieBox.classList.add("hide");
        } else {
            var cookiesmessage = cookieMessage.textContent;
            alert(cookiesmessage || "Cookie can't be set!");
        }
    };

    learnMoreBtn.onclick = () => {
        document.cookie = "learnmore=true; max-age=" + 60 * 60 * 24;
        var cookieMessage = document.querySelector('[data-translate="cookieserrormessage"]');
        
        if (document.cookie.indexOf("learnmore=true") !== -1) {
            window.location.href = "/privacy/cookiespolicy.html";
        } else {
            var cookiesmessage = cookieMessage.textContent;
             alert(cookiesmessage || "Cookie can't be set!");
        }
    };
    
    if (document.cookie.indexOf("accept=true") !== -1 || document.cookie.indexOf("decline=true") !== -1) {
        cookieBox.classList.add("hide");
    } else {
        cookieBox.classList.remove("hide");
    }

    document.getElementById("openMenuButton").addEventListener("click", openMenu);

    document.getElementById("closeMenuButton").addEventListener("click", closeMenu);
});

function opentab(event, tabName) {
    const tabLinks = document.querySelectorAll('.tab-links');
    tabLinks.forEach(link => link.classList.remove('active-link'));
  
    event.currentTarget.classList.add('active-link');
  
    const tabContents = document.querySelectorAll('.tab-contents');
    tabContents.forEach(content => content.classList.remove('active-tab'));
  
    const selectedTabContent = document.getElementById(tabName);
    if (selectedTabContent) {
      selectedTabContent.classList.add('active-tab');
    }
  
    localStorage.setItem('selectedTab', tabName);
}
  
function selectPreferredTab() {
    const selectedTab = localStorage.getItem('selectedTab');
  
    if (selectedTab && document.getElementById(selectedTab)) {

        const tabLinks = document.querySelectorAll('.tab-links');
        tabLinks.forEach(link => link.classList.remove('active-link'));
  
        const selectedTabLink = document.querySelector(`.tab-links[data-translate="${selectedTab}"]`);
        if (selectedTabLink) {
        selectedTabLink.classList.add('active-link');
        } else {
        const resumeTabLink = document.querySelector('.tab-links[data-translate="resume-tab"]');
        if (resumeTabLink) {
            resumeTabLink.classList.add('active-link');
        }
        }

      const tabContents = document.querySelectorAll('.tab-contents');
      tabContents.forEach(content => content.classList.remove('active-tab'));
  
      document.getElementById(selectedTab).classList.add('active-tab');
    }
}
  
window.addEventListener('load', selectPreferredTab);

const scrollPosition = sessionStorage.getItem('scrollPosition');

if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
}

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
});

function loadAndSetLanguageData() {
    const seuInput = document.querySelector('input[name="Name"]');
    const translateKey = seuInput.getAttribute('data-translate');
    
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'pt';
    
    const langElementId = `${currentLanguage}-lang`;
    const langFile = document.getElementById(langElementId);
    
    if (langFile) {
        fetch(langFile.src)
            .then((response) => response.json())
            .then((translations) => {
                if (translateKey && translations[translateKey]) {
                    seuInput.setAttribute('placeholder', translations[translateKey]);
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar o arquivo de idioma:', error);
            });
    } else {
        console.error('Arquivo de idioma não encontrado para o idioma selecionado.');
    }
}

function loadAndSetLanguageData2() {
    const textarea = document.querySelector('textarea[name="Message"]');
        
    const translateKey = "yourmessage";
    
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'pt';
    
    const langElementId = `${currentLanguage}-lang`;
    const langFile = document.getElementById(langElementId);
    
    if (langFile) {
        fetch(langFile.src)
            .then((response) => response.json())
            .then((translations) => {
                if (translateKey && translations[translateKey]) {
                    textarea.setAttribute('placeholder', translations[translateKey]);
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar o arquivo de idioma:', error);
            });
    } else {
        console.error('Arquivo de idioma não encontrado para o idioma selecionado.');
    }
}

function openMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "0";
}

function closeMenu() {
    var sideMenu = document.getElementById("sidemenu");
    sideMenu.style.right = "-250px";
}