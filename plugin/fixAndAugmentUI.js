// Basic CSS Helpers
$('html').attr('id','okcp') //an ID to use to override OkC's sad CSS specificity madness
	.addClass('OKCP-bindings-not-yet-loaded'); //, and a class to hide everything until it is set up

// Fixing OkC UI Issues
$('#save_unsave').parent().addClass('wide-buttons-that-are-now-not-wide left');
$('#save_unsave').parent().next().addClass('wide-buttons-that-are-now-not-wide right');

// Change OkCupid's UI
if ($('#visit_button a:contains(Enable invisible browsing)').size() > 0) {
	$('#visit_button').addClass('moved').insertAfter($('#similar_users_list'));
}
$('#profile_ad').hide();

// Give the guilt banner a class so we can hide it
var guiltBannerHiderTimer = setInterval(function() {
	var guiltBanner = $('.quickbuybox').prev('div:not("#main_content")');
	if (guiltBanner.size() > 0) {
		guiltBanner.addClass('guilt');
		clearInterval(guiltBannerHiderTimer);
	}
}, 1);