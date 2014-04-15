// if we're on a profile page
if (_OKCP.profilePath !== '') {

	var $divider = $('<div></div>', {'class':'divider'});

	$('.page_tabs').append(
		$('<li>', {'class': 'okcp-pagetab okcp-pagetab-menu'}).append(
			$('<a>',{'text':'Plugin Menu'}),
			$('<ul>',{'class':'user_links'}).append(

				$('<li>').append(
					$('<a>', {
						'href':'#'
						, 'class':'okcp-feature-btn review_saved_profile'
						, 'review-saved-profile':true
						, 'id':'review-saved-profile'
						, 'text':'Review Saved Profiles'
					}).append(
						$('<div>', {
							'class':'okcp-feature-details'
							, 'text':'This feature allows you to review profiles you\'ve previously marked as "Poly", "Message", and "Maybe". (Keep in mind that this data gets cleared if you clear your browser\'s cache.)'
						})
					)
				),

				$('<li>').append(
					$('<a>', {
						'href':'#'
						, 'class':'okcp-feature-btn change_categories'
						, 'change-categories':true
						, 'id':'change-categories'
						, 'text':'Change Categories'
					}).append(
						$('<div>', {
							'class':'okcp-feature-details'
							, 'text':'This feature allows you to choose which categories you care about. Drag categories from the right to the left to enable them, and vice-versa to disable them.'
						})
					)
				),

				$('<li>').append(
					$('<a>', {
						'href':'#'
						, 'class':'okcp-feature-btn improve-accuracy'
						, 'review-saved-profile':true
						, 'id':'improve-accuracy'
						, 'text':'Improve Plugin Accuracy'
					}).append(
						$('<div>', {
							'class':'okcp-feature-details'
							, 'text':'This feature shows you questions that:\n\n1. apply to the selected categories\n2. that you haven\'t answered\n\nThe more of these questions you answer, the more accurate the plugin will be able to compare you and the user you\'re visiting.'
						})
					)
				)

			)
		), $('<li>', {'class':'okcp-pagetab okcp-pagetab-labels'}).append(
			$('<a>', {'text':'Labels', 'href':'#'}),
			$('<ul>', {'class':'user_links'}).append(
				$('<li>').append(
					'<a class="okcp-btn toggleIsPoly" data-bind="click: toggleIsPoly, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].ip == true : false}">Poly</a>'
				)
				, $('<li>').append(
					'<a class="okcp-btn hide-btn poly-hide-btn" data-bind="click: toggleHideNotPoly, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].p == true : false}">Not Poly</a>'
				)
				, $('<li>').append(
					'<a class="okcp-btn" data-bind="click: toggleWantToMessage, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].wm == true : false}">Message</a>'
				)
				, $('<li>').append(
					'<a class="okcp-btn" data-bind="click: toggleMaybeInterested, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].m == true : false}">Maybe</a>'
				)
				, $('<li>').append(
					'<a class="okcp-btn hide-btn uninterested-hide-btn" data-bind="click: toggleHideUninterested, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].u == true : false}">Not For Me</a>'
				)
				, $('<li>').append(
					'<a class="okcp-btn hide-btn nodata-hide-btn" data-bind="click: toggleHideNoData, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].d == true : false}">N/A</a>'
				)
			)
		)
	);

	// UI: link-buttons and spinner)
	$('#main_content .tabbed_heading').append(
		$('<div>', {'class':"okcp-btns"}).append($('</div>', {'class':'spinner'}))
	);
	$('#review-saved-profile').click(_OKCP.reviewProfiles);
	$('#change-categories').click(_OKCP.changeCategories);
	$('#improve-accuracy').click(_OKCP.showUnansweredQuestions);


	// UI: Category match percentages (#social exists on your own profile page, #actions is on others')
	$('#actions, #social').append('<table class="match-ratios-wrapper-outer"><tr><td class="match-ratios">'+
		'<ul class="match-ratios-list"></ul>'+
		'</td></tr></table>');

	// UI: Question Detail
	$('#right_column').before('<div class="question-detail"></div>');

}


function OKCP() {
	var _dummyObservable = ko.observable();

	this.settingsList = ko.computed({
		read: function() {
			_dummyObservable();
			return JSON.parse(localStorage.okcp).settings;
		},
		write: function(property, value) {
			var storage = JSON.parse(localStorage.okcp);
			console.log("Writing a settings property: " + property);
			if (!storage.settings) {
				storage.settings = {};
			}
			if (value === "toggle") {
				storage.settings[property] = !storage.settings[property] || false;
				console.log("toggled" + property);
				console.log("value is now " + storage.settings[property]);
			} else {
				storage.settings[property] = value;
				console.log("set" + property);
				console.log("value is now " + storage.settings[property]);
			}
			localStorage.okcp = JSON.stringify(storage);
			// console.log("writing to localStorage (settings modified)");
			OKCP.alertLocalStorageChange();
		}
	});
	this.settingsListData = ko.observable(this.settingsList());

	this.profileList = ko.computed({
		read: function() {
			_dummyObservable();
			return JSON.parse(localStorage.okcp).profileList;
		},
		write: function(property, value) {
			var storage = JSON.parse(localStorage.okcp);
			if (!storage.profileList[_OKCP.profileName]) {
				storage.profileList[_OKCP.profileName] = {};
			}
			storage.profileList[_OKCP.profileName][property] = value;
			localStorage.okcp = JSON.stringify(storage);
		}
	});
	this.profileListData = ko.observable(this.profileList());

	this.profileHidden = ko.observable(false);
	this.profileShown = ko.observable(false);

	this.swapLargeThumb = function(vm,e) {
		var t = e.target;
		if (t.localName !== 'img') return false;
		if ($(t).hasClass('largeThumbDisabled')) return false;
		var profileName = t.parentElement.href.split('profile/')[1].split('?')[0];
		var largeThumbPath = _OKCP.getLargeThumbUrl(t.src);
		$('.largeThumbViewerImage').attr('src',chrome.extension.getURL('images/ajax-loader.gif')).attr('src',largeThumbPath);
		$('.largeThumbViewer').show();
		/* // This gets JSON data for a profile, but I can't really use it because OkC throttles those requests
		$.getJSON('http://www.okcupid.com/profile/'+profileName+'?json=2',function(data){
			// console.log(data);
			$('.largeThumbViewerCaption').html(data.username + ' / ' + data.age + ' / ' + data.sex + ' / ' + data.location.split(', ')[0] + ', ' + stateAbbr[data.location.split(', ')[1]] + ' (' + data.distance + data.units + ')');
		}); */
	};
	this.swapSmallThumb = function(vm,e) {
		$('.largeThumbViewer').hide();
	};

	this.calculateHiddenProfile = function() {
		this.alertLocalStorageChange();
		this.profileHidden(this.profileList()[_OKCP.profileName].p || this.profileList()[_OKCP.profileName].u || this.profileList()[_OKCP.profileName].d);
		this.profileShown(this.profileList()[_OKCP.profileName].wm);
		this.profileList("h",this.profileHidden() && !this.profileShown()); //update storage
		this.alertLocalStorageChange(); //needs to be run twice, before the change, and also after
		this.profileList("lm",Math.round(new Date().getTime()/1000)); //update last modified time
		this.profileList("lv",Math.round(new Date().getTime()/1000)); //update last viewed time
	};

	this.profileList("lv",Math.round(new Date().getTime()/1000)); //update last viewed time
	this.profileList("location",$('#ajax_location').text());

	this.toggleHideNotPoly = function(data) {		console.log('toggleHideNotPoly run');
		this.profileList("p",!this.profileList()[_OKCP.profileName].p); //update storage
		this.calculateHiddenProfile();
	};

	this.toggleHideUninterested = function(data) {		console.log('toggleHideUninterested run');
		this.profileList("u",!this.profileList()[_OKCP.profileName].u); //update storage
		this.calculateHiddenProfile();
	};

	this.toggleHideNoData = function(data) {		console.log('toggleHideNoData run');
		this.profileList("d",!this.profileList()[_OKCP.profileName].d); //update storage
		this.calculateHiddenProfile();
	};

	this.toggleIsPoly = function(data) {		console.log('toggleIsPoly run');
		this.profileList("ip",!this.profileList()[_OKCP.profileName].ip); //update storage
		this.calculateHiddenProfile();
	};

	this.toggleWantToMessage = function(data) {		console.log('toggleWantToMessage run');
		this.profileList("wm",!this.profileList()[_OKCP.profileName].wm); //update storage
		this.calculateHiddenProfile();
	};

	this.toggleMaybeInterested = function(data) {		console.log('toggleMaybeInterested run');
		this.profileList("m",!this.profileList()[_OKCP.profileName].m); //update storage
		this.calculateHiddenProfile();
	};

	this.toggleQuestionDetailPinned = function(data) {
		this.settingsList('questionDetailPinned','toggle');
	};

	this.alertLocalStorageChange = function() {
		_dummyObservable.notifySubscribers(); //force the computed value to fetch the new updated local storage by pretending we updated something else in the computed function.
	};

}

$(window).bind('storage', function(e) {
	// console.log("refreshing from localStorage");
	OKCP.alertLocalStorageChange();
	OKCP.profileListData(OKCP.profileList());
	OKCP.profileListData.notifySubscribers();
	OKCP.settingsListData(OKCP.settingsList());
	OKCP.settingsListData.notifySubscribers();
});

// if no entry for current profile exists, make one!
var storage = JSON.parse(localStorage.okcp);

if (!storage.profileList[_OKCP.profileName]) {
	storage.profileList[_OKCP.profileName] = {};
}

if (_OKCP.pageType === 'inactive') {
	delete storage.profileList[_OKCP.profileName]; //remove profiles that no longer exist
}

localStorage.okcp = JSON.stringify(storage);

// apply bindings for everything except thumbs (as of 1/10, that's only the "hide" button)
window.OKCP = new OKCP();
ko.applyBindings(OKCP);

// takes a jQuery collection and adds polyhidden class binding to the profile's 'h' key in storage (within the bindings scope)
function applyBindingsToProfileThumb (objList, scopeOfBindingsStr, retry, largeThumbnailHoverEnabled) {
	if(objList.length === 0 && !retry) {
		setTimeout(function() {
		applyBindingsToProfileThumb (objList, scopeOfBindingsStr, true);
		},500);
		return false;
	} else if (objList.length === 0) {
		return false;
	}
	if (retry) console.log(objList);
	var scopeOfBindings = document.querySelector(scopeOfBindingsStr);
	if (scopeOfBindings === null) return false;
	objList.each(function() {
		var thumbName = this.thumbName;
		var dataBind = 'css: {'+
			'"okcp-hidden": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].h == true : false,'+
			'"okcp-no-answers": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].d == true : false,'+
			'"okcp-maybe": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].m == true : false,'+
			'"okcp-poly": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].ip == true : false,'+
			'"okcp-to-message": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].wm == true : false,'+
			'"thumbImg": !!this.thumbImg'+
		'}';
		if (largeThumbnailHoverEnabled) {
			dataBind += ', event: { mouseover: swapLargeThumb, mouseout: swapSmallThumb}';
		}
		$(this).attr('data-bind',dataBind);
	});
	ko.applyBindings(OKCP, scopeOfBindings);
	return true;
}

//these are all the places we're looking for thumbnails to potentially hide

// current profile's profile image
_OKCP.currentProfileImage = $('#profile_thumbs');
_OKCP.currentProfileImage.each(function() {
	this.thumbName = $('#basic_info_sn').text();
});
applyBindingsToProfileThumb(_OKCP.currentProfileImage,'#profile_thumbs', false, false);

// left sidebar ("you might like" and "you recently visited")
_OKCP.sidebarThumbs = $('#sidebar_main a[href*="profile"]');
_OKCP.sidebarThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.sidebarThumbs,'#sidebar_main', false, true);

// right sidebar
_OKCP.similarUsersThumbs = $('#similar_users_list .user_image');
_OKCP.similarUsersThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.similarUsersThumbs,'#similar_users_list', false, true);

// home page match photo slideshow browser thingy
_OKCP.similarUsersThumbs = $('#matchphotobrowser .image > a');
_OKCP.similarUsersThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.similarUsersThumbs,'#matchphotobrowser', false, true);

// recent activity
_OKCP.recentActivityUsersThumbs = $('#recent_activity .activity_item .image a');
_OKCP.recentActivityUsersThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.recentActivityUsersThumbs,'#recent_activity', false, true);

// quiver
_OKCP.quiverThumbs = $('#p_quiver #matches .photo');
_OKCP.quiverThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.quiverThumbs,'#p_quiver #matches', false, true);

// favorites
_OKCP.favoritesThumbs = $('#p_favorites #main_column .user_row_item');
_OKCP.favoritesThumbs.each(function() {
	this.thumbName = this.id.split('usr-')[1];
});
applyBindingsToProfileThumb(_OKCP.favoritesThumbs,'#p_favorites #main_column', false, true);

// visitors
_OKCP.visitorsThumbs = $('#p_stalkers #main_column .user_row_item');
_OKCP.visitorsThumbs.each(function() {
	this.thumbName = this.id.split('usr-')[1];
});
applyBindingsToProfileThumb(_OKCP.visitorsThumbs,'#p_stalkers #main_column', false, true);

// quickmatch
_OKCP.quickmatchThumbs = $('#p_votes #main_column .user_row_item, #p_likes #main_column .user_row_item');
_OKCP.quickmatchThumbs.each(function() {
	this.thumbName = this.id.split('usr-')[1];
});
applyBindingsToProfileThumb(_OKCP.quickmatchThumbs,'#p_votes #main_column', false, true);

// mailbox
_OKCP.mailboxThumbs = $('#messages .photo');
_OKCP.mailboxThumbs.each(function() {
	this.thumbName = this.href.split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.mailboxThumbs,'#messages', false, true);

// IM
_OKCP.conversationThumbs = $('#conversations .user_thumb > a');
_OKCP.conversationThumbs.each(function() {
	this.thumbName = this.href.split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.conversationThumbs,'#conversations', false, true);


if ( $('#p_match').length !== 0 ) { //if we're on the matches page, enable the timer
	setInterval(function() {
		var doSortByEnemy = false;

		// Match Search Page
		_OKCP.matchresultsThumbs = $('#match_results .image_wrapper');
		_OKCP.matchresultsThumbs.each(function() {
			//if it doesn't have a binding applied, apply one
			if ($(this).attr('data-bind') === undefined) {
				this.img = $(this).find('img');

				//OkC puts the elements below, but doesn't load the images, so we have to confirm that the images exist
				if (this.img.length === 0) return false;

				this.thumbName = this.img.attr('alt').split('Picture of ')[1];
				this.id = 'okcp-' + this.thumbName + '-thumb-link';
				applyBindingsToProfileThumb($(this), '#'+this.id, false, true);
				// doSortByEnemy = !!JSON.parse(localStorage.okcp).settings.sortByEnemy; // doSortByEnemy = true if the setting is enabled
			}
		});

		if (doSortByEnemy) OKCP.sortByEnemy();
	},500);
}

// Bindings are applied, so remove class from body enabling hide button.
$('.OKCP-bindings-not-yet-loaded').removeClass('OKCP-bindings-not-yet-loaded');



function __generate_okcp_pagetab_event( e, t, e2 ) {
	return $('<a>', {
		'class':'okcp-btn hide-btn ' + e + ' ' + e2
		, 'data-bind': 'click: ' + e + ', css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].wm == true : false}'
		, 'text': t
	} )
}
