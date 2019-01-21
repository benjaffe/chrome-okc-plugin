_OKCP.initReaddPagination = function() {
	var lastPageElemLink,
		numPages,
		itemsPerPage,
		paginationElem,
		urls;
	if (document.getElementById('questions')) {
		lastPageElemLink = $('#questions .count .last');
		itemsPerPage = 10;
	} else if (document.getElementById('p_mailbox')) {
		lastPageElemLink = $('#p_mailbox .count .last');
		itemsPerPage = 30;
	} else {
		return false;
	}
	urls = _OKCP.getPaginationUrls(lastPageElemLink, itemsPerPage);

	paginationElem = $('<div class="okcp-pagination"></div>').insertAfter(lastPageElemLink);
	for (var i = 0, newElem, href, length = urls.length; i < length; i++) {
		newElem = lastPageElemLink.clone();
		href = urls[i];
		newElem.text(i+1)
			.attr('href',href)
			.attr('class','num');
		paginationElem.append(newElem);
	}
};

_OKCP.getPaginationUrls = function(lastPageElemLink, itemsPerPage) {
	var urls = [];
	numPages = lastPageElemLink.text()*1;
	for (var i = 0, url; i < numPages; i++) {
		url = lastPageElemLink.attr('href');
		url = url.split('low=')[0]+'low=' + (i*itemsPerPage+1) + '&' + url.substring(url.indexOf('&')+1);
		urls.push(url);
	}
	return urls;
};