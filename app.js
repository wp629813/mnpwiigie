//app.js
var config = require('/config.js')
var WXBizDataCrypt = require('/utils/WXBizDataCrypt.js')
var rCommon = require('/utils/rCommon.js');
var rRequest = require('/utils/rRequest.js');
App({

  //启动时执行的初始化工作
  onLaunch: function() {
    this.getSystemInfo();

    this.userLogin();
  },
  globalData: {
    userInfo: null, //用户信息--wiigie
    userIData: false,
    userWxInfo: null, //用户微信信息--wiigie
    systemInfo: null,
    //登录信息
    loginInfo: null, //用户登录信息{appId:,sessionKey}
    cacheInfo: {
      pagexdd_p_1: null,


    },


    orderData: null,
    /**赋值在 pagexdd.js中 sureSelect //funtion */
    giftData: null,
    /**赋值在 giftdetar.js中 receiveAddress //funtion */

    /** 底部按钮的高度*/
    bottomBtnHeight: 110, //flex-bottom  同步修改
    /** */

    tabbarHeight: 110, //pagetabbar.wxss 同步修改
    tabbar: {
      "color": "#000000",
      "selectedColor": "#00c003",
      "backgroundColor": "#ffffff",
      "borderStyle": "black",
      "list": [{
          "pagePath": "/pages/pagehome/pagehome",
          "text": "好友冰鉴",
          "iconPath": "/image/home_0.png",
          "selectedIconPath": "/image/home_1.png"
        },
        {
          "pagePath": "/pages/pagegoods/pagegoods",
          "text": "好物精选",
          "iconPath": "/image/goods_0.png",
          "selectedIconPath": "/image/goods_1.png"
        },
        {
          "pagePath": "/pages/pagemy/pagemy",
          "text": "我的",
          "iconPath": "/image/my_0.png",
          "selectedIconPath": "/image/my_1.png"
        }
      ],
      position: "bottom"
    }


  },
  //获取设备信息
  getSystemInfo: function() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
      },
      fail: res => {},
      complete: res => {},
    })
  },


  userInfoResetCallBak: function(res) {
    var that = this;

  },
  //先登录
  userLogin: function() {
    var that = this;
    wx.login({
      success: res => {
        var url = config.loginUrl;
        var data = {
          code: res.code
        }
        rRequest.doRequest(url, data, that, function(rdata) {

          if (rdata.info) {

            that.globalData.loginInfo = rdata.info
            that.getSettingInfo();
          }
        })

      }
    })
  },
  getSettingInfo: function() { // 查看是否授权
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          that.getUsersInfo();
        } else {
          console.log("用户信息未授权--")
        }
      },
      fail: function(res) {
        console.log("授权失败--")
      },
    })
  },

  getUsersInfo: function() {
    var that = this;
    wx.getUserInfo({
      success: function(res) {

        that.globalData.userWxInfo = res.userInfo;


        var appId = that.globalData.loginInfo.appId
        var sessionKey = that.globalData.loginInfo.sessionKey
        var pc = new WXBizDataCrypt(appId, sessionKey)
        var data = pc.decryptData(res.encryptedData, res.iv)
        var url = config.userInfoUrl;
        var data = {
          miniopenId: data.openId,
          nickname: encodeURIComponent(data.nickName),
          sex: data.gender,
          city: encodeURIComponent(data.city),
          country: encodeURIComponent(data.country),
          province: encodeURIComponent(data.province),
          avatarUrl: data.avatarUrl,
          unionid: data.unionId,
        }
        rRequest.doRequest(url, data, that, function(rdata) {

          if (rdata.info) {
            that.globalData.userInfo = rdata.info;
            that.globalData.userIData = true;

            var pages = getCurrentPages() //获取加载的页面

            var currentPage = pages[pages.length - 1] //获取当前页面的对象

            var url = currentPage.route //当前页面url

            if ("page/component/pages/pagegift/giftreceive/giftreceive" == url) {
              var options = currentPage.options
              var giftRecordId = options.gr;
              var fuserid = options.fu;
              wx.reLaunch({
                url: '/page/component/pages/pagegift/giftreceive/giftreceive?gr=' + giftRecordId + '& fu=' + fuserid,
              })

            }
            /**详情 */
            if ("page/component/pages/pagexdd/pagexdd" == url) {
              var options = currentPage.options
              var fm = options.m;
              var r = options.r;
              wx.navigateTo({
                url: "/page/component/pages/pagexdd/pagexdd?m=" + fm + "&r=" + r,
              })
            }
            if ("page/component/pages/pagecount/counthome/counthome" == url) {

              wx.reLaunch({
                url: "/page/component/pages/pagecount/counthome/counthome",
              })

            }
            if ("page/component/pages/pagegift/giftgivesucc/giftgivesucc" == url) {
              var options = currentPage.options
              var gr = options.gr;
              wx.reLaunch({
                url: "/page/component/pages/pagegift/giftgivesucc/giftgivesucc?gr=" + gr,
              })

            }

            if ("pages/pagewelcome/pagewelcome" == url) {
              wx.switchTab({
                url: '/pages/pagehome/pagehome',
              })

            }
            rCommon.userDefAddr.getUserDefAddr(that, rdata.info.id);


          }


        })

      },
      fail: function(e) {

        console.log("--------fail---------" + e)
      },
      complete: function(e) {

        console.log("--------complete---------")
      }
    })
  },


  /**导航栏 */
  editTabBar: function() {
    var tabbar = this.globalData.tabbar,
      currentPages = getCurrentPages(),
      _this = currentPages[currentPages.length - 1],
      pagePath = _this.data.tabbarPage
    if (pagePath) {


    } else {
      pagePath = _this.__route__;
    }

    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    var windowWidth = this.globalData.systemInfo.windowWidth
    var windowHeight = this.globalData.systemInfo.windowHeight

    var percent = windowWidth / 750
    var scrollHeight = windowHeight - this.globalData.tabbarHeight * percent
    _this.setData({
      tabbar: tabbar,
      'pageScrollView.height': scrollHeight + "px"
    });


  },
  editBottom: function() {
    var currentPages = getCurrentPages(),
      this_ = currentPages[currentPages.length - 1];

    var windowWidth = this.globalData.systemInfo.windowWidth
    var windowHeight = this.globalData.systemInfo.windowHeight

    var percent = windowWidth / 750
    var scrollHeight = windowHeight - this.globalData.bottomBtnHeight * percent

    if (this_.data.pageview.bottomView) {


      this_.setData({
        'pageview.scrollviewHeight': scrollHeight + "px"
      });
    }

  }

})