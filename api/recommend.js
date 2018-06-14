import ajaxData from './index'

const app = getApp()

const BANNER = app.globalData.host + '/banner/' // banner轮播图获取
const RECOMMENDLIST = app.globalData.host + '/personalized/' // 推荐列表获取
const RECOMMENDNEWSONG = app.globalData.host + '/personalized/newsong/' // 推荐列表获取
const RECOMMENDDETAIL = app.globalData.host + '/playlist/detail/?id=' // 推荐列表详情
const PLAYLYRIC = app.globalData.host + '/lyric/?id=' // 播放页
const PLAYINFO = app.globalData.host + '/music/url/?id=' // 播放页
const HOTSONG = app.globalData.host + '/top/list/?idx=' // 排行榜页

var url = ''
export function getRecommendList(params = {}, callback) {
    url = RECOMMENDLIST
    ajaxData(url, 'GET', {}, callback)
}
export function getRecommendNewSong(params, callback) {
    url = RECOMMENDNEWSONG
    ajaxData(url, 'GET', {}, callback)
}
export function getRecommendDetail(params, callback) {
    url = RECOMMENDDETAIL + params.id
    ajaxData(url, 'GET', {}, callback)
}
export function getPlayLyric(params, callback) {
    url = PLAYLYRIC + params.id
    ajaxData(url, 'GET', {}, callback)
}
export function getPlayInfo(params, callback) {
  url = PLAYINFO + params.id
  ajaxData(url, 'GET', {}, callback)
}
export function getHotSong(params, callback) {
    url = HOTSONG + params.id
    ajaxData(url, 'GET', {}, callback)
  }