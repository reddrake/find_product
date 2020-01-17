function refreshApiToken(callback){
  let configs = getAllApiConfig()

  if(!configs.key){
    alert('请在配置页面设置apikey')
  }else{
    $.ajax({
      method: 'POST',
      url: configs.domain + '/index.php?route=api/login',
      data: {
        username: configs.username,
        key: configs.key
      },
      success: function(data){
        if(data.success){
          setApiConfig('token', data.api_token)
          callback()
        }
      },
      dataType: 'json'
    })
  }
}

function getApiConfig(key){
  let storageKey = 'apiConfig'
  let configs = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}

  if(configs[key]){
      return configs[key]
  }else{
      return ''
  }
}

function getAllApiConfig(){
  let storageKey = 'apiConfig'
  return localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}
}

function setApiConfig(key, value){
  let storageKey = 'apiConfig'
  let configs = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}

  configs[key] = value

  localStorage.setItem(storageKey, JSON.stringify(configs))
}
