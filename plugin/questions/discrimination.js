fileQuestions.discrimination =
	[
		//race
		{
			"qid":"123",
			"text":"Would you strongly prefer to go out with someone of your own skin color / racial background?",
			"answerText": ["Yes", "No"],
			"category": "race",
			"score": [-1, 1]
		},
		{
		"qid":"46927",
			"text":"Would you consider dating someone who has vocalized a strong negative bias toward a certain race of people?",
			"answerText": ["Yes.", "No.", "It depends on which race."],
			"category": "race",
			"score": [-1, 1, -1]
		},
		{
			"qid":"55744",
			"text":"If you were going to have a child, would you want the other parent to be of the same ethnicity as you?",
			"answerText": ["Yes.", "No.", "This would not be an important factor to me."],
			"category": "race",
			"score": [-1, 1, 1]
		},

		//women


		//LGBT_discrimination
		{
			"qid":"44384",
			"text":"Which best represents your opinion of same-sex relationships?",
			"category": "LGBT_discrimination",
			"answerText": ["Girl-on-girl is okay, but guy-on-guy is wrong.", "Guy-on-guy is okay, but girl-on-girl is wrong.", "All same-sex relationships are wrong.", "It's all fine by me."],
			"score": [-0.5, -0.5, -1, 1],
			"weight": [1, 1, 1, 1]
		},
		{
			"qid":"219",
			"text":"Gay marriage -- should it be legal?",
			"category": "LGBT_discrimination",
			"answerText": ["Yes", "No"],
			"score": [1, -1],
			"weight": [1, 1]
		},
		{
			"qid":"40484",
			"text":"Would you date someone, knowing that they had a VERY close family member (parent, sibling) who was openly gay?",
			"category": "LGBT_discrimination",
			"answerText": ["Yes", "No", "I'm Not Sure", "If they didn't flaunt it, it would be all right."],
			"score": [1, -1, -0.5, -0.5],
			"weight": [1, 1, 1, 1]
		},
		{
			"qid":"46563",
			"text":"Assume you have a homosexual friend who is the same gender as you. Would it bother you if they hugged you?",
			"category": "bi-open",
			"answerText": ["Yes.", "No.", "Only if I thought the hug was more than friendly."],
			"score": [-1, 1, 0],
			"weight": [0.5, 0.5, 0]
		},


		//mental health


		//disability


		//weight
		{
            "qid":"52682",
            "text":"If one of your potential matches were overweight, would that be a dealbreaker?",
            "answerText": ["Yes, even if they were slightly overweight.", "Yes, but only if they were obese.", "No.", "No, in fact I prefer overweight people."],
			"category": "weight",
            "score": [-1, -1, 1, 1]
		}
	];