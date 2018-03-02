//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animationData: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  formSubmit: function (e) {
	  var that = this;
	 
		  	var that = this;
			    var url =  e.detail.value.key;
			wx.navigateTo({
				url: '/pages/detail/index?keys='+url+"&type=1"
			})

  },
  onLoad: function () {
	  var animation = wx.createAnimation({
		  duration: 2000,
		  transformOrigin: "50% 50%",
		  timingFunction: 'linear',
	  })
	  this.animation = animation

	  animation.rotate(360).step()
	
	  this.setData({
		  animationData: animation.export()
	  })

  },
  onShareAppMessage: function (e) {

	  var text = '小程序版浏览器，打开即可使用，快来试试吧';


	  return {
		  title: text,
		  path: '/pages/index/index',

	  }
  },
 
 
})
