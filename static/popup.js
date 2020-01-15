let key = 'chromeFindProducts'
let products = JSON.parse(localStorage.getItem(key))

console.log(products)

if(products.length > 0){
  let trow = ''
  $(products).each(function(i, e){
    let thumb = e.thumbs[0].search('https:') >= 0 ? e.thumbs[0] : 'https:' + e.thumbs[0]
    let price = _.values(e.prices)[0]
    console.log(price)
    trow = trow + '<tr>'
    + '<td><img src="'+thumb+'" width="50px"></td>'
    + '<td><a href="'+e.link+'" target="_blank">'+e.subject+'</a></td>'
    + '<td>'+price+'</td>'
    + '<td><a href="javascript:;" class="remove" data-id="'+e.id+'">删除</a></td>'
    + '</tr>'
  })
  $('#products tbody').html(trow)
}
