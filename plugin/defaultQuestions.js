// $ = jQuery;

// check to see if any database upgrades or localStorage cleanups are necessary
(function () {
	// create a database if there isn't one
	if (localStorage.okcp === undefined) {
		localStorage.okcp = JSON.stringify({
			dataModelVersion: '1.1.0',
			profileList: {},
			settings: {}
		});
	}

	var storage = JSON.parse(localStorage.okcp);
	storage.dataCleanupJobNumToReach = '1.1.40';

	if (storage.dataCleanupJobNum === storage.dataCleanupJobNumToReach) {
		return false;
	}

	var upgradeMessage = ['Data Cleanup Run:'];

	// confirm that proper keys exist
	storage.settings = storage.settings || {};
	storage.profileList = storage.profileList || {};
	storage.questionCategories = storage.questionCategories || ["unaggressive","happy","poly","polyOpen","notPossessive","science","cuddling","sexPositive"];

	// if backup isn't current, create a backup
	if (localStorage.okcpBackup_1_1_33 === undefined) {
		localStorage.okcpBackup_1_1_33 = localStorage.okcp;
		upgradeMessage.push('  * Created a database backup (version 1.1.33)');
	}

	// clean up deprecated keys
	var deprecatedKeys = ['okcpSettings','okcp_b130110','okcp_b130124'];
	for (var i = 0; i < deprecatedKeys.length; i++) {
		if (!!localStorage[deprecatedKeys[i]]) {
			localStorage.removeItem(deprecatedKeys[i]);
			upgradeMessage.push('  * Removed deprecated key ('+deprecatedKeys[i]+')');
		}
	}

	// upgrade data model from 1.x if needed
	if (storage.hiddenProfileList !== undefined) {
		var oldData = storage;
		var newData = {
			'dataModelVersion': '1.1.0',
			'profileList': {}
		};
		for (i=0; i < oldData.hiddenProfileList.length; i++) {
			newData.profileList[oldData.hiddenProfileList[i]] = {h:true};
		}
		localStorage.okcp = JSON.stringify(newData);
		upgradeMessage.push('  * Updated Data Model to Version 1.1.0');
	}

	storage.dataCleanupJobNum = storage.dataCleanupJobNumToReach;
	localStorage.okcp = JSON.stringify(storage);

	console.log(upgradeMessage.join('\n'));
})();

/*
$.getJSON('questions/questions-poly-bi.json', function(data) {
	localStorage.okcpDefaultQuestions = JSON.stringify(data);
});
*/

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
var filteredQuestionsList = {};
var desiredCategories = JSON.parse(localStorage.okcp).questionCategories;

for(xx in _OKCP.fileQuestions) {
	for (yy in _OKCP.fileQuestions[xx]) {
		if (_OKCP.fileQuestions[xx].hasOwnProperty(yy)) {
			fullQuestionsList[yy] = _OKCP.fileQuestions[xx][yy];
		}
	}
}
_OKCP.fileQuestions = fullQuestionsList;

//loop through all questions
for (xx in fullQuestionsList) {
	//loop through desired categories
	for (var i = desiredCategories.length - 1; i >= 0; i--) {
		//if the current questions matches, use it
		if (xx === desiredCategories[i]) {
			filteredQuestionsList[xx] = fullQuestionsList[xx];
		}
		
	}
}

questions.questionsList = filteredQuestionsList;
localStorage.okcpDefaultQuestions = JSON.stringify(questions);