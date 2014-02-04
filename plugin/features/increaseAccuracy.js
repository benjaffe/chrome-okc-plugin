_OKCP.showUnansweredQuestions = function(data) {
	var questions = _OKCP.filteredQuestionsList || JSON.parse(localStorage.okcpDefaultQuestions).questionsList;
	var unansweredQuestionsDiv = $('<div class="unanswered-questions"></div>').appendTo('body');
	var numUnansweredQuestionsNotYetLoaded = objLength(questions);
	var num = 0;
	var iframeArr = [];
	var iframeNum = 0;
	for (var cat in questions) {
		var questionsList = questions[cat];
		for (var i = 0; i < questionsList.length; i++) {
			var question = questionsList[i];
			var qid = question.qid;
			var iframe = $('<iframe qid='+qid+' class="unanswered-questions-iframe" src="http://www.okcupid.com/questions?rqid=' + qid + '" style="width:100%;height:1px;" qid="' + qid + '">');
			iframe.load(function() {
				$(this).attr('loaded','true');

				numUnansweredQuestionsNotYetLoaded--;
				if (numUnansweredQuestionsNotYetLoaded <= 0) {
					$(".unanswered-questions-loadingtext").remove();
				}
				$(this).css({'height':'400px'});
				var iFrameContent = $(this.contentDocument);
				var questionStuff = iFrameContent.find('#new_question');

				if (iFrameContent.find(".notice p:not(.btn)").text().indexOf('already answered this question') !== -1 ||
						iFrameContent.find(".notice.pink p:eq(1)").not(':hidden').size() > 0) {
					$(this).remove();
					addiFrame();
					return false;
				}


				// hide and reorganize everything
				iFrameContent.find('body > *').hide();
				iFrameContent.find('body').append(('<div class="big_dig" style="padding:0;"><div class="questions" id="addQuestionStuffHere" style="width:auto;margin:0;"></div></div>'));
				iFrameContent.find('#addQuestionStuffHere').html( questionStuff );
				iFrameContent.find('.notice.green, .notice.pink .btn').hide();
				iFrameContent.find('.submit_btn').click(function(){
					iFrameContent.find('#new_question').hide();
				});

				$('<a class="iframe-close-btn">X</a>').insertBefore(this).click(function() {
					removeiFrame($(this).next());
					addiFrame();
				});
			});
			iframeArr.push(iframe);
			num++;
		}
	}
	var checkForAnsweredLoop = setInterval(function(){
		var iframes = unansweredQuestionsDiv.find('iframe');

		// have any questions been answered since we last checked?
		iframes.each(function(){
			if ($(this).attr('loaded') && $(this.contentDocument).find('#new_question #question_'+$(this).attr('qid')).length === 0) {
				removeiFrame(this);
				addiFrame();
			}
		});

		// are there enough questions on the screen?
		if (iframes.length < 3) {
			addiFrame();
		}

		if (iframes.filter('[loaded]').length === 0) {
			$('.spinner').fadeIn(200).addClass('spinner-note-patient');
		} else {
			$('.spinner').fadeOut(200, function(){
				$(this).removeClass('spinner-note-patient');
			});
		}

		// are we out of questions?
		if (iframeNum === iframeArr.length && iframes.length === 0) {
			clearInterval(checkForAnsweredLoop);
			$('.spinner').fadeOut(200, function(){
				$(this).removeClass('spinner-note-patient');
			});
			$('.unanswered-questions').fadeOut(200,function(){
				$(this).remove();
				alert("You've gone through all the questions for your chosen categories. Refresh the page to see those questions in your results.");
			});

		}
	},250);

	function removeiFrame(elem) {
		$(elem).prev().remove();
		$(elem).slideUp().remove();
		return true;
	}
	function addiFrame() {
		if (iframeNum === iframeArr.length) {
			return false;
		}
		unansweredQuestionsDiv.append(iframeArr[iframeNum]);
		iframeNum++;
		return true;
	}
};
