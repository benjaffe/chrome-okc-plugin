// $ = jQuery;


var questions ={
	"questionsVersionNum" : "1.5.0",
	"questionsList":
	[
	]
};
// var questionFiles =['poly.js'];
// var ii, curQuestions;
// for(ii =0; ii<.length; ii++) {
	// curQuestions =chrome.extension.getURL('questions/'+questionFiles[ii]);
	// console.log('curQuestions: '+JSON.stringify(curQuestions));
	// questions.questionsList.push(curQuestions.questionsList);
// }

/*
var xx;
for(xx in localStorage.fileQuestions) {
	console.log(localStorage.fileQuestions[xx]);
	questions.questionsList.push(localStorage.fileQuestions[xx]);
}
*/

var xx, yy;
var fullQuestionsList = {};
_OKCP.filteredQuestionsList = {};
var desiredCategories = JSON.parse(localStorage.okcp).questionCategories;

for(xx in _OKCP.fileQuestions) {
	for (yy in _OKCP.fileQuestions[xx]) {
		if (_OKCP.fileQuestions[xx].hasOwnProperty(yy)) {
			fullQuestionsList[yy] = _OKCP.fileQuestions[xx][yy];
		}
	}
}
_OKCP.fileQuestions = fullQuestionsList;
_OKCP.categoryList = [];
_OKCP.fullQuestionsList = [];
//loop through all questions
for (xx in fullQuestionsList) {
	//push category name into the category list.
	_OKCP.categoryList.push(xx);
	//push category questions into fullQuestionsList
	for (yy in fullQuestionsList[xx]) {
		_OKCP.fullQuestionsList.push(fullQuestionsList[xx][yy]);
	}
	//loop through desired categories
	for (var i = desiredCategories.length - 1; i >= 0; i--) {
		//if the current questions matches, use it
		if (xx === desiredCategories[i]) {
			_OKCP.filteredQuestionsList[xx] = fullQuestionsList[xx];
		}
		
	}
}

questions.questionsList = _OKCP.filteredQuestionsList;
localStorage.okcpDefaultQuestions = JSON.stringify(questions);