_OKCP.changeUI = function(){
	$('<a class="UI-change-link" href="javascript:void(0)">Toggle Pictures Mode</a>').appendTo('.form_section.upper_section').click(function(){
		$('body').toggleClass('okcp-img-grid');
	});
};