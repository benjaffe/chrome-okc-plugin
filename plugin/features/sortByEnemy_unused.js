_OKCP.sortByEnemy = function() {
	var matchResultsArr = $("#match_results .match_row"); //get array of elements
	// sort based on enemy percentage
	matchResultsArr.sort(function (a, b) {
		a = parseInt($(a).find('.enemy .percentage').text().split('%')[0],10);
		b = parseInt($(b).find('.enemy .percentage').text().split('%')[0],10);
		// compare
		if(a > b) {
			return 1;
		} else if (a < b) {
			return -1;
		} else {
			return 0;
		}
	});
	$("#match_results").html(matchResultsArr); //put sorted results back on page
};

// This is run in a loop because as the user scrolls, more items will appear.
setInterval(function() {
	var doSortByEnemy = false;
	// Match Search Page
	_OKCP.matchresultsThumbs = $('#match_results .match_row');
	_OKCP.matchresultsThumbs.each(function() {
		//if it doesn't have a binding applied, apply one
		if ($(this).attr('data-bind') === undefined) {
			this.thumbName = $(this).find('.username').text();
			applyBindingsToProfileThumb($(this),'#'+this.id);
			doSortByEnemy = !!JSON.parse(localStorage.okcp).settings.sortByEnemy; // doSortByEnemy = true if the setting is enabled
		}
	});
	if (doSortByEnemy) _OKCP.sortByEnemy();
},1000);