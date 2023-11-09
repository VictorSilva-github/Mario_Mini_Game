const victorMario = document.querySelector('.victorMario');
const pipe = document.querySelector('.pipe');

const startButton = document.querySelector('.start');
const gameOver = document.querySelector('.gameOver');

let audioStart = new Audio('./sound/audio_theme.mp3');
let audioGameOver = new Audio('./sound/audio_gameover.mp3');

const startGame = () => {
  pipe.classList.add('pipe-animation');
  startButton.style.display = 'none';
  audioStart.play();
};

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  victorMario.src = './img/mario.gif';
  victorMario.style.width = '150px';
  victorMario.style.bottom = '0';
  startButton.style.display = 'block';
  audioStart.play();
  audioGameOver.currentTime = 0;
};

const jump = () => {
  victorMario.classList.add('jump');

  setTimeout(() => {
    victorMario.classList.remove('jump');
  }, 800);
};

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseInt(window.getComputedStyle(victorMario).bottom);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('pipe-animation');
      pipe.style.left = `${pipePosition}px`;

      victorMario.classList.remove('jump');
      victorMario.style.bottom = `${marioPosition}px`;

      victorMario.src = './img/game-over.png';
      victorMario.style.width = '80px';
      victorMario.style.marginLeft = '50px';

      audioStart.pause();
      audioGameOver.play();

      setTimeout(() => {
        audioGameOver.pause();
      }, 7000);

      gameOver.style.display = 'flex';

      clearInterval(loop);
    }
  }, 10);
};

loop();

document.addEventListener('keypress', e => {
  const key = e.key;
  if (key === ' ' || key === 'Spacebar') {
    jump();
  } else if (key === 'Enter') {
    startGame();
  }
});

document.addEventListener('touchstart', e => {
  jump();
});
