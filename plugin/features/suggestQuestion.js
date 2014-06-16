function persistQuestionsToSuggest(questionsToSuggest) {
    localStorage.setItem("questionsToSuggest", JSON.stringify(questionsToSuggest));
}
_OKCP.initSuggestQuestionsFeature = function () {
	$('<div class="copy-this"><h2>To submit your questions, carefully copy the following text and email it to <a href="mailto: okcp.suggestions@gmail.com" style="color:#DDD;">okcp.suggestions@gmail.com</a>, grouped by category.'
    + ' See <a href="http://github.com/benjaffe/chrome-okc-plugin/wiki/Suggest-Questions" style="color:#DDD;">wiki page</a> for more information.</h2><div class="okcp-clear-questions btn new-feature">Clear Questions</div><div class="copy-this-text"></div></div>').appendTo('body');

    var questionsToSuggest = localStorage.getItem("questionsToSuggest");
    if(null == questionsToSuggest) {
        questionsToSuggest = [];
    } else {
        questionsToSuggest = JSON.parse (questionsToSuggest);
    }
    showSuggestedQuestions();

    $('.question').each(function () {
        var existingCategories = new Object(null); // empty set
        var qid = this.id.split('question_')[1];

        // find all categories for this question (if any). TODO - create cached qid/category mapping
        for(var fileCategory in _OKCP.fileQuestions) {
            _OKCP.fileQuestions[fileCategory].forEach(function(fileQuestion) {
                if(fileQuestion.qid == qid) {
                    existingCategories[fileCategory] = true;
                }
            })
        }

        if (Object.keys(existingCategories).length > 0) {
            var existingCategoriesString = "";
            for (var category in existingCategories) {
                if(existingCategoriesString.length > 0) {
                    existingCategoriesString = existingCategoriesString + ",";
                }
                existingCategoriesString = existingCategoriesString + category;
            }
            $(this).prepend('<div>Existing categories: ' + existingCategoriesString + '</div>');
        }

        $(this).prepend('<div class="okcp-suggest-question btn new-feature">Suggest Question</div>');

    });


	$('.okcp-suggest-question').click(function() {
		var question = $(this).parent();
		var qid = question.attr('id').split('question_')[1];
		var qtext = $('#qtext_' + qid).text();
		var answers = [];
		var obj;
		$('#answer_'+qid+' .their_answer').each(function() {
			answers.push( $(this).parent().text() );
		});

		var scoreWeightPlaceholder = [];
		for (var i = 0; i < answers.length; i++) {
			scoreWeightPlaceholder.push(1);
		}

		obj = {
			"qid": qid,
			"text": qtext,
			"answerText": answers,
			"score": scoreWeightPlaceholder,
			"weight": scoreWeightPlaceholder
		};

        questionsToSuggest.push(obj);
        persistQuestionsToSuggest(questionsToSuggest);
        showSuggestedQuestions();
		logCurrQuestionData(question);
	});

    function showSuggestedQuestions() {
        $('.copy-this-text').text('');
        questionsToSuggest.forEach(function(suggestedQuestion) {
            $('.copy-this-text').append('<div>' + JSON.stringify(suggestedQuestion) + '</div>');
        });
    }

    $('.okcp-clear-questions').click(function() {
        questionsToSuggest = [];
        persistQuestionsToSuggest(questionsToSuggest);
        showSuggestedQuestions();
    });

    function logCurrQuestionData(obj) {
        // log out pretty version
        var objStr = JSON.stringify(obj, null, '\t');
        console.log(objStr);
    }

	if (location.href.split('rqid=')[1] !== undefined && _OKCP.devmode) {
		logCurrQuestionData();
	}


};