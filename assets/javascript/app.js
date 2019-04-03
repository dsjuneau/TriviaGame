// Trivia game

// Global Varialbes
var countDown;
// Array of objects holding questions and answers.
var questions = [
  {
    question: "What is the ticker symbol for the Ford Motor Company?",
    answer: ["FORD", "FRD", "F", "FD", "CAR"],
    correctAnswer: "3"
  }
];

// Game Object
var game = {
  rightAnswer: 0,
  wrongAnswer: 0,
  seconds: 30,
  question: 0,
  reset: function() {
    $("h3").css("display", "block");
    $(".start-button").css("display", "none");
    this.question = 0;
    this.seconds = 30;
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
    if (this.question === questions.length) {
      gameOver();
    }
    $(".question").text(questions[this.question].question);
    $("#1").text(questions[this.question].answer[0]);
    $("#2").text(questions[this.question].answer[1]);
    $("#3").text(questions[this.question].answer[2]);
    $("#4").text(questions[this.question].answer[3]);
    $("#5").text(questions[this.question].answer[4]);
  },
  feedback: function(guess) {
    // in each, update question
    if (guess === "0") {
      // Update variable holding timeouts
      $(".feedback").text(
        "Time is up. The correct answer was " +
          questions[this.question].answer[
            parseInt(questions[this.question].correctAnswer) - 1
          ]
      );
    } else if (guess === questions[this.question].correctAnswer) {
      this.rightAnswer++;
      $(".feedback").text("You are correct!");
    } else {
      this.wrongAnswer++;
      $(".feedback").text(
        "Wrong answer.  The correct answer was " +
          questions[this.question].answer[
            parseInt(questions[this.question].correctAnswer) - 1
          ]
      );
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
