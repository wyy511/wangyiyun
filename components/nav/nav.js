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
    trigger: function(data) {
        this.setData({
            currentNav: data.currentTarget.dataset.item.id
        })
    },
    onLoad: function() {}
})