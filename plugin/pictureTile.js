_OKCP.initPictureTile = function(){

	var btn;
	var btn2;
	var body = $('body');
	var imageSizeChecker;
	var newWidth;
	
	$('<a class="UI-change-button UI-change-button-okcp-img-grid UI-change-button-okcp-img-grid-width" href="javascript:void(0)">4 Wide</a>').prependTo('.monolith').hide().click(function(){
		if (_OKCP.settings('matchesPageGridWidth') === '4') {
			newWidth = 3;
		} else {
			newWidth = 4;
		}
		$(this).text(newWidth+' Wide');
		_OKCP.settings('matchesPageGridWidth',newWidth+'');
		$('body').removeClass('okcp-img-grid-3-wide okcp-img-grid-4-wide').addClass('okcp-img-grid-'+newWidth+'-wide');
	});
	$('<a class="UI-change-button UI-change-button-okcp-img-grid UI-change-button-okcp-img-grid-toggle" href="javascript:void(0)">Normal Mode</a>').prependTo('.monolith').click(function(){
		_OKCP.imgGridMode = !_OKCP.imgGridMode;
		
		if (_OKCP.imgGridMode) {
			body.addClass('okcp-img-grid');
			btnUIMode.text('Pictures Mode');
			upgradeImageSizes();
			$('#match_results .user_image img').addClass('largeThumbDisabled');
			imageSizeChecker = setInterval(upgradeImageSizes, 1000);
			btnGridWidth.show();

			_OKCP.settings('matchesPageUISetting','pictureGrid');

		} else {
			body.removeClass('okcp-img-grid');
			btnUIMode.text('Normal Mode');
			$('#match_results .user_image img').removeClass('largeThumbDisabled');
			clearInterval(imageSizeChecker);
			btnGridWidth.hide();

			_OKCP.settings('matchesPageUISetting','normal');

		}
		
	});

	btnUIMode = $('.UI-change-button-okcp-img-grid:first');
	btnGridWidth = $('.UI-change-button-okcp-img-grid-width');

	if (_OKCP.settings('matchesPageUISetting') === 'pictureGrid') btnUIMode.click();
	if (_OKCP.settings('matchesPageGridWidth') === '3') btnGridWidth.click();

	function upgradeImageSizes() {
		$('#match_results .user_image img:not(.large-img)').each(function(){
			var newURL = _OKCP.getLargeThumbUrl(this.src, 246);
			this.src = newURL;
			$(this).addClass('large-img largeThumbDisabled');
		});
	}
};