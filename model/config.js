var config = {
    name: 'Default',
    point: function (name) {
        this.name = name
    },
    get: function (key) {
        let configs = localStorage.getItem(this.name) ? JSON.parse(localStorage.getItem(this.name)) : {}

        return configs[key] ? configs[key] : ''
    },
    set: function (key, value) {
        let configs = localStorage.getItem(this.name) ? JSON.parse(localStorage.getItem(this.name)) : {}

        configs[key] = value

        return localStorage.setItem(this.name, JSON.stringify(configs))
    }
}