//index.js
import { getRecommendList, getRecommendNewSong, getHotSong } from '../../api/recommend'
//获取应用实例
const app = getApp()
Page({
    data: {
        playlist: [],
        newsong: [],
        navStatus: 'hotsong',
        hotsong: [],
        count: 0,  // 记录共有多少条list
        limit: 5 
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        getRecommendList({}, this.recSuccess) // 获取推荐歌单列表
        getRecommendNewSong({}, this.recNewSongSuccess)
        this.getHotList()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getHotList: function () {
        for(let i = 0; i < this.data.limit; i++) {
            getHotSong({id: i}, this.hotListSuccess)
        }
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    recSuccess: function(res) {
        if (!!res && res.statusCode === 200) {
            this.setData({
                playlist: res.data.result
            })
        }
    },
    recNewSongSuccess: function(res) {
        if (!!res && res.statusCode === 200) {
            this.setData({
                newsong: res.data.result
            })
        }
    },
    hotListSuccess: function(res) {
        let data = this.data.hotsong
        data.push(res.data.playlist)
        this.setData({
            hotsong: data
        })
        console.log(this.data.hotsong)
    },
    getNav: function (e) {
        this.setData({
            navStatus: e.detail
        })
    }
})