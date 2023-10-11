const questions = [
  {
    audio: "melupakan",
    choices: ["melupakan", "membeli", "memberi", "memburu"],
    correct: "melupakan",
  },
  {
    audio: "membeli",
    choices: ["melupakan", "membeli", "memberi", "memburu"],
    correct: "membeli",
  },
  {
    audio: "memberi",
    choices: ["melupakan", "membeli", "memberi", "memburu"],
    correct: "memberi",
  },
  {
    audio: "memburu",
    choices: ["melupakan", "membeli", "memberi", "memburu"],
    correct: "memburu",
  },
  {
    audio: "merupakan",
    choices: ["melupakan", "membeli", "merupakan", "memburu"],
    correct: "merupakan",
  },
  // Add more questions here
];

const containerEl = document.querySelector(".container");
const wordsEl = document.querySelector(".words");
const resultDiv = document.getElementById("result");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createQuestion(question) {
  const { audio, choices, correct } = question;

  containerEl.innerHTML = "";
  wordsEl.innerHTML = "";
  nextButton.style.display = "none"; // Hide the Next button

  const audioBtn = document.createElement("button");
  audioBtn.classList.add("btn");
  audioBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  audioBtn.style.backgroundImage = `url(images/${audio}.jpg`;
  containerEl.appendChild(audioBtn);

  const correctAudioEl = document.createElement("audio");
  correctAudioEl.src = `sounds/${audio}.mp3`;

  audioBtn.addEventListener("click", () => {
    correctAudioEl.play();
  });

  const shuffledChoices = [...choices];
  shuffleArray(shuffledChoices);
  shuffledChoices.forEach((choice) => {
    const answerBtn = document.createElement("button");
    answerBtn.classList.add("btn__words");
    answerBtn.innerText = choice;
    answerBtn.addEventListener("click", () => checkAnswer(choice, correct));
    wordsEl.appendChild(answerBtn);
  });
}

function checkAnswer(selectedWord, correctWord) {
  if (selectedWord === correctWord) {
    resultDiv.textContent = "Correct!";
    correctAnswers++;
  } else {
    resultDiv.textContent = "Incorrect. Try again.";
    incorrectAnswers++;
  }
  
  nextButton.style.display = "block"; // Show the Next button
}

function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    createQuestion(questions[currentQuestionIndex]);
    resultDiv.textContent = ""; // Clear the result message
    nextButton.style.display = "none"; // Hide the Next button
  } else {
    resultDiv.textContent = `Quiz complete. Correct answers: ${correctAnswers}, Incorrect answers: ${incorrectAnswers}`;
  }
}

createQuestion(questions[currentQuestionIndex]);
nextButton.addEventListener("click", moveToNextQuestion);
