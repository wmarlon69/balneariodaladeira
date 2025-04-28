// script.js
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.querySelector(".back-to-top");

    // Mostra ou esconde o botão "Voltar ao topo" com base no scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Rola suavemente para o topo ao clicar no botão
    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
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
