const formulario = document.getElementById("formSugestao");
const campoMotivo = document.getElementById("motivo");
const contador = document.getElementById("contador");

// Expressões regulares usadas na validação
const regexNome = /^[A-Za-zÀ-ÿ ]{3,60}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Mostra (ou limpa) a mensagem de erro de um campo
function mostrarErro(nomeCampo, mensagem) {
  document.getElementById("erro-" + nomeCampo).textContent = mensagem;

  const campo = document.getElementById(nomeCampo);
  if (campo) {
    campo.classList.toggle("invalido", mensagem !== "");
  }
}

// Cada validador devolve a mensagem de erro, ou "" se o campo estiver certo
const validadores = {
  nome: function () {
    const valor = formulario.nome.value.trim();
    if (valor === "") return "Informe o seu nome.";
    if (!regexNome.test(valor)) return "Use apenas letras, com no mínimo 3 caracteres.";
    return "";
  },

  email: function () {
    const valor = formulario.email.value.trim();
    if (valor === "") return "Informe o seu e-mail.";
    if (!regexEmail.test(valor)) return "Digite um e-mail válido, como nome@email.com.";
    return "";
  },

  jogo: function () {
    const valor = formulario.jogo.value.trim();
    if (valor === "") return "Informe o nome do jogo.";
    if (valor.length < 2) return "O nome do jogo precisa ter pelo menos 2 caracteres.";
    return "";
  },

  categoria: function () {
    if (formulario.categoria.value === "") return "Escolha uma categoria.";
    return "";
  },

  plataforma: function () {
    if (formulario.plataforma.value === "") return "Escolha uma plataforma.";
    return "";
  },

  motivo: function () {
    const valor = formulario.motivo.value.trim();
    if (valor === "") return "Conte por que você recomenda o jogo.";
    if (valor.length < 20) return "Escreva pelo menos 20 caracteres.";
    return "";
  },

  aceito: function () {
    if (!formulario.aceito.checked) return "Marque esta opção para continuar.";
    return "";
  }
};

// Valida um campo e mostra o erro, se houver
function validarCampo(nomeCampo) {
  const mensagem = validadores[nomeCampo]();
  mostrarErro(nomeCampo, mensagem);
  return mensagem === "";
}

// Valida cada campo assim que o usuário mexe nele
function aoMudar(evento) {
  const nomeCampo = evento.target.name;
  if (validadores[nomeCampo]) {
    validarCampo(nomeCampo);
  }
}
formulario.addEventListener("input", aoMudar);
formulario.addEventListener("change", aoMudar);

// Contador de caracteres do campo de texto longo
campoMotivo.addEventListener("input", function () {
  contador.textContent = campoMotivo.value.length + " / 300";
});

// Ao enviar: valida todos os campos e só deixa seguir se estiver tudo certo
formulario.addEventListener("submit", function (evento) {
  let tudoCerto = true;

  Object.keys(validadores).forEach(function (nomeCampo) {
    if (!validarCampo(nomeCampo)) {
      tudoCerto = false;
    }
  });

  if (!tudoCerto) {
    evento.preventDefault();
    const primeiroErro = formulario.querySelector(".invalido");
    if (primeiroErro) {
      primeiroErro.focus();
    }
  }
});