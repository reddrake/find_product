function fetchIndexData(){
  let key = 'chromeFindProducts'
  let products = JSON.parse(localStorage.getItem(key))

  let trow = ''

  if(products.length > 0){
    $(products).each(function(i, e){
      let thumb = e.thumbs[0].search('https:') >= 0 ? e.thumbs[0] : 'https:' + e.thumbs[0]
      let price = _.values(e.prices)[0]

      trow = trow + '<tr>'
      + '<td><img src="'+thumb+'" width="50px"></td>'
      + '<td><a href="'+e.link+'" target="_blank">'+e.subject+'</a></td>'
      + '<td>'+price+'</td>'
      + '<td><button class="btn btn-link remove" data-id="'+e.id+'">取消</a></td>'
      + '</tr>'
    })
  }else{
    trow = '<tr>'
      + '<td colspan="4" align="center">暂无需要采集的产品</td>'
      + '</tr>'
  }

  $('#products tbody').html(trow)
}

function sendRemoveQueryToWeb(id, callback){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "remove", data: {id: id}}, function(response) {
      console.log(response)
      if(response.code == 'ok'){
        callback()
      }
    })
	})
}

function submitToSite(data){
  let apiConfigs = getAllApiConfig()

  $.ajax({
    method: 'POST',
    url: apiConfigs.domain + '/index.php?route=api/product/bathadd&api_token=' + apiConfigs.token,
    data: {
      data: data
    },
    timeout: 3000,
    dataType: 'json',
    success: function(json){
      if(json.error){
        if(json.error.warning == 'error_permission'){
          refreshApiToken(function(){
            submitToSite(data)
          })
        }
      }
      if(json.code == 200){
        success_prompt(json.msg)
        clearProduct()
        fetchIndexData()
      }else{
        fail_prompt(json.msg)
      }
    }
  })
}

$(function() {
  fetchIndexData()

  $('.remove').bind('click',function() {
    let id = $(this).data('id')
  
    sendRemoveQueryToWeb(id, function(){
      console.log('reload')
      fetchIndexData()
    })
  })

  $('#sendToSite').bind('click', function(){
    submitToSite(getAllByJsonString())
  })

  $('#goToOptions').bind('click', function() {
    let apiDomain = getApiConfig('domain')
    let apiKey = getApiConfig('key')
    let apiUsername = getApiConfig('username')

    let dialog = '<div class="modal fade"  id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
      + '<div class="modal-dialog" role="document">'
        + '<div class="modal-content">'
          + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
            + '<h4 class="modal-title">设置</h4>'
          + '</div>'
          + '<div class="modal-body">'
            + '<form>'
              + '<div class="form-group">'
                + '<label for="apiDomain">Api Domain</label>'
                + '<input class="form-control" id="apiDomain" value="'+apiDomain+'" />'
              + '</div>'
              + '<div class="form-group">'
                + '<label for="apiUsername">Api Username</label>'
                + '<input class="form-control" id="apiUsername" value="'+apiUsername+'" />'
              + '</div>'
              + '<div class="form-group">'
                + '<label for="apikey">Api Key</label>'
                + '<textarea class="form-control" id="apiKey" rows="3">'+apiKey+'</textarea>'
              + '</div>'
            + '</form>'
          + '</div>'
          + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'
            + '<button type="button" id="settingSave" class="btn btn-primary">保存修改</button>'
          + '</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    $('body').append(dialog)

    $('#myModal').modal('show')

    $('#settingSave').on('click', function(){
      setApiConfig('domain', $('#apiDomain').val())
      setApiConfig('username', $('#apiUsername').val())
      setApiConfig('key', $('#apiKey').val())
      
      $('#myModal').modal('hide')
    })

    $('#myModal').on('hidden.bs.modal', function() {
      $('#myModal').remove()
    })
  })
})
