var host = ""
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
  
  orderPayUrl: `https://${host}/wiigie/xcx/prePayOrder`,

  orderCPayUrl: `https://${host}/wiigie/xcx/preContinuePayOrder`,

  commissionPayUrl: `https://${host}/wiigie/xcx/preCommission`,
 
  socketUrl: `wss://${host}/wiigie/ws`,

  // 上传文件接口
  uploadFileUrl: `https://${host}/wiigie/xcx/upload`,


  // 用code换取openId
  openIdUrl: `https://${host}/openid`,

  // 测试的信道服务接口
  tunnelUrl: `https://${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `https://${host}/templateMessage`,

  

  // 下载示例图片接口
  downloadExampleUrl: `https://${host}/static/weapp.jpg`,



  routeCicleConfig:{

    circleYd: "#b1b1b1",//b1b1b1
    circleHf:"#e21100",
    L_ISCLOSE_TOOPEN2: "#d2d0d0",
    circleRM:2/5,
    headImage:"data:image/png;base64,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"
  }

};

module.exports = config