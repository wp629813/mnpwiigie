// pages/pagemy/pagemy.js
var rRequest = require('../../utils/rRequest.js');
var config = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    initPagaInfo: {},
    /**用户信息 */
    userInfo: {},
    //hasUserInfo: false,
    userIData: false,
    userWxInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userWxInfo) {
      this.setData({
        userWxInfo: app.globalData.userWxInfo,
        userIData: app.globalData.userIData,
        userInfo: app.globalData.userInfo,
      })
    }


    this.initPaga();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var that = this;
    try {
      var value = wx.getStorageSync('refresh')
      var currentTab = that.data.currentTab;
      if (value && value == '1'  ) {
  
        that.initPaga();
   
      }
    } catch (e) {

    }
    wx.setStorage({
      key: "refresh",
      data: "0",
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onclick: function(event) {
    var ty = event.currentTarget.dataset.type;
    if (ty == 'giftgivelist') {
      wx.navigateTo({
        url: '/page/component/pages/pagegift/giftgivelist/giftgivelist',
      })
    }

  },


  /**账户 */
  accountPage: function() {

    wx.navigateTo({
      url: '/page/component/pages/pagecount/counthome/counthome',
    })
  },
  /**我的订单 */
  myorderPage: function() {

    wx.navigateTo({
      url: '/page/component/pages/pagemy/myorder/myorder',
    })
  },
  /**消费评价 */
  evalPage: function() {

    wx.navigateTo({
      url: '/page/component/pages/pagemy/evaluate/evallist/evallist',
    })
  },
  /**售后申请 */
  mycusservPage: function () {

    wx.navigateTo({
      url: '/page/component/pages/pagemy/customserv/servlist/servlist',
    })
  },
  /**我的好友 */
  myfriendsPage: function() {

    wx.navigateTo({
      url: '/page/component/pages/pagemy/friends/myfriends/myfriends',
    })
  },

  /**我的收藏 */
  mykeepsPage: function() {

    wx.navigateTo({
      url: '/page/component/pages/pagemy/keeps/keeps',
    })
  },


  /**我的足迹 */
  myhelpsPage: function() {

    wx.navigateTo({
      url: '/page/component/pages/pagemy/myhelps/myhelps',
    })
  },

  /**客户服务 */
  mydialogsPage: function() {

    wx.navigateTo({
      url: '/page/component/pages/pagedialog/dialoglist/dialoglist?r=',
    })
  },



  /**商户绑定 */
  bundingPage: function () {

    wx.navigateTo({
      url: '/page/component/pages/pagebing/pagebing',
    })
  },


  initPaga: function() {

    var that = this;


    var url = config.requestUrl;
    var userid = that.data.userInfo.id 
    var data = {
      code_: 'x_initMyPaga',
      userid:userid
    }
    rRequest.doRequest(url, data, that, function(rdata) {

      if (rdata.info) {

        that.setData({
          initPagaInfo: rdata.info
        })
      }

    })

  }
})