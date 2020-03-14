chrome-okc-plugin
=================

# Note

This plugin is no longer in active development due to a lack of free time on my part. I've unpublished it from the Chrome web store for now. I'm not sure when or if I'll get around to fixing it. TBH it's been tiring keeping up with OkC's regular breaking updates, but if I find a good use case and a less fragile way of getting question information on load and adding it to the DOM, I'll revisit it.

If you are interested in forking and continuing development on the plugin, please do. I am open to considering directing users of this plugin to another plugin if the feature set is similar enough and it is under more active development than this one.

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
You can just run this by cloning it, you need to install all the dependencies to build it correctly. To do that first run

``` 
npm install
```

That will install Grunt, a task runner that is responsible for the tasks needed in order to register the extension for use in Chrome.

Run Grunt by running the Grunt command
```
grunt
```
Read Grunt.js to learn more about the other tasks it performs.

Finally, you'll need to run Bower, which installs some plugin dependencies like Jquery and Bootstrap
```
bower install
```


Depending on your local environment you may need to run as an administrator.

To test out your local copy in Chrome go to chrome://chrome/extensions/, click the "Developer Mode" checkbox. After that you should have the option to "Load Unpacked Extensions." Select your local copy.

## Data

Data is stored locally in localStorage. If you'd like to examine it, the extension [Storage Area Explorer](https://chrome.google.com/webstore/detail/storage-area-explorer) is helpful.

## Adding Custom Categories

- Create a new .js file in plugin/questions named after your category. For example categoryname.js.
- Add your category to category-list.mdown
- Add it to manifest.json

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

How do you find the question ID? If you find a question on the site, you can get the question ID (in Google Chrome) by right-clicking on the question title, `Inspect Element`, then look for something like `<div id="qtext_41953" class="qtext">`. In this example, the qid would be 41953.
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/benjaffe/chrome-okc-plugin/trend.png)](https://bitdeli.com/free 'Bitdeli Badge')

Previous feature text (no longer supported):

- Improve the plugin's accuracy by answering questions that the plugin finds.
- Get a direct link to your message thread with a user from their profile page
- Thumbnails images enlarge when you mouse over them.
- Re-added the pagination that OkCupid recently removed on Questions and Messages pages
