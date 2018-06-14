const app = getApp()
Component({
    properties: {
        hotsong: {
            type: String,
            value: []
        }
    },
    data: {
    },
    methods: {
      toDetail: function(data) {
        var url = '/pages/recDetail/recDetail?id=' + data.currentTarget.id
        wx.navigateTo({
            url: url
        })
    },
    },
    
})