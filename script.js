
const $ = (id) => document.getElementById(id);

const screens = [
  "intro", "game", "result", "letter", "special", "final"
];

const questions = [
  {
    question: "Nếu được tặng một món quà vào ngày 20/10, cô muốn gì nhất?",
    answers: [
      "💐 Một bó hoa thật xinh",
      "☕ Một ngày được nghỉ ngơi",
      "💌 Một lời chúc chân thành",
      "🎁 Quà gì cũng được, miễn là có tâm!"
    ],
    reactions: [
      "Cô xứng đáng có cả một vườn hoa luôn ạ! 🌷",
      "Xin thông báo: hôm nay giáo án được phép nghỉ! 😂",
      "Lời chân thành luôn là món quà đáng quý nhất. 💗",
      "Đã rõ! Ban tổ chức đang chuẩn bị quà bằng cả trái tim. 🎁"
    ]
  },
  {
    question: "Kẻ thù truyền kiếp của cô giáo là gì?",
    answers: [
      "🖨️ Máy in đúng lúc cần in",
      "📚 Một chồng bài kiểm tra",
      "⏰ Deadline đang đến gần",
      "😴 Tất cả những thứ trên!"
    ],
    reactions: [
      "Máy in: đối thủ mạnh nhất của ngành giáo dục! 💀",
      "Chấm xong chồng này lại xuất hiện chồng khác... 😭",
      "Deadline không đợi ai, nhưng cô vẫn chiến thắng!",
      "Cô giáo cần một siêu năng lực để xử lý tất cả! 🦸‍♀️"
    ]
  },
  {
    question: "Điều gì khiến một ngày đứng lớp trở nên tuyệt vời?",
    answers: [
      "😊 Học trò chăm ngoan",
      "💗 Được mọi người yêu quý",
      "🌸 Có thật nhiều niềm vui",
      "✨ Cả ba điều trên!"
    ],
    reactions: [
      "Một lớp học ngoan là món quà quý giá rồi ạ!",
      "Sự tận tâm của cô xứng đáng được trân trọng. 💗",
      "Mong ngày nào cô cũng có lý do để mỉm cười!",
      "Chính xác! Cô xứng đáng với tất cả điều tốt đẹp. 🌷"
    ]
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];
let answered = false;
let specialAnswered = false;

function showScreen(id) {
  screens.forEach((screenId) => {
    $(screenId).classList.toggle("active", screenId === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  selectedAnswers = [];
  answered = false;
  specialAnswered = false;

  $("nextBtn").classList.add("hidden");
  $("finishBtn").classList.add("hidden");
  $("reaction").textContent = "";
  $("specialReaction").textContent = "";
}

function renderQuestion() {
  const item = questions[currentQuestion];

  answered = false;
  $("questionCount").textContent =
    `Câu ${currentQuestion + 1} / ${questions.length}`;
  $("progressBar").style.width =
    `${(currentQuestion / questions.length) * 100}%`;
  $("questionText").textContent = item.question;
  $("reaction").textContent = "";
  $("nextBtn").classList.add("hidden");
  $("answers").replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index));
    $("answers").appendChild(button);
  });
}

function chooseAnswer(index) {
  if (answered) return;
  answered = true;

  selectedAnswers[currentQuestion] = index;
  score += index + 1;

  const buttons = $("answers").querySelectorAll("button");
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === index) button.classList.add("selected");
  });

  $("reaction").textContent =
    questions[currentQuestion].reactions[index];

  $("progressBar").style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  $("nextBtn").classList.remove("hidden");
  $("nextBtn").textContent =
    currentQuestion === questions.length - 1
      ? "Xem kết quả 🎉"
      : "Câu tiếp theo →";
}

function showResult() {
  const a = selectedAnswers;

  let title = "🌷 Nữ hoàng truyền cảm hứng!";
  let description =
    "Cô luôn mang đến những điều tốt đẹp cho mọi người. Chúc cô luôn vui vẻ và hạnh phúc!";

  if (a[0] === 1) {
    title = "☕ Nữ hoàng tận hưởng!";
    description =
      "Cô đã làm việc chăm chỉ rồi. Hôm nay hãy tự thưởng cho mình một chút thời gian nghỉ ngơi nhé!";
  } else if (a[1] === 3) {
    title = "👑 Chiến thần ngành giáo dục!";
    description =
      "Máy in, deadline và bài kiểm tra đều không thể đánh bại cô. Huyền thoại là đây!";
  } else if (a[2] === 3) {
    title = "💖 Người gieo hạnh phúc!";
    description =
      "Cô chọn những điều tốt đẹp nhất. Mong rằng tất cả những điều ấy sẽ đến với cô thật nhiều!";
  }

  $("resultTitle").textContent = title;
  $("resultText").textContent = description;
  $("scoreValue").textContent = `${score}/12`;
  showScreen("result");
  launchConfetti();
}

function launchConfetti() {
  const area = $("confetti");
  const symbols = ["🌸", "💗", "✨", "🌷", "💐"];

  for (let i = 0; i < 28; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.fontSize = `${12 + Math.random() * 16}px`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    area.appendChild(piece);

    setTimeout(() => piece.remove(), 4500);
  }
}

$("startBtn").addEventListener("click", () => {
  resetGame();
  renderQuestion();
  showScreen("game");
});

$("nextBtn").addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

$("letterBtn").addEventListener("click", () => {
  showScreen("letter");
  launchConfetti();
});

$("specialBtn").addEventListener("click", () => {
  specialAnswered = false;
  $("specialReaction").textContent = "";
  $("finishBtn").classList.add("hidden");

  document.querySelectorAll(".special-answer").forEach((button) => {
    button.disabled = false;
    button.classList.remove("selected");
  });

  showScreen("special");
});

document.querySelectorAll(".special-answer").forEach((button, index) => {
  button.addEventListener("click", () => {
    if (specialAnswered) return;
    specialAnswered = true;

    button.classList.add("selected");

    document.querySelectorAll(".special-answer").forEach((item) => {
      item.disabled = true;
    });

    const messages = [
      "Chúc điều ước ấy trở thành hiện thực mỗi ngày! 🌷",
      "Một tách trà ngon và một ngày bình yên nhé cô! ☕",
      "Cô đã trao đi yêu thương, mong cô luôn nhận lại yêu thương. 💗",
      "Đáp án hoàn hảo! Cô xứng đáng với tất cả! 👑"
    ];

    $("specialReaction").textContent = messages[index];
    $("finishBtn").classList.remove("hidden");
    launchConfetti();
  });
});

$("finishBtn").addEventListener("click", () => {
  showScreen("final");
  launchConfetti();
});

$("homeBtn").addEventListener("click", () => {
  resetGame();
  showScreen("intro");
});

$("replayBtn").addEventListener("click", () => {
  resetGame();
  showScreen("intro");
});
