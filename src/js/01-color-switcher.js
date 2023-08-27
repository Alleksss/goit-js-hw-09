const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', startChangeBkgrdColor);
stopBtn.addEventListener('click', stopChangeBkgrdColor);

let intervalId = null;

function startChangeBkgrdColor() {
  intervalId = setInterval(changeBkgrdColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

function stopChangeBkgrdColor() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

function changeBkgrdColor() {
  const newColor = getRandomHexColor();
  document.body.style.backgroundColor = newColor;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
};
