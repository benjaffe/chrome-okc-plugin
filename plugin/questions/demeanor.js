fileQuestions.demeanor =
	[
		//not_volatile
		{
			"qid":"55349",
			"text":"Have you ever thrown an object in anger during an argument?",
			"category": "not_volatile",
			"answerText": ["Yes.", "No."],
			"score": [-1, 1]
		},
		{
			"qid":"386",
			"text":"If someone intentionally damaged your property, would you be more likely to call the police, or to fight them?",
			"category": "not_volatile",
			"answerText": ["Call the police", "Fight them"],
			"score": [1, -1]
		},


		//generally_happy
		{
			"qid":"1707",
			"text":"Which of the following best describes your typical demeanor?",
			"category": "generally_happy",
			"answerText": ["Cheerful!  I have a positive outlook.", "Meh. I have my ups and downs.", "Annoyed. The world sucks."],
			"score": [1, 0, -1]
		},
		{
			"qid":"6689",
			"text":"Are you quietly angry a lot of the time?",
			"category": "generally_happy",
			"answerText": ["Yes", "No"],
			"score": [-1, 1]
		},
		{
			"qid":"16293",
			"text":"How's it going?",
			"category": "generally_happy",
			"answerText": ["I'm fine, really", "Just great!  How bout you?", "Oh, it's going.", "Life is a meaningless hell and I hope you die"],
			"score": [1, 1, 0, -1],
			"weight": [0, 1, 1, 1] //I don't know what the first answer means
		}

	];