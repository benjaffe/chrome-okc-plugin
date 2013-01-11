
	// function localStore(data) {
	// 	if (data) {
	// 		localStorage.okcp = JSON.stringify(data);
	// 	} else {
	// 		return JSON.parse(localStorage.okcp);
	// 	}
	// }

// var okcPolyPlugin = function() {



var togglePoly = function() {
	var categoryToToggle = "poly";
	if (enabledCategories.indexOf(categoryToToggle) !== -1) {
		enabledCategories.splice(enabledCategories.indexOf(categoryToToggle), 1);
	} else {
		enabledCategories.push(categoryToToggle);
	}

	var storage = JSON.parse(localStorage.okcp);
	storage.enabledCategories = enabledCategories;
	localStorage.okcp = JSON.stringify(storage);
}



	// add dots to questions
/*	var publicQuestions = $('#questions > .public');
	publicQuestions.append('<div class="mv-question-status"></div>');
	publicQuestions.each(function() {
		console.log($(this).attr('id'));
		var qNum = $(this).attr('id').split("question_")[1];
		if(!!retrieveQuestion(qNum)) {
			$(this).find('.mv-question-status').addClass('mv-question-status-active');
		}
	});
*/
	


	/*
	for (var i = 0; i < questionsToCheckFor.length; i++) {
		var qid = questionsToCheckFor[i].qid;
		$('#questions #question_' + qid + " .mv-question-status").addClass('mv-question-status-active');
		console.log('=========#questions #question_' + qid);
	}
	*/




// }
