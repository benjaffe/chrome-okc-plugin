_OKCP.changeCategories = function(){

	var storage = JSON.parse(localStorage.okcp);
	var currCategories = storage.questionCategories;

	showCategorySorter();

	function showCategorySorter () {
		$('body').append(
			'<div class="categories-lists-wrapper">' +
			'<div class="categories-lists">' +
			'<ul class="available-categories"></ul>' +
			'<div class="list-controls">' +
			'<input id="save-category-changes" type="button" value="Save Changes">' +
			'<input id="cancel-category-changes" type="button" value="Cancel">' +
			'<input id="reset-categories" type="button" value="Reset Categories">' +
			'</div></div>' +
			'</div>');

		$.each(_OKCP.categoryList, function(i, value){
			var valueReadable = value.split('_').join(' ');
			var active = ($.inArray(value, currCategories) > -1) ? 'active' : '';
			var listItem = '<li class="category ' + active + '">' + valueReadable + '</li>';

			$('.available-categories').append(listItem);
		});

		$('li.category').click(function() {
			$(this).toggleClass('active');
		});

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

		$('.available-categories .active').each(function(index, category){
			newCategoriesArr.push($(this).text());
		});

		var newQuestionCategories = [];
		try {

			$('.available-categories li.active').each(function() {
				var categoryName = $(this).text().split(' ').join('_');
				newQuestionCategories.push(categoryName);
			});

			console.log(storage);
			storage.questionCategories = newQuestionCategories;
			console.log(storage);
			localStorage.okcp = JSON.stringify(storage);
			console.log(newQuestionCategories);
			_OKCP.clearCachedQuestionData();
			hideCategorySorter();
			alert("Success! All open OkCupid pages need to be refreshed to show the new category preferences.\n\nThe current page will now refresh.");
			location.reload();
			return true;

		} catch(e) {
			console.log(e);
		}
		console.log(newQuestionCategories);
		if (newCategoriesArr !== null) {
			alert("CATEGORY CHANGE FAILED!\n\nPlease let the developer know :)");
		}
	}

	function resetCategories(){
		storage.questionCategories = ["not_volatile","generally_happy","non-monogamous","communicative","not_possessive","cuddling","sex-positive"];
		localStorage.okcp = JSON.stringify(storage);
		alert('Success! Categories reset to default. Refresh the page to see the new categories');
		_OKCP.clearCachedQuestionData();
		hideCategorySorter();
		location.reload();
	}

};
