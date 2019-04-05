// Trivia game

// Global Varialbes
var countDown;
// Array of objects holding questions and answers.
var questions = [
  {
    question: "What is the ticker symbol for the Ford Motor Company?",
    answer: ["FORD", "FRD", "F", "FD", "CAR"],
    correctAnswer: "3"
  },
  {
    question: "Who is the crazy fool in charge of Tesla?",
    answer: [
      "Richard Nixon",
      "Jeff Bezos",
      "Jim Cramer",
      "Elon Musk",
      "John Smith"
    ],
    correctAnswer: "4"
  },
  {
    question:
      "What publicly traded company hit the 1 Trillion dollar market cap first?",
    answer: ["Amazon", "Microsoft", "Goldman Sachs", "Apple", "Alphabet"],
    correctAnswer: "4"
  },
  {
    question: "Which company held the original patent to cookies?",
    answer: ["IBM", "Zerox", "Apple", "Netscape", "Google"],
    correctAnswer: "4"
  },
  {
    question: "What is the ticker symbol for Microsoft?",
    answer: ["M", "MSOFT", "MT", "MS", "MSFT"],
    correctAnswer: "5"
  },
  {
    question:
      "If advertising revenue were to dry up, which company would suffer the most revenue loss?",
    answer: ["General Electric", "Apple", "Facebook", "Qualcomm", "Pepsi"],
    correctAnswer: "3"
  },
  {
    question:
      "What type of distribution curve describes stock price moves of the S&P 500?",
    answer: [
      "Leptokurtic",
      "Mesokurtic",
      "Normal",
      "Platykurtic",
      "Fat Tailed"
    ],
    correctAnswer: "1"
  }
];

// Game Object
var game = {
  rightAnswer: 0,
  wrongAnswer: 0,
  seconds: 30,
  question: 0,
  isAnswerSelected: false,
  reset: function() {
    $("h3").css("display", "block");
    $(".start-button").css("display", "none");
    game.question = 0;
    game.seconds = 30;
    game.rightAnswer = 0;
    game.wrongAnswer = 0;
  },
  startCountDown: function() {
    $("#seconds").text(game.seconds);
    if (game.seconds === 0) {
      game.feedback("0");
    } else {
      game.seconds--;
      countDown = setTimeout(game.startCountDown, 1000);
    }
  },
  startQuestions: function() {
    game.isAnswerSelected = false;
    game.seconds = 30;
    $(".feedback").text("");
    console.log(game.question + " : " + questions.length);
    if (game.question === questions.length) {
      game.gameOver();
    } else {
      game.startCountDown();
      $(".question").text(questions[game.question].question);
      $("#1").text(questions[game.question].answer[0]);
      $("#2").text(questions[game.question].answer[1]);
      $("#3").text(questions[game.question].answer[2]);
      $("#4").text(questions[game.question].answer[3]);
      $("#5").text(questions[game.question].answer[4]);
    }
  },
  feedback: function(guess) {
    if (!game.isAnswerSelected) {
      game.isAnswerSelected = true;

      if (guess === "0") {
        $(".feedback").text(
          "Time is up. The correct answer was " +
            questions[game.question].answer[
              parseInt(questions[game.question].correctAnswer) - 1
            ]
        );
      } else if (guess === questions[game.question].correctAnswer) {
        game.rightAnswer++;
        $(".feedback").text("You are correct!");
      } else {
        game.wrongAnswer++;
        $(".feedback").text(
          "Wrong answer.  The correct answer was " +
            questions[game.question].answer[
              parseInt(questions[game.question].correctAnswer) - 1
            ]
        );
      }
      game.question = game.question + 1;
      setTimeout(game.startQuestions, 5000);
    }
  },
  gameOver: function() {
    clearInterval(countDown);
    $(".question").text("");
    $("#1").text("");
    $("#2").text("");
    $("#3").text("");
    $("#4").text("");
    $("#5").text("");
    $(".feedback").text(
      game.rightAnswer +
        " correct answers and " +
        game.wrongAnswer +
        " wrong answers."
    );
    $("h3").css("display", "none");
    $(".start-button").css("display", "block");
    $(".start-button").text("Restart Game");
  }
};

// Main program starts here

$(".start-button").on("click", function() {
  game.reset();
  game.startQuestions();
});

$(".answer").on("click", function(e) {
  clearInterval(countDown);
  game.feedback($(this).attr("value"));
});
