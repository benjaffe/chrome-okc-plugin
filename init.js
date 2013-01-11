if (localStorage.okcp === "undefined") localStorage.okcp = JSON.stringify({hiddenProfileList:[]});
console.log(localStorage);
setTimeout(function() {
	localStorage.setItem("okcp",JSON.stringify({"hiddenProfileList":["alisonsparkles","LadyLag","You_Like_This","sunburstinabox","thisisliz13","Iheartsparkles","swtgin","crownedether","Randinii","molly64347","kickety","Chickuila","nschl001","wobblyhgirl","jennifer_anne_","oedipabritt","xMOCHIx","la_chatte_noire","RainbowShadow","feministsays","sunnydays8","parkview_sf","415_","beepbeepsheepe","Lily_SJ","alisonsparkles","LadyLag","You_Like_This","sunburstinabox","thisisliz13","Iheartsparkles","swtgin","crownedether","Randinii","molly64347","kickety","Chickuila","nschl001","wobblyhgirl","jennifer_anne_","oedipabritt","xMOCHIx","la_chatte_noire","RainbowShadow","feministsays","sunnydays8","parkview_sf","415_","beepbeepsheepe","Lily_SJ","MooroseMalersia","danacj","MoonBeamtyl","mellsthecat","TheLadyEveSF","OnePercentEvil","michelle10019","AshRGold","squidnee","AnandaW","MariaSch","Electric_Feelin","8433269","sunswpt","annahwho"]}),
		function() {console.log(localStorage);});
},1000);

console.log(localStorage);

var okcpOld = new (function() {
	var that = this;


	this.updateDatabase = function() {
		localStorage.okcp = JSON.stringify(that.storage)
	};

	this.refreshFromLocalStorage = function() {
		that.storage = JSON.parse(localStorage.okcp);
	};

	this.toggleHiddenProfile = function() {
		console.log("Toggling hidden");
		console.log(that.profileHidden);
		var hiddenProfileList = that.storage.hiddenProfileList;
		if (that.profileHidden) {
			hiddenProfileList.splice(hiddenProfileList.indexOf(that.profileName), 1);
		} else {
			hiddenProfileList.push(that.profileName);
		}
		that.profileHidden = !that.profileHidden;
		that.updateDatabase();
		$('body').toggleClass('current-profile-polyhidden');
		that.hideHiddenProfiles();
	};

	this.hideHiddenProfiles = function() {
		$('.polyhidden').removeClass('polyhidden'); //reset, so it unhides if a profile is unhidden.
		hiddenProfileList = JSON.parse(localStorage.okcp).hiddenProfileList;

		if (!hiddenProfileList) return false; //no profiles hidden

		//hide current profile if it should be hidden
		if (hiddenProfileList.indexOf(that.profileName) !== -1) {
			that.profileHidden = true;
		}

		//hide hidden profile thumbnails
		for (var i = 0; i < hiddenProfileList.length; i++) {
			$('a[href*=' + hiddenProfileList[i] + '], img[title="'+ hiddenProfileList[i] +'"]').not('.page_tabs *, #actions *, #matches .buttons *, .big_dig *').addClass('polyhidden');
		}
	}

	this.init = (function() {
		console.log("running init");
		that.refreshFromLocalStorage();
		that.hideHiddenProfiles();
		if (okcp.profileHidden) $('body').addClass('current-profile-polyhidden');
	});

})();
okcp.init();

$(window).bind('storage', function(e) {
	if (JSON.stringify(localStorage.okcp) !== JSON.stringify(okcp.storage)) {
		console.log("refreshing from localStorage");
		okcp.refreshFromLocalStorage();
		okcp.hideHiddenProfiles();
	}
});




// var enabledCategories = okcp.storage.enabledCategories || ["poly","notPosessive","science","children"];

function sortByEnemy() {
	var matchResultsArr = $("#match_results .match_row"); //get array of elements
	console.log(matchResultsArr);
	// sort based on enemy percentage
	matchResultsArr.sort(function (a, b) {
		a = parseInt($(a).find('.enemy .percentage').text().split('%')[0]);
		b = parseInt($(b).find('.enemy .percentage').text().split('%')[0]);

		// compare
		if(a > b) {
			return 1;
		} else if(a < b) {
			return -1;
		} else {
			return 0;
		}
	});
	$("#match_results").html(matchResultsArr);//put sorted results back on page
}


function getAnswers (questionList_Arr) {
	console.log("getting answers");
	if (questionList_Arr === undefined) {
		questionList_Arr = JSON.parse(localStorage.okcp).customQuestionList
	}
	if (questionList_Arr === undefined) {
		questionList_Arr = okcp.defaultQuestions;
	}
	console.log(questionList_Arr);
	var list = questionList_Arr || questionsToCheckFor;

	requestFailed = false;

	//loop through every question page
	var pageResultsDiv = $('<div id="page-results"></div>').appendTo('body');
	$('#footer').append('<a class="page-results-link" href="#page-results">Show question results</a>');
	console.log(requestFailed);
	console.log(okcp.numRequestsMade);
	while (!requestFailed && okcp.numRequestsMade < 10) {
		updateQuestionPath();
		// console.log('loading page '+ okcp.questionPath);
		okcp.numRequestsMade++;
		$('<div id="page-results-' + okcp.questionPageNum + '"></div>').appendTo(pageResultsDiv).load(okcp.questionPath + ' #questions', function() {
			okcp.numRequestsFinished++;
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

				if (!okcp.responseCount[listItem.category]) { //ensure there's an entry for the category count
					okcp.responseCount[listItem.category] = [0,0];
				}
				if (match) {
					okcp.responseCount[listItem.category][0]++;
				}
				okcp.responseCount[listItem.category][1]++;
				okcp.questionList.push({
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
			console.log(okcp.questionList);
			areWeDone();

		}).error(function(){
			console.log("Request failed on number " + okcp.numRequestsMade);
			requestFailed = true;
		});

	}

	function retrieveQuestion (num) {
		for (var i = 0; i < questionsToCheckFor.length; i++) {
			console.log(num + "  " + questionsToCheckFor[i].qid);
			if (num*1 === questionsToCheckFor[i].qid*1) {
				console.log(true);
				return questionsToCheckFor[i];
			}
		}
		return false;
	}

	function updateQuestionPath (pageNum) {
		okcp.questionPageNum = pageNum || okcp.questionPageNum;
		okcp.questionPath = "http://www.okcupid.com/profile/" + okcp.profileName + "/questions?n=1&low=" + (okcp.questionPageNum*10+1) + "&i_care=1";
		// console.log(okcp.questionPath);
		okcp.questionPageNum++;
	}

	function areWeDone() {
		if (okcp.numRequestsFinished === okcp.numRequestsMade) {
			console.log(okcp.questionList);
			$('.spinner').remove();
			for (category in okcp.responseCount) {
				var countArr = okcp.responseCount[category];
				var matchRatio = Math.round(100*100*countArr[0]/countArr[1])/100;
				var matchClass = "";
				if (matchRatio > 90 && countArr[1]>1) {
					matchClass = 'great-match';
				} else if (matchRatio < 50) {
					matchClass = 'bad-match';
				}
				$('.match-ratios').append('<li class="match-ratio ' + matchClass + '">' + category + ': ' + matchRatio + '%</li>');
			}

			for (var i = 0; i < okcp.questionList.length; i++) {
				var question = okcp.questionList[i];
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
