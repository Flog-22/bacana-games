const botaoMenu = document.getElementById("botaoMenu");
const menuPrincipal = document.getElementById("menuPrincipal");

// Abre e fecha o menu ao clicar no botão
botaoMenu.addEventListener("click", function () {
  const aberto = menuPrincipal.classList.toggle("aberto");
  botaoMenu.innerHTML = aberto ? "&#10005;" : "&#9776;";
});

// Fecha o menu ao clicar em um link
menuPrincipal.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menuPrincipal.classList.remove("aberto");
    botaoMenu.innerHTML = "&#9776;";
  });
});