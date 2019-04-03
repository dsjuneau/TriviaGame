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
    console.log(game.question);
    if (game.question === questions.length) {
      gameOver();
    }
    $(".question").text(questions[game.question].question);
    $("#1").text(questions[game.question].answer[0]);
    $("#2").text(questions[game.question].answer[1]);
    $("#3").text(questions[game.question].answer[2]);
    $("#4").text(questions[game.question].answer[3]);
    $("#5").text(questions[game.question].answer[4]);
  },
  feedback: function(guess) {
    if (!game.isAnswerSelected) {
      game.isAnswerSelected = true;

      if (guess === "0") {
        // Update variable holding timeouts
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
      setTimeout(game.startCountDown, 5000);
    }
  },
  gameOver: function() {
    //Display score
    //Wait 5 seconds
    //Clear Screen
    //Display start button
  }
};

$(".start-button").on("click", function() {
  game.reset();
  game.startCountDown();
  game.startQuestions();
});

$(".answer").on("click", function(e) {
  clearInterval(countDown);
  game.feedback($(this).attr("value"));
});
