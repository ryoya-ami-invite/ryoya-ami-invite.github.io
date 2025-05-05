let globalWindX = 0;

function updateWindDirection() {
  globalWindX = Math.floor(Math.random() * 2000) - 1000;
  setTimeout(updateWindDirection, 10000 + Math.random() * 15000);
}

updateWindDirection();

function createSakuraPetal() {
  const container = document.querySelector(".sakura-container");
  const petal = document.createElement("div");
  petal.classList.add("sakura");

  const left = Math.random() * 100;
  const scale = 0.8 + Math.random() * 0.5;
  const rotateStart = Math.random() * 360;
  const rotateMid = rotateStart + 180;
  const swayX = -200 - Math.random() * 200;
  const duration = 8 + Math.random() * 4;
  const fallY = 'calc(100vh + 15px)';

  petal.style.left = `${left}vw`;
  petal.style.transform = `scale(${scale})`;

  const animName = `fallLeft-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes ${animName} {
      0% {
        transform: translateY(0) translateX(0) rotate(${rotateStart}deg);
        opacity: 1;
      }
      90%, 100% {
        transform: translateY(${fallY}) translateX(${swayX}px) rotate(${rotateMid}deg);
        opacity: 1;
      }
    }
  `, styleSheet.cssRules.length);

  petal.style.animation = `${animName} ${duration}s ease-in forwards`;
  container.appendChild(petal);

  while (container.children.length > 150) container.removeChild(container.firstChild);
}

function createBubble() {
  const container = document.querySelector('.bubble-container');
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const size = 20 + Math.random() * 40;
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 4;

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}vw`;
  bubble.style.opacity = `${Math.max(0.3, 1 - size / 80)}`;
  bubble.style.filter = `hue-rotate(${Math.floor(Math.random() * 60) - 30}deg) blur(${(0.5 + Math.random() * 1.5).toFixed(1)}px)`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationTimingFunction = "linear";

  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), duration * 1000);
}

function createLeaf() {
  const container = document.querySelector(".leaf-container");
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  const left = Math.random() * 100;
  const scale = 0.8 + Math.random() * 0.5;
  const rotateStart = Math.random() * 360;
  const rotateEnd = rotateStart + 360;
  const duration = 10 + Math.random() * 4;

  leaf.style.left = `${left}vw`;
  leaf.style.transform = `scale(${scale})`;
  leaf.dataset.scale = scale;

  const animName = `fallLeaf-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const styleSheet = document.styleSheets[0];
  const fallY = 'calc(100vh + 30px)';
  const swayX = globalWindX;

  styleSheet.insertRule(`
    @keyframes ${animName} {
      0% {
        transform: translateY(0) translateX(0) rotate(${rotateStart}deg);
        opacity: 0.8;
      }
      100% {
        transform: translateY(${fallY}) translateX(${swayX}px) rotate(${rotateEnd}deg);
        opacity: 0.9;
      }
    }
  `, styleSheet.cssRules.length);

  leaf.style.animation = `${animName} ${duration}s ease-in-out forwards`;
  container.appendChild(leaf);

  while (container.children.length > 150) container.removeChild(container.firstChild);
}

const month = getDateFromParamOrNow().getMonth() + 1;

if (month >= 3 && month <= 4) {
  setInterval(createSakuraPetal, 250); // 桜（3〜4月）
} else if (month === 5 || month === 6) {
  setInterval(createLeaf, 300); // 葉（5〜6月）
} else if (month >= 7 && month <= 8) {
  setInterval(createBubble, 400); // 泡（7〜8月）
}