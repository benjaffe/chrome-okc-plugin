[![Stories in Ready](https://badge.waffle.io/benjaffe/chrome-okc-plugin.png?label=ready&title=Ready)](https://waffle.io/benjaffe/chrome-okc-plugin)
chrome-okc-plugin
=================

OkCupid Poly Plugin

https://chrome.google.com/webstore/detail/okc-poly-viewer/cgdblghohnaeeejaoincmbcdkdnodkei

This document is out of date...

Features:
It's really simple, and there's not much interaction. Just load up a page, and after a delay, a box will appear at the top of their profile with percentage matches for each of the questions that the plugin checks for. Roll your mouse over that box for details.

There's also a "Poly-Hide" button. If you click it, it will make all links to that profile more transparent throughout the site. That way you know if you've clicked on them and decided they're not poly-friendly BEFORE you click on their profile again. You'll see this change after you Poly-Hide someone, then browse to another profile. The previous profile will show up in the left pane, and it should be greyed out to let you know that you previously hid them. And don't worry, you can always unhide them if you change your mind. This differs somewhat from OkCupid's built-in hide button, explained below in the Geeky Details section.

If you search for matches, it will sort the results by enemy percentage. It doesn't currently re-sort by enemy when it loads more results though - I'll implement that feature soon. Also, I'll eventually implement a plugin settings page where you can enable or disable this feature and change the question categories that you care about.

Required:
Make sure that the poly-related questions are listed as Very Important or Mandatory to you in your questions tab. If they aren't, my plugin won't dive deep enough into the questions list to see them. (If OkCupid had a developer API, this wouldn't be a requirement, but they don't, so it is.) If anyone feels like writing a guide on how to get to the important questions, let me know... that'd be super helpful, since I'm already coding this in my spare time. Plus, I'm not great at writing documentation.

If the user you're viewing at doesn't have questions answered, the plugin won't be able to tell if they're poly-friendly or not. Similarly, if you haven't answered the non-monogamy-related questions, the plugin won't find them either.

My Goals:
Mainly I just want to reality-test this thing. It should work just fine, but I'd love feedback on your experience with it. Does it make OkCupid more pleasant to use for you? Does it help you in your process of choosing who to message? Does the interface make sense? Is it intuitive, or can you think of improvements? What categories would you like to see added? People have suggested trans-friendly, and 420-friendly.

Disclaimer:
The plugin is based on my preferences (poly friendly, no kids, values science, and not possessive), but whenever I have a bunch more time, I'd like to rewrite it from the ground up and make it customizable. Then it'll be useful to everyone, not just people who care about the preferences I hard-coded into it. I'm releasing this incomplete version because I've found it SUPER useful, and I want others to be able to use it too, right now.

Geeky Details:
I'm making changes all the time. If you want to update the plugin RIGHT NOW, instead of waiting for Chrome to auto-update it, go to chrome://chrome/extensions/ in Google Chrome, click the "Developer Mode" checkbox, then click "Update extensions now."
Here are the differences between OkCupid's hide button and the plugin's Poly-Hide button. The Poly-Hide feature won't stop users' thumbnails from showing up, but instead, will make them 90% transparent. The list of hidden profiles is stored locally (localStorage), so you can clear it or modify it easily if you want—that functionality hasn't been built into the plugin yet though. Also, the Poly-Hide button doesn't remove you from other users' matches, so they can still message you to be friends. Lastly, it's a bit faster because it doesn't have to hit the server.
If you want to clear the Poly-Hid Profiles list manually, right click somewhere on the page, choose Inspect Element, click on the Console tab, then type "localStorage.clear()" and press enter. Refresh the page, and no profiles should be hidden.
Just added poly-hide persistence across tabs, so things should stay in sync, and should automatically update.
Thanks, and I look forward to the feedback. Happy browsing, and happy 2013!

Ben

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/benjaffe/chrome-okc-plugin/trend.png)](https://bitdeli.com/free "Bitdeli Badge")