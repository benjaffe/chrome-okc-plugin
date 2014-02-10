_OKCP.messageSearch = function() {
    var messages = _OKCP.storage('messages');
    var pageMailbox = $('#p_mailbox').length > 0;
    if (!messages) {
        if (pageMailbox) {
            _OKCP.indexMessages();
        } else {
            $('<iframe src="http://www.okcupid.com/messages"></iframe>').appendTo('body').load(function(){
                _OKCP.indexMessages($(this.contentDocument));
            });
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
            var thread = {
                un: this.querySelector('.subject').innerText,
                link: this.querySelector('.open').href,
                d: this.querySelector('.fancydate').innerText
            }; //make a thread object

            threads.push(thread); //add it to the list
        });
        console.log(threads);
        _OKCP.storage('messages',threads); //store the messages
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
