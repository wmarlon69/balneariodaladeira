document.addEventListener("DOMContentLoaded", () => {
    // Animação da tela de intro
    if (sessionStorage.getItem("intro-exibida")) {
        document.getElementById("intro").style.display = "none";
        document.getElementById("conteudo").style.display = "block";
    } else {
        // Mostra a intro e define no sessionStorage que ela já foi exibida
        setTimeout(() => {
            const intro = document.getElementById("intro");
            intro.classList.add('hide');
            setTimeout(() => {
                intro.style.display = "none";
                document.getElementById("conteudo").style.display = "block";
            }, 700);
            sessionStorage.setItem("intro-exibida", "true");
        }, 2000);
    }

    // Interatividade para o FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const pergunta = item.querySelector('.faq-pergunta');
        const resposta = item.querySelector('.faq-resposta');
        
        // Esconde as respostas inicialmente
        resposta.style.maxHeight = '0';
        resposta.style.overflow = 'hidden';
        resposta.style.transition = 'max-height 0.3s ease-out';
        resposta.style.opacity = '0';
        resposta.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
        
        // Adiciona seta indicadora
        pergunta.innerHTML += ' <span class="faq-arrow">▼</span>';
        const arrow = pergunta.querySelector('.faq-arrow');
        arrow.style.fontSize = '12px';
        arrow.style.marginLeft = '5px';
        arrow.style.transition = 'transform 0.3s';
        
        // Adiciona evento de clique
        pergunta.style.cursor = 'pointer';
        pergunta.addEventListener('click', () => {
            if (resposta.style.maxHeight === '0px' || resposta.style.maxHeight === '') {
                resposta.style.maxHeight = resposta.scrollHeight + 'px';
                resposta.style.opacity = '1';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                resposta.style.maxHeight = '0';
                resposta.style.opacity = '0';
                arrow.style.transform = 'rotate(0)';
            }
        });
    });

    // Lazy loading para as imagens
    const lazyImages = document.querySelectorAll('img');
    
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        if (img.getAttribute('data-src')) {
            lazyLoadObserver.observe(img);
        }
    });

    // Efeito de deslizar suave para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var intro = document.getElementById('intro');
        if (intro) {
            intro.classList.add('hide');
        }
    }, 1500);
});
