// dev mode toggle
if (!!localStorage.devMode && JSON.parse(localStorage.devMode) === true) {

	_OKCP.cacheEnabled = false;
	console.log('dev mode enabled');


	$('html').addClass('devmode');
	var qid = location.href.split('rqid=')[1];
	if (!!qid) {
		var myArr = [], textToCopy;
		var answerText = $('#qtext_'+qid).text();
		$('.answer_area:first .my_answer').each(function(){
			myArr.push($(this).parent().text());
		});
		scoreWeightTempArr = [];
		for (var i = myArr.length - 1; i >= 0; i--) {
			scoreWeightTempArr.push(1);
		}
		textToCopy = '"qid":"'+qid+'",\n\t\t\t"text":"'+answerText+'",\n\t\t\t"answerText": ["' + myArr.join('", "') + '"],\n\t\t\t"score": ['+scoreWeightTempArr.join(', ')+'],\n\t\t\t"weight": ['+scoreWeightTempArr.join(', ')+']';
		console.log(textToCopy);
	}
}


if (_OKCP.debugTimerEnabled) {_OKCP.debugTimer = new Date();}


// Testing new features
(function () {
	var prevCat = '';
	var fullQuestionsList = _OKCP.fullQuestionsList;
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
		$('#answer_'+qid+' .their_answer').each(function() {
			answers.push( $(this).parent().text() );
		});
		var category = prompt("What category does this question fall under?",prevCat);
		if (category === '') {
			alert('Category name cannot be empty');
			return false;
		} else if (category === undefined) {
			return false;
		}
		category = category.toLowerCase();
		prevCat = category;

		scoreWeightPlaceholder = [];
		for (var i = 0; i < answers.length; i++) {
			scoreWeightPlaceholder.push(0);
		}

		_OKCP.questionsToSuggest[category] = _OKCP.questionsToSuggest[category] || [];
		_OKCP.questionsToSuggest[category].push({
			"qid": qid,
			"text": qtext,
			"answerText": answers,
			"score": scoreWeightPlaceholder,
			"weight": scoreWeightPlaceholder
		});

		$('.copy-this').show();
		$('.copy-this-text').text(JSON.stringify(_OKCP.questionsToSuggest));
		alert('Your question(s) have NOT been suggested YET. When you are ready to sumbit, scroll to the very bottom of the page and follow the instructions.');
	});
})();






