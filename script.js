const DEFAULTS = {
  nome: "Meu amor",
  mensagem: "Que esse carinho chegue como um abraco: simples, bonito e cheio de amor.",
  foto:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23ff8ab3'/%3E%3Cstop offset='1' stop-color='%23d91e64'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='800' fill='url(%23g)'/%3E%3Ccircle cx='400' cy='310' r='118' fill='%23fff2f7' opacity='.88'/%3E%3Cpath d='M186 690c36-154 139-236 214-236s178 82 214 236' fill='%23fff2f7' opacity='.88'/%3E%3C/svg%3E",
};

const params = new URLSearchParams(window.location.search);

const personName = document.querySelector("#personName");
const messageText = document.querySelector("#messageText");
const personPhoto = document.querySelector("#personPhoto");
const openButton = document.querySelector("#openButton");
const intro = document.querySelector("#intro");
const surprise = document.querySelector("#surprise");
const hearts = document.querySelector(".hearts");
const bgMusic = document.querySelector("#bgMusic");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const fotos = [
  {
  foto: "imagens/foto3.jpeg",
  mensagem: "☀️VC e meu sol! Mais por que sol vc se pergunta pq vc e a única luz acima da minha cabeça durante o dia todo me fazendo lembrar q amor e quente e intenso",
},
{
  foto: "imagens/foto4.jpeg",
  mensagem: "msm com nuvens 🌦️chuvas vento vc sempre está lá clareando meu dia me fazendo lembrar q nada e impossível se ainda tem o sol para poder achar os erros e consertar de uma vez por todas",
},
{
  foto: "imagens/foto5.jpeg",
  mensagem: "mas como meu amor é tão grande por vc ele não fica apenas no dia no sol ele se estende pela noite refletindo na lua, como se fosse um sono confortável e um sonho🌝",
},
{
  foto: "imagens/foto1.jpeg",
  mensagem: "😴não apenas qualquer sonho mas sim um sonho q nem a lua refletindo todos nosso momentos me fazendo sentir cada vez mais sdd me fazendo querer te ver e te amar ainda mais pensar q quando acordar dnv não quero perder mais 1seg se quer sem ser ao seu lado juntos💞",
},
{
  foto: "imagens/foto2.jpeg",
  mensagem: "vc é meu sol e eu não tenho medo de me queimar abraçando e beijando o sol, eu só quero arrumar todos os erros me arrependi profundamente pq eu realmente te amo eu me achava q estava te ensinando a amar mas qm realmente me ensinou foi VC, EU TE AMOOO🙈💘",
},
];

let fotoAtual = 0;
let animationTimer;
let isTransitioning = false;

const fotoParam = params.get("foto");
const mensagemParam = params.get("mensagem");
const albumFotos = fotoParam
  ? [{ foto: fotoParam, mensagem: mensagemParam || DEFAULTS.mensagem }]
  : fotos;

personName.textContent = params.get("nome") || DEFAULTS.nome;

function atualizarAlbum() {
  const itemAtual = albumFotos[fotoAtual] || {
    foto: DEFAULTS.foto,
    mensagem: DEFAULTS.mensagem,
  };

  personPhoto.src = itemAtual.foto;
  messageText.textContent = mensagemParam || itemAtual.mensagem;
}

atualizarAlbum();

albumFotos.forEach((item) => {
  const image = new Image();
  image.src = item.foto;
});

function trocarFoto(direction) {
  if (albumFotos.length <= 1 || isTransitioning) return;

  isTransitioning = true;
  fotoAtual = (fotoAtual + direction + albumFotos.length) % albumFotos.length;
  personPhoto.classList.add("is-fading");

  window.setTimeout(() => {
    atualizarAlbum();
    personPhoto.classList.remove("is-fading");
    personPhoto.classList.add("is-changing");
    window.clearTimeout(animationTimer);
    animationTimer = window.setTimeout(() => {
      personPhoto.classList.remove("is-changing");
      isTransitioning = false;
    }, 900);
  }, 320);
}

if (albumFotos.length <= 1) {
  prevBtn.hidden = true;
  nextBtn.hidden = true;
}

function createFloatingHeart(index) {
  const heart = document.createElement("span");
  const size = 10 + Math.random() * 24;
  const duration = 6 + Math.random() * 6;
  const delay = index * -0.55;
  const drift = -80 + Math.random() * 160;

  heart.className = "floating-heart";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${duration}s`);
  heart.style.setProperty("--delay", `${delay}s`);
  heart.style.setProperty("--drift", `${drift}px`);
  heart.style.setProperty("--alpha", `${0.28 + Math.random() * 0.5}`);

  hearts.appendChild(heart);
}

Array.from({ length: 30 }, (_, index) => createFloatingHeart(index));

function tocarMusica() {
  if (!bgMusic) return;

  bgMusic.volume = 0.65;
  bgMusic.play().catch(() => {});
}

openButton.addEventListener("click", () => {
  tocarMusica();
  intro.classList.add("is-hidden");
  surprise.classList.add("is-visible");

  window.setTimeout(() => {
    surprise.classList.add("is-open");
    personPhoto.classList.add("is-changing");
  }, 450);
});

prevBtn.addEventListener("click", () => trocarFoto(-1));
nextBtn.addEventListener("click", () => trocarFoto(1));

