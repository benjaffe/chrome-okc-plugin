$(function(){

	var pageQuestions = $('#questions').length > 0;
	var pageMailbox = $('#p_mailbox').length > 0;
	var pageProfile = $('#p_profile').length > 0;

	if (_OKCP.devmode) _OKCP.initDevMode();

	// Questions Pages
	if (pageQuestions)
		_OKCP.initSuggestQuestionsFeature(); // question suggestion feature

	// Pages with pagination missing
	if (pageQuestions || pageMailbox)
		_OKCP.initReaddPagination(); // re-adding pagination on questions and mailbox pages

	if (pageMailbox)
		_OKCP.messageSearch();

	// Profile Pages
	if (pageProfile) {
		_OKCP.readdNotes(); // re-add notes on profile pages
		_OKCP.getAnswers(); // get answers and add categories
		_OKCP.messageSearch(); // check to see if you've messaged them before
	}

	// initialize large thumbnail viewer
	_OKCP.initThumbViewer();
});
