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
          "from the extension")

    if(request.action == 'insert'){
      productModel.store(request.data, sender.tab)
    }

    if(request.action == 'remove'){
      productModel.remove(request.data.id)
    }

    if(request.action == 'check'){
      return sendResponse({exist: productModel.isExist(request.data.id)})
    }

    sendResponse({farewell: "ok"})
	});