//all categories will change names to *_nondiscriminatory once I write a converter, so people don't lose the categories. The categories are about users not being discriminatory toward others, not having no preference (not discriminating)

_OKCP.fileQuestions.discrimination =
	{
		"race_nondiscriminating": [
			{
				"qid":"123",
				"text":"Would you strongly prefer to go out with someone of your own skin color / racial background?",
				"answerText": ["Yes", "No"],
				"score": [-1, 1]
			},
			{
			"qid":"46927",
				"text":"Would you consider dating someone who has vocalized a strong negative bias toward a certain race of people?",
				"answerText": ["Yes.", "No.", "It depends on which race."],
				"score": [-1, 1, -1]
			},
			{
				"qid":"55744",
				"text":"If you were going to have a child, would you want the other parent to be of the same ethnicity as you?",
				"answerText": ["Yes.", "No.", "This would not be an important factor to me."],
				"score": [-1, 1, 1]
			}
		],

		//women_nondiscriminating


		"LGBT_nondiscriminating": [
			{
				"qid":"44384",
				"text":"Which best represents your opinion of same-sex relationships?",
				"answerText": ["Girl-on-girl is okay, but guy-on-guy is wrong.", "Guy-on-guy is okay, but girl-on-girl is wrong.", "All same-sex relationships are wrong.", "It's all fine by me."],
				"score": [-0.5, -0.5, -1, 1],
				"weight": [1, 1, 1, 1]
			},
			{
				"qid":"219",
				"text":"Gay marriage -- should it be legal?",
				"answerText": ["Yes", "No"],
				"score": [1, -1],
				"weight": [1, 1]
			},
			{
				"qid":"40484",
				"text":"Would you date someone, knowing that they had a VERY close family member (parent, sibling) who was openly gay?",
				"answerText": ["Yes", "No", "I'm Not Sure", "If they didn't flaunt it, it would be all right."],
				"score": [1, -1, -0.5, -0.5],
				"weight": [1, 1, 1, 1]
			},
			{
				"qid":"46563",
				"text":"Assume you have a homosexual friend who is the same gender as you. Would it bother you if they hugged you?",
				"answerText": ["Yes.", "No.", "Only if I thought the hug was more than friendly."],
				"score": [-1, 1, 0],
				"weight": [0.5, 0.5, 0]
			}
		],


		"mental_health_nondiscriminating": [
			{
				"qid": "455",
				"text": "Would the world be a better place if people with low IQs were not allowed to reproduce?",
				"answerText": ["Yes","No"],
				"score": [-1, 1],
				"weight": [1, 0.5]
			},
			{
				"qid": "137",
				"text": "Would you terminate a pregnancy if the baby was going to be mentally disabled?",
				"answerText": ["Yes", "No", "It depends on the severity"],
				"score": [-1, 1, 0],
				"weight": [0.4, 0.7, 0]
			}
		],


		//disability_nondiscriminating


		"weight_nondiscriminating": [ //will change to weight_nondiscriminatory
			{
				"qid":"52682",
				"text":"If one of your potential matches were overweight, would that be a dealbreaker?",
				"answerText": ["Yes, even if they were slightly overweight.", "Yes, but only if they were obese.", "No.", "No, in fact I prefer overweight people."],
				"score": [-1, -1, 1, 1]
			},
			{//Added by RAA
				"qid":"26525",
				"text":"Can overweight people still be sexy?",
				"answerText": ["Always", "Yes", "No"],
				"score": [1,1,-1,]
			},
			{//Added by RAA
				"qid":"26292",
				"text":"Would you date someone that is a little overweight but has a beautiful face?",
				"answerText": ["I'm Not Sure", "Yes", "No"],
				"score": [0,1,-1,],
				"weight": [0, 1, 1]
			},
			{//Added by RAA
				"qid":"391",
				"text":"Are you disgusted by the extremely obese?",
				"answerText": ["Yes", "No"],
				"score": [-1,1]
			},
			{//Added by RAA
				"qid":"18136",
				"text":"Is it possible for full-figured (not fat) women to be equally attractive as thinner women?",
				"answerText": ["Yes", "No"],
				"score": [1,-1],
				"weight": [0.5, 0.5]
			},
			{ //Added by RAA
				"qid":"22125",
				"text":"Do you prefer?",
				"answerText": ["Slim Men/Women", "Average Men/Women", "Fuller Figured Men/Women", "I Don't Care/Not Fussy."],
				"score": [-1, -1, 1, 1],
				"weight": [0, 0, 1, 1]
			},
			{//Added by RAA
				"qid":"84391",
				"text":"Are Curves on a woman sexy?",
				"answerText": ["As long as they are curves and not corners.", "Yes, women's bodies are beautful.", "No, i prefer women to be 2 dimensional.", "Mmm... * thinking about my hands on hips..."],
				"score": [1, 1, -1, 1],
				"weight": [1, 1, 1, 1]
			}
		]
	};
