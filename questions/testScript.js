
let selected = new Array(10);
let click = false;
const changeDetail = (mode, category) => {
  let storeMode = document.querySelector(".info").getElementsByTagName("p")[0];
  let storeSub = document.querySelector(".info").getElementsByTagName("h1")[0];
  storeMode.innerHTML = "Mode - " + capitalizeFirstLetter(mode);
  storeSub.innerHTML = category;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getQuestion() {
  let mode = localStorage.getItem("mode");
  let category = localStorage.getItem("category");

  let res;
  console.log(mode)
  if (category === "General Knowledge") {
    res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=9&difficulty=${mode}&type=multiple`
    );
  } else if (category === "Sports") {
    res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=21&difficulty=${mode}&type=multiple`
    );
  }
  let questions = await res.json();
  let question = questions.results;

  let questionContainer = document.querySelector(".ques-box");
  let ul = document.createElement("ul");
  question.forEach((element) => {

    // let option = document;
    let answers  = [];
    let keys = ["a", "b", "c", "d"];
    let randomNum = Math.floor(Math.random() * 4);

    let count = 0;
    for (let i = 0; i < 4; i++) {
      if (i !== randomNum) {
        answers.push(
          `<button value="false" id="${keys[i]}" class="choice">${element.incorrect_answers[count]}</button>`
        );
        count++;
      } else {
        answers.push(
          `<button value="true" id="${keys[i]}" class="choice">${element.correct_answer}</button>`
        );
      }
    }
    ul.innerHTML =
      ul.innerHTML +
      `<li>
            <div class="question">
                <p>${element.question}</p>
                <div class="option options">
                    ${answers[0]}
                    ${answers[1]}
                    ${answers[2]}
                    ${answers[3]}
                </div>
            </div>
        </li>`;
    });
    
    questionContainer.prepend(ul);
  changeDetail(mode, category);

  tickOption();
}

getQuestion();

const showCorrectOption = () => {
  let options = document.querySelectorAll(".option");
  for (let i = 0; i < options.length; i++) {
    let choices = options[i].children;
    let count = 0;
    for (const choice of choices) {
      if (choice.value === "true" && selected[i] === 1) {
        console.log("Your answer is correct");
      } else if (choice.value === "true" && selected[i] === 0) {
        console.log(`You pick this wrong answer `);
      }
    }
  }
};

const tickOption = () => {
  let options = document.querySelectorAll(".options");

  options.forEach((option, i) => {
    option.addEventListener("click", (e) => {
      const choices = option.children;
      for (const choice of choices)
        if (choice.innerText === e.target.innerText)
          choice.style.borderColor = "gray";
        else choice.style.borderColor = "lightgrey";

      //update selected
      selected[i] = e.target.innerText;

      isAllSelected()
    });
  });

};

const isAllSelected = () => {
    for (const value of selected) 
        if(!value) return;
    
    const btn = document.querySelector(".btn")
    btn.disabled = false;
    btn.classList.remove("disabled")
}

document.querySelector(".btn").addEventListener("click", () => {
  let count = 0;

  let options = document.querySelectorAll(".option");
  for (let i = 0; i < options.length; i++) {
    let choices = options[i].children;
    for (const choice of choices) {
      if (choice.innerText === selected[i]) {
        if(choice.value === "true") {
            choice.style.background = "green"
            count++
        }
        else 
            choice.style.background = "red"
      } else if (choice.value === "true") {
        choice.style.background = "lightgreen"
      } else {
        choice.style.background = "none"
      }
    }
  }

  let perf;
  if (count <= 3) {
    perf = "poor";
  } else if (count <= 7) {
    perf = "Good";
  } else {
    perf = "Best";
  }
    let marks = document.querySelector(".marks");
    marks.innerHTML =
      `<div class="result">
            <p> Your Result </p>
            <p class="marks">${count}/10</p>
            <p>${perf}</p>
        </div>`;
    window.scrollTo(0, document.body.scrollHeight);
});
