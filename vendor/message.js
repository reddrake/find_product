var message = {
  sendToTab(tabId, content, callback) {
    this.tabIsExist(tabId, function () {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      } else {
        chrome.tabs.sendMessage(tabId, content, function (response) {
          callback(response)
        })
      }
    })
  },
  tabIsExist: function (tabId, callback) {
    chrome.tabs.get(tabId, function () {
      callback()
    })
  }
}