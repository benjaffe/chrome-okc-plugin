// dev mode toggle
if (!!localStorage.devMode && JSON.parse(localStorage.devMode) === true)
	_OKCP.devmode = true;


if (_OKCP.debugTimerEnabled) {_OKCP.debugTimer = new Date();}

_OKCP.initDevMode = function(){
	log.enableAll();
	$('html').addClass('devmode');
	_OKCP.cacheEnabled = false;
	log.info('dev mode enabled, cache disabled');

	//Chuck dev tools
	var actions = {
		set: function(pathString,value) {
			var path = pathString.split('.');
			for(var i=0,curr=window,key; i<path.length-1; i++) {
				key = path[i];
				curr = curr[key];
				if(!curr) curr = curr[i] = {};
			}
			curr[path[path.length-1]] = value;
			return value;
		},
		get: function(pathString) {
			var path = pathString.split('.');
			for(var i=0,curr=window,key; i<path.length; i++) {
				if(!curr) throw "Error! Can't get property on "+key+", which is undefined. Attempted get path was "+pathString;
				key = path[i];
				curr = curr[key];
			}
			return curr;
		},
		run: function(funcAsString) {
			return (eval('('+funcAsString+')'))();
		},
		eval: function(str) {
			return eval(str);
		}
	};


	window.addEventListener('message',function(evt) {
		if(!evt.data._isForOKCPInterface) return;
		var data = event.data,
				action = data.action,
				args = data.args,
				func = actions[action];
		var returnedValue = func.apply(window,args);
		console.log(returnedValue);
	});



	var script = document.createElement('script');
	script.innerHTML =
		'var _OKCPInterface = {'+
		'  set: function(path,value) {'+
		'    return this.go("set",path,value);'+
		'  },'+
		'  get: function(path) {'+
		'    return this.go("get",path);'+
		'  },'+
		'  run: function(func) {'+
		'    return this.go("run",func.toString());'+
		'  },'+
		'  eval: function(str) {'+
		'    return this.go("eval",str);'+
		'  },'+
		'  go: function(action) {'+
		'    for(var i=1, args=[]; i<arguments.length; i++) args[i-1]=arguments[i];'+
		'    window.postMessage({ _isForOKCPInterface: true, action:action, args:args },"*");'+
		'    return "";'+
		'  }'+
		'}; Ben = _OKCPInterface;';
	document.body.appendChild(script);



	var cons = {
		input: document.createElement('input'),
		history: "1 2 3 4 5 6 7 8 9 10".split(' '),
		currentHistoryIndex: -1,
		init: function() {
			var that = this;
			this.input.onkeydown = function(e) { that.keydown(e); };
			this.input.style.cssText = "position:fixed; left:0px; bottom:0px; width:100%; z-index:100000;";
			document.body.appendChild(this.input);
		},
		keydown: function(e) {
			var key = e.which;
			if(     key===13) this.enterKey();
			else if(key===38) this.upKey();
			else if(key===40) this.downKey();
			else this.saveTempTyping();
		},
		enterKey: function() {
			var line = this.input.value;
			this.save(line);
			this.clear();
			this.run(line);
		},
		upKey: function() {
			if(this.currentHistoryIndex>=this.history.length-1) return;
			this.currentHistoryIndex++;
			this.restore(this.history[this.currentHistoryIndex]||'');
		},
		downKey: function() {
			if(this.currentHistoryIndex<=-1) return;
			this.currentHistoryIndex--;
			this.restore(this.history[this.currentHistoryIndex]||this.tempTyping||'');
		},
		run: function(line) {
			var ret = eval(line);
			console.log(ret);
		},
		save: function(line) {
			this.currentHistoryIndex = -1;
			this.history.unshift(line);
		},
		restore: function(line) {
			this.input.value = line;
		},
		saveTempTyping: function() {
			this.tempTyping = this.input.value;
		},
		clear: function() {
			this.input.value = "";
			this.tempTyping = "";
		}
	};
	cons.init();





};

// Space for testing new features



