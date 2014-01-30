// Saves options to localStorage.
function save_options() {
  var questions = document.getElementById("questionsJson").value;
  console.log(localStorage["okcpDefaultQuestions"]);
  localStorage["okcpDefaultQuestions"] = questions;
  console.log('after');
  console.log(localStorage["okcpDefaultQuestions"]);
  
  var statusOutput = document.getElementById("statusOutput");
  statusOutput.innerHTML =localStorage["okcpDefaultQuestions"];

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

document.querySelector('#save').addEventListener('click', save_options);