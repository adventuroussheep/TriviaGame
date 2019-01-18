var time = 15;
var clockStart = false;
var intervalId;

var answered = 0;
var numCorrect = 0;
var numIncorrect = 0;
var numTimeout = 0;

var blankArray = [{ question: "", choices: ["", "", "", ""], answer: 0 }];
  x = 0;

// Waits for document to completely load
document.addEventListener("DOMContentLoaded", function() {
  $("#resetAll").hide();
  $("#formId").hide();
  $("#submitBtn").hide();
  $("#startBtn").on("click", start);
  $("#submitBtn").on("click", submit);
  $("#resetAll").on("click", restart);
  $("#formImg").hide();


  // Timer/button Functions
  function submit() {
    x++;
    checkWin();
    updateDisplay();
    reset();
  }
  function reset() {
    time = 15;
    $("#timer").text("00:15");
  }
  function start() {
    if (clockStart == false) {
      intervalId = setInterval(count, 1000);
      clockStart = true;
      $("#startBtn").hide();
      $("#formId").show();
      $("#formHeader").empty();
      $("#submitBtn").show();
      $("#formImg").hide();
      $.extend(blankArray, allQuestions);
      updateDisplay();
    }
  }
  function stop() {
    clearInterval(intervalId);
    clockStart = false;
  }
  function count() {
    time--;
    var converted = timeConverter(time);
    $("#timer").text(converted);
  }
  function restart(){
    x=0;
    time = 15;
    clockStart = false;
    answered = 0;
    numCorrect = 0;
    numIncorrect = 0;
    numTimeout = 0;
    start();
    $("#submitBtn").show();
    $("#resetAll").hide();
    $("#resultsArea").hide();

  }
  // time Converter
  function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "0";
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds <= 0) {
      reset();
      submit();
    }
    return minutes + ":" + seconds;
  }


  //   Questions
  var allQuestions = [
    {
      question: "What was the first Disney movie ever released?",
      choices: [
        "Dumbo",
        "Snow White and the Seven Dwarfs",
        "Bambi",
        "Pinocchio"
      ],
      answer: "Snow White and the Seven Dwarfs",
      answerText: "Snow White and the Seven Dwarfs 1937"
    },

    {
      question: "What is the heighest grossing Disney Pixar film?",
      choices: ["Monsters, Inc.", "Toy Story 3", "Up", "Finding Nemo"],
      answer: "Finding Nemo",
      answerText: "Finding Nemo, $503 Million."
    },

    {
      question: "In what movie does Eddie Murphy voice a cartoon character?",
      choices: ["Mulan", "Monsters University", "Frankenweenie", "Zootopia"],
      answer: "Mulan",
      answerText: "Mulan, Mushu."
    },

    {
      question: "Which movie took the longest time to make?",
      choices: [
        "The Fox and the Hound",
        "Fantasia",
        "Sleeping Beauty",
        "Pocahontas"
      ],
      answer: "Sleeping Beauty",
      answerText: "Sleeping Beauty, 8 years."
    },

    {
      question: "What movie had the lowest budget?",
      choices: [
        "Fantasia",
        "The Sword in the Stone",
        "One Hundred and One Dalmatians",
        "Robin Hood"
      ],
      answer: "Robin Hood",
      answerText: "Robin Hood, $1.5 Million."
    },

    {
      question: "What movie lost Disney the most money?",
      choices: [
        "Treasure Planet",
        "Mars Needs Moms",
        "The Black Cauldron",
        "The Alamo"
      ],
      answer: "Mars Needs Moms",
      answerText: "Mars Needs Moms, $110 Million."
    }
  ];

  
  //   Updates the display, sets radio button values/text, and clears radio buttons
  function updateDisplay() {
    $("#popQuestion").text(blankArray[x].question);
    $("#radioText0").text(blankArray[x].choices[0]);
    $("#radioText1").text(blankArray[x].choices[1]);
    $("#radioText2").text(blankArray[x].choices[2]);
    $("#radioText3").text(blankArray[x].choices[3]);

    document.getElementById("radioBtn0").value = blankArray[x].choices[0];
    document.getElementById("radioBtn1").value = blankArray[x].choices[1];
    document.getElementById("radioBtn2").value = blankArray[x].choices[2];
    document.getElementById("radioBtn3").value = blankArray[x].choices[3];

    answerVar = blankArray[x].answer;

    // Clears radio buttons on submit
    var clearRadio = document.getElementsByName("radInput");
    for (var i = 0; i < clearRadio.length; i++) {
      clearRadio[i].checked = false;
    }
  }

  // Checks for user input, displays correct/incorrect screen, checks for end game conditions and displays results
  function checkWin() {

    // Takes the checked radio button and pushes the value of the button to the choiceSelected array
    choiceSelected = [];
    els = document.getElementsByName("radInput");
    for (var i = 0; i < els.length; i++) {
      if (els[i].checked) {
        choiceSelected.push(els[i].value);
      }
    }

    // Changes the poster image
    var imageCount = "./assets/images/question" + x + ".jpg";
    $("#formImg").attr("src", imageCount);
    $("#formId").hide();
    $("#submitBtn").hide();
    $("#formImg").show();

    // Sets timout function/splash screen for when answers are submitted
    if (choiceSelected == answerVar) {
      numCorrect++;
      answered++;
      stop();
      setTimeout(start, 4000);
      $("#formHeader").text("Correct! " + blankArray[x - 1].answerText);
      $("#formImg").attr("src");
    }
    if (choiceSelected != answerVar && seconds >= 1) {
      numIncorrect++;
      answered++;
      stop();
      setTimeout(start, 4000);
      $("#formHeader").text("Incorrect. " + blankArray[x - 1].answerText);
    }
    if (choiceSelected != answerVar && seconds <= 0) {
      numTimeout++;
      answered++;
      stop();
      setTimeout(start, 4000);
      $("#formHeader").text("Timed out. " + blankArray[x - 1].answerText);
    }

    // Checks if all questions have been completed and ends game
    if (answered == 6) {
      gameOver();
      stop();
    }
    //  Displays results and stops timer after 4 seconds
    function gameOver() {
      stop();
      setTimeout(function() {
        stop();
        $("#resetAll").show();
        $("#formId").hide();
        $("#submitBtn").hide();
        $("#formHeader").text("Results:");
        $("#resultsArea").show();
        $("#resultsArea").html(
          "<h4>" +
            "Correct: " +
            numCorrect +
            "<br>" +
            "Incorrect: " +
            numIncorrect +
            "<br>" +
            "Timed out: " +
            numTimeout +
            "</h4>"
        );
        if (numCorrect >= 2) {
          $("#timer").text("Better luck next time!");
        }
        if (numCorrect >= 5) {
          $("#timer").text("You really know your stuff!");
        }
        if (numCorrect <= 1) {
          $("#timer").text("Yikes! Better try that again...");
        }
      }, 4000);
    }
  }
});
