// page/component/pages/pageserch/serchlist/serchlist.js
var WxParse = require('../../../../../wxParse/wxParse.js');

var config = require('../../../../../config.js');
var rCommon = require('../../../../../utils/rCommon.js');
var rRequest = require('../../../../../utils/rRequest.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    /**检索的好友 */
    serchListF: [],
    /**检索的活动 */
    serchListA: [],

    isList: false,
    isListMsg:'在这里您可以检索您想要的',

    serchListFRSize:{
      width:0,
      height:0
    },
    scrollView: {
      width: 0,
      height: 0
    },
    /**搜索内容 */
    serchInputValue: '',
    /**用户信息 */
    userInfo: {},
    //hasUserInfo: false,
    userIData: false,
    // userWxInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // if (app.globalData.userWxInfo) {
    if (app.globalData.userIData) {
      this.setData({
        // userWxInfo: app.globalData.userWxInfo,
        userIData: app.globalData.userIData,
        userInfo: app.globalData.userInfo,
      })
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var windowWidth = app.globalData.systemInfo.windowWidth
    var windowHeight = app.globalData.systemInfo.windowHeight
    
    var percent = windowWidth / 750
     
    var scrollViewHeight = windowHeight - 80 * percent

    this.setData({

      'serchListFRSize.width': windowWidth * 0.95/3,
      'serchListFRSize.height': windowWidth * 0.95 / 3,
      'scrollView.height': scrollViewHeight
    })
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  bindKeyInput: function(event) {
    this.setData({
      serchInputValue: event.detail.value,
     
    })
    var value = event.detail.value, len = parseInt(value.length);
    if (len == 0){
      this.setData({
        'serchListF': [],
        'serchListA': [],
        'isList': false,
        'isListMsg': '在这里您可以检索您想要的',
      })
    }

   

  },
  showDetail: function (event){

    let that = this;

    var upmarkid = event.currentTarget.dataset.upmarkid;
    var requirementid = event.currentTarget.dataset.requir;

    var userid = that.data.userInfo.id;
 
    wx.navigateTo({
      url: "/page/component/pages/pagexdd/pagexdd?m=" + upmarkid + "&r=" + requirementid ,
    })

  }
  ,
  serchInfo: function(event) {

    let that = this;

    var search = that.data.serchInputValue

    if (search == '') {

      wx.showToast({
        title: '请输入检索条件',
        image: '/image/icon_warn.png',
        duration: 1500,
        success: function() {}
      })

      return false;
    }

    wx.showLoading({
      title: '检索中...',
      mask: true,
    })

  
 
    var url = config.requestUrl;

      var userid = that.data.userInfo.id;
     
    // var search = '冯';
    var data = {
      code_: 'x_getSerchInfo',
      endRow1: 0,
      endRow2: 0,
      itemsPerPage: 10,
      userid: userid,
      search: encodeURIComponent(search),
      serchListId_1: 'serch_list_1',
      serchListId_2: 'serch_list_2',
    }

    rRequest.doRequest(url, data, that, function(rdata) {
      that.setData({
        'serchListF': [],
        'serchListA': [],
        'isList': false,
        'isListMsg': '很抱歉没有检索到您要找的',
      })
    
      if (rdata.info.serchListIdinfo_1.infolist) {
        that.setData({
          'serchListF': rdata.info.serchListIdinfo_1.infolist,
          'isList': true,
          'isListMsg': '',
        })
        var requirementArr = [];
        for (let x = 0; x < rdata.info.serchListIdinfo_1.infolist.length; x++) {

          var actiontyArr = [];

          for (let i = 0; i < rdata.info.serchListIdinfo_1.infolist[x].friendrequirement.length; i++) {
            actiontyArr.push(rdata.info.serchListIdinfo_1.infolist[x].friendrequirement[i].actiontypename);
          }

          requirementArr.push(actiontyArr);


        }


        for (let x = 0; x < requirementArr.length; x++) {
          for (let i = 0; i < requirementArr[x].length; i++) {
            WxParse.wxParse('actionty' + i, 'html', requirementArr[x][i], that);
            if (i === requirementArr[x].length - 1) {
              WxParse.wxParseTemArray("actiontyTemArray", 'actionty', requirementArr[x].length, that)
            }
          }
        }
        that.setData({
          'requirementArr': requirementArr,
        })



      }
      if (rdata.info.serchListIdinfo_2.infolist) {
        that.setData({

          'serchListA': rdata.info.serchListIdinfo_2.infolist,
          'isList': true,
          'isListMsg': '',
        })
      }
    
 


      wx.hideLoading();
    })

  },
  moreactive: function(event) {
  var friendUserId =   event.currentTarget.dataset.fu;
    var friendUserName = event.currentTarget.dataset.fn; 

    wx.navigateTo({
      url: '/page/component/pages/pageserch/serchmoref/serchmoref?fu=' + friendUserId + "&fn=" + friendUserName
    })
  }
})