//question search words: vegetarian, vegan
_OKCP.fileQuestions.veg =
	{
		"veg": [
			{
				"qid":"179268",
				"text":"Are you either vegetarian or vegan?",
				"answerText": ["Yes", "No"],
				"score": [1, -1]
			},
			{
				"qid":"22198",
				"text":"If you were out to dinner and your date was a vegetarian would you still order meat?",
				"answerText": ["Yes", "No", "I'm Not Sure/ I would ask them first", "I'm vegetarian too"],
				"score": [-1, 0, 0, 1]
			},
			{
				"qid":"36345",
				"text":"If an otherwise perfect match gave you an ultimatum to become a vegetarian, what would you do?",
				"answerText": ["Comply - Become a vegetarian.", "Rebel - This would be a deal breaker.", "Smile - I'm already a vegetarian."],
				"score": [1, -1, 1]
			}
		],

		"veg_friendly": [
			{
				"qid":"179268",
				"text":"Are you either vegetarian or vegan?",
				"answerText": ["Yes", "No"],
				"score": [1, -1],
				"weight": [1, 0]
			},
			{
				"qid":"22198",
				"text":"If you were out to dinner and your date was a vegetarian would you still order meat?",
				"answerText": ["Yes", "No", "I'm Not Sure/ I would ask them first", "I'm vegetarian too"],
				"score": [-1, 1, 1, 1],
				"weight": [0.5, 1, 1, 1]
			},
			{
				"qid":"36345",
				"text":"If an otherwise perfect match gave you an ultimatum to become a vegetarian, what would you do?",
				"answerText": ["Comply - Become a vegetarian.", "Rebel - This would be a deal breaker.", "Smile - I'm already a vegetarian."],
				"score": [1, -1, 1],
				"weight": [1, 1, 1]
			}
		],

		"not_veg": [
			{
				"qid":"179268",
				"text":"Are you either vegetarian or vegan?",
				"answerText": ["Yes", "No"],
				"score": [-1, 1]
			},
			{
				"qid":"22198",
				"text":"If you were out to dinner and your date was a vegetarian would you still order meat?",
				"answerText": ["Yes", "No", "I'm Not Sure/ I would ask them first", "I'm vegetarian too"],
				"score": [1, 1, 1, -1]
			},
			{
				"qid":"36345",
				"text":"If an otherwise perfect match gave you an ultimatum to become a vegetarian, what would you do?",
				"answerText": ["Comply - Become a vegetarian.", "Rebel - This would be a deal breaker.", "Smile - I'm already a vegetarian."],
				"score": [1, 1, -1]
			}
		]

	};