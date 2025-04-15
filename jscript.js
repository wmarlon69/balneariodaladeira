document.addEventListener("DOMContentLoaded", () => {
    // Verifica se a intro já foi exibida na sessão atual
    if (sessionStorage.getItem("intro-exibida")) {
        document.getElementById("intro").style.display = "none";
        document.getElementById("conteudo").style.display = "block";
    } else {
        // Mostra a intro e define no sessionStorage que ela já foi exibida
        setTimeout(() => {
            document.getElementById("intro").style.display = "none";
            document.getElementById("conteudo").style.display = "block";
            sessionStorage.setItem("intro-exibida", "true");
        }, 3000);
    }
});
