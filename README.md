[![Stories in Ready](https://badge.waffle.io/benjaffe/chrome-okc-plugin.png?label=ready&title=Ready)](https://waffle.io/benjaffe/chrome-okc-plugin)
chrome-okc-plugin
=================
# Intro
This plugin was created by [benjaffe ](https://github.com/benjaffe) in order to make it easier for people, particularly with non-mainstream preferences, to find good matches on OKCupid.

# Features
When you install the plugin and visit someone else's profile on OKCupid you will see "Plugin Menu" on the right side of the user navigation.

## Plugin Menu/Categories
The categories feature allows you to chose different categories you care about such as "coffee" or "no coffee." You do this through "Change Categories" on the plugin menu. Drag from the "Available Categories" to "Currently-selected categories."

All of them comb through the questions set for these categories to calculate a user's score. It requires for you to answer the questions for that category and to mark them as Very Important or Mandatory. To answer more questions in your chosen category you can go to "Plugin Menu" and select "Improve Plugin Accuracy."

Once you've chosen categories, when you visit another user, the meter showing their performance in each chosen category will display next to their picture. You can mouseover to see how they answered each question. The meters will only display if the users have answered questions in that category though.

## Labels
The label feature allows you to mark profiles for future use such as "poly" or "not for me." This will make all links to their profile more transparent throughout the site.


# Development
## Building
When you clone the repository you'll need to build it using the grunt file. You'll need to install Grunt and then run

``` 
npm install
```

Depending on your local environment you may need to run as an administrator.

To test out your local copy in Chrome go to chrome://chrome/extensions/, click the "Developer Mode" checkbox. After that you should have the option to "Load Unpacked Extensions." Select your local copy.

## Data
Data is stored locally in localStorage. If you'd like to examine it, the extension [Storage Area Explorer](https://chrome.google.com/webstore/detail/storage-area-explorer) is helpful.

## Adding Custom Categories
 * Create a new .js file in plugin/questions named after your category. For example categoryname.js.
 * Add your category to category-list.mdown
 * Add it to manifest.json

 The other option is adding a new subcategory into an existing category file.

 Editing is pretty simple, you can use the other categories as models, but basically each category is an array in the format:

```
_OKCP.fileQuestions.categoryname =
	{
		"sub-category": [
			{
				"qid":"409", //the question's ID.
				"answerText": ["Answer 1", "Answer 2"], //possible answers
				"score": [-1, 1], //how they contribute to the category score
				"weight": [1, 1] //how much you want to weight the answers on the category score
			}
		]
   }

```


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/benjaffe/chrome-okc-plugin/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
