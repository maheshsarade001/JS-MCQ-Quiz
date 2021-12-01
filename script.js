let rightAns;

document.addEventListener("DOMContentLoaded", function () {
  addQuestion();

  eventListeners();
});

eventListeners = () => {
  document.querySelector("#submit").addEventListener("click", validateAnswer);
};
addQuestion = () => {
  const url = "https://opentdb.com/api.php?amount=10&category=25";
  fetch(url)
    .then((data) => data.json())
    .then((result) => loadQuestion(result.results));
};

const question = document.querySelector(".question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const submit = document.querySelector("#submit");

const answers = document.querySelectorAll(".answer");

const showScore = document.querySelector("#showScore");

let score = 0;

let questionCount = 0;

const loadQuestion = (arr) => {
  const questionList = arr[questionCount]; //arr[]
  console.log(arr);
  question.innerHTML = questionList.question;
  option1.innerHTML = questionList.correct_answer;
  option2.innerHTML = questionList.incorrect_answers[0];
  option3.innerHTML = questionList.incorrect_answers[1];
  option4.innerHTML = questionList.incorrect_answers[2];

  rightAns = questionList.correct_answer;


};

const getAnswer = () => {
  answers.forEach(() => {
    for (var i = 0; i < answers.length; i++) {
      var selector = "label[for=" + answers[i].id + "]";
      var label = document.querySelector(selector);
      var text = label.innerHTML;
      // do stuff
      if (answers[i].checked) {
        answer = text;
        console.log("lab", answer);
      }
    }
  });
  return answer;
};

submit.addEventListener("click", () => {
  let checkedAnswer = getAnswer();
  console.log("Your ans", checkedAnswer, "Right-ans", rightAns);
  document.getElementById(
    "your-ans"
  ).innerHTML = `You Selected : ${checkedAnswer}`;

  if (checkedAnswer === rightAns) {
    document.getElementById("status").innerHTML = "Correct Answer";

    console.log("Correct Ans");
    console.log("Initial Score:", score);
    score++;
    let yourScore = (document.getElementById(
      "scores"
    ).value = `Your Score is ${score}`);
    document.getElementById("scores").innerHTML = yourScore;
    console.log("Now YOur Score", score);
  } else {
    document.getElementById("status").innerHTML = "Wrong Answer";
    document.getElementById("scores").value = `Your Score is ${score}`;
    console.log("Incorrect Ans");
  }

  questionCount = questionCount + 1;
  // console.log(questionCount);

  if (questionCount < 11) {
    addQuestion();
  } else {
    showScore.innerHTML = `
        <h4>Hey Congrats !!! You scored ${score} / 10</h4>
        <button class="btn" onclick="location.reload()">Play Again</button>
    `;
    showScore.classList.remove("scoreArea");
  }
});
