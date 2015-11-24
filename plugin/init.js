$(function(){

	var onPageQuestions = $('#questions').length > 0;
	var onPageMailbox = $('#p_mailbox').length > 0;
	var onPageProfile = $('#p_profile').length > 0;

	localStorage.reallyClear = localStorage.clear;
	localStorage.clear = function() {
		console.warn('`localStorage.clear()` was just called. We\'re ignoring that so you don\'t lose your data.');
		console.log('if you called `localStorage.clear()` intentionally, it\'s been reassigned to `localStorage.reallyClear()`');
	}

	if (_OKCP.devmode) _OKCP.initDevMode();

	// Questions Pages
	if (onPageQuestions)
		_OKCP.initSuggestQuestionsFeature(); // question suggestion feature

	// Pages with pagination missing
	if (onPageQuestions || onPageMailbox)
		_OKCP.initReaddPagination(); // re-adding pagination on questions and mailbox pages

	if (onPageMailbox)
		_OKCP.messageSearch();

	// Profile Pages
	if (onPageProfile) {
		_OKCP.getAnswers(); // get answers and add categories
		_OKCP.messageSearch(); // check to see if you've messaged them before
	}

	// initialize large thumbnail viewer
	_OKCP.initThumbViewer();
});
