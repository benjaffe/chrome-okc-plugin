// setTimeout(function(){
	var lastPageElem = $('#questions .pages .count .last');
	var numPages = lastPageElem.text()*1;
	var paginationElem = $('<div class="pagination"></div>').insertAfter(lastPageElem);
	for (var i = 0; i < numPages; i++) {
		var newElem = lastPageElem.clone();
		var href = newElem.attr('href');
		href = href.split('low=')[0]+'low='+i+'1&n=0';
		newElem.text(i+1)
			.attr('href',href)
			.attr('class','num');
		paginationElem.append(newElem);
	}
// },1000);