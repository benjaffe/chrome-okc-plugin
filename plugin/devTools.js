// dev mode toggle
if (!!localStorage.devMode && JSON.parse(localStorage.devMode) === true) {

	$('html').addClass('devmode');
	_OKCP.cacheEnabled = false;
	_OKCP.devmode = true;
	console.log('dev mode enabled, cache disabled');

}


if (_OKCP.debugTimerEnabled) {_OKCP.debugTimer = new Date();}


// Space for testing new features







