// pages/music/music-detail/music-detail.js
var app = getApp();
var albumsData = require('../../../data/music-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    dataUrl: 'http://dl.stream.qqmusic.qq.com/C400004GdXjG0e9LCv.m4a?guid=6816239100&vkey=0761BC6F2B114D8A0E3F2503D83591B11F6ED885BF678E6F7E70EE63F1DEE8D0A17E3D4228CC03D81E546707C3BB00DC1A3A9BB136F3851C&uin=0&fromtag=66',
    songTitle: 'LostStar-Adam Levine',
    coverImgUrl: 'http://imge.kugou.com/stdmusic/240/20150718/20150718033819377218.jpg'
  },

  onPlayStopTap: function(event) {
    var isPlayingMusic = app.globalData.g_isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.dataUrl,
        title: this.data.songTitle,
        coverImgUrl: this.data.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true
      });
    }
    app.globalData.g_isPlayingMusic = this.data.isPlayingMusic;

  },

  onCollectionTap: function(event) {
    var albumsCollected = wx.getStorageSync('albums_collected');
    var albumCollected = albumsCollected[this.data.currentAlbumId];
    albumCollected = !albumCollected;
    //更新文章缓存值
    albumsCollected[this.data.currentAlbumId] = albumCollected;
    wx.setStorageSync('albums_collected', albumsCollected);
    //更新数据绑定，从而实现切换图片
    this.setData({
      collected: albumCollected
    })

    wx.showToast({
      title: albumCollected ? "收藏成功" : "取消成功",
    })
  },

  setMusicMonitor: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    });
    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var albumId = options.id;
    this.data.currentAlbumId = albumId;
    this.setData({
      albumData: albumsData.albums[albumId]
    });

    this.setData({
      isPlayingMusic: app.globalData.g_isPlayingMusic
    });
    this.setMusicMonitor();

    var albumsCollected = wx.getStorageSync('albums_collected');
    if (!albumsCollected[albumId]) {
      // albumsCollected = {};  //这里我犯了一个错误，竟然之前没有看出来。我把这个置空，那之前保存的数据不就没了吗！
      albumsCollected[albumId] = ''; //这里之前有个问题 之前是直接设置成布尔值，后来报错了。之前没有报错的。可能又改了。
      wx.setStorageSync('albums_collected', albumsCollected);
    }
    this.setData({
      collected: albumsCollected[albumId]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  onShow: function(event){
    // this.setData({
    //   isPlayingMusic: app.globalData.g_isPlayingMusic
    // });  //这个会出现bug  这个涉及到两个页面之间的生命周期函数，复杂。不过好在我问题已经被我解决啦。
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})