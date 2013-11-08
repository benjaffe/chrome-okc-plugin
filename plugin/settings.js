_OKCP.settings = function(setting, value) {
	var settingsObj = JSON.parse(localStorage.okcpSettings);

	if (value) {
		settingsObj[setting] = value;
		localStorage.okcpSettings = JSON.stringify(settingsObj);
		return value;
	}
	else {
		return settingsObj[setting]
	}
}