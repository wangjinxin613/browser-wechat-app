//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		url: '', //url地址
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
		if (e.url) {
			var url = app.siteInfo.siteroot + '/addons/wjx_liulanqi/images/index.html?key=' + e.keys + '&url=' + e.url;
		} else {
			var url = app.siteInfo.siteroot + '/addons/wjx_liulanqi/images/index.html?key=' + e.keys;
		}
		console.log(url);
		that.setData({

			url: url

		})

		console.log(e.keys);
	},

	onShareAppMessage: function (e) {

		var text = '小程序版浏览器，打开即可使用，快来试试吧';


		return {
			title: text,
			path: '/pages/index/index',

		}
	},

})
