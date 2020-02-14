var popup = {
  fetchIndexData: function() {
    let products = productModel.all()
    let trow = ''
  
    if (products.length > 0) {
      $(products).each(function (i, e) {
        let thumb = e.thumbs[0].search('https:') >= 0 ? e.thumbs[0] : 'https:' + e.thumbs[0]
        let price = _.values(e.prices)[0]
  
        trow = trow + '<tr>' +
          '<td><img src="' + thumb + '" width="50px"></td>' +
          '<td><a href="' + e.link + '" target="_blank">' + e.subject + '</a></td>' +
          '<td>' + price + '</td>' +
          '<td><button class="btn btn-link remove" data-id="' + e.id + '">取消</a></td>' +
          '</tr>'
      })
    } else {
      trow = '<tr>' +
        '<td colspan="4" align="center">暂无需要采集的产品</td>' +
        '</tr>'
    }
  
    $('#products tbody').html(trow)
  }
}

$(function () {
  //1.初始化页面数据
  popup.fetchIndexData()

  //2.响应取消按钮
  $('.remove').bind('click', function () {
    console.log($(this).data('id'))
    productModel.remove($(this).data('id'))
    fpAlert.warning('已从待采集列表删除')
    $(this).parents('tr').remove()
    //popup.fetchIndexData()
  })

  //3.响应提交按钮
  $('#sendToSite').bind('click', function () {
    var $btn = $(this).button('loading')
    opencart.addProduct(productModel.all(), function(response){
      if(response.code == 200){
        fpAlert.success(response.msg)
        productModel.clear()
        popup.fetchIndexData()
      }else{
        fpAlert.fail(response.msg)
      }
      $btn.button('reset')
    })
  })

  //4.响应设置按钮
  $('#goToOptions').bind('click', function () {
    opencart.admin()
  })

  //5.取消所有产品
  $('#removeAll').bind('click', function(){
    productModel.clear()
    fpAlert.warning('全部产品已从待采集列表删除')
    popup.fetchIndexData()
  })
})