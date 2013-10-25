$ = jQuery;

// Initial setup
var _OKCP = {};

// _OKCP.questionFetchingMethod = "original";
_OKCP.questionFetchingMethod = "mobile_app";
_OKCP.largeThumbSize = '250';
_OKCP.numQuestionPages =20;		//how many pages to search through to match question answers (10 questions per page, sorted by 'i_care' so mandatory and very important answers will show up first - later questions after this limit will NOT be searched/matched at all!! So make sure to make this number big enough and that users mark their questions as very important to ensure they get matched! Note: bigger numbers mean slower loading of results.)

_OKCP.urlSansParameters = location.href.split('?')[0];
_OKCP.profilePath = _OKCP.urlSansParameters.split("/profile/")[1] || '';
_OKCP.profileName = _OKCP.profilePath.split("/")[0];
_OKCP.clientProfileName = $('#user_header .username').text();

_OKCP.cacheEnabled = true;
_OKCP.debugTimerEnabled = false; //for timing how long question requests take
_OKCP.debugTimer = null;

// If we're our own profile
if (_OKCP.profilePath === '') {
	_OKCP.profileName = _OKCP.clientProfileName;
	_OKCP.onOwnProfile = true;
}


var stateAbbr = {"Alaska" : "AK", "Alabama" : "AL", "Arkansas" : "AR", "American Samoa" : "AS", "Arizona" : "AZ", "California" : "CA", "Colorado" : "CO", "Connecticut" : "CT", "District of Columbia" : "DC", "Delaware" : "DE", "Florida" : "FL", "Georgia" : "GA", "Guam" : "GU", "Hawaii" : "HI", "Iowa" : "IA", "Idaho" : "ID", "Illinois" : "IL", "Indiana" : "IN", "Kansas" : "KS", "Kentucky" : "KY", "Louisiana" : "LA", "Massachusetts" : "MA", "Maryland" : "MD", "Maine" : "ME", "Michigan" : "MI", "Minnesota" : "MN", "Missouri" : "MO", "Mississippi" : "MS", "Montana" : "MT", "North Carolina" : "NC", "North Dakota" : "ND", "Nebraska" : "NE", "New Hampshire" : "NH", "New Jersey" : "NJ", "New Mexico" : "NM", "Nevada" : "NV", "New York" : "NY", "Ohio" : "OH", "Oklahoma" : "OK", "Oregon" : "OR", "Pennsylvania" : "PA", "Puerto Rico" : "PR", "Rhode Island" : "RI", "South Carolina" : "SC", "South Dakota" : "SD", "Tennessee" : "TN", "Texas" : "TX", "Utah" : "UT", "Virginia" : "VA", "Virgin Islands" : "VI", "Vermont" : "VT", "Washington" : "WA", "Wisconsin" : "WI", "West Virginia" : "WV", "Wyoming" : "WY"};
var objLength = function(obj){
	var len = 0;
	$.each(obj, function (i) {
		console.log(obj[i]);
		len++;
	});
	console.log(len);
	return len;
};

