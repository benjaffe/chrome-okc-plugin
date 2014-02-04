_OKCP.initSuggestQuestionsFeature = function () {
	var prevCat = '';
	var fullQuestionsList = _OKCP.fullQuestionsList;
	var firstClick = true;
	_OKCP.questionsToSuggest = {};

	$('<div class="copy-this" style="display:none;"><h2>To submit your questions, carefully copy the following text and email it to <a href="mailto: okcp.suggestions@gmail.com" style="color:#DDD;"> okcp.suggestions@gmail.com</a></h2><div class="copy-this-text"></div></div>').appendTo('body');

	$('.question').filter(function(){
			var qid = this.id.split('question_')[1];
			for (var i = 0, len = fullQuestionsList.length; i < len; i++) {
				if (fullQuestionsList[i].qid == qid) return false;
			}
			return true;
		}).prepend('<div class="okcp-suggest-question btn new-feature">Suggest Question</div>');

	$('.okcp-suggest-question').click(function() {
		var question = $(this).parent();
		var qid = question.attr('id').split('question_')[1];
		var qtext = $('#qtext_' + qid).text();
		var answers = [];
		var obj, category;
		if (firstClick) {
			firstClick = false;
			alert('OkC Plugin:\nThis feature allows you to suggest questions for the developer to include in the plugin!');
		}
		$('#answer_'+qid+' .their_answer').each(function() {
			answers.push( $(this).parent().text() );
		});
		category = prompt("What category does this question fall under?",prevCat);
		if (category === '') {
			alert('Category name cannot be empty');
			return false;
		} else if (category === undefined) {
			return false;
		}
		category = category.toLowerCase();
		prevCat = category;
		category = category.split(' ').join('_');

		scoreWeightPlaceholder = [];
		for (var i = 0; i < answers.length; i++) {
			scoreWeightPlaceholder.push(1);
		}

		obj = {
			"qid": qid,
			"text": qtext,
			"answerText": answers,
			"score": scoreWeightPlaceholder,
			"weight": scoreWeightPlaceholder
		}

		_OKCP.questionsToSuggest[category] = _OKCP.questionsToSuggest[category] || [];
		_OKCP.questionsToSuggest[category].push(obj);

		$('.copy-this').show();
		$('.copy-this-text').text(JSON.stringify(_OKCP.questionsToSuggest));
		alert('Your question(s) have NOT been suggested YET. When you are ready to sumbit, scroll to the very bottom of the page and follow the instructions.');
		$(this).remove();
		logCurrQuestionData(question);
	});

	function logCurrQuestionData(elem) {
		//duplicated code, but works for now
		var question = elem || $('.question:first');
		var qid = question.attr('id').split('question_')[1];
		var qtext = $('#qtext_' + qid).text();
		var answers = [];
		var obj, category;
		$('#answer_'+qid+' .their_answer').each(function() {
			answers.push( $(this).parent().text() );
		});

		scoreWeightPlaceholder = [];
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

		// log out pretty version
		var objStr = JSON.stringify(obj);
		objStr = '{\n\t' + objStr.split('{')[1];
		objStr = objStr.split('}')[0]+'\n}';
		objStr = objStr.split('"text"').join('\n\t"text"').split('"answerText"').join('\n\t"answerText"').split('"score"').join('\n\t"score"').split('"weight"').join('\n\t"weight"');
		console.log(objStr);
	}
	if (location.href.split('rqid=')[1] !== undefined && _OKCP.devmode) {
		logCurrQuestionData();
	}


};