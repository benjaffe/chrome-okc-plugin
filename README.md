chrome-okc-plugin
=================

OkCupid Poly Plugin

FYI, the questions the plugin is currently looking at are:

http://www.okcupid.com/questions?rqid=52827
http://www.okcupid.com/questions?rqid=325
http://www.okcupid.com/questions?rqid=1128
http://www.okcupid.com/questions?rqid=16371
http://www.okcupid.com/questions?rqid=33107
http://www.okcupid.com/questions?rqid=41242
http://www.okcupid.com/questions?rqid=48278
http://www.okcupid.com/questions?rqid=44540
http://www.okcupid.com/questions?rqid=1121
http://www.okcupid.com/questions?rqid=784
http://www.okcupid.com/questions?rqid=612
http://www.okcupid.com/questions?rqid=15889
http://www.okcupid.com/questions?rqid=80041



Hellooo my lovely beta testers! All 68 of you! For the lazy, I've bolded the most important parts of this email.

I've been hard at work optimizing the plugin, and version 1.1.0 is finally out. You should notice it's much snappier, especially when you've recently visited the person's profile. It's also using a proper observer system (Knockout.JS for the geeks), so hidden profiles should stay up-to-date better. The interface is the same... it's just faster and more reliable.

After the extension updates itself to version 1.1.0, it will disable itself. You'll have to re-enable it manually. I had to tweak the manifest file to get things to work, so it's now complaining about needing more permissions. 

To re-enable the plugin, open Chrome, click Window - Extensions. Then, scroll down to "OkC Poly Viewer 1.1.0" and click the "Enable" checkbox.

I'd love feedback from any or all of you. Here are my questions:

* Has this plugin made OkCupid nicer or easier for you to use?
* Does the plugin make sense? Is it intuitive? If not, do you have any suggestions?
* Do you want to see any other categories aside from poly, notPosessive, science, and children? Someone suggested trans-friendly and gay-friendly.
* If you want me to add a category, would you be willing to help me figure out which questions would indicate if someone fits in that category or not?

I've attached the most recent draft of the welcome email below, if anyone wants more information or the plugin link.

Thanks, and I hope the plugin is as useful for you as it has been for me!
Ben



Hey everyone, thanks for the PMs and for joining the beta group (now 68 people, plus me). Please give this whole email a read so you know what to expect.

Here's the link for the browser plugin:
https://chrome.google.com/webstore/detail/okc-poly-viewer/cgdblghohnaeeejaoincmbcdkdnodkei

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
