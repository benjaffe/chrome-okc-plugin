if (!!localStorage.devMode && JSON.parse(localStorage.devMode) === true) {
	if (!!location.href.split('rqid=')[1]) {
		console.log('hi');
		var myArr = [], textToCopy;
		$('.answer_area:first .my_answer').each(function(){
			myArr.push($(this).parent().text());
		});
		textToCopy = '"answerText": ["' + myArr.join('", "') + '"],\n\t\t\t"score": [-0.5, 0, 1],\n\t\t\t"weight": [1, 1, 1]';
		console.log(textToCopy);
	}
}