// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    //更新文章缓存值
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定，从而实现切换图片
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
    })
  },

  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + '现在还不能实现分享功能，什么时候才能支持呢?',
        })
      }
    })
  },

  onLoad: function(options) {
    var globalData = app.globalData;
    var postId = options.id;
    this.data.currentPostId = postId;
    // var postData= postsData.postList[postId];
    // this.data.postData = postData; //这个不会绑定成功。必须用setdata方法来绑定
    this.setData({
      postData: postsData.postList[postId]
    });

    var postsCollected = wx.getStorageSync('posts_collected');
    if (!postsCollected[postId]) {
      postsCollected[postId] = '';  //这里之前有个问题 之前是直接设置成布尔值，后来报错了。之前没有报错的。可能又改了。
      wx.setStorageSync('posts_collected', postsCollected);
    }
    this.setData({
      collected: postsCollected[postId]
    });
  },

})