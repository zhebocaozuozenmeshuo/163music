function log() {
    console.log.apply(console, arguments)
}

function jsonp(setting) {
    // init
    setting.data = setting.data || {}
    setting.callback = setting.callback || function () {}
    // shit
    setting.key = 'jsonpCallback'
    setting.data[setting.key] = '__xascdsvgcbyhavgslkjah__'

    // callback
    window.__xascdsvgcbyhavgslkjah__ = function(data) {
        setting.callback(data)
    }

    // request
    let script = document.createElement('script')
    let query = []
    for (let key in setting.data) {
        query.push(key + '=' + encodeURIComponent(setting.data[key]))
    }
    const scriptSrc = setting.url + '?' + query.join('&')
    script.src = scriptSrc
    document.head.appendChild(script)
    document.head.removeChild(script)
}
