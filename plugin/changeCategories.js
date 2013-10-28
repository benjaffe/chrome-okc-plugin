_OKCP.changeCategories = function(){
	var storage = JSON.parse(localStorage.okcp);
	var currCategoriesStr = JSON.stringify(storage.questionCategories);
	var newCategoriesArr = prompt('Edit your list of categories in the input below.\n\nBe aware -- the spacing is important. Don\'t erase the brackets, and make sure each category name is in quotes and separated by a comma. The list of currently valid categories is below.\n\nAlternatively, if you want to reset your category list to the default, type "default".\n\nValid Categories:\n* '+_OKCP.categoryList.join('\n* '), currCategoriesStr);
	var newQuestionCategories;
	try {
		if (newCategoriesArr.toLowerCase() === "default") {
			storage.questionCategories = ["not_volatile","generally_happy","non-monogamous","communicative","not_possessive","cuddling","sex-positive"];
			localStorage.okcp = JSON.stringify(storage);
			alert('Success! Categories reset to default. Refresh the page to see the new categories');
			_OKCP.clearCachedQuestionData();
			return true;
		}
		
		//the following will fail on improper input, putting us in the catch block
		newQuestionCategories = JSON.parse(newCategoriesArr);
		
		if ($.isArray(newQuestionCategories)) {
			storage.questionCategories = newQuestionCategories;
			localStorage.okcp = JSON.stringify(storage);
			alert('Success! Refresh the page to see the new categories');
			_OKCP.clearCachedQuestionData();
			return true;
		}

	} catch(e) {
		console.log(e);
	}
	console.log(newQuestionCategories);
	if (newCategoriesArr !== null) {
		alert("CATEGORY CHANGE FAILED!\n\nMaybe you're missing a quote or a comma. Maybe you spelled something wrong. Whatever the reason, your changes were not saved. More information is logged in the console.\n\nIn case you want to save what you entered, here it is:\n\n"+newCategoriesArr+"\n\n");
	}
};