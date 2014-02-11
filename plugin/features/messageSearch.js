_OKCP.messageSearch = function() {
    var twoWeeksInMilliseconds = (1000*60*60*24*14);
    var messages = _OKCP.storage('messages');
    var indexMessagesNow = (_OKCP.storage('messagesIndexed') + twoWeeksInMilliseconds) < new Date().getTime(); //reindex every two weeks
    var pageMailbox = $('#p_mailbox').length > 0;
    var hasNeverMessaged = $('#actions .tooltip_text .fancydate').length === 0;

    if (hasNeverMessaged) {
        return false;
    }

    if (!messages) {
        indexMessagesNow = true;
    } else {
        _OKCP.addMessageLinkUI(); //add UI if messages exists
    }

    if (indexMessagesNow) {
        //set the messagesIndexed date to two weeks before, plus 5 minutes. That way, if the indexing fails or gets cut short, it'll try again 5 mins from now
        _OKCP.storage('messagesIndexed', new Date().getTime()-twoWeeksInMilliseconds+60*5);

        console.log('Indexing messages');
        $('<iframe src="http://www.okcupid.com/messages"></iframe>').appendTo('body').load(function(){
            _OKCP.indexMessages($(this.contentDocument));
        });
        $('<iframe src="http://www.okcupid.com/messages?folder=2"></iframe>').appendTo('body').load(function(){
            _OKCP.indexMessages($(this.contentDocument));
        });
    }
};

_OKCP.addMessageLinkUI = function() {
    // don't run this if a match has already been found
    var messages = _OKCP.storage('messages');
    var messageLinkUI = $('.btn-previous-messages');
    if (messageLinkUI.length !== 0) {
        return false;
    }

    messageLinkUI = $('<a href="#" class="btn-previous-messages">View Previous Messages</a>').hide();
    $('.trigger_action_options_wrapper')
        .before(messageLinkUI) //add the new UI element
        .prevAll('.large_black') //get the message-user button
        .addClass('btn-previous-messages-previous-sibling-needs-a-nudge-up');


    //loop through messages to find a match
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].u === $('#basic_info_sn').text()) {
            var message = messages[i];
            var date = new Date(message.d);
            var readableDate = (date.getMonth()+1) + '/' + date.getDay() + '/' + date.getFullYear();

            messageLinkUI.attr('href', message.l);
            messageLinkUI.show();
        }
    }
};

_OKCP.indexMessages = function(elem) {
    if (!elem) elem = document;
    var urls = _OKCP.getPaginationUrls($(elem).find('#p_mailbox .count .last'), 30); //get the list of URLs to load
    var dataElem = _OKCP.loadUrlsIntoElem(urls, '#messages .thread', function(pageResultsDiv){
        // console.log('All done loading the pages!');
        // console.log(pageResultsDiv);
        var threads = [];
        var threadElemList = $(pageResultsDiv).find('.thread');
        threadElemList.each(function() {
            var username = this.querySelector('.subject').innerText;
            username = username.split(' ').pop();
            var thread = {
                u: username, //username
                l: this.querySelector('.open').href, //link
                d: Math.round(this.querySelector('.fancydate').id.split('fancydate_')[1] / 1000) //date
            }; //make a thread object

            threads.push(thread); //add it to the list
        });

        // check for other messages (sent vs received folder)
        var prevThreads = _OKCP.storage('messages');
        //remove duplicates
        if (prevThreads !== undefined) {
            for (var i = 0; i < prevThreads.length; i++) {
                var threadToAdd = prevThreads[i];
                for (var j = 0; j < threads.length; j++) {
                    if (threadToAdd.u === threads[j].u) {
                        threadToAdd = undefined;
                        break;
                    }
                }
                if (threadToAdd) threads.push(threadToAdd);
            }
            console.log('messages length = ' + threads.length);
            _OKCP.storage('messagesIndexed', new Date().getTime());
        }

        _OKCP.storage('messages',threads); //store the messages
        _OKCP.addMessageLinkUI();
    });
};
_OKCP.clearMessages = function() {
    _OKCP.storage('messages',undefined);
};

_OKCP.loadUrlsIntoElem = function(urls, selector, callback) {
    var pageResultsDiv = $('<div id="page-results"></div>').appendTo('body');
    var numCompleteRequests = 0;
    for (var i = 0; i < urls.length; i++) {
        $('<div id="page-results-' + i + '"></div>')
            .appendTo(pageResultsDiv)
            .load(urls[i] + ' ' + selector, requestComplete);
    }

    function requestComplete (e, status) {
        numCompleteRequests++;
        if (status === 'error') {
            console.log('request error on ' + numCompleteRequests);
            console.log(e);
        }
        if (numCompleteRequests === urls.length)
            callback(pageResultsDiv);
    }

    return pageResultsDiv;
};
