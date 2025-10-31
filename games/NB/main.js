// 난이도 정의
const LEVEL = Object.freeze({
  EASY: 3,
  NORMAL: 4,
  HARD: 5,
});

// DOM 요소 캐싱
const form = document.getElementById('gameForm');
const guessInput = document.getElementById('guessInput');
const resultDiv = document.getElementById('result');
const mainView = document.querySelector('.main-view');
const gameView = document.querySelector('.game-view');
const displayLevel = document.querySelector('h1.display-level');

// 🎮 Game Controller
class GameController {
  constructor() {
    this.computerNumber = '';
    this.length = 0;
    this.level = '';
    this.isFinished = false;
  }

  // 난이도 설정 및 초기화
  setDifficulty(level) {
    this.level = level;
    this.length = LEVEL[level];
    this.computerNumber = this.generateComputerNumber();
    this.isFinished = false; // ✅ 새 게임 시작

    displayLevel.textContent = `난이도: ${level} (${this.length}자리)`;

    guessInput.setAttribute('maxlength', this.length);
    guessInput.value = '';
    resultDiv.innerHTML = '';
    resultDiv.scrollTop = 0;

    this.enableInput(); // ✅ 다시 입력 가능

    mainView.classList.add('none');
    gameView.classList.remove('none');
  }

  // 컴퓨터 숫자 생성
  generateComputerNumber() {
    const digits = [];
    while (digits.length < this.length) {
      const digit = Math.floor(Math.random() * 10);
      if (!digits.includes(digit)) digits.push(digit);
    }
    return digits.join('');
  }

  // 피드백 계산
  getFeedback(guess) {
    let strikes = 0;
    let balls = 0;
    for (let i = 0; i < this.length; i++) {
      if (guess[i] === this.computerNumber[i]) strikes++;
      else if (this.computerNumber.includes(guess[i])) balls++;
    }
    if (strikes === this.length)
      return `<span class="success">정답입니다!</span>`;
    return `${strikes}S ${balls}B`;
  }

  // 추측 처리
  handleGuess(guess) {
    if (guess.length !== this.length || new Set(guess).size !== this.length) {
      alert(`서로 다른 ${this.length}자리 숫자를 입력하세요.`);
      return;
    }

    const feedback = this.getFeedback(guess);
    resultDiv.innerHTML += `<p class="guess">${guess} - ${feedback}</p>`;
    resultDiv.scrollTop = resultDiv.scrollHeight;

    if (feedback.includes('정답입니다!')) {
      this.isFinished = true;
      this.disableInput();
    }

    guessInput.value = '';
  }

  disableInput() {
    guessInput.disabled = true; // ✅ 입력 자체 금지
    guessInput.setAttribute('readonly', true);
    guessInput.blur(); // ✅ 포커스 제거
    document.querySelector('#gameForm button[type="submit"]').disabled = true;
  }

  enableInput() {
    guessInput.disabled = false;
    form.querySelector('button[type="submit"]').disabled = false;
  }
}

// 전역 게임 컨트롤러 인스턴스
const game = new GameController();

// 폼 제출 이벤트
form.addEventListener('submit', e => {
  e.preventDefault();
  if (game.isFinished) return; // ✅ 추가 방지
  game.handleGuess(guessInput.value.trim());
});

// 규칙 다이얼로그
document.getElementById('showRulesBtn').addEventListener('click', () => {
  const dialog = document.getElementById('dialog-rules');
  dialog.showModal();
  dialog.scrollTop = 0;
});

// 난이도 버튼 클릭 시
document.querySelectorAll('[data-level]').forEach(btn => {
  btn.addEventListener('click', e => {
    const level = e.target.dataset.level;
    game.setDifficulty(level);
  });
});

// 다시하기 버튼 클릭 시
document.getElementById('restartBtn').addEventListener('click', () => {
  mainView.classList.remove('none');
  gameView.classList.add('none');
});
