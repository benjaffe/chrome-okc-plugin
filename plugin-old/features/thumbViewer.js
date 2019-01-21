// add the large thumbnail image viewer
_OKCP.initThumbViewer = function() {

	var largeThumbViewerElem = $('<div class="largeThumbViewer"><img src="" class="largeThumbViewerImage" /><p class="largeThumbViewerCaption"></p></div>').appendTo('#wrapper').attr('style','background:white url('+chrome.extension.getURL('images/ajax-loader.gif')+') no-repeat center center');

	$(document).mousemove(function(e){
		if (e.pageX < document.body.clientWidth/2-390) $('html').addClass('mouseOnLeft').removeClass('mouseOnRight');
		else if (e.pageX > document.body.clientWidth/2+395) $('html').addClass('mouseOnRight').removeClass('mouseOnLeft');
		else $('html').removeClass('mouseOnLeft mouseOnRight');
	});
};

_OKCP.getLargeThumbUrl = function(url, size) {
	var arr1 = url.split('/images/');
	var arr2 = arr1[1].split('/');
	size = size || _OKCP.largeThumbSize;
	newURL = arr1[0] + '/images/'+size+'x'+size+'/160x160/' + arr2.splice(2).join('/');
	return(newURL);
};