var opencart = {
  name: 'opencart',
  configs: {},
  init: function () {
    config.point(this.name)

    this.configs.domain = config.get('domain')
    this.configs.username = config.get('username')
    this.configs.key = config.get('key')
    this.configs.token = config.get('token')
  },
  setConfig(key, value) {
    config.point(this.name)
    config.set(key, value)
  },
  refreshApiToken(callback) {
    if (!this.configs.key || !this.configs.domain || !this.configs.username) {
      callback({code: 500, msg: '请配置API的参数'})
    } else {
      let opencart = this
      $.ajax({
        method: 'POST',
        url: this.configs.domain + '/index.php?route=api/login',
        data: {
          username: this.configs.username,
          key: this.configs.key
        },
        success: function (data) {
          if (data.success) {
            opencart.setConfig('token', data.api_token)
            console.log('success')
            callback()
          }else{
            callback({code: 500, msg: _.values(data.error).join("\n")})
          }
        },
        dataType: 'json'
      })
    }
  },
  addProduct(data, callback) {
    let opencart = this
    this.init()

    if(data.length == 0){
      return callback({code: 500, msg: '你还未选择需要采集的商品'})
    }

    if (!this.configs.token) {
      this.refreshApiToken(function (message = {}) {
        if(!_.isEmpty(message)){
          callback(message)
        }else{
          opencart.addProduct(data, callback)
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: this.configs.domain + '/index.php?route=api/product/bathadd&api_token=' + this.configs.token,
        data: {
          data: JSON.stringify(data)
        },
        dataType: 'json',
        success: function (json) {
          if (json.error) {
            if (json.error.warning == 'error_permission') {
              opencart.refreshApiToken(function (message = {}) {
                if(!_.isEmpty(message)){
                  callback(message)
                }else{
                  opencart.addProduct(data, callback)
                }
              })
            }else{
              callback(json)
            }
          }else {
            callback(json)
          }
        }
      })
    }
  },
  admin: function () {
    let opencart = this
    this.init()
    let dialog = '<div class="modal fade" id="opencartAdmin" tabindex="-1" role="dialog">' +
      '<div class="modal-dialog" role="document">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
      '<h4 class="modal-title">设置</h4>' +
      '</div>' +
      '<div class="modal-body">' +
      '<form>' +
      '<div class="form-group">' +
      '<label for="domain">Api Domain</label>' +
      '<input class="form-control" id="domain" value="' + this.configs.domain + '" />' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="username">Api Username</label>' +
      '<input class="form-control" id="username" value="' + this.configs.username + '" />' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="key">Api Key</label>' +
      '<textarea class="form-control" id="key" rows="3">' + this.configs.key + '</textarea>' +
      '</div>' +
      '</form>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
      '<button type="button" class="btn btn-primary save">保存修改</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    $('body').append(dialog)

    $('#opencartAdmin').modal('show')

    $('#opencartAdmin .save').on('click', function () {
      opencart.setConfig('domain', $('#domain').val())
      opencart.setConfig('username', $('#username').val())
      opencart.setConfig('key', $('#key').val())

      $('#opencartAdmin').modal('hide')
    })

    $('#opencartAdmin').on('hidden.bs.modal', function () {
      $('#opencartAdmin').remove()
    })
  }
}

/* function refreshApiToken(callback) {
  let configs = getAllApiConfig()

  if (!configs.key) {
    alert('请配置API的参数')
  } else {
    $.ajax({
      method: 'POST',
      url: configs.domain + '/index.php?route=api/login',
      data: {
        username: configs.username,
        key: configs.key
      },
      success: function (data) {
        if (data.success) {
          setApiConfig('token', data.api_token)
          callback()
        }
      },
      dataType: 'json'
    })
  }
}

function getApiConfig(key) {
  let storageKey = 'apiConfig'
  let configs = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}

  if (configs[key]) {
    return configs[key]
  } else {
    return ''
  }
}

function getAllApiConfig() {
  let storageKey = 'apiConfig'
  return localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}
}

function setApiConfig(key, value) {
  let storageKey = 'apiConfig'
  let configs = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}

  configs[key] = value

  localStorage.setItem(storageKey, JSON.stringify(configs))
} */