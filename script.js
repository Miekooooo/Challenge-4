const questions = [
    {
      question: "What is 2 + 2?",
      choices: ["3", "4", "5"],
      correctAnswer: "4"
    },
    {
      question: "What is the capital of France?",
      choices: ["Berlin", "London", "Paris"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the symbol for the element Oxygen?",
      choices: ["O", "Ox", "O2"],
      correctAnswer: "O"
    },
    {
      question: "What is the tallest mammal on Earth?",
      choices: ["Elephant", "Giraffe", "Whale"],
      correctAnswer: "Giraffe"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 55;
  let timerInterval;

  const startButton = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const quizContainer = document.getElementById("questions");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices");
  const timerDisplay = document.getElementById("timer");
  const resultContainer = document.getElementById("results");
  const scoreDisplay = document.getElementById("score");

  startButton.addEventListener("click", startQuiz);

  function startQuiz() {
    startButton.style.display = "none";
    questionContainer.style.display = "none";
    quizContainer.style.display = "block";

    showQuestion();
    startTimer();

    function showQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionText.textContent = currentQuestion.question;
      choicesList.innerHTML = "";

      currentQuestion.choices.forEach((choice) => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", handleAnswer);
        choicesList.appendChild(li);
      });
    }

    function handleAnswer(event) {
      const selectedChoice = event.target.textContent;
      const currentQuestion = questions[currentQuestionIndex];

      if (selectedChoice === currentQuestion.correctAnswer) {
        score++;
        timeLeft += 15;
      } else {
        timeLeft -= 15;
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }

    function startTimer() {
      timerDisplay.textContent = timeLeft;

      timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
          clearInterval(timerInterval);
          endQuiz();
        }
      }, 1000);
    }

    function endQuiz() {
      clearInterval(timerInterval);
      quizContainer.style.display = "none";
      resultContainer.style.display = "block";
      scoreDisplay.textContent = score;
    }
  }
