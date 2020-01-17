chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostSuffix: 'alibaba.com', schemes: ['https']},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  console.log(sender.tab ?
				  "from a content script:" + sender.tab.url :
          "from the extension");
    
    if(request.action == 'insert'){
      insertProduct(request.data, sender.tab.url)
    }

    if(request.action == 'remove'){
      removeProduct(request.data.id)
    }

    if(request.action == 'check'){
      return sendResponse({exist: checkExist(request.data.id)})
    }

    sendResponse({farewell: "ok"})
	});