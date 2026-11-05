const areaJogo = document.getElementById("paginaJogo");

// Lê o id que veio na URL (exemplo: jogo.html?id=elden-ring)
const parametros = new URLSearchParams(window.location.search);
const idJogo = parametros.get("id");

// Procura, na lista de jogos, aquele que tem esse id
const jogoEscolhido = jogos.find(function (item) {
  return item.id === idJogo;
});

if (jogoEscolhido) {
  document.title = jogoEscolhido.nome + " - Bacana Games";
  montarPagina(jogoEscolhido);
} else {
  areaJogo.innerHTML =
    '<p class="aviso">Jogo não encontrado. <a href="index.html">Voltar para o início</a></p>';
}

function montarPagina(jogo) {
  const nota = String(jogo.nota).replace(".", ",");

  const tags = jogo.categorias
    .map(function (cat) {
      return '<span class="tag">' + cat + "</span>";
    })
    .join("");

  const paragrafos = jogo.comentario
    .map(function (texto) {
      return "<p>" + texto + "</p>";
    })
    .join("");

  // A seção de imagens só aparece se o jogo tiver prints
  let galeria = "";
  if (jogo.prints.length > 0) {
    const imagens = jogo.prints
      .map(function (caminho, indice) {
        return '<img src="' + caminho + '" alt="Print ' + (indice + 1) + " de " + jogo.nome + '">';
      })
      .join("");
    galeria =
      '<section class="secao-jogo"><h2>Imagens do jogo</h2><div class="galeria">' +
      imagens +
      "</div></section>";
  }

  areaJogo.innerHTML =
    '<a class="voltar" href="index.html">&larr; Voltar para os jogos</a>' +
    '<section class="jogo-topo">' +
    '<img class="jogo-capa" src="' + jogo.capa + '" alt="Capa de ' + jogo.nome + '">' +
    '<div class="jogo-info">' +
    "<h1>" + jogo.nome + "</h1>" +
    '<p class="jogo-nota">&#9733; ' + nota + "/10</p>" +
    '<div class="barra-vida" title="Nota ' + nota + ' de 10"><div class="barra-vida-preenchimento"></div></div>' +
    '<div class="cartao-tags">' + tags + "</div>" +
    "<h2>Sinopse</h2><p>" + jogo.sinopse + "</p>" +
    "<h2>Ideia principal</h2><p>" + jogo.ideia + "</p>" +
    "</div></section>" +
    galeria +
    '<section class="secao-jogo"><h2>Minha opinião</h2>' +
    '<div class="comentario">' + paragrafos + "</div></section>";
  
  // Anima a barra de vida até a nota do jogo
  const barra = document.querySelector(".barra-vida-preenchimento");
  setTimeout(function () {
    barra.style.width = jogo.nota * 10 + "%";
  }, 100);
}