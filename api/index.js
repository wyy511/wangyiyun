export default function ajaxData(url, method = 'GET', params = {}, success) {
    wx.request({
        url: url,
        data: params,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: success,
        fali: function(res) {
            console.log(res)
        }
    })
}