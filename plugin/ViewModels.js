$ = jQuery;

var _OKCP = {};

_OKCP.urlSansParameters = location.href.split('?')[0];
_OKCP.profilePath = _OKCP.urlSansParameters.split("/profile/")[1] || '';
_OKCP.profileName = _OKCP.profilePath.split("/")[0];
_OKCP.clientProfileName = $('#user_header .username').text();
if (_OKCP.profilePath === "") {
	_OKCP.profileName = _OKCP.clientProfileName;
}
_OKCP.onOwnProfile = (_OKCP.clientProfileName === _OKCP.profileName);
console.log(_OKCP.onOwnProfile);

$('html').attr('id','okcp'); //so I have an ID to use when I have to override OkC's broken CSS specificity madness :(
$('body').addClass('OKCP-bindings-not-yet-loaded');

// if we're on a profile page
if (_OKCP.profilePath !== '') {
	// Add the UI (buttons and spinner)
	$('#main_content .tabbed_heading').append('<div class="okcp-btns">'+
		'<a class="okcp-btn toggleIsPoly" data-bind="click: toggleIsPoly, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].ip == true : false}">Poly</a>'+
		'<a class="okcp-btn hide-btn poly-hide-btn" data-bind="click: toggleHideNotPoly, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].p == true : false}">Not Poly</a>'+
		'<div class="divider"></div>'+
		'<a class="okcp-btn" data-bind="click: toggleWantToMessage, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].wm == true : false}">To Message</a>'+
		'<a class="okcp-btn" data-bind="click: toggleMaybeInterested, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].m == true : false}">Maybe</a>'+
		'<div class="divider"></div>'+
		'<a class="okcp-btn hide-btn uninterested-hide-btn" data-bind="click: toggleHideUninterested, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].u == true : false}">Not For Me</a>'+
		'<a class="okcp-btn hide-btn nodata-hide-btn" data-bind="click: toggleHideNoData, css: { checked: profileListData()[\''+_OKCP.profileName+'\'] ? profileList()[\''+_OKCP.profileName+'\'].d == true : false}">No Answers</a>'+
	'</div>').append('<div class="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
	// (category match percentages (#social exists on your own profile page, #actions is on others'))
	$('#actions, #social').append('<table class="match-ratios-wrapper-outer"><tr><td class="match-ratios">'+
		'<ul class="match-ratios-list"></ul>'+
		'</td></tr></table>');
	// question detail
	$('#right_column').prepend('<div class="question-detail"></div>');
	$('.question-detail').prepend('<div class="questions-in-common"><a href="#" class="improve-accuracy" id="improve-accuracy" data-bind="click:showUnansweredQuestions">Improve Accuracy</a></div>');

	// Now let's fix some of OkCupid's styling by adding a class (since sadly, they don't already have them)
	$('#save_unsave').parent().addClass('wide-buttons-that-are-now-not-wide left');
	$('#save_unsave').parent().next().addClass('wide-buttons-that-are-now-not-wide right');

	// Add hover and bindings for the category match ratio area. (Only doing the hover with JS since I can't with CSS)
	$('.match-ratios').hover(function() {
		$('body').addClass('okcp-show-question-detail');
	},function() {
		$('body').removeClass('okcp-show-question-detail');
	}).attr('data-bind','click: toggleQuestionDetailPinned'); //click functionality for the pinning feature

	// The rest of the bindings for the pinning feature
	$('body').attr('data-bind','css:{"okcp-show-question-detail-hold": settingsList()["questionDetailPinned"] || false}');
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
			// console.log("writing to localStorage (profileList modified)");
			// console.log(localStorage.okcp);
			// console.log('-----');
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
	this.profileShown = ko.observable(false);

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

	this.showUnansweredQuestions = function(data) {
		var questions = JSON.parse(localStorage.okcpDefaultQuestions);
		console.log(questions);
		var unansweredQuestionsDiv = $('<div class="unanswered-questions"></div>').appendTo('body');
		for (var i=0; i < questions.length; i++) {
			var qid = questions[i].qid;
			var iframe = $('<iframe class="unanswered-questions-iframe" src="http://www.okcupid.com/questions?rqid=' + qid + '" style="width:100%;height:1px;" qid="' + qid + '">');
			// console.log(iframe);
			unansweredQuestionsDiv.append(iframe);

			iframe.load(function() {
				$(this).css({'height':'300px'});
				var iFrameContent = $(this.contentDocument);
				// console.log(iFrameContent);
				// console.log(iFrameContent.find(".notice p:not(.btn)").text().indexOf('already answered this question') === -1);
				console.log(iFrameContent.find(".notice.pink p").not(':hidden'));
				if (iFrameContent.find(".notice p:not(.btn)").text().indexOf('already answered this question') !== -1 ||
						iFrameContent.find(".notice.pink p:eq(1)").not(':hidden').size() > 0) {
					console.log('not doing ' + $(this).attr('qid'));
					$(this).remove();
					if($('.unanswered-questions').children().length === 0) {
						$('.improve-accuracy').hide();
						$('.unanswered-questions').html('<h1>You have answered all the questions that this plugin currently checks. Congratulations!</h1>').delay(5000).hide(500);
					}
					return false;
				}
				var questionStuff = iFrameContent.find('#new_question');
				iFrameContent.find('body > *').hide();
				iFrameContent.find('body').append(('<div class="big_dig" style="padding:0;"><div class="questions" id="addQuestionStuffHere" style="width:auto;margin:0;"></div></div>'));
				iFrameContent.find('#addQuestionStuffHere').html( questionStuff );
				iFrameContent.find('.notice.green, .notice.pink .btn').hide();
				iFrameContent.find('.submit_btn').click(function(){
					iFrameContent.find('#new_question').hide();
				});
				$('<a class="iframe-close-btn">X</a>').insertBefore(this).click(function() {
					$(this).next().add(this).hide(400,function() {
						$(this).remove();
						if($('.unanswered-questions').children().length === 0) {
							$('.unanswered-questions').remove();
							$(this).animate({'height':'158px'},800);
						}
					});
				});
			});


			// $('<div class="unanswered-questions-' + i + '"></div>').load('http://www.okcupid.com/questions?rqid=' + qid + ' #new_question', function() {
			// 	if ($(this).find('.notice:contains(already answered this question)').length) {
			// 		$(this).remove();
			// 	} else {
					
					
			// 	}
				
			// });
		}
	};

	this.alertLocalStorageChange = function() {
		_dummyObservable.notifySubscribers(); //force the computed value to fetch the new updated local storage by pretending we updated something else in the computed function.
	};

	this.sortByEnemy = function() {
		var matchResultsArr = $("#match_results .match_row"); //get array of elements
		// sort based on enemy percentage
		matchResultsArr.sort(function (a, b) {
			a = parseInt($(a).find('.enemy .percentage').text().split('%')[0],10);
			b = parseInt($(b).find('.enemy .percentage').text().split('%')[0],10);
			// compare
			if(a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			} else {
				return 0;
			}
		});
		$("#match_results").html(matchResultsArr); //put sorted results back on page
	};

	this.getAnswers = function (list) {
		var requestFailed = false;
		var recentProfiles = localStorage.okcpRecentProfiles ? JSON.parse(localStorage.okcpRecentProfiles) : {"_ATTENTION":"This is just temporary caching to avoid hitting the server a million times. Notice there's an expires time built in for each key."};

		// get list of questions and categories to compare to
		if (list === undefined) {
			list = localStorage.okcpDefaultQuestions ? JSON.parse(localStorage.okcpDefaultQuestions) : [];
		}

		// check for cached question data
		if (!!recentProfiles[_OKCP.profileName] && new Date().getTime() - recentProfiles[_OKCP.profileName].expires < 0) {
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



			while (!requestFailed && OKCP.numRequestsMade < 10) {
				updateQuestionPath();
				console.log('loading page '+ OKCP.questionPath);
				OKCP.numRequestsMade++;

				//on the first page load, get meta info (number of questions in common)
				if (OKCP.questionPageNum === 1) {
					$('<div id="page-results-meta"></div>').appendTo(pageResultsDiv).load(OKCP.questionPath + ' .stats.lined', function() {
						var questionsInCommon = $(this).find('.stats.lined li:nth-child(5) .large').text().split(' questions')[0];
						var questionsInCommonAmountClass = "";
						if (questionsInCommon > 100) {
							questionsInCommonAmountClass = 'questions-in-common-many';
						} else if (questionsInCommon < 34) {
							questionsInCommonAmountClass = 'questions-in-common-few';
						}
						$('.questions-in-common').addClass(questionsInCommonAmountClass).prepend(questionsInCommon + ' Questions in Common ');
					});
				}

				//add page results, parse the page
				$('<div id="page-results-' + OKCP.questionPageNum + '"></div>').appendTo(pageResultsDiv).load(OKCP.questionPath + ' #questions', function() {
					OKCP.numRequestsFinished++;
					// console.log(this);
					for (var i = 0; i < list.length; i++) {
						var theirAnswer, theirNote, yourAnswer, yourNote;
						var listItem = list[i];
						var num = listItem.qid;
						var wrongAnswers = listItem.wrongAnswers;
						if ($("#question_" + num + ".public").length === 0) continue;
						var questionText = $(this).find("#qtext_"+num).text().trim();
						if (questionText === "") continue;

						if (_OKCP.onOwnProfile) {
							theirAnswer = $(this).find("#self_answers_"+num+" .match.mine").text().trim();
							theirNote = $(this).find("#explanation_"+num).text().trim();
						} else {
							theirAnswer = $(this).find("#answer_target_"+num).text().trim();
							theirNote = $(this).find("#note_target_"+num).text().trim();
							yourAnswer = $(this).find("#answer_viewer_"+num).text().trim();
							yourNote = $(this).find("#note_viewer_"+num).text().trim();
						}
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
					areWeDone(false);
				}).error(function(){
					console.log("Request failed on number " + OKCP.numRequestsMade);
					requestFailed = true;
				});

			}
		}

		/*function retrieveQuestion (num) {
		console.log('ho hi hi');
			for (var i = 0; i < questionsToCheckFor.length; i++) {
				if (num*1 === questionsToCheckFor[i].qid*1) {
					return questionsToCheckFor[i];
				}
			}
			return false;
		}*/

		function updateQuestionPath (pageNum) {
			var questionFilterParameter = 'i_care=1';
			if (_OKCP.onOwnProfile) {
				questionFilterParameter = 'very_important=1';
			}
			OKCP.questionPageNum = pageNum || OKCP.questionPageNum;
			OKCP.questionPath = "http://www.okcupid.com/profile/" + _OKCP.profileName + "/questions?n=1&low=" + (OKCP.questionPageNum*10+1) + "&" + questionFilterParameter;
			OKCP.questionPageNum++;
		}

		// if we're done, it hides the spinner and adds the UI, then sorts the categories
		function areWeDone(fromCached) {
			if (fromCached || OKCP.numRequestsFinished === OKCP.numRequestsMade) {
				// console.log(OKCP.questionList);
				// put this data into localStorage
				recentProfiles[_OKCP.profileName] = {
					expires: new Date().getTime() + 600000, // temporarily-cached data expires 10 minutes from being set
					questionList: OKCP.questionList,
					responseCount: OKCP.responseCount
				};
				for (var profile in recentProfiles) {
					if (profile === "_ATTENTION") continue;
					if (new Date().getTime() - recentProfiles[profile].expires > 0) {
						delete recentProfiles[profile]; // remove not-recently visited profiles
					}
				}
				localStorage.okcpRecentProfiles = JSON.stringify(recentProfiles);

				$('.spinner').hide();
				for (var category in OKCP.responseCount) {
					var countArr = OKCP.responseCount[category];
					var matchRatio = Math.round(100*100*countArr[0]/countArr[1])/100;
					var matchClass = "";
					if (matchRatio > 90 && countArr[1]>1) {
						matchClass = 'great-match';
					} else if (matchRatio < 50) {
						matchClass = 'bad-match';
					}
					$('.match-ratios-list').append('<li class="match-ratio ' + matchClass + '"><span class="match-ratio-category">' + category + ':</span><span class="match-ratio-value">' + countArr[0] + '/' + countArr[1] + '</span></li>');//matchRatio + '%</li>');
				}

				for (var i = 0; i < OKCP.questionList.length; i++) {
					var question = OKCP.questionList[i];
					if ($('.question-detail-'+question.category).length === 0) {
						$('.question-detail').append('<ul class="question-detail-'+question.category+'"></ul>');
					}
					$('.question-detail-'+question.category).append('<li class="match match-' + question.match + '"><ul>'+
						'<li class="question">' + question.question + '</li>'+
						'<li class="answer">' + question.theirAnswer + '</li>'+
						'<li class="explanation">' + question.theirNote + '</li>'+
						'</ul></li>');
					if ($('.question-detail-'+question.category+' .match').length === 1) {
						$('.question-detail-'+question.category).prepend('<li class="category-header category-header-'+question.category+'">'+question.category+'</li>');
					}
				}

				// sort categories
				$('.match-ratios-list .match-ratio').sort(function(a,b) {
					if ($(b).find('.match-ratio-category').text() === "poly:") return true;
					if ($(a).find('.match-ratio-category').text() === "poly:") return false;
					return ( $(a).find('.match-ratio-category').text() > $(b).find('.match-ratio-category').text() );
				}).appendTo('.match-ratios-list');

				$('.question-detail > ul').sort(function(a,b) {
					if ($(b).find('.category-header').text() === "poly") return true;
					if ($(a).find('.category-header').text() === "poly") return false;
					return ( $(a).find('.category-header').text() > $(b).find('.category-header').text() );
				}).appendTo('.question-detail');
			}
		}
	};
}

$(window).bind('storage', function(e) {
	// console.log("refreshing from localStorage");
	OKCP.alertLocalStorageChange();
	OKCP.profileListData(OKCP.profileList());
	OKCP.profileListData.notifySubscribers();
	OKCP.settingsListData(OKCP.settingsList());
	OKCP.settingsListData.notifySubscribers();
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
function applyBindingsToProfileThumb (objList, scopeOfBindingsStr, retry) {
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
		$(this).attr('data-bind','css: {'+
			'"okcp-hidden": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].h == true : false,'+
			'"okcp-no-answers": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].d == true : false,'+
			'"okcp-maybe": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].m == true : false,'+
			'"okcp-poly": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].ip == true : false,'+
			'"okcp-to-message": profileListData()["'+thumbName+'"] ? profileList()["'+thumbName+'"].wm == true : false'+
		'}');
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

// recent activity
_OKCP.recentActivityUsersThumbs = $('#recent_activity .activity_item .image a');
_OKCP.recentActivityUsersThumbs.each(function() {
	this.thumbName = this.href.split('?')[0].split('/profile/')[1];
});
applyBindingsToProfileThumb(_OKCP.recentActivityUsersThumbs,'#recent_activity');

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

// This is run in a loop because as the user scrolls, more items will appear.
setInterval(function() {
	var doSortByEnemy = false;
	// Match Search Page
	_OKCP.matchresultsThumbs = $('#match_results .match_row');
	_OKCP.matchresultsThumbs.each(function() {
		//if it doesn't have a binding applied, apply one
		if ($(this).attr('data-bind') === undefined) {
			this.thumbName = $(this).find('.username').text();
			applyBindingsToProfileThumb($(this),'#'+this.id);
			doSortByEnemy = !!JSON.parse(localStorage.okcp).settings.sortByEnemy; // doSortByEnemy = true if the setting is enabled
		}
	});
	if (doSortByEnemy) OKCP.sortByEnemy();
},1000);

// Bindings are applied, so remove class from body enabling hide button.
$('body').removeClass('OKCP-bindings-not-yet-loaded');


