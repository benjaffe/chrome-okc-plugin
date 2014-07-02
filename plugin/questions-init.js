_OKCP.filteredQuestionsList = {};
// XXX: Do we need a promise for this value?

_OKCP.storage.settings.get(['questionCategories'])
.then(function(data) {
	var xx, yy;
	var fullQuestionsList = {};
	var desiredCategories = data.desiredCategories;
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

	localStorage.okcpDefaultQuestions = JSON.stringify({
		"questionsVersionNum": "1.5.0",
		"questionsList": _OKCP.filteredQuestionsList
	});
});