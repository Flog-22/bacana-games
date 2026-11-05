// ===== Estatísticas calculadas a partir dos dados dos jogos =====
const areaEstatisticas = document.getElementById("estatisticas");

const totalJogos = jogos.length;
let somaNotas = 0;
jogos.forEach(function (jogo) {
  somaNotas += jogo.nota;
});
const media = (somaNotas / totalJogos).toFixed(1).replace(".", ",");

const maiorNota = Math.max(...jogos.map(function (jogo) { return jogo.nota; }));
const melhor = jogos.find(function (jogo) { return jogo.nota === maiorNota; });

areaEstatisticas.innerHTML =
  '<div class="estatistica"><strong>' + totalJogos + "</strong><span>jogos avaliados</span></div>" +
  '<div class="estatistica"><strong>' + media + "</strong><span>nota média</span></div>" +
  '<div class="estatistica"><strong>' + melhor.nome + "</strong><span>maior nota</span></div>";

// ===== Abas: HTML, CSS e JavaScript =====
const textosAbas = {
  html:
    "<p>O HTML estrutura o conteúdo de todas as páginas: cabeçalho com o menu de navegação, " +
    "a área principal, o rodapé e o formulário de sugestão. Foram usadas tags semânticas, como " +
    "header, nav, main, section e footer.</p>",
  css:
    "<p>O CSS define o visual padrão do site, igual em todas as páginas. As cores ficam em " +
    "variáveis na raiz do arquivo, e os estilos são organizados em classes reaproveitáveis, " +
    "como cartao, tag e botao-filtro, usadas em mais de uma página. O layout usa Flexbox e Grid.</p>",
  js:
    "<p>O JavaScript dá dinamicidade ao site: cria os cartões e os filtros da página inicial " +
    "a partir de uma lista de dados, monta a página de cada jogo lendo o id da URL, valida todos " +
    "os campos do formulário e exibe, na página de resultado, os dados recebidos pelo método GET.</p>"
};

const abas = document.querySelectorAll("#abas button");
const areaAba = document.getElementById("abaConteudo");

function mostrarAba(nome) {
  areaAba.innerHTML = textosAbas[nome];
  abas.forEach(function (botao) {
    botao.classList.toggle("ativo", botao.dataset.aba === nome);
  });
}

abas.forEach(function (botao) {
  botao.addEventListener("click", function () {
    mostrarAba(botao.dataset.aba);
  });
});

mostrarAba("html");