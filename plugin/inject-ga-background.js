
var ga_config_file = 'ga-config.js';
// Keep an copy of ga.js in your extension, in case that the user
//  does not have an internet connection, etc.
var ga_code_file = 'ga.js';

// Retrieve a previously saved copy, if available
var ga_code = localStorage.getItem('ga_code') || '';
var ga_url = 'https://ssl.google-analytics.com/ga.js';

var updateInterval = 2 * 60 * 60 * 1000; // Updates every 2 hours

function updateGA() {
    var x = new XMLHttpRequest();
    x.onload = function() {
        if (x.status == 200) {
            console.log('Retrieved file. Size: ' + x.responseText.length);
            ga_code = x.responseText;
            // Cache code
            localStorage.setItem('ga_code', ga_code);
        } else console.log('Error retrieving ga.js; Status code ' + x.status);
        if (updateInterval)  setTimeout(updateGA, updateInterval);
    };
    x.onerror = function() {
        console.log('Error retrieving ga.js');
        if (updateInterval)  setTimeout(updateGA, updateInterval);
    };
    x.open('GET', ga_url);
    x.send();
}
// Trigger
updateGA();

chrome.extension.onRequest.addListener(function(request, sender) {
    if (request === 'INJECT_GA' && sender.tab) {
        chrome.tabs.executeScript(sender.tab.id, {file: ga_config_file});
        if (ga_code) {
            chrome.tabs.executeScript(sender.tab.id, {code: ga_code});
        } else {
            chrome.tabs.executeScript(sender.tab.id, {file: ga_code_file});
        }
    }
});