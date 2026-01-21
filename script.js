let gamePatterns = [];
let userClickedPattern = [];
let start = false;
let level = 0;
let btnColors = ["red", "green", "blue", "yellow"];
$(document).keypress(()=> {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = btnColors[randomNumber];
  gamePatterns.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  //   console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePatterns[currentLevel]) {
    if (userClickedPattern.length == gamePatterns.length)
      setTimeout(function () {
        nextSequence();
      }, 1000);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over,Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  gamePatterns = [];
  start = false;
  level = 0;
}
