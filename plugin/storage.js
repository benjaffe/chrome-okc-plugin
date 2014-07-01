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
	 * @return A promise when the operation complete.
	 */
	set: function(profile, data) {
		return new Promise(function(resolve, reject) {
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
	}
}