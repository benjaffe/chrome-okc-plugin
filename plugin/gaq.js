var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37580424-1']);
var loggedInUser = document.querySelector('#user_header .username') ? document.querySelector('#user_header .username').innerHTML : "not-signed-in";
_gaq.push(['_trackPageview',loggedInUser]);

// _gaq.push(['_trackEvent', 'PolyHide', 'Hid '+document.getElementById('ajax_gender').innerHTML]);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();