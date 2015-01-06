_OKCP.changeCategories = function(){

	_OKCP.storage.settings.get(['questionCategories'])
	.then(function(data) {
		var currCategories = data.questionCategories;

		showCategorySorter();

		function showCategorySorter () {
			$('body').append('<div class="categories-lists-wrapper"><div class="categories-lists"><ul class="active-categories categories-list"></ul><ul class="available-categories categories-list"></ul><input id="save-category-changes" type="button" value="Save Changes"><input id="cancel-category-changes" type="button" value="Cancel"><input id="reset-categories" type="button" value="Reset Categories"></div></div>');
			$.each(_OKCP.categoryList, function(i, value){
				var valueReadable = value.split('_').join(' ');
				if ($.inArray(value,currCategories) >= 0) {
					$('.active-categories').append('<li>' + valueReadable + '</li>');
				} else {
					$('.available-categories').append('<li>' + valueReadable + '</li>');
				}
			});
			$( ".categories-list" ).sortable({
				connectWith: ".categories-list"
			}).disableSelection();
			$('#save-category-changes').click(function(){
				saveCategoryChanges();
			});
			$('#cancel-category-changes').click(function(){
				hideCategorySorter();
			});
			$('#reset-categories').click(function(){
				resetCategories();
			});

		}

		function hideCategorySorter() {
			$('.categories-lists-wrapper').remove();
		}

		function saveCategoryChanges(){
			var newCategoriesArr = [];
			$('.active-categories').each(function(){
				newCategoriesArr.push(this.value);
			});
			var newQuestionCategories = [];
			try {

				$('.active-categories li').each(function(i, value){
					newQuestionCategories.push($(value).text().split(' ').join('_'));
				});

				_OKCP.storage.settings.set('questionCategories', newQuestionCategories)
				.then(function() {
					hideCategorySorter();
					alert("Success! All open OkCupid pages need to be refreshed to show the new category preferences.\n\nThe current page will now refresh.");
					location.reload();					
				},
				function () {
					alert("CATEGORY CHANGE FAILED!\n\nPlease let the developer know :)");
				});
				console.log(newQuestionCategories);
				_OKCP.clearCachedQuestionData(); // FIXME: This should be an event handler
				return true;

			} catch(e) {
				console.log(e);
				alert("CATEGORY CHANGE FAILED!\n\nPlease let the developer know :)");
			}
		}

		function resetCategories(){
			_OKCP.storage.settings.set('questionCategories', ["not_volatile","generally_happy","non-monogamous","communicative","not_possessive","cuddling","sex-positive"])
			.then(function() {
				alert('Success! Categories reset to default. Refresh the page to see the new categories');
				_OKCP.clearCachedQuestionData(); // FIXME: This should be an event handler
				hideCategorySorter();
				location.reload();
			})
		}
	});
};