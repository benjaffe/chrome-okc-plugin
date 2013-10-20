//question search words: smoke, smokes, cigarette, cigarettes, cigar, cigars, tobacco, marijuana, weed, pot, drug, drugs
fileQuestions.drugs_smokes =
	[
		//non_smoker
		{
			"qid":"501",
			"text":"Have you smoked a cigarette in the last 6 months?",
			"category": "non_smoker",
			"answerText": ["Yes", "No"],
			"score": [-1, 1]
		},
		{
			"qid":"13006",
			"text":"Would you go out with a smoker?",
			"category": "non_smoker",
			"answerText": ["Yes", "Yes, but only an occasional/social smoker","No"],
			"score": [-0.5, 0, 1],
			"weight": [0.7, 0.2, 1]
		},
		{
			"qid":"80621",
			"text":"How often do you smoke cigars?",
			"category": "non_smoker",
			"answerText": ["Frequently.", "Occasionally.", "Never."],
			"score": [-1, -1, 1]
		},

		//smoker
		{
			"qid":"501",
			"text":"Have you smoked a cigarette in the last 6 months?",
			"category": "smoker",
			"answerText": ["Yes", "No"],
			"score": [1, -1]
		},
		{
			"qid":"13006",
			"text":"Would you go out with a smoker?",
			"category": "smoker",
			"answerText": ["Yes", "Yes, but only an occasional/social smoker","No"],
			"score": [1, 1, -1],
			"weight": [0.7, 0.5, 1]
		},
		{
			"qid":"80621",
			"text":"How often do you smoke cigars?",
			"category": "smoker",
			"answerText": ["Frequently.", "Occasionally.", "Never."],
			"score": [1, 1, -1]
		},

		// cigars / tobacco
		
		{
			"qid":"81504",
			"text":"Do you chew tobacco?",
			"category": "drugs",
			"wrongAnswers":["Yes."]
		},
		
		//marijuana
		{
			"qid":"79",
			"text":"What's your relationship with marijuana?",
			"category": "drugs",
			"wrongAnswers":["I smoke regularly.", "I smoke occasionally."]
		},
		{
			"qid":"62254",
			"text":"If it were legal to do so where you live, would you smoke marijuana?",
			"category": "drugs",
			"wrongAnswers":["Yes."]
		},
		
		//alcohol
		{
			"qid":"23954",
			"text":"Do you ever feel the need to get really drunk?",
			"category": "drugs",
			"wrongAnswers":["Often","Sometimes","Rarely"]
		},
		{
			"qid":"8155",
			"text":"On average, which best describes how often you GET WICKED DRUNK?",
			"category": "drugs",
			"wrongAnswers":["Once every month or three.","Weekly / Bi-Weekly","Twice a week or more"]
		},
		{
			"qid":"77",
			"text":"How frequently do you drink alcohol?",
			"category": "drugs",
			"wrongAnswers":["Sometimes","Very often"]
		},
		{
			"qid":"84023",
			"text":"Could you live the rest of your life without drinking alcohol?",
			"category": "drugs",
			"wrongAnswers":["No."]
		},

		//other drugs/addictions
		{
			"qid":"82566",
			"text":"Do you like coffee?",
			"category": "drugs",
			"wrongAnswers":["Yes. I need it to function."]
		},
		{
			"qid":"38051",
			"text":"How often do you gamble?",
			"category": "drugs",
			"wrongAnswers":["Often.","Rarely."]
		},

		//harder drugs
		{
			"qid":"80",
			"text":"What's your deal with harder drugs (stuff beyond pot)?",
			"category": "drugs",
			"wrongAnswers":["I do drugs regularly.", "I do drugs occasionally."]
		},
		{
			"qid":"9688",
			"text":"Could you date someone who does drugs?",
			"category": "drugs",
			"wrongAnswers":["Yes", "Yes, but only soft stuff like marijuana"]
		},
		{
			"qid":"25228",
			"text":"Do you think drug use with your partner can be a romantic activity?",
			"category": "drugs",
			"wrongAnswers":["Yes"]
		},
		{
			"qid":"15414",
			"text":"Have you used psychedelic drugs (LSD, mescaline, peyote, etc.) or would you like to?",
			"category": "drugs",
			"wrongAnswers":["Yes, I have used psychedelic drugs.", "No, I have not used them but I would try them."]
		},
	];
