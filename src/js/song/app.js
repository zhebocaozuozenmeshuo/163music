{
    let view = {
        el: '#app',
        template: `
            <audio src={{url}}/>
            <div>
                <button class="play">播放</button>
                <button class="pause">暂停</button>
            </div>
            <!--<audio autoplay controls src={{url}}/>-->
        `,
        render(data) {
            $(this.el).html(this.template.replace('{{url}}', data.url))
        },
        pause() {
            let audio = $(this.el).find('audio')[0]
            audio.pause()
        },
        play() {
            let audio = $(this.el).find('audio')[0]
            audio.play()
        }
    }
    let model = {
        data: {
            id: '',
        },
        get(id) {
            // 我没有后台呀 都给木马城市好了
            return new Promise((resolve, reject) => {
                this.data.id = id
                let opts = {
                    title: '牧马城市',
                    url: 'http://fs.w.kugou.com/201803311133/3142a5d3fdbc24e8042419153eec6462/G131/M0B/07/17/Y5QEAFqWTyCAeAIBAD8j9XkhJKc956.mp3',
                }
                Object.assign(this.data, opts)
                resolve()
                if (false) {
                    reject()
                }
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.get(id).then(() => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents() {
            $(this.view.el).on('click', '.play', () => {
                this.view.play()
            })
            $(this.view.el).on('click', '.pause', () => {
                this.view.pause()
            })
        },
        getSongId() {
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }
            let array = search.split('&').filter((v => v))
            let id = ''
            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let k = kv[0]
                let v = kv[1]
                if (k === 'id') {
                    id = v
                    break
                }
            }
            return id
        },
    }

    controller.init(view, model)
}

