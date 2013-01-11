
// create a database if there isn't one
if (localStorage.okcp === undefined) {
	localStorage.okcp = JSON.stringify({
		dataModelVersion:'1.1.0',
		profileList: {}
	});
}

// upgrade data model if needed
if (JSON.parse(localStorage.okcp).hiddenProfileList !== undefined) {
	localStorage.okcp_b130110 = localStorage.okcp; // backup
	var oldData = JSON.parse(localStorage.okcp);
	var newData = {
		'dataModelVersion': '1.1.0',
		'profileList': {}
	};
	for (i=0; i < oldData.hiddenProfileList.length; i++) {
		newData.profileList[oldData.hiddenProfileList[i]] = {h:true}
	}
	localStorage.okcp = JSON.stringify(newData);
	console.log('Updated Data Model to Version 1.1.0');
}


// default questions
localStorage.okcpDefaultQuestions = JSON.stringify([
	//poly
	{
		qid:"52827", //Would you consider connecting with someone whose relationship status is 'seeing someone' or 'married'?
		category: "poly",
		answers:[],
		conclusiveAnswers:[],
		wrongAnswers:["No to both","Yes to 'married' only"]
	},
	{
		qid:"325", //Would you consider having an open relationship (i.e., one where you can see other people)?
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"1128", //Would you date someone who was already in a committed relationship with someone else?
		category: "poly",
		wrongAnswers:["Yes, even in secret.","No, it's wrong.","No, but I don't think it's inherently wrong."]
	},
	{
		qid:"16371", //Someone in an open relationship asks you out on a date. You:
		category: "poly",
		wrongAnswers:["Refuse / Aren't interested in open relationships."]
	},
	{
		qid:"33107", //Would you consider being part of a commited polyamorous relationship - ie, three or more people but no sex outside the group?
		category: "poly",
		wrongAnswers:["I am commited to total monogamy"]
	},
	{
		qid:"41242", //Your significant other is traveling and has the opportunity to stay with a good friend that you know they find to be very attractive. What's your stance on the situation?
		category: "poly",
		wrongAnswers:["It would be totally unacceptable."]
	},
	{
		qid:"48278", //Would you consider dating someone who is already involved in an open or polyamorous relationship?
		category: "poly",
		wrongAnswers:["No."]
	},
	{
		qid:"44540", //If you were in a serious relationship, would you mind if your significant other maintained an active profile on OkCupid?
		category: "poly",
		wrongAnswers:["Yes - I would mind this."]
	},
	{
		qid:"1121", //Have you ever had multiple romantic partners during the same time period?
		category: "poly",
		wrongAnswers:["Yes, and I didn't tell at least one of them."]
	},
	//posessive
	{
		qid:"784", //Would you be okay with your significant other spending a lot of time with one of his/her exes (as a friend)?
		category: "notPosessive",
		wrongAnswers:["No"]
	},
	//science
	{
		qid:"612", //Should evolution and creationism be taught side-by-side in schools?
		category: "science",
		wrongAnswers:["No, evolution has no place in schools", "Yes, students should hear both sides"]
	},
	{
		qid:"15889", //Do you put more weight in science or faith?
		category: "science",
		wrongAnswers:["Faith","Equally in both"]
	},
	//children
	{
		qid:"80041", //Are you looking for a partner to have children with?
		category: "children",
		wrongAnswers:["Yes"]
	}
]);