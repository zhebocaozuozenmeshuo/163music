{
    const requestUrl = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?singermid=001BHDR33FZVZ0&g_tk=1388932902&uin=2306831967&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5page&needNewCode=1&order=listen&from=h5&num=15&begin=0&_=1522224394762'
    let view = {
        el: '.songs',
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let songs = data
            songs.map((song) => {
                let $li = $(`
                 <li>
                      <h3>${song.songname}</h3>
                      <p>
                        <svg class="icon icon-sq">
                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
                        </svg>
                        ${song.singer}
                      </p>
                      <a class="playButton" href="#">
                        <svg class="icon icon-play">
                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                        </svg>
                      </a>
                </li>
           `)
                this.$el.find('ol.list').append($li)
            })

        }
    }
    let model = {
        data: {
            songs: [],
        },
        _normalise(ret) {
            const data = ret.data.list
            const filterData = []
            for (let i = 0; i < data.length; i++) {
                const songInfo = data[i].musicData
                const o = {
                    singer: songInfo.singer[0].name,
                    songname: songInfo.songname,
                }
                filterData.push(o)
            }
            return filterData
        },
        find() {
            return new Promise((resolve, reject) => {
                // get songs
                jsonp({
                    url: requestUrl,
                    callback: (ret) => {
                        this.data = this._normalise(ret)
                        if (this.data) {
                            resolve(this.data)
                        } else {
                            reject('get songs error')
                        }
                    },
                    // 参数列表
                    data: {
                        singermid: '001BHDR33FZVZ0',
                        g_tk: '1388932902',
                        uin: '2306831967',
                        format: 'json',
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        platform: 'h5page',
                        needNewCode: 1,
                        order: 'listen',
                        from: 'h5',
                        num: 15,
                        begin: 0,
                        _: '1522224394762',
                    }
                })
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view, model)
}