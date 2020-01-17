function getConfig(key){
    let storageKey = 'config'
    let configs = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}

    if(configs[key]){
        return configs[key]
    }else{
        return ''
    }
}

function setConfig(key, value){
    let storageKey = 'config'
    let configs = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {}

    return configs[key] = value
}