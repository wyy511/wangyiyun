const app = getApp()
Component({
    properties: {
        hotsong: {
            type: Array,
            value: []
        }
    },
    data: {
        keys: [1,2,3,4,5]
    },
    methods: {
      toDetail: function(data) {
        var url = '/pages/recDetail/recDetail?id=' + data.currentTarget.id
        console.log(this.properties.hotsong)
        wx.navigateTo({
            url: url
        })
    },
    },
    
})