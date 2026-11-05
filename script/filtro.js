const areaFiltros = document.getElementById("filtros");
const gradeJogos = document.getElementById("gradeJogos");

let categoriaAtual = "Todos";
let ordenarPorNota = false;
let textoBusca = "";
const campoBusca = document.getElementById("campoBusca");

campoBusca.addEventListener("input", function () {
  textoBusca = campoBusca.value.trim().toLowerCase();
  mostrarJogos();
});

// Descobre todas as categorias que existem nos jogos, sem repetir
function pegarCategorias() {
  const todas = [];
  jogos.forEach(function (jogo) {
    jogo.categorias.forEach(function (cat) {
      if (!todas.includes(cat)) {
        todas.push(cat);
      }
    });
  });
  return todas;
}

// Cria os botões de filtro e o botão de ordenar
function criarFiltros() {
  const categorias = ["Todos", ...pegarCategorias()];
  areaFiltros.innerHTML = "";

  const barra = document.createElement("div");
  barra.className = "barra-filtros";

  categorias.forEach(function (cat) {
    const botao = document.createElement("button");
    botao.textContent = cat;
    botao.className = "botao-filtro";
    if (cat === categoriaAtual) {
      botao.classList.add("ativo");
    }
    botao.addEventListener("click", function () {
      categoriaAtual = cat;
      atualizar();
    });
    barra.appendChild(botao);
  });

  const botaoOrdem = document.createElement("button");
  botaoOrdem.textContent = ordenarPorNota ? "Ordem original" : "Maiores notas";
  botaoOrdem.className = "botao-filtro botao-ordem";
  botaoOrdem.addEventListener("click", function () {
    ordenarPorNota = !ordenarPorNota;
    atualizar();
  });
  barra.appendChild(botaoOrdem);

  const botaoAleatorio = document.createElement("button");
  botaoAleatorio.textContent = "\u{1F3B2} Jogo aleatório";
  botaoAleatorio.className = "botao-filtro botao-aleatorio";
  botaoAleatorio.addEventListener("click", function () {
    const sorteado = jogos[Math.floor(Math.random() * jogos.length)];
    window.location.href = "jogo.html?id=" + sorteado.id;
  });
  barra.appendChild(botaoAleatorio);

  areaFiltros.appendChild(barra);
}

// Monta o cartão de um jogo
function criarCartao(jogo) {
  const nota = String(jogo.nota).replace(".", ",");
  const tags = jogo.categorias
    .map(function (cat) {
      return '<span class="tag">' + cat + "</span>";
    })
    .join("");

  const link = document.createElement("a");
  link.className = "cartao";
  link.href = "jogo.html?id=" + jogo.id;
  link.innerHTML =
    '<img class="cartao-capa" src="' + jogo.capa + '" alt="Capa de ' + jogo.nome + '">' +
    '<div class="cartao-info">' +
    '<h3 class="cartao-nome">' + jogo.nome + "</h3>" +
    '<p class="cartao-nota">&#9733; ' + nota + "/10</p>" +
    '<div class="cartao-tags">' + tags + "</div>" +
    "</div>";
  return link;
}

function mostrarJogos() {
  let lista = jogos.filter(function (jogo) {
    const categoriaOk = categoriaAtual === "Todos" || jogo.categorias.includes(categoriaAtual);
    const buscaOk = jogo.nome.toLowerCase().includes(textoBusca);
    return categoriaOk && buscaOk;
  });

  if (ordenarPorNota) {
    lista = [...lista].sort(function (a, b) {
      return b.nota - a.nota;
    });
  }

  gradeJogos.innerHTML = "";
  gradeJogos.className = "grade-jogos";

  if (lista.length === 0) {
    gradeJogos.innerHTML = '<p class="aviso">Nenhum jogo encontrado. Tente outro nome ou categoria.</p>';
    return;
  }

  lista.forEach(function (jogo) {
    gradeJogos.appendChild(criarCartao(jogo));
  });
}

function atualizar() {
  criarFiltros();
  mostrarJogos();
}

atualizar();