$(function(){
	
	var pageQuestions = $('#questions').length > 0;
	var pageMailbox = $('#p_mailbox').length > 0;
	var pageProfile = true;

	if (_OKCP.devmode) _OKCP.initDevMode();
	
	// get answers
	_OKCP.getAnswers();
	// question suggestion feature
	if (pageQuestions) _OKCP.initSuggestQuestionsFeature();
	// re-adding pagination on questions and mailbox pages
	if (pageQuestions || pageMailbox) _OKCP.initReaddPagination();

	// large thumbnail viewer
	_OKCP.initThumbViewer();
});
