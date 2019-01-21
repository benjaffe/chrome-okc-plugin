//question search words: smoke, smokes, cigarette, cigarettes, cigar, cigars, tobacco, marijuana, weed, pot, drug, drugs
_OKCP.fileQuestions.drugs_smokes =
	{
		"non_smoker": [
			{
				"qid":"501",
				"text":"Have you smoked a cigarette in the last 6 months?",
				"answerText": ["Yes", "No"],
				"score": [-0.5, 0.8]
			},
			{
				"qid":"13006",
				"text":"Would you go out with a smoker?",
				"answerText": ["Yes", "Yes, but only an occasional/social smoker","No"],
				"score": [-0.5, 0, 1],
				"weight": [0.7, 0.2, 1]
			},
			{
				"qid":"80621",
				"text":"How often do you smoke cigars?",
				"answerText": ["Frequently.", "Occasionally.", "Never."],
				"score": [-1, -1, 1]
			},
			{
				"qid": "13054",
				"text": "What do you think of laws that make smoking illegal in bars and restaurants?",
				"answerText": ["I support the laws", "I oppose the laws"],
				"score": [1, 1],
				"weight": [1, 0]
			},
			{
				"qid": "87",
				"text": "Is smoking disgusting?",
				"answerText": ["Yes", "No"],
				"score": [1, -1],
				"weight": [1, 1]
			}
		],

		"smoker": [
			{
				"qid":"501",
				"text":"Have you smoked a cigarette in the last 6 months?",
				"answerText": ["Yes", "No"],
				"score": [1, -1]
			},
			{
				"qid":"13006",
				"text":"Would you go out with a smoker?",
				"answerText": ["Yes", "Yes, but only an occasional/social smoker","No"],
				"score": [1, 1, -1],
				"weight": [0.7, 0.5, 1]
			},
			{
				"qid":"80621",
				"text":"How often do you smoke cigars?",
				"answerText": ["Frequently.", "Occasionally.", "Never."],
				"score": [1, 1, -1]
			},
			{
				"qid": "13054",
				"text": "What do you think of laws that make smoking illegal in bars and restaurants?",
				"answerText": ["I support the laws", "I oppose the laws"],
				"score": [-1, 1],
				"weight": [1, 0]
			},
			{
				"qid": "87",
				"text": "Is smoking disgusting?",
				"answerText": ["Yes", "No"],
				"score": [-1, 1],
				"weight": [1, 1]
			}
		],

		"not_420_friendly": [
			{
				"qid":"79",
				"text":"What's your relationship with marijuana?",
				"answerText": ["I smoke regularly.", "I smoke occasionally.", "I smoked in the past, but no longer.", "Never."],
				"score": [-1, -0.8, 1, 1]
			},
			{
				"qid":"62254",
				"text":"If it were legal to do so where you live, would you smoke marijuana?",
				"answerText": ["Yes.", "No."],
				"score": [-1, 1]
			}
		],

		"420_friendly": [
			{
				"qid":"79",
				"text":"What's your relationship with marijuana?",
				"answerText": ["I smoke regularly.", "I smoke occasionally.", "I smoked in the past, but no longer.", "Never."],
				"score": [1, 1, -0.5, -1]
			},
			{
				"qid":"62254",
				"text":"If it were legal to do so where you live, would you smoke marijuana?",
				"answerText": ["Yes.", "No."],
				"score": [1, -1]
			}
		],

		"no_alcohol": [
			{
				"qid":"23954",
				"text":"Do you ever feel the need to get really drunk?",
				"answerText": ["Often", "Sometimes", "Rarely", "Never"],
				"score": [-1, -0.8, 0, 1]
			},
			{
				"qid":"8155",
				"text":"On average, which best describes how often you GET WICKED DRUNK?",
				"answerText": ["Twice a week or more", "Weekly / Bi-Weekly", "Once every month or three.", "Seldom or never."],
				"score": [-1, -0.8, 0.1, 1]
			},
			{
				"qid":"77",
				"text":"How frequently do you drink alcohol?",
				"answerText": ["Very often", "Sometimes", "Rarely", "Never"],
				"score": [-1, -1, 0.3, 1]
			},
			{
				"qid":"84023",
				"text":"Could you live the rest of your life without drinking alcohol?",
				"answerText": ["Yes.", "No."],
				"score": [1, -1]
			},
			{
				"qid": "78",
				"text": "Generally, do you enjoy being drunk?",
				"answerText": ["Yes", "No", "I don't know, because I've never been drunk."],
				"score": [-1, 1, 1]
			}
		],

		"alcohol": [
			{
				"qid":"23954",
				"text":"Do you ever feel the need to get really drunk?",
				"answerText": ["Often", "Sometimes", "Rarely", "Never"],
				"score": [1, 0.8, 0, -1]
			},
			{
				"qid":"8155",
				"text":"On average, which best describes how often you GET WICKED DRUNK?",
				"answerText": ["Twice a week or more", "Weekly / Bi-Weekly", "Once every month or three.", "Seldom or never."],
				"score": [1, 0.8, 0.2, -1]
			},
			{
				"qid":"77",
				"text":"How frequently do you drink alcohol?",
				"answerText": ["Very often", "Sometimes", "Rarely", "Never"],
				"score": [1, 1, 0, -1]
			},
			{
				"qid":"84023",
				"text":"Could you live the rest of your life without drinking alcohol?",
				"answerText": ["Yes.", "No."],
				"score": [-1, 1]
			},
			{
				"qid": "78",
				"text": "Generally, do you enjoy being drunk?",
				"answerText": ["Yes", "No", "I don't know, because I've never been drunk."],
				"score": [1, -1, -1]
			}
		],

		"no_other_addictions": [
			{
				"qid":"82566",
				"text":"Do you like coffee?",
				"answerText": ["Yes.  I need it to function.", "Yes, but I can do without it.", "No."],
				"score": [-1, 0, 1],
				"weight": [1, 0, 1]
			},
			{
				"qid":"81504",
				"text":"Do you chew tobacco?",
				"answerText": ["Yes.", "No."],
				"score": [-1, 1]
			},
			{
				"qid":"38051",
				"text":"How often do you gamble?",
				"answerText": ["Often.", "Rarely.", "Never."],
				"score": [-1, 0, 1]
			}
		],

		"coffee": [
			{
				"qid":"82566",
				"text":"Do you like coffee?",
				"answerText": ["Yes.  I need it to function.", "Yes, but I can do without it.", "No."],
				"score": [1, 1, -1]
			},
			{
				"qid": "90809",
				"text": "How do you take your coffee?",
				"answerText": ["Black", "With cream and/or sugar", "A venti caramel soy macchiato ...", "Put that coffee down! Coffee is for closers only."],
				"score": [1, 1, 1, -1]
			}
		],

		"no_coffee": [
			{
				"qid":"82566",
				"text":"Do you like coffee?",
				"answerText": ["Yes.  I need it to function.", "Yes, but I can do without it.", "No."],
				"score": [-1, 0, 1]
			},
			{
				"qid": "90809",
				"text": "How do you take your coffee?",
				"answerText": ["Black", "With cream and/or sugar", "A venti caramel soy macchiato ...", "Put that coffee down! Coffee is for closers only."],
				"score": [-1, -1, -1, 1]
			}
		],

		"no_harder_drugs": [
			{
				"qid":"80",
				"text":"What's your deal with harder drugs (stuff beyond pot)?",
				"answerText": ["I do drugs regularly.", "I do drugs occasionally.", "I've done drugs in the past, but no longer.", "I never do drugs."],
				"score": [-1, -1, 1, 1],
				"weight": [1, 1, 0.5, 1]
			},
			{
				"qid":"9688",
				"text":"Could you date someone who does drugs?",
				"answerText": ["No", "Yes, but only soft stuff like marijuana", "Yes"],
				"score": [1, 1, -1],
				"weight": [1, 1, 0.5]
			},
			// { //it's ambiguous what kinds of drugs this is talking about... skipping it for now
			//	"qid":"25228",
			//	"text":"Do you think drug use with your partner can be a romantic activity?",
			//	"answerText": ["Yes", "No"],
			//	"score": [-1, 1],
			//	"weight": [0.5, 0.5]
			// },
			{
				"qid":"15414",
				"text":"Have you used psychedelic drugs (LSD, mescaline, peyote, etc.) or would you like to?",
				"answerText": ["Yes, I have used psychedelic drugs.", "No, I have not used them and I would not try them.", "No, I have not used them but I would try them."],
				"score": [-1, 1, -1]
			}
		]
	};
