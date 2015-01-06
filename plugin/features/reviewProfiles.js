_OKCP.reviewProfiles = function() {
	// although accessing objects is slower, I'm choosing to use this method because it makes the code so pretty!
	var profilesCategorized = {
		'ip' : {}, //is poly
		'p' : {},  //is not poly
		'wm' : {}, //want to message
		'm' : {},  //maybe
		'u' : {},  //not for me
		'd' : {}  //no answers
	};
	var profileShortcuts = {
		'ip': "Poly",
		'wm': "To Message",
		'm': "Maybe",
		'p': "Not Poly",
		'u': "Not For Me",
		'd': "No Answers"
	};

	_OKCP.storage.profiles.each(function(profile, profileObj) {
		for (var key in profileObj) {
			if (key === 'ip' || key === 'p' || key === 'wm' || key === 'm' || key === 'u' || key === 'd')
				if (profileObj[key]) //if key is set to true
					profilesCategorized[key][profile] = profileObj; //add profile to the appropriate object
		}
	}).then(function() {
		console.log(profilesCategorized);
		showProfileReviewer();

		function showProfileReviewer () {
			$('body').append('<div class="rp-outer-wrapper"><div class="rp-wrapper"><ul class="rp-list"></ul></div></div>');
			$('<a class="iframe-close-btn">X</a>').prependTo('.rp-wrapper').click(hideProfileReviewer);
			var bigList = $('.rp-list');
			for (var key in profilesCategorized) {
				if (key === 'p' || key === 'u' || key === 'd') continue; //probably nobody cares about non-poly, not for me, or no answers profiles
				var readableKey = profileShortcuts[key];
				var item = $('<li class="rp-list-item"><h2>'+readableKey+'</h2></li>');
				var sublist = $('<ul class="category-list"></ul>');
				item.append(sublist);
				bigList.append(item);
				var sublistData = profilesCategorized[key];
				for (var profile in sublistData) {
					var profileObj = sublistData[profile];
					var profileElem = $('<li class="profile"></li>');
					var locationStr = profileObj.location ? ' ('+profileObj.location+')' : '';
					profileElem.append('<a href="//www.okcupid.com/profile/'+profile+'" target="_blank">'+profile+'</a><span class="location">'+locationStr+'</span>');
					sublist.append(profileElem);
				}

			}
		}
		function hideProfileReviewer () {
			$('.rp-outer-wrapper').remove();
		}
	});
};
