var productModel = {
  key: 'chromeFindProducts',
  all: function(){
    return localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : []
  },
  store: function(data, sourceTab) {
    let products = localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : []
    
    data['link'] = sourceTab.url
    data['tab_id'] = sourceTab.id
    products.push(data)

    localStorage.setItem(this.key, JSON.stringify(products))
  },
  remove: function(id){
    let products = localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : []

    if(products){
      product = _.find(products, function(o){
        return o.id == id
      })

      products = _.filter(products, function(o){
        return o.id != id
      })
      
      message.sendToTab(product.tab_id, {action: 'remove', data: {id: id}}, function(response){
        console.log(response)
      })
    }

    localStorage.setItem(this.key, JSON.stringify(products))
  },
  clear: function(){
    localStorage.setItem(this.key, JSON.stringify([]))
  },
  isExist: function(id) {
    let products = localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : []

    product = _.find(products, function(o){
      return o.id == id
    })

    return product ? true : false
  }
}

/* function insertProduct(data, url){
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
} */