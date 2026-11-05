const resultado = document.getElementById("resultado");

// Lê os dados enviados pelo formulário (método GET), que vêm na URL depois do "?"
const dados = new URLSearchParams(window.location.search);

const camposEsperados = ["nome", "email", "jogo", "categoria", "plataforma", "motivo", "aceito"];

// Deixa a primeira letra de cada palavra maiúscula (maria silva -> Maria Silva)
function formatarNome(texto) {
  return texto
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(function (palavra) {
      return palavra !== "";
    })
    .map(function (palavra) {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(" ");
}

// Verifica se o jogo sugerido já está no blog
function jogoJaExiste(nomeSugerido) {
  const sugerido = nomeSugerido.trim().toLowerCase();
  if (sugerido.length < 4) {
    return false;
  }
  return jogos.some(function (jogo) {
    const existente = jogo.nome.toLowerCase();
    return existente.includes(sugerido) || sugerido.includes(existente);
  });
}

// Cria uma linha "rótulo: valor". Usa textContent para o texto
// digitado pelo usuário nunca ser interpretado como código HTML.
function criarLinha(rotulo, valor) {
  const linha = document.createElement("div");
  linha.className = "linha-dado";

  const titulo = document.createElement("strong");
  titulo.textContent = rotulo;

  const texto = document.createElement("span");
  texto.textContent = valor;

  linha.appendChild(titulo);
  linha.appendChild(texto);
  return linha;
}

function criarLink(texto, destino, classe) {
  const link = document.createElement("a");
  link.href = destino;
  link.textContent = texto;
  link.className = classe;
  return link;
}

// Confere se todos os campos chegaram na URL
const faltando = camposEsperados.some(function (campo) {
  return !dados.has(campo);
});

if (faltando) {
  // Aconteceu se a página foi aberta sem passar pelo formulário
  const aviso = document.createElement("p");
  aviso.className = "aviso";
  aviso.textContent = "Nenhuma sugestão foi recebida. Preencha o formulário para enviar uma.";
  resultado.appendChild(aviso);
  resultado.appendChild(criarLink("Ir para o formulário", "form.html", "botao-enviar"));
} else {
  const nome = formatarNome(dados.get("nome"));
  const jogo = dados.get("jogo").trim();
  const motivo = dados.get("motivo").trim();

  const agradecimento = document.createElement("h2");
  agradecimento.className = "mensagem-ok";
  agradecimento.textContent = "Obrigado, " + nome + "!";
  resultado.appendChild(agradecimento);

  const frase = document.createElement("p");
  frase.textContent = "Recebi a sua sugestão do jogo " + jogo + ". Vou colocá-lo na minha lista.";
  resultado.appendChild(frase);

  if (jogoJaExiste(jogo)) {
    const jaExiste = document.createElement("p");
    jaExiste.className = "mensagem-info";
    jaExiste.textContent = "Esse jogo já está no blog! Dê uma olhada na página inicial.";
    resultado.appendChild(jaExiste);
  }

  const cartao = document.createElement("div");
  cartao.className = "dados-enviados";
  cartao.appendChild(criarLinha("Nome", nome));
  cartao.appendChild(criarLinha("E-mail", dados.get("email").trim()));
  cartao.appendChild(criarLinha("Jogo sugerido", jogo));
  cartao.appendChild(criarLinha("Categoria", dados.get("categoria")));
  cartao.appendChild(criarLinha("Plataforma", dados.get("plataforma")));
  cartao.appendChild(criarLinha("Motivo", motivo + " (" + motivo.length + " caracteres)"));
  cartao.appendChild(criarLinha("Resposta por e-mail", dados.get("aceito") === "sim" ? "Sim" : "Não"));
  resultado.appendChild(cartao);

  const botoes = document.createElement("div");
  botoes.className = "botoes-resultado";
  botoes.appendChild(criarLink("Enviar outra sugestão", "form.html", "botao-enviar"));
  botoes.appendChild(criarLink("Voltar ao início", "index.html", "botao-secundario"));
  resultado.appendChild(botoes);
}