// script.js
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.querySelector(".back-to-top");
    
    // Inicialmente oculto com opacidade 0
    backToTopButton.style.opacity = "0";
    backToTopButton.style.display = "block";
    backToTopButton.style.transform = "translateY(20px)";

    // Função de debounce para melhorar performance
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Mostra ou esconde o botão "Voltar ao topo" com base no scroll
    window.addEventListener("scroll", debounce(function () {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = "0.8";
            backToTopButton.style.transform = "translateY(0)";
        } else {
            backToTopButton.style.opacity = "0";
            backToTopButton.style.transform = "translateY(20px)";
        }
    }, 15));

    // Rola suavemente para o topo ao clicar no botão
    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Efeito visual quando clicado
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);
        
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    
    // Adiciona efeito de animação aos itens da lista ao rolar a página
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar às seções
    document.querySelectorAll('.menu-section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(section);
    });
    
    // Aplicar aos itens individuais em cada seção (com atraso)
    document.querySelectorAll('.menu-items li').forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        item.style.transitionDelay = `${index % 10 * 0.05}s`;
    });
    
    // Classe para animar os elementos
    document.addEventListener('scroll', debounce(() => {
        document.querySelectorAll('.menu-items li').forEach((item) => {
            const position = item.getBoundingClientRect();
            // Verificar se o item está visível na janela de visualização
            if (position.top < window.innerHeight * 0.9 && position.bottom >= 0) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    }, 10));

    // Adiciona classe 'appear' quando os elementos estão visíveis
    const addAppearClass = debounce(() => {
        document.querySelectorAll('.menu-section').forEach(section => {
            const position = section.getBoundingClientRect();
            if (position.top < window.innerHeight * 0.8 && position.bottom >= 0) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    }, 10);
    
    // Chamando uma vez para elementos inicialmente visíveis
    addAppearClass();
    // Adicionando ao evento de scroll
    window.addEventListener('scroll', addAppearClass);
});

let currentIndex = 0;

function openFullscreen(img) {
    const gallery = document.querySelectorAll("#gallery img");
    currentIndex = Array.from(gallery).indexOf(img);

    // Cria um contêiner para a imagem em tela cheia
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.classList.add("fullscreen");

    // Clona a imagem clicada e adiciona ao contêiner
    const fullscreenImg = img.cloneNode();
    fullscreenImg.id = "fullscreen-img";
    fullscreenDiv.appendChild(fullscreenImg);

    // Botão anterior
    const prevButton = document.createElement("button");
    prevButton.classList.add("nav-button", "prev");
    prevButton.innerHTML = "&#10094;"; // Símbolo de seta para a esquerda
    prevButton.onclick = (e) => {
        e.stopPropagation();
        navigateFullscreen(-1);
    };
    fullscreenDiv.appendChild(prevButton);

    // Botão próximo
    const nextButton = document.createElement("button");
    nextButton.classList.add("nav-button", "next");
    nextButton.innerHTML = "&#10095;"; // Símbolo de seta para a direita
    nextButton.onclick = (e) => {
        e.stopPropagation();
        navigateFullscreen(1);
    };
    fullscreenDiv.appendChild(nextButton);

    // Botão de voltar
    const closeButton = document.createElement("button");
    closeButton.classList.add("nav-button", "close");
    closeButton.innerHTML = "&#10005;"; // Símbolo de "X" para fechar
    closeButton.onclick = (e) => {
        e.stopPropagation();
        closeFullscreen();
    };
    fullscreenDiv.appendChild(closeButton);
    
    // Previne que a imagem bloqueie os cliques nos botões
    fullscreenImg.style.pointerEvents = "none";

    // Adiciona o contêiner ao corpo do documento
    document.body.appendChild(fullscreenDiv);
}

function closeFullscreen() {
    // Remove o contêiner de tela cheia
    const fullscreenDiv = document.querySelector(".fullscreen");
    if (fullscreenDiv) {
        fullscreenDiv.remove();
    }
}

function navigateFullscreen(direction) {
    const gallery = document.querySelectorAll("#gallery img");
    currentIndex = (currentIndex + direction + gallery.length) % gallery.length;

    const fullscreenImg = document.querySelector("#fullscreen-img");
    fullscreenImg.src = gallery[currentIndex].src;
    fullscreenImg.alt = gallery[currentIndex].alt;
}


// video
