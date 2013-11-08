_OKCP.changeUI = function(){

	if (!document.getElementById('p_match')) return false;

	_OKCP.imgGridMode = false;
	_OKCP.imgGridWidth = 4;
	var btn;
	var btn2;
	var body = $('body');
	var imageSizeChecker;
	
	$('<a class="UI-change-button UI-change-button-okcp-img-grid UI-change-button-okcp-img-grid-width" href="javascript:void(0)">4 Wide</a>').prependTo('.monolith').hide().click(function(){
		if (_OKCP.imgGridWidth === 4) {
			$(this).text('3 Wide');
			_OKCP.imgGridWidth =  3;
			$('body').addClass('okcp-img-grid-3-wide').removeClass('okcp-img-grid-4-wide');
		} else {
			$(this).text('4 Wide');
			_OKCP.imgGridWidth =  4;
			$('body').addClass('okcp-img-grid-4-wide').removeClass('okcp-img-grid-3-wide');
		}
	});
	$('<a class="UI-change-button UI-change-button-okcp-img-grid UI-change-button-okcp-img-grid-toggle" href="javascript:void(0)">Normal Mode</a>').prependTo('.monolith').click(function(){
		_OKCP.imgGridMode = !_OKCP.imgGridMode;
		
		if (_OKCP.imgGridMode) {
			body.addClass('okcp-img-grid');
			btn.text('Pictures Mode');
			// largeThumbViewer.addClass('disabled');
			upgradeImageSizes();
			$('#match_results .user_image img').addClass('largeThumbDisabled');
			imageSizeChecker = setInterval(upgradeImageSizes, 1000);
			btn2.show();
		} else {
			body.removeClass('okcp-img-grid');
			btn.text('Normal Mode');
			$('#match_results .user_image img').removeClass('largeThumbDisabled');
			// largeThumbViewer.removeClass('disabled');
			clearInterval(imageSizeChecker);
			btn2.hide();
		}
		
	});

	btn = $('.UI-change-button-okcp-img-grid:first');
	btn2 = $('.UI-change-button-okcp-img-grid-width');

	function upgradeImageSizes() {
		$('#match_results .user_image img:not(.large-img)').each(function(){
			var newURL = _OKCP.getLargeThumbUrl(this.src, 246);
			this.src = newURL;
			$(this).addClass('large-img largeThumbDisabled');
		});
	}
};