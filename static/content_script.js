chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log($('div.ma-price-wrap').html())
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

  $(function(){
  var tools = '<div class="fp_tools">'
    + '<button id="insertToList" class="btn btn-success">加入采集</button>'
    + '<button id="removeToList" class="btn btn-danger hide">取消采集</button>'
    + '</div>'

  $('div.action-sub div.detail-box').append(tools)

  setTimeout(function() {
    $('#insertToList').bind('click', () => {
      let id = $('#detail-favorite-mark').attr('data-fav-id')
      let title = $('h1.ma-title').text()
      let details = {}
      $('div.do-overview div.do-entry-list dl.do-entry-item').each(function(i,e){
        let key = $(this).find('dt.do-entry-item').text().replace(/^\s+|\s+$/g,'')
        let value = $(this).find('dd.do-entry-item-val').text().replace(/^\s+|\s+$/g,'')

        if(key){
          details[key] = value
        }
      })
      let delivery = {}
      $('div.do-entry-full div.do-entry-list dl.do-entry-item').each(function(){
        let key = $(this).find('dt.do-entry-item-key').text().replace(/^\s+|\s+$/g,'')
        let value = $(this).find('dd.do-entry-item-val').text().replace(/^\s+|\s+$/g,'')
        if(key){
          delivery[key] = value
        }
      })


      chrome.runtime.sendMessage({id: id, title: title, details: details, delivery: delivery, greeting: 'hello'}, function(response){
        console.log(response.farewell);
      })
    })
  })
})