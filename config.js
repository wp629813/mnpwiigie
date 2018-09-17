var host = "wx.yihuby.com"
var config = {

  // 下面的地址配合云端 Server 工作
  host,
  // 请求地址，用于会话
  requestUrl: `https://${host}/wiigie/xcx/xcxgetinfo`,

  // 登录地址，用于建立会话
  loginUrl: `https://${host}/wiigie/xcx/xcxlogin`,

  //  
  userInfoUrl: `https://${host}/wiigie/xcx/xcxUserInfo`,
  
  serverUrl:`https://${host}/wiigie`,
  ///wiigie/logo/wiigie_logo.jpg

  imageUrl: `https://${host}/wiigie/image/getImage?addr=`,
  

  // 用code换取openId
  openIdUrl: `https://${host}/openid`,

  // 测试的信道服务接口
  tunnelUrl: `https://${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `https://${host}/templateMessage`,

  // 上传文件接口
  uploadFileUrl: `https://${host}/upload`,

  // 下载示例图片接口
  downloadExampleUrl: `https://${host}/static/weapp.jpg`,



  routeCicleConfig:{

    circleYd:"#b1b1b1"
  }

};

module.exports = config