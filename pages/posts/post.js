// pages/posts/post.js
var postsData = require('../../data/posts-data.js');
//只能用相对路径。
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'Sep 18 2016',
    title:'正是霞飞卸妆时'
  },
  imgPath:'/image/...',
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid; //这里的i要小写，只有连字符前的第一个字母要大写。
    // console.log('postId is '+ postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+ postId,
    })
  },

  // onSwiperItemTap:function(event){
  //   var postId = event.currentTarget.dataset.postid; //这里的i要小写，只有连字符前的第一个字母要大写。

  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId,
  //   })
  // },

  onSwiperTap:function(event){
    //target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper组件
    var postId = event.target.dataset.postid; //这里的i要小写，只有连字符前的第一个字母要大写。
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onLoad: function (options) {
    this.setData({posts_key:postsData.postList});
    console.log('loading....');
  },

  onReady: function () {

  }
})