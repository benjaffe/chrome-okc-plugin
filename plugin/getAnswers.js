_OKCP.getAnswers = function(answersToCompareCurrentProfileTo) {
  let ACCESS_TOKEN = null;
  var numRequestsMade = 0;
  var numRequestsFinished = 0;
  var scoredQuestionsList = [];
  var responseCount = {};
  var responseGood = 0;
  var response = 0;
  var questionPageNum = 0; //for iterating over question pages
  var questionPath; //for storing the path of the question page as we iterate
  var requestFailed = false;
  var recentProfiles = localStorage.okcpRecentProfiles
    ? JSON.parse(localStorage.okcpRecentProfiles)
    : {
        _ATTENTION:
          "This is just temporary caching to avoid hitting the server a million times. Notice there's an expires time built in for each key.",
      };

  if (_OKCP.onOwnProfile) {
    //on own profile
    log.info('on own profile');
    $('.spinner').hide();
    return false;
  }

  // get list of questions and categories to compare to
  if (answersToCompareCurrentProfileTo === undefined) {
    answersToCompareCurrentProfileTo = localStorage.okcpDefaultQuestions
      ? JSON.parse(localStorage.okcpDefaultQuestions).questionsList
      : {};
  }

  // check for cached question data
  if (
    !!recentProfiles[_OKCP.profileName] &&
    _OKCP.cacheEnabled &&
    new Date().getTime() - recentProfiles[_OKCP.profileName].expires < 0
  ) {
    console.log('loading answers from cache');
    recentProfiles[_OKCP.profileName].expires = new Date().getTime() + 300000; //reset expires
    questionsList = recentProfiles[_OKCP.profileName].questionsList;
    responseCount = recentProfiles[_OKCP.profileName].responseCount;
    updateUIWithQuestions(questionsList);
  } else {
    // console.log('not cached');
    loadAnswersFromCurrentUser();
  }

  // load answers for the user we're currently viewing
  async function loadAnswersFromCurrentUser() {
    const profileName = location.pathname.replace('/profile/', '');
    if (document.head.id == '') {
      // console.log("waiting for access token, waiting 1 second");
      setTimeout(loadAnswersFromCurrentUser, 100);
      return;
    }

    ACCESS_TOKEN = document.head.id;
    console.log('token obtained');

    const initialRequest = new XMLHttpRequest();
    initialRequest.open(
      'GET',
      `https://www.okcupid.com/1/apitun/profile/${profileName}/answers?after=${window.btoa(
        '0,10',
      )}&_=${Date.now()}`,
    );
    initialRequest.setRequestHeader(
      'authorization',
      'Bearer '.concat(ACCESS_TOKEN),
    );
    initialRequest.onload = async res => {
      const response = JSON.parse(res.target.response);
      const totalQuestionCount = response.paging.total;
      const answerRangesToGet = [];
      for (var i = 10; i < totalQuestionCount; i += 10) {
        answerRangesToGet.push(`${i},${Math.min(totalQuestionCount, i + 10)}`);
      }
      const getRequestsToMake = answerRangesToGet
        .map(
          range =>
            `https://www.okcupid.com/1/apitun/profile/${profileName}/answers?after=${window.btoa(
              range,
            )}&_=${Date.now()}`,
        )
        .map(url => {
          return new Promise(resolve => {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.setRequestHeader(
              'authorization',
              'Bearer '.concat(ACCESS_TOKEN),
            );
            req.onload = res2 => {
              // console.log("done! " + url);
              resolve(JSON.parse(res2.currentTarget.response));
            };
            req.send();
          });
        });

      const rawResponses = await Promise.all(getRequestsToMake);
      const questionsList = rawResponses.reduce(
        (acc, val) => acc.concat(val.data),
        response.data,
      );
      console.log(questionsList);
      // recalculateScoring();
      updateUIWithQuestions(questionsList);
    };
    initialRequest.send();
  }

  function updateCache(profileName, questionsList) {
    // add this data to the cache for this profile
    recentProfiles[profileName] = {
      expires: new Date().getTime() + 60000, // expires: new Date().getTime() + 600000, // temporarily-cached data expires 10 minutes from being set // temporarily-cached data expires 1 minute from being set
      questionsList: questionsList,
      responseCount: responseCount,
    };

    // clean up stale cache items
    for (var profile in recentProfiles) {
      if (profile === '_ATTENTION') continue;
      if (new Date().getTime() - recentProfiles[profile].expires > 0) {
        console.log(`cleaning up cache for ${profile}`);
        delete recentProfiles[profile]; // remove not-recently visited profiles
      }
    }
    localStorage.okcpRecentProfiles = JSON.stringify(recentProfiles);
  }

  function something(questionsList) {
    for (var category in answersToCompareCurrentProfileTo) {
      console.log('category', category);
      var categoryQuestionList = answersToCompareCurrentProfileTo[category];
      // console.log('cat', categoryQuestionList);
      for (var i = 0; i < categoryQuestionList.length; i++) {
        var listItem = categoryQuestionList[i];
        var theirAnswer,
          theirAnswerIndex,
          theirNote,
          yourAnswer,
          yourNote,
          answerScore,
          answerWeight,
          answerScoreWeighted;

        var num = Number(listItem.qid);
        const filteredQuestionList = questionsList.filter(
          q => q.question.id === num,
        );

        // if question isn't present on page, continue
        if (filteredQuestionList.length === 0) {
          continue;
        }
        const question = filteredQuestionList[0];

        if (question.target.note) console.log('yo', question);

        // get question information
        var questionText = question.question.text;

        theirAnswerIndex = question.target.answer;
        theirAnswer = question.question.answers[theirAnswerIndex];
        theirNote = question.target.note ? question.target.note.note : null;
        yourAnswerIndex = question.viewer.answer;
        yourAnswer = question.question.answers[yourAnswerIndex];
        yourNote = question.viewer.note ? question.viewer.note.note : null;

        answerScore = listItem.score[theirAnswerIndex];
        answerWeight = listItem.weight
          ? listItem.weight[theirAnswerIndex] || 0
          : 1;
        console.log('doo');
        if (answerWeight === 0) continue;
        answerScoreWeighted = ((answerScore + 1) / 2) * answerWeight;
        console.log(answerScore + ' ' + answerWeight);

        //ensure there's an entry for the category count
        if (!responseCount[category]) responseCount[category] = [0, 0];

        responseCount[category][0] += answerScoreWeighted;
        responseCount[category][1] += answerWeight;
        // console.log(num + " - " + questionText);
        scoredQuestionsList.push({
          question: questionText,
          qid: num,
          theirAnswer: theirAnswer,
          theirNote: theirNote,
          yourAnswer: yourAnswer,
          yourNote: yourNote,
          answerScore: answerScore,
          answerWeight: answerWeight,
          answerScoreWeighted: answerScoreWeighted,
          category: category,
          categoryReadable: category.split('_').join(' '),
        });
        listItem.qid = listItem.qid + '-used';
      }
    }
  }

  // if we're done, it hides the spinner and adds the UI, then sorts the categories
  function updateUIWithQuestions(questionsList) {
    console.log('start of something');
    something(questionsList);
    console.log('end of something');
    updateCache(_OKCP.profileName, questionsList);

    console.log('updateUIWithQuestions');

    // $('.spinner').fadeOut(300);
    _OKCP.getAnswersFinished = true;
    console.log('done');

    // clear everything
    $('.match-ratios-list').html('');
    $('.question-detail > ul').remove();
    console.log('responseCount', responseCount);
    for (var category in responseCount) {
      var countArr = responseCount[category];
      var matchClass = 'match-' + Math.floor((countArr[0] / countArr[1]) * 5);
      var categoryReadable = category.split('_').join(' ');
      if (countArr[1] <= 1) {
        matchClass += ' one-data-point-match';
      }
      if (countArr[1] >= 10) {
        matchClass += ' more-than-10';
      }
      if (countArr[0] / countArr[1] <= 0.1) {
        matchClass += ' not-a-match';
      }

      const numerator = Math.round(countArr[0] * 10) / 10 + '';
      const denominator = Math.round(countArr[1] * 10) / 10 + '';
      const numeratorArr = numerator.split('.');
      const denominatorArr = denominator.split('.');
      if (Number(denominator) <= 0.5) continue;

      const matchRatioHtmlValue = `\
<span class="integer">${numeratorArr[0]}</span>\
<span class="point">.</span>\
<span class="decimal">${numeratorArr[1] || '0'}</span>\
<span class="slash">/</span>\
<span class="integer">${denominatorArr[0]}</span>\
<span class="point">.</span>\
<span class="decimal">${denominatorArr[1] || '0'}</span>`;
      const progressBarWidth = Math.round((countArr[0] / countArr[1]) * 93) + 7;
      const matchHtml = `\
<li class="match-ratio ${matchClass}" category="${category}">\
<span class="match-ratio-progressbar ${matchClass}" style="width:${progressBarWidth}%">\
</span> \
<span class="match-ratio-category">${categoryReadable}</span>\
<span class="match-ratio-value">${matchRatioHtmlValue}</span>\
</li>`;

      $(matchHtml)
        .appendTo('.match-ratios-list')
        .hover(
          function(e) {
            // return early if questions haven't finished loading
            if (!_OKCP.getAnswersFinished) return false;

            var target =
              e.target.tagName === 'LI'
                ? $(e.target)
                : $(e.target).parent('li');
            var category = target.attr('category');

            $('.question-detail > ul:not(.question-detail-' + category + ')')
              .stop()
              .slideUp(500);
          },
          function() {
            $('.question-detail > ul').slideDown(500);
          },
        );

      for (var i = 0; i < scoredQuestionsList.length; i++) {
        const question = scoredQuestionsList[i];
        if (question.category === category) {
          if ($('.question-detail-' + question.category).length === 0) {
            $('.question-detail').append(
              '<ul class="question-detail-' + question.category + '"></ul>',
            );
          }
          const matchClass =
            'match-' + Math.floor(((question.answerScore + 1) / 2) * 5);
          const matchHtml = `\
<li class="match ${matchClass}">
  <ul>
    <li class="question qid-${question.qid}">${question.question}</li>
    <li class="answer">${question.theirAnswer}</li>
    ${
      question.theirNote == null
        ? ''
        : `<li class="explanation">${question.theirNote}</li>`
    }
  </ul>
</li>`;

          $('.question-detail-' + question.category).append(matchHtml);
          if ($(`.question-detail-${question.category} .match`).length === 1) {
            $(`.question-detail-${question.category}`).prepend(
              `<li class="category-header category-header-${
                question.category
              }">${question.categoryReadable}</li>`,
            );
          }
        }
      }
    }

    if ($('.question-detail > ul').length === 0) {
      $('.question-detail').append(
        '<ul><li class="match match-nomatches"><ul>' +
          '<li class="noresults">' +
          'No Results' +
          '</li>' +
          '<li class="note">' +
          'To improve the plugin\'s accuracy, answer more questions publicly and rank them as "Very Important". You can also click the "Improve Accuracy" link at the top of this panel to help out.' +
          '</li>' +
          '</ul></li></ul>',
      );
      console.log('noresults');
      return false;
    }

    console.log('results');

    // sort categories
    $('.match-ratios-list .match-ratio')
      .sort(function(a, b) {
        if (
          $(b)
            .find('.match-ratio-category')
            .text() === 'poly:'
        )
          return true;
        if (
          $(a)
            .find('.match-ratio-category')
            .text() === 'poly:'
        )
          return false;
        return (
          $(a)
            .find('.match-ratio-category')
            .text() >
          $(b)
            .find('.match-ratio-category')
            .text()
        );
      })
      .appendTo('.match-ratios-list');

    $('.question-detail > ul')
      .sort(function(a, b) {
        if (
          $(b)
            .find('.category-header')
            .text() === 'poly'
        )
          return true;
        if (
          $(a)
            .find('.category-header')
            .text() === 'poly'
        )
          return false;
        return (
          $(a)
            .find('.category-header')
            .text() >
          $(b)
            .find('.category-header')
            .text()
        );
      })
      .appendTo('.question-detail');

    if (_OKCP.debugTimerEnabled) {
      console.log(
        'Fetching the questions took ' +
          (new Date().getTime() - _OKCP.debugTimer.getTime()) +
          ' ms',
      );
      var timeList = JSON.parse(localStorage.timeList);
      timeList.push(1 * (new Date().getTime() - _OKCP.debugTimer.getTime()));
      localStorage.timeList = JSON.stringify(timeList);
    }
  }
};

_OKCP.clearCachedQuestionData = function() {
  console.log('cleared cached question data');
  var recentProfiles = JSON.parse(localStorage.okcpRecentProfiles);
  for (var profile in recentProfiles) {
    if (profile === '_ATTENTION') continue;
    delete recentProfiles[profile]; // remove not-recently visited profiles
  }
  localStorage.okcpRecentProfiles = JSON.stringify(recentProfiles);
};
