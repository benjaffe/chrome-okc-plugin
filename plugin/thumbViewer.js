// add the large thumbnail image viewer
_OKCP.initThumbViewer = function() {

	var largeThumbViewerElem = $('<div class="largeThumbViewer"><img src="" class="largeThumbViewerImage" /><p class="largeThumbViewerCaption"></p></div>').appendTo('#wrapper').attr('style','background:white url('+chrome.extension.getURL('images/ajax-loader.gif')+') no-repeat center center');

	_OKCP.getLargeThumbUrl = function(url) {
		var arr1 = url.split('/images/');
		arr2 = arr1[1].split('/');
		newURL = arr1[0] + '/images/'+_OKCP.largeThumbSize+'x'+_OKCP.largeThumbSize+'/160x160/' + arr2.splice(2).join('/');
		return(newURL);
	};

	$(document).mousemove(function(e){
		if (e.pageX < document.body.clientWidth/2-390) $('html').addClass('mouseOnLeft').removeClass('mouseOnRight');
		else if (e.pageX > document.body.clientWidth/2+395) $('html').addClass('mouseOnRight').removeClass('mouseOnLeft');
		else $('html').removeClass('mouseOnLeft mouseOnRight');
	});
};