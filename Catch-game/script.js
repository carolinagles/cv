const screens = document.querySelectorAll(".screen");
const choose_item_btns = document.querySelectorAll(".choose-item-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
let seconds = 0;
let score = 0;
let selected_item = {};

start_btn.addEventListener("click", () => screens[0].classList.add("up"));

choose_item_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_item = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createItem, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createItem() {
  const item = document.createElement("div");
  item.classList.add("item");
  const { x, y } = getRandomLocation();
  item.style.top = `${y}px`;
  item.style.left = `${x}px`;
  item.innerHTML = `<img src="${selected_item.src}" alt="${
    selected_item.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />`;

  item.addEventListener("click", catchItem);

  game_container.appendChild(item);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchItem() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addItem();
}

function addItem() {
  setTimeout(createItem, 1000);
  setTimeout(createItem, 1500);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
