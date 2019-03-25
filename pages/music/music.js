// pages/music/music.js
var app = getApp();
var albums = require('../../data/music-data.js');
Page({

  data: {
    isPlayingMusic: false,
    dataUrl: 'http://dl.stream.qqmusic.qq.com/C400004GdXjG0e9LCv.m4a?guid=6816239100&vkey=0761BC6F2B114D8A0E3F2503D83591B11F6ED885BF678E6F7E70EE63F1DEE8D0A17E3D4228CC03D81E546707C3BB00DC1A3A9BB136F3851C&uin=0&fromtag=66',
    songTitle: 'lost stars - Adam Levine',
    coverImgUrl: 'http://imge.kugou.com/stdmusic/240/20150718/20150718033819377218.jpg'
  },

  onCoverTap: function(event) {
    var albumId = event.currentTarget.dataset.albumid;
    wx.navigateTo({
      url: 'music-detail/music-detail?id=' + albumId,
    })
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

  onLoad: function(options) {
    this.setData({
      isPlayingMusic: app.globalData.g_isPlayingMusic,
      albums: albums.albums
    });
    
  },
  
  onShow: function(event){
    this.setData({
      isPlayingMusic: app.globalData.g_isPlayingMusic
    });
    this.setMusicMonitor();
  }

})