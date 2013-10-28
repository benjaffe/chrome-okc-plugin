_OKCP.showUnansweredQuestions = function(data) {
	if (!confirm("This feature is EXPERIMENTAL. It will load up several hundred questions to see which ones you answered. It will definitely make your browser run slowly while it loads the questions. If you have an older computer, or a lot of programs open, I'd recommend pressing cancel. Are you sure you want to proceed?")) {
		alert('Try this feature in a month or two, and it will be a bit more polished. For now, just go answer a bunch of questions; the more questions you answer publically, the more accurate the plugin will be.');
		return false;
	}
	var questions = JSON.parse(localStorage.okcpDefaultQuestions).questionsList;
	//console.log(questions);
	var unansweredQuestionsDiv = $('<div class="unanswered-questions"><h1 class="unanswered-questions-loadingtext" style="margin-bottom:8px;text-align:center;font-weight:normal;font-style:italic;">...loading...</h1></div>').appendTo('body');
	var numUnansweredQuestionsNotYetLoaded = objLength(questions);
	// console.log(questions);
	// console.log(numUnansweredQuestionsNotYetLoaded);
	for (var cat in questions) {
		var questionsList = questions[cat];
		// unansweredQuestionsDiv.append('<p>'+cat+'</p>');
		for (var i = 0; i < questionsList.length && i < 50; i++) {
			var question = questionsList[i];
			console.log(question);
			var qid = question.qid;
			var iframe = $('<iframe class="unanswered-questions-iframe" src="http://www.okcupid.com/questions?rqid=' + qid + '" style="width:100%;height:1px;" qid="' + qid + '">');
			// console.log(iframe);
			unansweredQuestionsDiv.append(iframe);

			iframe.load(function() {
				numUnansweredQuestionsNotYetLoaded--;
				if (numUnansweredQuestionsNotYetLoaded <= 0) {
					$(".unanswered-questions-loadingtext").remove();
				}
				$(this).css({'height':'300px'});
				var iFrameContent = $(this.contentDocument);
				// console.log(iFrameContent);
				// console.log(iFrameContent.find(".notice p:not(.btn)").text().indexOf('already answered this question') === -1);
				// console.log(iFrameContent.find(".notice.pink p").not(':hidden'));
				if (iFrameContent.find(".notice p:not(.btn)").text().indexOf('already answered this question') !== -1 ||
						iFrameContent.find(".notice.pink p:eq(1)").not(':hidden').size() > 0) {
					// console.log('not doing ' + $(this).attr('qid'));
					$(this).remove();
					if($('.unanswered-questions').children().length === 1) {
						$('.improve-accuracy').hide();
						$('.unanswered-questions').html('<h1>You have answered all the questions that this plugin currently checks. Congratulations!</h1>').delay(5000).hide(500);
						var storage = JSON.parse(localStorage.okcp);
						storage.accuracyImprovedAsOfVersionNum = JSON.parse(localStorage.okcpDefaultQuestions).questionsVersionNum;
						localStorage.okcp = JSON.stringify(storage);
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
							$('.unanswered-questions').fadeOut(200,function(){$(this).remove();});
							$(this).animate({'height':'158px'},800);
						}
					});
				});
			});
		};
	}
};