// dev mode toggle
if (!!localStorage.devMode && JSON.parse(localStorage.devMode) === true) {

	_OKCP.cacheEnabled = false;


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
	$('.question').prepend('<div class="okcp-add-question new-feature">Add Question</div>');
	$('.okcp-add-question').click(function() {
		var question = $(this).parent();
		var qid = question.attr('id').split('question_')[1];
		var qtext = $('#qtext_' + qid).text();
		var answers = [];
		$('#answer_'+qid+' .their_answer').each(function() {
			answers.push( $(this).parent().text() );
		});
		var category = prompt("What category does this question fall under?");
		category = category.toLowerCase();
		$('<div class="copy-this"></div>').appendTo('body').text('{\n\tqid:"' + qid + '", //' + qtext + '\n\tcategory: "' + category + '",\n\twrongAnswers:["' + answers.join(",") + '"]\n\t},');
	});
})();
