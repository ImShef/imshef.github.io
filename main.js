const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const btn = document.getElementById("btn");
const out = document.getElementById("out");
const diff = document.getElementById("diff");

let bezie = [
  "cubic-bezier(0.5,0.5,0.7,0.5)",
  "cubic-bezier(0.35,0.7,0.9,0.7)",
  "cubic-bezier(0.25,0.4,0.2,0.3)",
  "cubic-bezier(0.7,0.4,0.4,0.7)",
];
let isAlive = gameStart();
let loots = 0;
let f = false;

btn.addEventListener("click", function (event) {
  btn.value == "Stop" ? stop() : (isAlive = gameStart());
  this.blur();
});

document.addEventListener("keydown", function (event) {
  jump();
});

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");
  }
  setTimeout(function () {
    dino.classList.remove("jump");
  }, 300);
}
function gameStart() {
  btn.value = "Stop";
  btn.style.background = "green";
  cactus.style.animationPlayState = "running";
  return setInterval(checking, 10);
}
function checking() {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );
  if (!f && cactusLeft > 50) f = true;
  if (cactusLeft < 0 && f) {
    f = false;
    changeMover();
  }
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    stop();
    gameOver();
  }
}
function stop() {
  btn.value = "Start";
  btn.style.background = "red";
  cactus.style.animationPlayState = "paused";
  clearInterval(isAlive);
}
function gameOver() {
  out.style.border = "";
  out.innerHTML = "Академические задолжности: 0";
  alert("Ты всё равно не сдашь пайтон :)\nАкадемические задолжности: " + loots);
  loots = 0;
}
function changeMover() {
  let idx = diff.options.selectedIndex;
  let val = diff.options[idx].value;
  let i = Math.floor(Math.random() * val);
  cactus.style.animationTimingFunction = bezie[i];
  reward(lootCount(val));
}
function lootCount(val) {
  loots++;
  out.innerHTML = "Академические задолжности: " + loots;
  if (val == 1) {
    return [15, 20, 25, 30];
  }
  if (val == 2) {
    return [10, 15, 20, 25];
  }
  if (val == 5) {
    return [5, 10, 15, 20];
  }
}
function reward(count) {
  if (loots == count[0]) {
    out.style.border = "groove";
  }
  if (loots == count[1]) {
    out.style.border = "double";
  }
  if (loots == count[2]) {
    out.style.border = "inset";
  }
  if (loots == count[3]) {
    out.style.border = "outset";
  }
}
