chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log($('div.ma-price-wrap').html())
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

  function checkinTool(){
    let tools = '<div class="fp_tools">'
    + '<button id="insertToList" class="btn btn-success hide">加入采集</button>'
    + '<button id="removeToList" class="btn btn-danger hide">取消采集</button>'
    + '</div>'

    $('div.action-sub div.detail-box').append(tools)

    chrome.runtime.sendMessage({action: 'check', data:{id: extractId()}}, function(response){
      console.log(response)
      if(response.exist){
        $('#removeToList').removeClass('hide')
      }else{
        $('#insertToList').removeClass('hide')
      }
    })
  }

  function extractId(){
    return $('#detail-favorite-mark').attr('data-fav-id')
  }

  function extractSubject(){
    return $('h1.ma-title').text()
  }

  function extractDetails(){
    let details = {}
    $('div.do-overview div.do-entry-list dl.do-entry-item').each(function(i,e){
      let key = $(this).find('dt.do-entry-item').text().replace(/^\s+|\s+$/g,'')
      let value = $(this).find('dd.do-entry-item-val').text().replace(/^\s+|\s+$/g,'')

      if(key){
        details[key] = value
      }
    })

    return details
  }

  function extractDelivery(){
    let delivery = {}
    $('div.do-entry-full div.do-entry-list dl.do-entry-item').each(function(){
      let key = $(this).find('dt.do-entry-item-key').text().replace(/^\s+|\s+$/g,'')
      let value = $(this).find('dd.do-entry-item-val').text().replace(/^\s+|\s+$/g,'')
      if(key){
        delivery[key] = value
      }
    })

    return delivery
  }

  function extractThumbs(){
    let thumbs = []

    $('ul.inav .item img').each(function(){
      thumbs.push($(this).attr('src'))
    })

    return thumbs
  }

  function extractPrices() {
    let prices = {}

    if($('ul.ma-ladder-price li.ma-ladder-price-item').length > 0){
      $('ul.ma-ladder-price li.ma-ladder-price-item').each(function(){
        let key = $(this).find('.ma-quantity-range').text().replace(/^\s+|\s+$/g,'')
        let value = $(this).find('.ma-spec-price').text().replace(/^\s+|\s+$/g,'')
  
        if(key){
          prices[key] = value
        }
      })
    }else{
      prices['range'] = $('span.ma-ref-price').text()
    }

    return prices
  }

  $(function(){
  setTimeout(function() {
    checkinTool()

    $('#insertToList').bind('click', () => {
      chrome.runtime.sendMessage({
        action: 'insert', 
        data: {
          id: extractId(), 
          subject: extractSubject(), 
          details: extractDetails(), 
          delivery: extractDelivery(), 
          thumbs: extractThumbs(), 
          prices: extractPrices()
        }}, function(response){
        if(response.farewell == 'ok'){
          $('#insertToList').addClass('hide')
          $('#removeToList').removeClass('hide')
        }
      })
    })

    $('#removeToList').bind('click', () => {
      chrome.runtime.sendMessage({action: 'remove', data:{id: extractId()}}, function(response){
        if(response.farewell == 'ok'){
          $('#removeToList').addClass('hide')
          $('#insertToList').removeClass('hide')
        }
      })
    })
  }, 1000)
})