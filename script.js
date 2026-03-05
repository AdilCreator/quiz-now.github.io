// SECTION: Quiz Data
// Each question has: id, level, type, text, options, correctAnswer, helper, timeLimit (seconds)
const QUESTIONS = [
  // HTML BASICS
  {
    id: "b1",
    level: "basics",
    type: "mcq",
    text: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
    helper: "HTML is the standard markup language for creating web pages.",
    timeLimit: 25,
  },
  {
    id: "b2",
    level: "basics",
    type: "boolean",
    text: "The <head> element is visible on the page by default.",
    options: ["True", "False"],
    correctAnswer: "False",
    helper: "The head contains metadata like the title, links, and scripts.",
    timeLimit: 15,
  },
  {
    id: "b3",
    level: "basics",
    type: "short-text",
    text: "Which HTML element should contain the main visible content of the page? (Just the tag name)",
    options: [],
    correctAnswer: "body",
    acceptableAnswers: ["body", "<body>", "</body>"],
    helper: "Everything that should be rendered in the browser window belongs in the body.",
    timeLimit: 25,
  },
  {
    id: "b4",
    level: "basics",
    type: "mcq",
    text: "Which tag creates the largest heading by default?",
    options: ["<h6>", "<h4>", "<h1>", "<heading>"],
    correctAnswer: "<h1>",
    helper: "Use only one main <h1> per page for good semantics.",
    timeLimit: 20,
  },

  // FORMS
  {
    id: "f1",
    level: "forms",
    type: "mcq",
    text: "Which attribute connects a <label> to its input control?",
    options: ["for", "id", "name", "target"],
    correctAnswer: "for",
    helper: "The label's for value should match the input's id.",
    timeLimit: 20,
  },
  {
    id: "f2",
    level: "forms",
    type: "boolean",
    text: "An input with required attribute cannot be left empty when the form is submitted.",
    options: ["True", "False"],
    correctAnswer: "True",
    helper: "The required boolean attribute triggers built-in browser validation.",
    timeLimit: 18,
  },
  {
    id: "f3",
    level: "forms",
    type: "short-text",
    text: "Which attribute on <form> defines where the form data is sent? (Just the attribute name)",
    options: [],
    correctAnswer: "action",
    acceptableAnswers: ["action"],
    helper: "The action attribute is the URL that receives the submitted data.",
    timeLimit: 25,
  },
  {
    id: "f4",
    level: "forms",
    type: "mcq",
    text: "Which input type is best for choosing one option from many?",
    options: ["checkbox", "radio", "text", "password"],
    correctAnswer: "radio",
    helper: "Radio inputs with the same name let the user pick exactly one option.",
    timeLimit: 18,
  },

  // SEMANTICS
  {
    id: "s1",
    level: "semantics",
    type: "mcq",
    text: "Which element represents a self-contained piece of content that could stand on its own?",
    options: ["<section>", "<div>", "<article>", "<span>"],
    correctAnswer: "<article>",
    helper: "Articles can be reused or distributed independently.",
    timeLimit: 25,
  },
  {
    id: "s2",
    level: "semantics",
    type: "boolean",
    text: "<strong> and <b> are exactly the same semantically.",
    options: ["True", "False"],
    correctAnswer: "False",
    helper: "<strong> adds importance, while <b> is purely presentational.",
    timeLimit: 18,
  },
  {
    id: "s3",
    level: "semantics",
    type: "short-text",
    text: "What semantic element is commonly used for site-wide navigation links? (Just the tag name)",
    options: [],
    correctAnswer: "nav",
    acceptableAnswers: ["nav", "<nav>", "</nav>"],
    helper: "The <nav> element represents a section of navigation links.",
    timeLimit: 22,
  },
  {
    id: "s4",
    level: "semantics",
    type: "mcq",
    text: "Which element is best for marking up the footer of an article or page?",
    options: ["<section>", "<footer>", "<aside>", "<bottom>"],
    correctAnswer: "<footer>",
    helper: "A footer can contain info about the section it belongs to.",
    timeLimit: 20,
  },

  // MEDIA & TABLES
  {
    id: "m1",
    level: "media",
    type: "mcq",
    text: "Which attribute is required on <img> for accessibility?",
    options: ["src", "alt", "width", "title"],
    correctAnswer: "alt",
    helper: "The alt attribute provides alternative text for screen readers.",
    timeLimit: 20,
  },
  {
    id: "m2",
    level: "media",
    type: "boolean",
    text: "The <video> element can provide built-in play and pause controls.",
    options: ["True", "False"],
    correctAnswer: "True",
    helper: "Add the controls attribute to display the default UI.",
    timeLimit: 18,
  },
  {
    id: "m3",
    level: "media",
    type: "short-text",
    text: "Which element is used to define a table row? (Just the tag name)",
    options: [],
    correctAnswer: "tr",
    acceptableAnswers: ["tr", "<tr>", "</tr>"],
    helper: "Each table row is wrapped in a <tr> element.",
    timeLimit: 20,
  },
  {
    id: "m4",
    level: "media",
    type: "mcq",
    text: "Which group of elements is valid for a basic HTML table?",
    options: [
      "<head>, <body>, <foot>",
      "<table>, <row>, <column>",
      "<table>, <tr>, <td>",
      "<table>, <section>, <article>",
    ],
    correctAnswer: "<table>, <tr>, <td>",
    helper: "A table is built from rows (<tr>) containing cells (<td> or <th>).",
    timeLimit: 22,
  },
];

// SECTION: State
const state = {
  currentLevel: null,
  currentQuestions: [],
  currentIndex: 0,
  score: 0,
  timingMode: "question", // "question" or "quiz"
  timerId: null,
  timeRemaining: 0,
  perQuestionLimit: 20,
  quizTotalLimit: 180, // seconds for full quiz mode
  questionStartTime: null,
  answerTimes: [], // in seconds per question
};

// SECTION: DOM References
const levelButtons = document.querySelectorAll(".level-chip");
const levelLabel = document.getElementById("level-label");
const questionTypeLabel = document.getElementById("question-type-label");
const startButton = document.getElementById("start-quiz");
const submitButton = document.getElementById("submit-answer");
const skipButton = document.getElementById("skip-question");
const answersForm = document.getElementById("answers");
const questionText = document.getElementById("question-text");
const questionHelper = document.getElementById("question-helper");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const totalQuestionsEl = document.getElementById("total-questions");
const progressBar = document.getElementById("progress-bar");
const progressCount = document.getElementById("progress-count");
const timeRemainingEl = document.getElementById("time-remaining");
const timerModeEl = document.getElementById("timer-mode");
const timingToggle = document.getElementById("timing-toggle");
const resultsSection = document.getElementById("results");
const resultsSummary = document.getElementById("results-summary");
const resultsCorrect = document.getElementById("results-correct");
const resultsIncorrect = document.getElementById("results-incorrect");
const resultsFastest = document.getElementById("results-fastest");
const resultsSlowest = document.getElementById("results-slowest");
const playAgainButton = document.getElementById("play-again");
const changeLevelButton = document.getElementById("change-level");

// SECTION: Helpers
function formatSeconds(totalSeconds) {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const minutes = String(Math.floor(clamped / 60)).padStart(2, "0");
  const seconds = String(clamped % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getQuestionsForLevel(level) {
  return QUESTIONS.filter((q) => q.level === level);
}

function clearTimer() {
  if (state.timerId !== null) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function updateProgress() {
  const current = state.currentIndex + 1;
  const total = state.currentQuestions.length;
  progressCount.textContent = `${Math.min(current, total)} / ${total}`;
  totalQuestionsEl.textContent = total;
  const ratio = total > 0 ? (state.currentIndex / total) * 100 : 0;
  progressBar.style.width = `${ratio}%`;
}

function setFeedback(message, variant) {
  feedbackEl.textContent = message || "";
  feedbackEl.classList.remove("feedback--correct", "feedback--incorrect");
  if (variant === "correct") {
    feedbackEl.classList.add("feedback--correct");
  } else if (variant === "incorrect") {
    feedbackEl.classList.add("feedback--incorrect");
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* global confetti */
function celebrate() {
  if (typeof confetti !== "function") return;
  confetti({
    particleCount: 70,
    spread: 70,
    origin: { y: 0.7 },
  });
}

// SECTION: Rendering
function renderQuestion() {
  const question = state.currentQuestions[state.currentIndex];
  if (!question) {
    endQuiz();
    return;
  }

  feedbackEl.textContent = "";
  feedbackEl.classList.remove("feedback--correct", "feedback--incorrect");
  answersForm.innerHTML = "";

  questionText.textContent = question.text;
  questionHelper.textContent = question.helper || "";

  // Question type label
  let typeLabel = "";
  if (question.type === "mcq") typeLabel = "Multiple choice";
  if (question.type === "boolean") typeLabel = "True / False";
  if (question.type === "short-text") typeLabel = "Short text";
  questionTypeLabel.textContent = typeLabel;

  if (question.type === "short-text") {
    const wrapper = document.createElement("div");
    wrapper.className = "answer-option";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "short-text-input";
    input.name = "short-text";
    input.placeholder = "Type your answer here…";

    wrapper.appendChild(input);
    answersForm.appendChild(wrapper);

    input.addEventListener("input", () => {
      submitButton.disabled = !input.value.trim();
    });
  } else {
    const options = question.type === "boolean" ? question.options : shuffle(question.options);

    options.forEach((optionValue, index) => {
      const id = `ans-${question.id}-${index}`;
      const label = document.createElement("label");
      label.className = "answer-option";
      label.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.id = id;
      input.value = optionValue;

      const span = document.createElement("span");
      span.className = "answer-label";
      span.textContent = optionValue;

      label.appendChild(input);
      label.appendChild(span);
      answersForm.appendChild(label);

      input.addEventListener("change", () => {
        document.querySelectorAll(".answer-option").forEach((el) =>
          el.classList.remove("selected")
        );
        label.classList.add("selected");
        submitButton.disabled = false;
      });
    });
  }

  // Enable buttons
  submitButton.disabled = question.type !== "short-text"; // wait for text
  skipButton.disabled = false;

  // Timer
  state.questionStartTime = Date.now();
  if (state.timingMode === "question") {
    state.timeRemaining = question.timeLimit || state.perQuestionLimit;
    startTimer();
  } else if (state.currentIndex === 0) {
    // For full quiz timer, only set once at start
    state.timeRemaining = state.quizTimeRemaining ?? state.quizTotalLimit;
    startTimer();
  }

  updateProgress();
}

// SECTION: Timer
function startTimer() {
  clearTimer();
  timeRemainingEl.textContent = formatSeconds(state.timeRemaining);
  timerModeEl.textContent =
    state.timingMode === "question" ? "Per question" : "Whole quiz";

  state.timerId = setInterval(() => {
    state.timeRemaining -= 1;
    timeRemainingEl.textContent = formatSeconds(state.timeRemaining);

    if (state.timeRemaining <= 0) {
      clearTimer();
      handleTimeUp();
    }
  }, 1000);
}

function handleTimeUp() {
  const question = state.currentQuestions[state.currentIndex];
  if (!question) return;

  // Record a max time for stats
  recordAnswerTime(question.timeLimit || state.perQuestionLimit);
  setFeedback("Time's up! The question was marked incorrect.", "incorrect");

  // Highlight correct answer if not short-text
  if (question.type !== "short-text") {
    document.querySelectorAll(".answer-option").forEach((optionEl) => {
      const input = optionEl.querySelector("input");
      if (!input) return;
      if (input.value === question.correctAnswer) {
        optionEl.classList.add("correct");
      }
    });
  }

  moveToNextQuestionAfterDelay();
}

// SECTION: Answer handling
function getUserAnswer(question) {
  if (question.type === "short-text") {
    const input = answersForm.querySelector("input[type='text']");
    return input ? input.value.trim() : "";
  }
  const checked = answersForm.querySelector("input[name='answer']:checked");
  return checked ? checked.value : null;
}

function isAnswerCorrect(question, userAnswer) {
  if (userAnswer == null) return false;

  if (question.type === "short-text") {
    const normalized = userAnswer.toLowerCase();
    const acceptable = question.acceptableAnswers || [question.correctAnswer];
    return acceptable.some((a) => normalized === a.toLowerCase());
  }

  return userAnswer === question.correctAnswer;
}

function recordAnswerTime(defaultSeconds) {
  if (!state.questionStartTime) return;
  const elapsedMs = Date.now() - state.questionStartTime;
  const elapsedSec = elapsedMs / 1000;
  const timeUsed = Math.min(elapsedSec, defaultSeconds || elapsedSec);
  state.answerTimes.push(timeUsed);
}

function submitCurrentAnswer() {
  const question = state.currentQuestions[state.currentIndex];
  if (!question) return;

  const userAnswer = getUserAnswer(question);
  if (!userAnswer) {
    setFeedback("Pick or type an answer before submitting.");
    return;
  }

  const correct = isAnswerCorrect(question, userAnswer);

  // Timer handling for stats
  if (state.timingMode === "question") {
    const limit = question.timeLimit || state.perQuestionLimit;
    recordAnswerTime(limit);
  } else {
    // quiz timer: use elapsed relative to question start
    recordAnswerTime(9999);
  }

  if (correct) {
    state.score += 1;
    scoreEl.textContent = String(state.score);
    setFeedback("Nice! That's correct.", "correct");
    celebrate();
  } else {
    setFeedback("Not quite. Check the helper text and try the next one.", "incorrect");
  }

  // Visual marking for MCQ/boolean
  if (question.type !== "short-text") {
    document.querySelectorAll(".answer-option").forEach((optionEl) => {
      const input = optionEl.querySelector("input");
      if (!input) return;
      const value = input.value;
      if (value === question.correctAnswer) {
        optionEl.classList.add("correct");
      } else if (value === userAnswer) {
        optionEl.classList.add("incorrect");
      }
    });
  }

  // Disable further changes
  submitButton.disabled = true;
  skipButton.disabled = true;
  clearTimer();

  moveToNextQuestionAfterDelay();
}

function moveToNextQuestionAfterDelay() {
  setTimeout(() => {
    state.currentIndex += 1;
    if (state.currentIndex >= state.currentQuestions.length) {
      endQuiz();
    } else {
      renderQuestion();
    }
  }, 1200);
}

// SECTION: Quiz lifecycle
function startQuiz() {
  if (!state.currentLevel) {
    setFeedback("Choose a level on the left before starting.");
    return;
  }

  state.currentQuestions = shuffle(getQuestionsForLevel(state.currentLevel));
  state.currentIndex = 0;
  state.score = 0;
  state.answerTimes = [];
  scoreEl.textContent = "0";
  totalQuestionsEl.textContent = state.currentQuestions.length;
  progressBar.style.width = "0%";
  progressCount.textContent = `0 / ${state.currentQuestions.length}`;
  setFeedback("", null);

  // Timer for quiz mode
  if (state.timingMode === "quiz") {
    state.timeRemaining = state.quizTotalLimit;
  }

  resultsSection.hidden = true;
  startButton.textContent = "Restart level";
  renderQuestion();
}

function endQuiz() {
  clearTimer();
  const total = state.currentQuestions.length;
  const correct = state.score;
  const incorrect = Math.max(0, total - correct);

  resultsCorrect.textContent = String(correct);
  resultsIncorrect.textContent = String(incorrect);

  if (state.answerTimes.length > 0) {
    const fastest = Math.min(...state.answerTimes);
    const slowest = Math.max(...state.answerTimes);
    resultsFastest.textContent = `${fastest.toFixed(1)}s`;
    resultsSlowest.textContent = `${slowest.toFixed(1)}s`;
  } else {
    resultsFastest.textContent = "–";
    resultsSlowest.textContent = "–";
  }

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  let message = "";
  if (percentage === 100) {
    message = "Perfect HTML! You nailed every question in this level.";
  } else if (percentage >= 75) {
    message = "Solid work. A few more reps and you'll be unstoppable.";
  } else if (percentage >= 50) {
    message = "Good start. Review the helper text and try again.";
  } else {
    message = "Everyone starts somewhere. Replay the level and watch your score climb.";
  }

  resultsSummary.textContent = `${correct} out of ${total} correct (${percentage}%). ${message}`;
  resultsSection.hidden = false;

  // Small celebration for passing scores
  if (percentage >= 70 && typeof confetti === "function") {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.65 },
    });
  }
}

// SECTION: Event Wiring
levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const level = button.dataset.level;
    state.currentLevel = level;

    levelButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const labelMap = {
      basics: "HTML Basics",
      forms: "Forms & Inputs",
      semantics: "Semantics",
      media: "Media & Tables",
    };

    levelLabel.textContent = labelMap[level] || "Custom level";
    setFeedback("Level selected. Hit 'Start quiz' when you're ready.");
  });
});

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", submitCurrentAnswer);

skipButton.addEventListener("click", () => {
  const question = state.currentQuestions[state.currentIndex];
  if (!question) return;

  // Record full time as used for stats when skipping while timer running
  if (state.timingMode === "question") {
    recordAnswerTime(question.timeLimit || state.perQuestionLimit);
  }

  clearTimer();
  setFeedback("Question skipped. No points gained or lost.");
  moveToNextQuestionAfterDelay();
});

// Toggle timing mode
if (timingToggle) {
  timingToggle.addEventListener("click", () => {
    const pressed = timingToggle.getAttribute("aria-pressed") === "true";
    const next = !pressed;
    timingToggle.setAttribute("aria-pressed", String(next));
    state.timingMode = next ? "question" : "quiz";
    timerModeEl.textContent = next ? "Per question" : "Whole quiz";

    // Reset any running timer
    clearTimer();
    state.timeRemaining = 0;
    timeRemainingEl.textContent = "00:00";
    setFeedback("Timing mode changed. Start the quiz again to apply.");
  });
}

// Results buttons
playAgainButton.addEventListener("click", () => {
  resultsSection.hidden = true;
  startQuiz();
});

changeLevelButton.addEventListener("click", () => {
  resultsSection.hidden = true;
  setFeedback("Pick a new level and start again.");
});

// Initial UI state
scoreEl.textContent = "0";
progressBar.style.width = "0%";
progressCount.textContent = "0 / 0";
setFeedback("Choose a level and press 'Start quiz' to begin.");
