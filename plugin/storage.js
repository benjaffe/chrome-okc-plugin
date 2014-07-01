/// This is only temporary, for historical reasons.
_OKCP.storage = function(key, value) {
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
 * Call once when the plugin is loaded.
 * Will initialize storage, perform migrations, etc.
 */
_OKCP.storage.init = function() {

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
	_change_handlers: [],
	/**
	 * Register an event handler for when a profile is updated.
	 * @param handler The function to call.
	 * 
	 * The callback should be in the form of:
	 * function(profile, changed):
	 *  * profile: the profile that changed
	 *  * changed: An object mapping field names to {old: ..., new: ...} objects
	 * 
	 * No guarentees are made about collation or frequency of changed events.
	 */
	changed: function(handler) {
		this._change_handlers.push(handler);
	},
	_on_localstorage_event: function(e) {
		/* TODO:
		1. Unspool old and new values
		2. Iterate through the profiles in new:
		   1. check each value against old, making changed object
		   2. Call all the handlers with the profile and changed value
		*/
	}
};

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
	 *  * changed: An object mapping field names to {old: ..., new: ...} objects
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
	}
};