// The following code starts Mock Service Worker tool which allows you to simulate a backend (an API) for building your apps that talk to a remote service. You can visit https://mswjs.io for details on this utility and check src/api/routes.js for a sample API route that you can edit/create as needed to simulate a real world API. This simulated backend will not be part of the completed application (built edition) and you must use a real world backend built using Node.js + Express or Java + Spring Boot to provide such a service.

// If you do not require a simulated backend, you can remove the code shown below.
import {music,modern_art,coding} from "./dataset";


const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const prevButton=document.getElementById("prev-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  nextButton.innerHTML="Next";
  // nextButton.innerHTML="Prev";
  showQuestionM();
}

function showQuestionM(){
  resetState();
   let currentQuestion=music[currentQuestionIndex];
   let questionNo=currentQuestionIndex+1;
  // let questionNo=music.id;
  questionElement.innerHTML=questionNo+". "+currentQuestion.question;
  currentQuestion.options.forEach(answer =>{
      const button=document.createElement("button");
      const ans=music.answer;
       if(answer==ans){
        button.dataset.correct=answer;
       }
      button.innerHTML=answer;
      button.classList.add("btn");
      answerButton.appendChild(button);
      
      button.addEventListener("click",selectAnswer);
  });
  // questionElement.innerHTML=
  
}

function resetState(){
  nextButton.style.display="none";
  while(answerButton.firstChild){
      answerButton.removeChild(answerButton.firstChild);
  }
};

function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect=selectedBtn.dataset.correct=="true";
  if(isCorrect){
      selectedBtn.classList.add("correct");
      score++
  }
  else{
      selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button=>{
      if(button.dataset.correct==="true"){
          button.classList.add("correct");
      }
      button.disabled= true;
  });
  nextButton.style.display="block";
};


function changeQue(n){
  currentQuestionIndex=currentQuestionIndex+n;
  showQuestionM();
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<music.length){
      showQuestionM();
  }
  else{
      showScore();
  }
};

function handlePrevButton(){
  //currentQuestionIndex--;
  // if(currentQuestionIndex>music.length){
      changeQue(-1);
  // }
  // else{
  //     showScore();
  // }
};

function showScore(){
  resetState();
  questionElement.innerHTML=`Your Score is ${score} out of ${music.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
};

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<music.length){
      handleNextButton();
  }
  else{
      startQuiz();
  }
})

prevButton.addEventListener("click",()=>{
   if(currentQuestionIndex>music.length){
    currentQuestionIndex--;
    handlePrevButton();
   }
  // else{
  //   handleNextButton();
  // }
})

startQuiz();
