if (!!localStorage.devMode && JSON.parse(localStorage.devMode) === true) {
	if (!!location.href.split('rqid=')[1]) {
		var myArr = [], textToCopy;
		$('.answer_area:first .my_answer').each(function(){
			myArr.push($(this).parent().text());
		});
		scoreWeightTempArr = [];
		for (var i = myArr.length - 1; i >= 0; i--) {
			scoreWeightTempArr.push(1);
		}
		textToCopy = '"answerText": ["' + myArr.join('", "') + '"],\n\t\t\t"score": ['+scoreWeightTempArr.join(', ')+'],\n\t\t\t"weight": ['+scoreWeightTempArr.join(', ')+']';
		console.log(textToCopy);
	}
}