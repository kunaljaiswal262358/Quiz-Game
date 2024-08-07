let results = [false,false,false,false,false,false,false,false,false,false];
let clickOption = new Array(10);
let click = false;
const changeDetail = (mode , category) => {
    let storeMode = document.querySelector(".info").getElementsByTagName("p")[0];
    let storeSub = document.querySelector(".info").getElementsByTagName("h1")[0];
    storeMode.innerHTML = "Mode - "+ capitalizeFirstLetter(mode);
    storeSub.innerHTML = category;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getQuestion(){
    let mode = localStorage.getItem("mode");
    let category = localStorage.getItem("category");
    
    let res;
    if(category === "General Knowledge"){
        res = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=${mode}&type=multiple`)
    } else if(category === "Sports"){
        res = await fetch(`https://opentdb.com/api.php?amount=10&category=21&difficulty=${mode}&type=multiple`)
    }
    let questions = await res.json();
    let question = questions.results;

    question.forEach(element => {
        let option = document.querySelector(".ques-box").getElementsByTagName("ul")[0];
        let answers = [];
        let keys = ["a","b","c","d"];
        let randomNum = Math.floor(Math.random()*4);

        let count = 0;
        for (let i = 0; i < 4; i++) {
            if(i !== randomNum){
                answers.push(`<button value="false" id="${keys[i]}" class="choice">${element.incorrect_answers[count]}</button>`)
                count++;
            }
            else 
            {
                answers.push(`<button value="true" id="${keys[i]}" class="choice">${element.correct_answer}</button>`)
            }
        }
        option.innerHTML = option.innerHTML + `<li>
            <div class="question">
                <p>${element.question}</p>
                <div class="option">
                    ${answers[0]}
                    ${answers[1]}
                    ${answers[2]}
                    ${answers[3]}
                </div>
            </div>
        </li>`
    });

    changeDetail(mode , category);

    tickOption();
}

getQuestion()


const colorOption = () => {
    let options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        let choices = element.querySelectorAll("button")
        let count = 0;
        choices.forEach(ele => {
            if(ele.value === "true") {
                ele.style.backgroundColor = "#09eb09"
                ele.style.color = "white"
            }
            if(clickOption[i] === count){
                if(ele.value === "false"){
                    ele.style.backgroundColor = "red"
                    ele.style.color = "white" 
                } else {
                    ele.style.backgroundColor = "green"
                    ele.style.color = "white"
                }
            }
            count++;
        })
    }
}

const tickOption = () => {
    let options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        let choices = element.querySelectorAll("button");
        for (let j = 0; j < choices.length; j++) {
            const ele = choices[j];
            ele.addEventListener(("click") , (evt) => {
                choices.forEach(elem => {
                    elem.style.backgroundColor = "#efefef"
                    elem.style.color = "black"
                })
                evt.target.style.backgroundColor = "#254059"
                evt.target.style.color = "white"
                clickOption[i] = j;
                if(evt.target.value === "true"){
                    results[i] = true;
                }
            })       
        }
    }
}

document.querySelector(".btn").addEventListener(("click") , () => {
    colorOption();
    let count = 0;
    for (let i = 0; i < 10; i++) {
        if(results[i] == true){
            count++;
        }
    }
    let perf;
    if(count <= 3){
        perf = "poor";
    } else if(count <=7){
        perf = "Better";
    } else {
        perf = "Good";
    }
    if(click === false){
        click = true;
        let marks = document.createElement("div");
        marks.innerHTML = marks.innerHTML + `<div class="result">
            <p> Your Result </p>
            <p class="marks">${count}/10</p>
            <p>${perf}</p>
        </div>`
        document.querySelector(".ques-box").append(marks);
        window.scrollTo(0, document.body.scrollHeight);
    } 
})
