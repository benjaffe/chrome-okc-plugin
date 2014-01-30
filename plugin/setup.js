$ = jQuery;

// Initial setup
var _OKCP = {};


$('<span class="okcp-improved-link">Improved!</span>').appendTo('#logo')
	.click(function(){
		window.open('http://chrome.google.com/webstore/detail/cgdblghohnaeeejaoincmbcdkdnodkei/','_blank');
	});

_OKCP.fileQuestions = {};

_OKCP.questionFetchingMethod = "mobile_app"; //alt value is "original", but that code is almost certainly broken. (currently it's commented out)
_OKCP.largeThumbSize = '250';
_OKCP.numQuestionPages =20;		//how many pages to search through to match question answers (10 questions per page, sorted by 'i_care' so mandatory and very important answers will show up first - later questions after this limit will NOT be searched/matched at all!! So make sure to make this number big enough and that users mark their questions as very important to ensure they get matched! Note: bigger numbers mean slower loading of results.)

_OKCP.cacheEnabled = true;
_OKCP.debugTimerEnabled = false; //for timing how long question requests take
_OKCP.debugTimer = null;

_OKCP.urlSansParameters = location.href.split('?')[0];
_OKCP.profilePath = _OKCP.urlSansParameters.split("/profile/")[1] || '';

_OKCP.profileName = _OKCP.profilePath.split("/")[0];
_OKCP.clientProfileName = $('#user_header .username').text();
_OKCP.onOwnProfile = false;
_OKCP.bodyID = $('body').attr('id');
_OKCP.pageType = _OKCP.bodyID.split('p_')[1]; //known types are profile, match, mailbox, stalkers, quickmatch / votes / likes, favorites, inactive

// If we're our own profile
if (_OKCP.profilePath === '') {
	_OKCP.profileName = _OKCP.clientProfileName;
	_OKCP.onOwnProfile = true;
}

// check to see if any database upgrades or localStorage cleanups are necessary
(function () {
	// create a settings object if there isn't one
	if (!localStorage.okcpSettings) {
		localStorage.okcpSettings = JSON.stringify({});
	}

	// create a database if there isn't one
	if (localStorage.okcp === undefined) {
		localStorage.okcp = JSON.stringify({
			dataModelVersion: '1.1.40',
			profileList: {},
			settings: {}
		});
	}

	var storage = JSON.parse(localStorage.okcp);
	storage.dataCleanupJobNumToReach = '2.3.0';

	if (storage.dataCleanupJobNum === storage.dataCleanupJobNumToReach) {
		return false;
	}

	var upgradeMessage = ['Data Cleanup Run:'];

	// confirm that proper keys exist
	storage.settings = storage.settings || {};
	storage.profileList = storage.profileList || {};
	storage.questionCategories = storage.questionCategories || ["not_volatile","generally_happy","non-monogamous","communicative","not_possessive","cuddling","sex-positive"];

	// if backup isn't current, create a backup
	if (localStorage.okcpBackup_2_2_2 === undefined) {
		localStorage.okcpBackup_2_2_2 = localStorage.okcp;
		upgradeMessage.push('  * Created a database backup (version 2.2.2)');

		//upgrade them to the new default category names
		storage.questionCategories = ["not_volatile","generally_happy","non-monogamous","communicative","not_possessive","cuddling","sex-positive"];
	}

	// clean up deprecated keys
	var deprecatedKeys = ['okcpSettings','okcp_b130110','okcp_b130124'];
	for (var i = 0; i < deprecatedKeys.length; i++) {
		if (!!localStorage[deprecatedKeys[i]]) {
			localStorage.removeItem(deprecatedKeys[i]);
			upgradeMessage.push('  * Removed deprecated key ('+deprecatedKeys[i]+')');
		}
	}

	// upgrade data model from 1.x if needed
	if (storage.hiddenProfileList !== undefined) {
		var oldData = storage;
		var newData = {
			'dataModelVersion': '1.1.0',
			'profileList': {}
		};
		for (i=0; i < oldData.hiddenProfileList.length; i++) {
			newData.profileList[oldData.hiddenProfileList[i]] = {h:true};
		}
		localStorage.okcp = JSON.stringify(newData);
		upgradeMessage.push('  * Updated Data Model to Version 1.1.0');
	}

	storage.dataCleanupJobNum = storage.dataCleanupJobNumToReach;
	localStorage.okcp = JSON.stringify(storage);

	console.log(upgradeMessage.join('\n'));
})();

//fix and augment UI, and add class to hide features until they're ready
(function() {
	// Basic CSS Helpers
	$('html').attr('id','okcp') //an ID to use to override OkC's sad CSS specificity madness
		.addClass('OKCP-bindings-not-yet-loaded'); //, and a class to hide everything until it is set up

	// Fixing OkC UI Issues
	$('#save_unsave')
		.parent().addClass('wide-buttons-that-are-now-not-wide left')
		.next().addClass('wide-buttons-that-are-now-not-wide right');

	// Change OkCupid's UI
	if ($('#visit_button a:contains(Enable invisible browsing)').size() > 0) {
		$('#visit_button').addClass('moved').insertAfter($('#similar_users_list'));
	}
	$('#profile_ad').hide();

	// Give the guilt banner a class so we can hide it
	var counter = 0;
	var guiltBannerHiderTimer = setInterval(function() {
		counter++;
		var guiltBanner = $('.quickbuybox').prev('div:not("#main_content")');
		if (counter >= 5000 || guiltBanner.size() > 0) {
			guiltBanner.addClass('guilt');
			clearInterval(guiltBannerHiderTimer);
		}
	}, 1);
})();

var stateAbbr = {"Alaska" : "AK", "Alabama" : "AL", "Arkansas" : "AR", "American Samoa" : "AS", "Arizona" : "AZ", "California" : "CA", "Colorado" : "CO", "Connecticut" : "CT", "District of Columbia" : "DC", "Delaware" : "DE", "Florida" : "FL", "Georgia" : "GA", "Guam" : "GU", "Hawaii" : "HI", "Iowa" : "IA", "Idaho" : "ID", "Illinois" : "IL", "Indiana" : "IN", "Kansas" : "KS", "Kentucky" : "KY", "Louisiana" : "LA", "Massachusetts" : "MA", "Maryland" : "MD", "Maine" : "ME", "Michigan" : "MI", "Minnesota" : "MN", "Missouri" : "MO", "Mississippi" : "MS", "Montana" : "MT", "North Carolina" : "NC", "North Dakota" : "ND", "Nebraska" : "NE", "New Hampshire" : "NH", "New Jersey" : "NJ", "New Mexico" : "NM", "Nevada" : "NV", "New York" : "NY", "Ohio" : "OH", "Oklahoma" : "OK", "Oregon" : "OR", "Pennsylvania" : "PA", "Puerto Rico" : "PR", "Rhode Island" : "RI", "South Carolina" : "SC", "South Dakota" : "SD", "Tennessee" : "TN", "Texas" : "TX", "Utah" : "UT", "Virginia" : "VA", "Virgin Islands" : "VI", "Vermont" : "VT", "Washington" : "WA", "Wisconsin" : "WI", "West Virginia" : "WV", "Wyoming" : "WY"};
var objLength = function(obj){
	var len = 0;
	$.each(obj, function (i) {
		len++;
	});
	return len;
};

