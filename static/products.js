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

function clearProduct(){
  let key = 'chromeFindProducts'
  localStorage.setItem(key, JSON.stringify([]))
}

function checkExist(id){
  let key = 'chromeFindProducts'
  let products = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []

  product = _.find(products, function(o){
    return o.id == id
  })

  return product ? true : false
}

function getAllByJsonString(){
  let key = 'chromeFindProducts'
  let products = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []

  return JSON.stringify(products)
}