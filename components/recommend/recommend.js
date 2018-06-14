import api from '../../api/recommend'
const util = require('../../utils/util.js')
const app = getApp()
Component({
    properties: {
        playlist: {
            type: Array,
            value: []
        },
        newsong: {
            type: Array,
            value: []
        }
    },
    data: {
        navs: [{
                title: '推荐音乐',
                id: 'recommand'
            },
            {
                title: '热歌榜',
                id: 'hotSong'
            },
            {
                title: '搜索',
                id: 'search'
            }
        ],
        currentNav: 'recommand'
    },
    methods: {
        toDetail: function(data) {
            var url = '/pages/recDetail/recDetail?id=' + data.currentTarget.id
            wx.navigateTo({
                url: url
            })
        },
        getNewSongList: function () {
          let list = this.data.newsong,
              data = []
              
          for(let i = 0, len = list.length; i < len; i++) {
            if(i == list.length - 1) continue
            let obj = {}
            obj.id = list[i].id
            obj.name = list[i].name
            obj.album = list[i].song.album
            obj.artists = list[i].song.artists
            data.push(obj)
          }
          
          app.globalData.wyy_playlist = data
        },
        play: function (data) {
          this.getNewSongList()
          
          var url = '/pages/play/play?id=' + data.currentTarget.id
          wx.navigateTo({
            url: url
          })
        }
    }

})