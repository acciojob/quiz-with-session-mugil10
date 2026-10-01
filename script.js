const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "Which language is used for web page structure?",
    options: ["CSS", "JavaScript", "HTML", "Python"],
    answer: "HTML"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    answer: "Netscape"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Get previously saved answers
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display questions
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");

  const questionTitle = document.createElement("p");
  questionTitle.textContent = `${index + 1}. ${q.question}`;

  questionDiv.appendChild(questionTitle);

  q.options.forEach((option) => {
    const label = document.createElement("label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question${index}`;
    radio.value = option;

    // Restore previously selected answer
    if (progress[index] === option) {
      radio.checked = true;
    }

    // Save answer whenever user selects it
    radio.addEventListener("change", () => {
      progress[index] = option;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));

    questionDiv.appendChild(label);
    questionDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(questionDiv);
});

// Submit quiz
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  // Display score
  scoreDisplay.textContent = `Your score is ${score} out of 5.`;

  // Save score in local storage
  localStorage.setItem("score", score);
});

// Show previously saved score after refresh
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
}