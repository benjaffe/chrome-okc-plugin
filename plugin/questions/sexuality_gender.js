//question search words: bisexual, sex, homosexual, gay, lesbian, gender
_OKCP.fileQuestions.sexuality_gender =
	{
		"bi-open": [
			{
				"qid":"1401",
				"text":"Have you ever had a sexual encounter with someone of the same sex?",
				"answerText": ["Yes, and I enjoyed myself.", "Yes, and I did not enjoy myself.", "No, and I would never.", "No, but I would like to."],
				"score": [1, 0, -1, 1],
				"weight": [1, 1, 1, 1]
			},
			{
				"qid":"46563",
				"text":"Assume you have a homosexual friend who is the same gender as you. Would it bother you if they hugged you?",
				"answerText": ["Yes.", "No.", "Only if I thought the hug was more than friendly."],
				"score": [-1, 1, -0.5],
				"weight": [1, 1, 1]
			},
			{
				"qid":"80928",
				"text":"Have you ever seriously questioned your sexuality and whether it was different from what you first assumed?",
				"answerText": ["Yes, and it changed.", "Yes, but it did not change.", "No."],
				"score": [1, -1, 1],
				"weight": [1, 0.5, 0]
			},
			{
				"qid":"35203",
				"text":"Would you consider being in a relationship with someone who has had homosexual sex?",
				"answerText": ["Yes", "No", "I'm Not Sure / Depends how serious it was"],
				"score": [1, -1, 0],
				"weight": [1, 1, 1]
			},
			{
				"qid":"6258",
				"text":"Would you date someone who is bisexual?",
				"answerText": ["Yes", "No"],
				"score": [1, -1],
				"weight": [1, 1]
			}
		],

		//transgender
		"transgender-open": [
			{
				"qid":"458539",
				"text":"How would you feel about your sexual partner having a penis? (Assume the penis is biological, i.e. not a dildo)",
				"answerText": ["Positive, regardless", "Positive only if he's a man", "Positive only if she's a woman", "Negative"],
				"score": [1, -1, 1, -1],
				"weight": [1, 1, 1, 0.5]
			},
			{
				"qid":"458541",
				"text":"How would you feel if your sexual partner had a vulva/vagina?",
				"answerText": ["Positive, regardless", "Positive only if she's a woman", "Positive only if he's a man", "Negative"],
				"score": [1,-1, 1, -1],
				"weight": [1, 1, 1, 0.5]
			},
			{
				"qid":"12949",
				"text":"Would you consider dating someone who's had a gender change?",
				"answerText": ["Yes", "No", "I'm Not Sure"],
				"score": [1, -1, 1],
				"weight": [1, 1, 0.5]
			},
			{
				"qid":"546",
				"text":"Would you date a transgender person?",
				"answerText": ["Yes", "No"],
				"score": [1, -1],
				"weight": [1, 1]
			}
		],


		"sex-positive": [
			{
				"qid": "38578",
				"text": "If you had to choose one of the following, which best describes the role of sex in your life?",
				"answerText": ["Sex is one of my favorite activities.", "Sex is something I enjoy on occasion.", "Sex is for procreation.", "Sex is a means to getting things that I want."],
				"score": [1, 0, -1, -1],
				"weight": [1, 0.5, 1, 1]
			},
			{
				"qid":"12964",
				"text":"Would you need to sleep with someone before you considered marrying them?",
				"answerText": ["Yes", "No"],
				"score": [1, -1],
				"weight": [0.2, 0.6]
			},
			{
				"qid":"86366",
				"text":"Could you have respect for someone after having sex with them on the first meeting/date?",
				"answerText": ["Yes.", "No.", "Maybe, depending upon the circumstances."],
				"score": [1, -1, 0],
				"weight": [1, 1, 0]
			},
			{
				"qid":"13",
				"text":"Is a girl who's slept with 100 guys a bad person?",
				"answerText": ["Yes", "No"],
				"score": [-1, 1],
				"weight": [1, 1]
			},
			{
				"qid":"19681",
				"text":"Are some sex acts with consenting adults inherently wrong or immoral? Assume no unusual risk of injury.",
				"answerText": ["Yes", "No"],
				"score": [-1, 1],
				"weight": [1, 1]
			},
			{
				"qid":"61903",
				"text":"Would you be concerned if your partner still masturbated, even though you were sexually active together?",
				"answerText": ["Yes", "No", "Maybe / I don't know"],
				"score": [-1, 1, 0],
				"weight": [1, 1, 1]
			},
			{
				"qid":"20976",
				"text":"You're in a new relationship and your partner admits that they have had 14 sexual partners. Does that sound like a lot to you?",
				"answerText": ["Yes, and it makes me uncomfortable.", "I guess, but It doesn't change how I feel.", "That seems like an average number.", "No, that's nothing."],
				"score": [-1, 1, 1, 1],
				"weight": [1, 1, 1, 1]
			},
			{
				"qid":"1435",
				"text":"Do you consider yourself sexually open minded?",
				"answerText": ["Yes", "No"],
				"score": [1, -1],
				"weight": [1, 1]
			},
			{
				"qid":"294",
				"text":"Which is more important for a good match?",
				"answerText": ["Having similar political beliefs", "Having good sex"],
				"score": [0, 1],
				"weight": [0, 1]
			},
			{
				"qid":"24375",
				"text":"Say you've started seeing someone you really like. As far as you're concerned, how long will it take before you have sex?",
				"answerText": ["1-2 dates", "3-5 dates", "6 or more dates", "Only after the wedding"],
				"score": [1, 1, 1, -1],
				"weight": [0, 0, 0, 1]
			},
			{//Added by RAA
				"qid":"64429",
				"text":"Are you ashamed of any of your sexual desires?",
				"answerText": ["Yes.", "No."],
				"score": [0,0],
				"weight": [1, 1]
			},
			{//Added by RAA
				"qid":"61133",
				"text":"Would you be comfortable masturbating in front of a partner?",
				"answerText": ["Yes.", "No.","I don't masturbate."],
				"score": [1,-1,-1],
				"weight": [1, 1,1]
			},
			{//Added by RAA
				"qid":"62889",
				"text":"For people who are in exclusive relationships, is masturbation a form of infidelity?",
				"answerText": ["Yes.", "No."],
				"score": [-1,1],
				"weight": [1,1]
			},
			{ // Added by RAA
				"qid":"27341",
				"text":"How does the thought of someone masturbating with you in mind make you feel?",
				"answerText": ["Shocked", "Disgusted","Flattered","Aroused"],
				"score": [-1,-1,1,1],
				"weight": [1, 1,1,1]
			},
			{
				"qid": "60852",
				"text": "Do you believe that regular sex is necessary in maintaining a healthy relationship?",
				"answerText": ["Yes.", "No."],
				"score": [1, 0],
				"weight": [1, 0.5]
			},
			{
				"qid": "18682",
				"text": "Do you think physical love is necessary for happiness in life?\n",
				"answerText": ["Yes", "No"],
				"score": [1, 0],
				"weight": [1, 0.5]
			}/*,

			{//Added by RAA
				"qid":"28",
				"text":"Would you dump someone simply because they weren't good at sex?",
				"answerText": ["Yes", "No"],
				"score": [-1, 1],
				"weight": [1, 1]
			},
			{//Added by RAA
				"qid":"1387",
				"text":"Would you ever engage in a sexual activity you didn't enjoy, just because your partner did?",
				"answerText": ["Yes", "No"],
				"score": [1,-1],
				"weight": [1, 1]
			},
			{//Added by RAA
				"qid":"22706",
				"text":"Are you totally comfortable being naked around your lover, not just during sex?",
				"answerText": ["Yes", "No"],
				"score": [1,-1],
				"weight": [1, 1]
			},
			{//Added by RAA
				"qid":"1439",
				"text":"Do you enjoy being naked?",
				"answerText": ["Yes", "No"],
				"score": [1,-1],
				"weight": [1, 1]
			},

			{ // Added by RAA
				"qid":"18759",
				"text":"How often do you wear underwear?",
				"answerText": ["Always", "Usually","Rarely","Never"],
				"score": [-1,0,1,1],
				"weight": [1, 1,1,1]
			},
			{ // Added by RAA
				"qid":"20106",
				"text":"The first time you have stayed over with a new Lover, how would you like them to wake you up?",
				"answerText": ["With tea and toast", "With a Champagne  cocktail","With words","With oral sex"],
				"score": [0, 1,0,1],
				"weight": [.2, .2,.2,.2]
			},
			{//Added by RAA
				"qid":"82263",
				"text":"Would being in the same room with a couple of friends who are having sex bother you?",
				"answerText": ["Yes.", "No."],
				"score": [-1, 1],
				"weight": [1, 1]
			},
			{//Added by RAA
				"qid":"82826",
				"text":"Would you consider dating someone who suffers from some sort of sexual dysfunction, but who still enjoys other sorts of sexual activity using hands/mouth/whatever?",
				"answerText": ["Yes.", "No.","Possibly, depending on the specifics."],
				"score": [1,-1,0],
				"weight": [1,1,1]
			},
			{ // Added by RAA
				"qid":"46817",
				"text":"Is the idea of spending the day at a nude beach appealing to you?",
				"answerText": ["Yes.", "No."],
				"score": [1, -1],
				"weight": [1, 1]
			}*/
		]
	};
