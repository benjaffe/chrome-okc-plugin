_OKCP.initReaddPagination = function() {
	var lastPageElem,
		numPages,
		itemsPerPage,
		paginationElem;
	if (document.getElementById('questions')) {
		lastPageElem = $('#questions .count .last');
		itemsPerPage = 10;
	} else if (document.getElementById('p_mailbox')) {
		lastPageElem = $('#p_mailbox .count .last');
		itemsPerPage = 30;
	} else {
		return false;
	}

	numPages = lastPageElem.text()*1;
	paginationElem = $('<div class="okcp-pagination"></div>').insertAfter(lastPageElem);
	for (var i = 0, newElem, href; i < numPages; i++) {
		newElem = lastPageElem.clone();
		href = newElem.attr('href');
		href = href.split('low=')[0]+'low=' + (i*itemsPerPage+1) + '&' + href.split('&')[1];
		newElem.text(i+1)
			.attr('href',href)
			.attr('class','num');
		paginationElem.append(newElem);
	}
};