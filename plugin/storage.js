/// This is only temporary, for historical reasons.
_OKCP.storage = function(key, value) {
	console.warn("Use of old _OKCP.storage()")
	console.trace();
    if (arguments.length === 0) {
        return JSON.parse(localStorage.okcp);
    } else if (arguments.length === 1) {
        return JSON.parse(localStorage.okcp)[key];
    }
    var storage = JSON.parse(localStorage.okcp);
    storage[key] = value;
    localStorage.okcp = JSON.stringify(storage);
    return value;
};

/**
 * Call once, when the plugin is loaded.
 * Will initialize storage, perform migrations, etc.
 */
_OKCP.storage.init = function() {
	if (!localStorage.okcp) {
		localStorage.okcp = JSON.stringify({
			"dataModelVersion": "1.1.40",
			"profileList": {},
			"settings": {}
		});
	}
};

/*
Cache, Local, and Synced
Cache: The profile/question DB (IndexDB?)
Local: None
Sync: global settings and per-profile settings
*/

/// Synced profile storage
_OKCP.storage.profiles = {
	/**
	 * Gets an object from profile storage.
	 * @param profile The profile to get
	 * @param fields Optional. An array of properties to retrieve.
	 * @return A promise.
	 *
	 * The returned promise will yield an object, matching the object in 
	 * storage. If fields is given, the object will only contain those fields.
	 * If the profile was not in storage, the promise will yield undefined.
	 */
	// XXX: Is it better to resolve with undefined or reject when there is no profile?
	get: function(profile, fields) {
		if (typeof fields == "string") {
			// fields was not an array
			console.warn("fields was a single string, not an array");
			fields = [fields];
		}
		return new Promise(function(resolve, reject) {
			// OkCupid localStorage method
			var profile = JSON.parse(localStorage.okcp).profileList[profile];
			if (profile == undefined) {
				resolve(profile);
				return;				
			} else if (fields == undefined) {
				resolve(profile);
				return;
			}
			var fixed = {};
			fields.forEach(function(f) {
				fixed[f] = profile[f];
			});
			resolve(fixed);
		});
	},
	/**
	 * Updates an object in profile storage.
	 * @param profile The profile to update
	 * @param data The attributes & values to update in the store.
	 * @return A promise when the operation completes.
	 */
	set: function(profile, data) {
		return new Promise(function(resolve, reject) {
			// OkCupid localStorage method
			var storage = JSON.parse(localStorage.okcp);
			var profile = storage.profileList[profile];
			if (profile == undefined) {
				profile = storage.profileList[profile] = {};
			}
			for (var prop in data) {
				profile[prop] = data[prop];
			}
			localStorage.okcp = JSON.stringify(storage);
			resolve();
		});
	},
	/**
	 * Allows processing over the entire profile database.
	 * @param body Callback of the form function(profile, data){}
	 * @return A promise that will resolve after the loop completes.
	 *
	 * Remember that all operations may be asyncronous, so the body may be 
	 * called later. However, the body will not be called again after the promise
	 * resolves.
	 */
	each: function (body) {
		return new Promise(function(resolve, reject) {
			// OkCupid localStorage method
			var storage = JSON.parse(localStorage.okcp);
			for (var profile in storage.profileList) {
				body(profile, storage.profileList[profile]);
			}
			resolve();
		});
	},
	_change_handlers: [],
	/**
	 * Register an event handler for when a profile is updated.
	 * @param handler The function to call.
	 * 
	 * The callback should be in the form of:
	 * function(profile, changed):
	 *  * profile: the profile that changed
	 *  * changed: An object mapping field names to {oldValue: ..., newValue: ...} objects
	 * 
	 * No guarentees are made about collation or frequency of changed events.
	 */
	changed: function(handler) {
		this._change_handlers.push(handler);
	},
	_on_localstorage_event: function(e) {
		if (e.key != 'okcp')
			return;
		// 1. Unspool 
		var odata, ndata;
		if (e.oldValue) {
			odata = JSON.parse(e.oldValue);
		} else {
			odata = {profileList: {}}; // Dummy empty data
		}
		ndata = JSON.parse(e.newValue);
		// 2. Iterate the profiles in newValue
		for (var profile in ndata.profileList) {
			// 3. Check each value, generating the changed object
			var changed = {};
			if (odata.profileList[profile]) {
				// Compare profile data to produce change data
				var oprof = odata.profileList[profile];
				var nprof = ndata.profileList[profile];
				// FIXME: Is there a way to condense these loops?
				for (var prop in nprof) {
					if (nprof[prop] != oprof[prop]) {
						changed[prop] = {newValue: nprof[prop], oldValue: oprof[prop]};
					}
				}
				// Iterate over the old one to grab deleted values
				for (var prop in oprof) {
					if (nprof[prop] != oprof[prop]) {
						changed[prop] = {newValue: nprof[prop], oldValue: oprof[prop]};
					}
				}
			} else {
				changed = ndata.profileList[profile];
			}

			// 4. Call all the event handlers
			if (changed) {
				for (var i in _OKCP.storage.profiles._change_handlers) {
					// Use setTimeout() to decouple those event handlers from the current handler.
					window.setTimeout(_OKCP.storage.profiles._change_handlers[i], 0, profile, changed);
				}
			}
		}
	}
};
window.addEventListener("storage", _OKCP.storage.profiles._on_localstorage_event, false);

/// Synced setting storage (also used for internal global state)
_OKCP.storage.settings = {
	/**
	 * Gets values from setting storage.
	 * @param fields An array of settings to retrieve.
	 * @return A promise.
	 *
	 * The returned promise will yield an object, whose attributes match those 
	 * requested. If a requested value is not in storage, it will be missing.
	 */
	get: function(fields) {
		if (typeof fields == "string") {
			// fields was not an array
			console.warn("fields was a single string, not an array");
			fields = [fields];
		}
		return new Promise(function(resolve, reject) {
			// OkCupid localStorage method
			// Some values are stored in the top level, while others are stored in a settings object
			var stored = JSON.parse(localStorage.okcp);
			var data = {};
			fields.forEach(function(f) {
				if (stored[f] != undefined) {
					data[f] = stored[f];
				} else if (stored.settings[f] != undefined) {
					data[f] = stored.settings[f];
				}
			});
			resolve(data);
		});
	},
	/**
	 * Updates values in setting storage.
	 * @param data The attributes & values to update in the store.
	 * @return A promise when the operation completes.
	 */
	set: function(profile, data) {
		return new Promise(function(resolve, reject) {
			// OkCupid localStorage method
			var storage = JSON.parse(localStorage.okcp);
			for (var f in data) {
				// XXX: Should we have an explicit of what goes where?
				if (stored[f] != undefined) {
					stored[f] = data[f];
				} else {
					stored.settings[f] = data[f];
				}
			}
			localStorage.okcp = JSON.stringify(storage);
			resolve();
		});
	},
	_change_handlers: [],
	/**
	 * Register an event handler for when a profile is updated.
	 * @param handler The function to call.
	 * 
	 * The callback should be in the form of:
	 * function(changed):
	 *  * changed: An object mapping field names to {oldValue: ..., newValue: ...} objects
	 * 
	 * No guarentees are made about collation or frequency of changed events.
	 */
	changed: function(handler) {
		this._change_handlers.push(handler);
	},
	_on_localstorage_event: function(e) {
		/* TODO:
		1. Unspool old and new values
		2. Iterate through global values:
		   1. Check that it's not settings or profileList
		   2. check each value against old, making changed object
		3. Iterate through settings values:
		   1. check each value against old, making changed object
		4. Call each handler with changed object
		*/
		if (e.key != 'okcp')
			return;
		// 1. Unspool 
		var odata, ndata;
		if (e.oldValue) {
			odata = JSON.parse(e.oldValue);
		} else {
			odata = {settings: {}}; // Dummy empty data
		}
		ndata = JSON.parse(e.newValue);
		var changed = {};
		// FIXME: This makes the assumption that values don't move between global and settings.
		// 2. Iterate through global values
		for (var val in ndata) {
			if (val == 'dataModelVersion' ||
				val == 'profileList' ||
				val == 'settings')
				break;
			if (ndata[val] != odata[val]) {
				changed[val] = {newValue: ndata[val], oldValue: odata[val]};
			}
		}
		for (var val in odata) { // Catch deleted values
			if (val == 'dataModelVersion' ||
				val == 'profileList' ||
				val == 'settings')
				break;
			if (ndata[val] != odata[val]) {
				changed[val] = {newValue: ndata[val], oldValue: odata[val]};
			}
		}
		// 3. Iterate through settings values
		var oset = odata.settings, nset = ndata.settings;
		for (var val in nset) {
			if (nset[val] != oset[val]) {
				changed[val] = {newValue: nset[val], oldValue: oset[val]};
			}
		}
		for (var val in oset) { // Catch deleted values
			if (nset[val] != oset[val]) {
				changed[val] = {newValue: nset[val], oldValue: oset[val]};
			}
		}
		// 4. Call all the event handlers
		if (changed) {
			for (var i in _OKCP.storage.profiles._change_handlers) {
				// Use setTimeout() to decouple those event handlers from the current handler.
				window.setTimeout(_OKCP.storage.profiles._change_handlers[i], 0, changed);
			}
		}
	}
};
window.addEventListener("storage", _OKCP.storage.settings._on_localstorage_event, false);