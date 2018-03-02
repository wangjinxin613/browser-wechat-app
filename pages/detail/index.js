//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		key:'',
		url_type:'1'
	},

	onLoad: function (e) {
		console.log(e);
		var that = this;
		wx.showLoading({
			title: '加载中',
			mask: true
		})
		setTimeout(function () {
			wx.hideLoading();
		}, 2000)
		that.setData({
			key:e.keys,
			url_type:e.type
		})
		
		console.log(that.data);
	},

	onShareAppMessage: function (e) {

		var text = '小程序版浏览器，打开即可使用，快来试试吧';


		return {
			title: text,
			path: '/pages/index/index',

		}
	},

})
