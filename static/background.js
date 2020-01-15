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

function insertProduct(data, url){
  let key = 'chromeFindProducts'
  let products = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
  
  data['link'] = url
  products.push(data)
  localStorage.setItem(key, JSON.stringify(products))
}

function removeProduct(id){
  let key = 'chromeFindProducts'
  let products = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []

  if(products){
    products = _.filter(products, function(o){
      return o.id != id
    })
  }

  localStorage.setItem(key, JSON.stringify(products))
}

function checkExist(id){
  let key = 'chromeFindProducts'
  let products = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []

  product = _.find(products, function(o){
    return o.id == id
  })

  return product ? true : false
}

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