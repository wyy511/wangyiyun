const app = getApp()
Component({
    properties: {
        playlist: {
            type: String,
            value: 'test'
        }
    },
    data: {
        navs: [{
                title: '推荐音乐',
                id: 'recommend'
            },
            {
                title: '热歌榜',
                id: 'hotsong'
            },
            // {
            //     title: '搜索',
            //     id: 'search'
            // }
        ],
        currentNav: 'recommend'
    },
    methods: {
        trigger: function(data) {
            this.setData({
                currentNav: data.currentTarget.dataset.item.id
            })
            this.triggerEvent('getNav', this.data.currentNav)
        },
    },
    
    onLoad: function() {}
})