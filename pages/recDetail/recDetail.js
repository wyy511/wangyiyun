import { getRecommendDetail } from '../../api/recommend'
const util = require('../../utils/util.js')
const app = getApp()
Page({
    data: {
        detail: []
    },
    onLoad: function(option) {
        getRecommendDetail({ id: option.id }, this.recDetailSuccess) // 获取推荐歌单列表
    },
    recDetailSuccess: function(res) {
        if (!!res && res.statusCode === 200) {
            this.setData({
                detail: res.data.result
            })
            app.globalData.wyy_playlist = res.data.result.tracks
        }
    },
    play: function (data) {
      var url = '/pages/play/play?id=' + data.currentTarget.id
      wx.navigateTo({
        url: url
      })
    },

})