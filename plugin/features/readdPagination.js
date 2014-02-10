_OKCP.initReaddPagination = function() {
	var lastPageElem,
		numPages,
		itemsPerPage,
		paginationElem,
		urls;
	if (document.getElementById('questions')) {
		lastPageElem = $('#questions .count .last');
		itemsPerPage = 10;
	} else if (document.getElementById('p_mailbox')) {
		lastPageElem = $('#p_mailbox .count .last');
		itemsPerPage = 30;
	} else {
		return false;
	}
	urls = _OKCP.getPaginationUrls(lastPageElem, itemsPerPage);

	paginationElem = $('<div class="okcp-pagination"></div>').insertAfter(lastPageElem);
	for (var i = 0, newElem, href, length = urls.length; i < length; i++) {
		newElem = lastPageElem.clone();
		href = urls[i];
		newElem.text(i+1)
			.attr('href',href)
			.attr('class','num');
		paginationElem.append(newElem);
	}
};

_OKCP.getPaginationUrls = function(lastPageElem, itemsPerPage) {
	var urls = [];
	numPages = lastPageElem.text()*1;
	for (var i = 0, url; i < numPages; i++) {
		url = lastPageElem.attr('href');
		url = url.split('low=')[0]+'low=' + (i*itemsPerPage+1) + '&' + url.substring(url.indexOf('&')+1);
		urls.push(url);
	}
	return urls;
};