"use strict";

// node --harmony --use-strict $0
// run from plugin root
// generates .json from .js


var co = require('co'),
	fs = require('co-fs'),
	util = require('util'),
	path = require('path')
;

const PATH_QUESTIONS = path.join.apply(undefined, ". plugin questions".split(' ') );
const PATH_JSON      = path.join.apply(undefined, ". dev json".split(' ') );

var _OKCP = { fileQuestions: {} };

co( function *() {
	let files = yield fs.readdir(PATH_QUESTIONS);

	try {
		yield fs.mkdir( PATH_JSON );
	}
	catch (e) {
		if (e.code==='EEXIST'){}
		else { console.error(e) }
	}

	for ( let f = 0; f<files.length; f++ ) {
		if ( ! files[f].match(/.*\.js$/) ) {
			continue;
		}

		console.log(files[f]);

		let file_contents = yield fs.readFile( path.join(PATH_QUESTIONS, files[f]), 'utf8' );

		eval(file_contents);

		yield fs.writeFile(
			path.join(PATH_JSON, files[f])
			, JSON.stringify(_OKCP.fileQuestions, null, 2)
		);
	}
} )();
		
		//console.log(__file_header());
		//console.log(__file_footer());

