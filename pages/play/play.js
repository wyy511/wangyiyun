// pages/play/play.js
import { getPlayLyric, getPlayInfo } from '../../api/recommend'
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playinfo: [],
    playlyric: [],
    playlist: [],
    pageId: '',
    cover: '',
    rotateAnimation: {},
    title: '',
    name: '',
    forwardUrl: '',
    isPlaying: true, //是否播放
    autoplay: true,
    timer: null,
    rat: 0,
    randState: 'shunxu'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options.id)
    // this.setData({
    //   playlist: app.globalData.wyy_playlist,
    //   pageId: options.id
    // })
    innerAudioContext.onPlay((e) => {
      console.log('开始播放')
    })
    innerAudioContext.onPause((e) => {
      console.log('暂停播放')
    })
    innerAudioContext.onStop((e) => {
      console.log('停止播放')
    })
    innerAudioContext.onEnded((e) => {
      this.trigger('forward')
    })
    
  },
  init: function (id) {
    this.setData({
      playlist: app.globalData.wyy_playlist,
      pageId: id,
      isPlaying: this.data.autoplay
    })
    innerAudioContext.autoplay = this.data.autoplay
    this.getPageInfo(id)
    this.getFilterData(id, "cover") // 获取封面信息
    this.createRotateAnimation()
  },
  getFilterData(id, type) { // 过滤数据
    let list = this.data.playlist
    for(let i = 0, len = list.length; i < len; i++) {
      if(list[i].id == id) {
        if(type === 'cover') {
          this.setData({
            cover: list[i].album.picUrl,
            name: list[i].name,
            title: list[i].artists[0].name
          })
          return
        } else if (type === 'back') {
          if (i == 0) {
            console.log("已经是第一首歌曲")
          } else {
            return list[i - 1].id
          }
        } else if (type === 'forward') {
          if (i == list.length - 1) {
            console.log("已经是最后首歌曲")
          } else {
            return list[i + 1].id
          }
        }
        
      }
    }
  },

  getPageInfo(id) { // 获取页面信息，歌词
    getPlayLyric({ id: id }, this.playLyricSuccess)
    getPlayInfo({ id: id }, this.playInfoSuccess)
  },
  createRotateAnimation() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
    })
    this.animation = animation

    // animation.rotate(360).step()

    this.setData({
      rotateAnimation: animation.export()
    })
    this.clearRotateTimer()
    this.setRotateTimer()
  },
  setRotateTimer: function () {
    var that = this
    this.setData({
      timer: setTimeout(function () {
        that.setData({
          rat: that.data.rat+10
        })
        that.animation.rotate(1 * (that.data.rat)).step()
        that.setData({
          rotateAnimation: that.animation.export()
        })
        that.setRotateTimer()
      }.bind(this), 200)
    })
  },
  clearRotateTimer: function () {
    if (!!this.data.timer) {
      clearTimeout(this.data.timer)
      this.setData({
        timer: null
      })
    }
  },
  playInfoSuccess(res) {
    if (!!res && res.statusCode === 200) {
      this.setData({
        playinfo: res.data.data
      })
      this.setMusic(this.data.playinfo[0].url)
    }
  },
  playLyricSuccess(res) {
    if (!!res && res.statusCode === 200) {
      this.setData({
        playlyric: res.data
      })
    }
  },
  setMusic: function (url) {
    innerAudioContext.src = url
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  rand: function () {
    if (this.data.randState == 'shunxu') {
      this.setData({
        randState: 'suiji'
      })
    } else if (this.data.randState == 'suiji') {
      this.setData({
        randState: 'shunxu'
      })
    }
  },
  play() { // 播放暂停
    this.setData({
      isPlaying: !this.data.isPlaying
    })
    if(this.data.isPlaying) {
      innerAudioContext.play()
      this.setRotateTimer()
    } else {
      innerAudioContext.pause()
      this.clearRotateTimer()
    }
  },
  trigger: function(data) {
    var id = '',
        _type = ''
    if(typeof data === 'string') {
      _type = data
    } else {
      _type = data.currentTarget.dataset.type
    }
    if (this.data.randState == 'shunxu') {
      id = this.getFilterData(this.data.pageId, _type)
    } else if (this.data.randState == 'suiji') {
      var n = Math.ceil(Math.random() * 10) - 1
      if (!!this.data.playlist[n]) {
        id = this.getFilterData(this.data.playlist[n].id, _type)
      }
    }
    
    if(!!id) {
      this.init(id)
    } else {
      this.clearRotateTimer()
    }
  },
})