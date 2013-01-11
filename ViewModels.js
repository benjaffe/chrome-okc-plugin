$ = jQuery;

var _OKCP = {};

_OKCP.urlSansParameters = location.href.split('?')[0];
_OKCP.profilePath = _OKCP.urlSansParameters.split("/profile/")[1] || '';
_OKCP.profileName = _OKCP.profilePath.split("/")[0];

$('body').addClass('OKCP-bindings-not-yet-loaded');

// if we're on a profile page
if (_OKCP.profilePath !== '') {
	$('#main_content .tabbed_heading').append('<div class="personalized-match">'+
		'<a class="poly-hide-btn" data-bind="click: toggleHiddenProfile">Poly-Hide</a>'+
		'<div class="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'+
		'<ul class="match-ratios"></ul>'+
		'<div class="question-detail"></div>'+
		'<ul class="category-toggle-list"></ul>'+
	'</div>');

}

// if we're on the match search page
if (document.location.pathname === "/match") { //enable feature: sort by enemy percentage

	var sortByEnemyEnabled; // = !!JSON.parse(localStorage.okc).sortByEnemyEnabled || false;
	sortByEnemyEnabled = true; // TODO: enable people to disable sortByEnemy

	if (sortByEnemyEnabled) {
		// sortByEnemy();
	}
}



function OKCP() {
	var _dummyObservable = ko.observable();


	
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
			console.log("writing to localStorage");
			console.log(localStorage.okcp);
			console.log('-----');
		}
	});
	this.profileListData = ko.observable(this.profileList());
	this.questionPageNum = 0; //for iterating over question pages
	this.questionPath = undefined; //for storing the path of the question page as we iterate

	this.questionList = [];
	this.numRequestsMade = 0;
	this.numRequestsFinished = 0;
	this.responseCount = {};
	this.responseGood = 0;
	this.response = 0;
	this.profileHidden = ko.observable(false);

	this.toggleHiddenProfile = function() {
		console.log('toggleHiddenProfile run');
		this.profileHidden(!this.profileHidden()); //update page UI
		this.profileList("h",this.profileHidden()); //update storage
		this.alertLocalStorageChange();
	};
	this.alertLocalStorageChange = function() {
		_dummyObservable.notifySubscribers(); //force the computed value to fetch the new updated local storage by pretending we updated something else in the computed function.
	}

	this.getAnswers = function (list) {
		var requestFailed = false;
		var recentProfiles = localStorage.okcpRecentProfiles ? JSON.parse(localStorage.okcpRecentProfiles) : {"_ATTENTION":"This is just temporary caching to avoid hitting the server a million times. Notice there's an expires time built in for each key."};

		// get list of questions and categories to compare to
		if (list === undefined) {
			list = localStorage.okcpDefaultQuestions ? JSON.parse(localStorage.okcpDefaultQuestions) : [];
		}

		// check for cached question data
		if (!!recentProfiles[_OKCP.profileName]) {
			recentProfiles[_OKCP.profileName].expires = new Date().getTime() + 300000; //reset expires
			OKCP.questionList = recentProfiles[_OKCP.profileName].questionList;
			OKCP.responseCount = recentProfiles[_OKCP.profileName].responseCount;
			areWeDone(true);
		} else {
			loadProfileAnswers();
		}


		function loadProfileAnswers() {
			//loop through every question page
			var pageResultsDiv = $('<div id="page-results"></div>').appendTo('body');
			$('#footer').append('<a class="page-results-link" href="#page-results">Show question results</a>');
			
			// console.log("getting answers");
			
			while (!requestFailed && OKCP.numRequestsMade < 10) {
				updateQuestionPath();
				// console.log('loading page '+ OKCP.questionPath);
				OKCP.numRequestsMade++;
				$('<div id="page-results-' + OKCP.questionPageNum + '"></div>').appendTo(pageResultsDiv).load(OKCP.questionPath + ' #questions', function() {
					OKCP.numRequestsFinished++;
					// console.log(this);
					for (var i = 0; i < list.length; i++) {
						var listItem = list[i];
						var num = listItem.qid;
						var wrongAnswers = listItem.wrongAnswers;
						if ($("#question_" + num + ".public").length === 0) continue;
						var questionText = $(this).find("#qtext_"+num).text().trim();
						if (questionText === "") continue;

						var theirAnswer = $(this).find("#answer_target_"+num).text().trim();
						var theirNote = $(this).find("#note_target_"+num).text().trim();
						var yourAnswer = $(this).find("#answer_viewer_"+num).text().trim();
						var yourNote = $(this).find("#note_viewer_"+num).text().trim();
						
						var match = true;
						for (var j = 0; j < wrongAnswers.length; j++) {
							// console.log(questionText + "  " + theirAnswer + " | " + wrongAnswers[j]);
							if (wrongAnswers[j] === theirAnswer) match = false;
						}

						if (!OKCP.responseCount[listItem.category]) { //ensure there's an entry for the category count
							OKCP.responseCount[listItem.category] = [0,0];
						}
						if (match) {
							OKCP.responseCount[listItem.category][0]++;
						}
						OKCP.responseCount[listItem.category][1]++;
						OKCP.questionList.push({
							question: questionText,
							theirAnswer: theirAnswer,
							theirNote: theirNote,
							yourAnswer: yourAnswer,
							yourNote: yourNote,
							match: match,
							category: listItem.category
						});
						listItem.qid = listItem.qid+"-used";
					}
					// console.log(OKCP.questionList);
					areWeDone();

				}).error(function(){
					console.log("Request failed on number " + OKCP.numRequestsMade);
					requestFailed = true;
				});

			}
		}


		function retrieveQuestion (num) {
			for (var i = 0; i < questionsToCheckFor.length; i++) {
				// console.log(num + "  " + questionsToCheckFor[i].qid);
				if (num*1 === questionsToCheckFor[i].qid*1) {
					// console.log(true);
					return questionsToCheckFor[i];
				}
			}
			return false;
		}

		function updateQuestionPath (pageNum) {
			OKCP.questionPageNum = pageNum || OKCP.questionPageNum;
			OKCP.questionPath = "http://www.okcupid.com/profile/" + _OKCP.profileName + "/questions?n=1&low=" + (OKCP.questionPageNum*10+1) + "&i_care=1";
			// console.log(OKCP.questionPath);
			OKCP.questionPageNum++;
		}

		function areWeDone(fromCached) {
			if (fromCached || OKCP.numRequestsFinished === OKCP.numRequestsMade) {
				// console.log(OKCP.questionList);
				// put this data into localStorage
				recentProfiles[_OKCP.profileName] = {
					expires: new Date().getTime() + 600000, // temporarily-cached data expires 10 minutes from being set
					questionList: OKCP.questionList,
					responseCount: OKCP.responseCount
				};
				for (profile in recentProfiles) {
					if (profile === "_ATTENTION") continue;
					if (new Date().getTime() - recentProfiles[profile].expires > 0) {
						delete recentProfiles[profile]; // remove not-recently visited profiles
					}
				}
				localStorage.okcpRecentProfiles = JSON.stringify(recentProfiles);

				$('.spinner').remove();
				for (category in OKCP.responseCount) {
					var countArr = OKCP.responseCount[category];
					var matchRatio = Math.round(100*100*countArr[0]/countArr[1])/100;
					var matchClass = "";
					if (matchRatio > 90 && countArr[1]>1) {
						matchClass = 'great-match';
					} else if (matchRatio < 50) {
						matchClass = 'bad-match';
					}
					$('.match-ratios').append('<li class="match-ratio ' + matchClass + '">' + category + ': ' + matchRatio + '%</li>');
				}

				for (var i = 0; i < OKCP.questionList.length; i++) {
					var question = OKCP.questionList[i];
					if ($('.question-detail-'+question.category).length === 0) {
						$('.question-detail').append('<ul class="question-detail-'+question.category+'"></ul>');
					}
					$('.question-detail-'+question.category).append('<li class="match match-' + question.match + '"><ul>'+
						'<li class="question">' + question.question + '</li>'+
						'<li class="answer">' + question.theirAnswer + ' -- ' + '</li>'+
						'</ul></li>');
					if ($('.question-detail-'+question.category+' .match').length === 1) {
						$('.question-detail-'+question.category).prepend('<li class="category-header category-header-'+question.category+'">'+question.category+'</li>');
					}
				}
			}
		}
	}
}

$(window).bind('storage', function(e) {
	console.log("refreshing from localStorage");
	OKCP.alertLocalStorageChange();
	OKCP.profileListData(OKCP.profileList());
	OKCP.profileListData.notifySubscribers();
	// console.log(JSON.stringify(OKCP.profileList()));
});

// if no entry for current profile exists, make one!
var storage = JSON.parse(localStorage.okcp);
if (!storage.profileList[_OKCP.profileName]) {
	storage.profileList[_OKCP.profileName] = {};
}
localStorage.okcp = JSON.stringify(storage);

// apply bindings for everything except thumbs (as of 1/10, that's only the "hide" button)
window.OKCP = new OKCP();
ko.applyBindings(OKCP);


OKCP.getAnswers();

// takes a jQuery collection and adds polyhidden class binding to the profile's 'h' key in storage (within the bindings scope)
function applyBindingsToProfileThumb (objList, scopeOfBindingsStr) {
	var scopeOfBindings = document.querySelector(scopeOfBindingsStr);
	if (scopeOfBindings === null) return false;
	objList.each(function() {
		var thumbName = this.thumbName;
		$(this).attr('data-bind','css: { "polyhidden": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].h == true : false}');
	});
	ko.applyBindings(OKCP, scopeOfBindings);
}

//these are all the places we're looking for thumbnails to hide

// current profile's profile image
_OKCP.currentProfileImage = $('#profile_thumbs');
_OKCP.currentProfileImage.each(function() {
	this.thumbName = $(this).find('#thumb0_a').attr('href').split('/photos')[0].split('/profile/')[1];
	console.log(this.thumbName);
});
applyBindingsToProfileThumb(_OKCP.currentProfileImage,'#profile_thumbs');

// left sidebar ("you might like" and "you recently visited")
_OKCP.sidebarThumbs = $('#sidebar_main a[href*="profile"]');
_OKCP.sidebarThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.sidebarThumbs,'#sidebar_main');

// right sidebar
_OKCP.similarUsersThumbs = $('#similar_users_list .user_image');
_OKCP.similarUsersThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.similarUsersThumbs,'#similar_users_list');

// home page match photo slideshow browser thingy
_OKCP.similarUsersThumbs = $('#matchphotobrowser .image > a');
_OKCP.similarUsersThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.similarUsersThumbs,'#matchphotobrowser');

// quiver
_OKCP.quiverThumbs = $('#p_quiver #matches .photo');
_OKCP.quiverThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.quiverThumbs,'#p_quiver #matches');

// favorites
_OKCP.favoritesThumbs = $('#p_favorites #main_column .user_row_item');
_OKCP.favoritesThumbs.each(function() {
	this.thumbName = this.id.split('usr-')[1];
});
applyBindingsToProfileThumb(_OKCP.favoritesThumbs,'#p_favorites #main_column');

// visitors
_OKCP.visitorsThumbs = $('#p_stalkers #main_column .user_row_item');
_OKCP.visitorsThumbs.each(function() {
	this.thumbName = this.id.split('usr-')[1];
});
applyBindingsToProfileThumb(_OKCP.visitorsThumbs,'#p_stalkers #main_column');

// quickmatch
_OKCP.quickmatchThumbs = $('#p_votes #main_column .user_row_item, #p_likes #main_column .user_row_item');
_OKCP.quickmatchThumbs.each(function() {
	this.thumbName = this.id.split('usr-')[1];
});
applyBindingsToProfileThumb(_OKCP.quickmatchThumbs,'#p_votes #main_column');

// mailbox
_OKCP.mailboxThumbs = $('#messages .photo');
_OKCP.mailboxThumbs.each(function() {
	this.thumbName = this.href.split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.mailboxThumbs,'#messages');

// IM
_OKCP.conversationThumbs = $('#conversations .user_thumb > a');
_OKCP.conversationThumbs.each(function() {
	this.thumbName = this.href.split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.conversationThumbs,'#conversations');

// Match Search Page
setTimeout(function() {
	var matchresultsThumbs = $('#match_results .match_row');
	matchresultsThumbs.each(function() {
		this.thumbName = $(this).find('.username').text();
		console.log(this.thumbName);
	});
	applyBindingsToProfileThumb(matchresultsThumbs,'#match_results');
},1000);


// Bindings are applied, so remove class from body enabling hide button.
$('body').removeClass('OKCP-bindings-not-yet-loaded');


