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







