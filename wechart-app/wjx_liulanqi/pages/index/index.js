//index.js
//获取应用实例
var app = getApp();

var staticData = [{
	text: "百度一下",
	img: "https://qr.youzhis.cn/img/baidu.jpg",
	url: 'https://baidu.com'
},
{
	text: "京东",
	img: "",
	url: 'https://sp.m.jd.com/'
},
{
	text: "网易",
	img: "",
	url: 'https://3g.163.com'
},
{
	text: "网盘搜索",
	img: "",
	url: 'https://www.xilinjie.com/'
},
{
	text: "新闻头条",
	img: "",
	url: 'https://xw.qq.com/'
},
{
	text: "读书",
	img: "",
	url: 'https://m.hao123.com/novel?z=2&page=index_cxv2'
},
{
	text: "豆瓣",
	img: "",
	url: 'https://m.douban.com'
}];

Page({
	data: {

		fixedData: [

		],
		itemData: [],
		defaultImg: '/img/jia.png', //默认图片
		isLayer: false, //是否弹窗
		endTime: 0,
		startTime: 0
	},


	//按钮，点击开始搜索
	formSubmit: function (e) {
		var that = this;
		var that = this;
		var keys = e.detail.value.key;
		if (keys == undefined) {
			keys = "";
		}
		//判断是否为ip地址
		var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
		//是ip地址
		if (reg.test(keys)) {
			var url = '/wjx_liulanqi/pages/detail/index?url=' + keys;
		} else {
			var url = '/wjx_liulanqi/pages/detail/index?keys=' + keys;
		}
		wx.navigateTo({
			url: url
		})
	},
	//判断是否是url地址
	isUrl: function (ip) {
		var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
		return reg.test(ip);
	},
	onLoad: function () {
		console.log(app.siteInfo.siteroot);
		var self = this;
		wx.getStorage({
			key: 'item',
			success: function (res) {
			},
			fail: function (e) {

				for (var i in staticData) {
					staticData[i].id = i;
				}

				wx.setStorage({
					key: 'item',
					data: staticData,
				})
				//赋值列表数据
				self.setItemData();
			}
		})

		//赋值列表数据
		this.setItemData();

	},
	setItemData: function () {
		var self = this;
		wx.getStorage({
			key: 'item',
			success: function (res) {
				self.setData({
					itemData: res.data
				})
			},
		})
	},
	onShareAppMessage: function (e) {
		var text = '小程序版浏览器，打开即可使用，快来试试吧';
		return {
			title: text,
			path: '/pages/index/index'
		}
	},
	/**
	 * 添加项目，打开弹窗
	 */
	addBtn: function () {
		this.setData({
			isLayer: true
		});
	},
	/**
	 * 弹窗关闭
	 */
	layerOut: function () {
		this.setData({
			isLayer: false
		});
	},
	/**
	 * 添加网址提交，数据本地存储
	 */
	addSubmit: function (e) {
		var self = this;
		var text = e.detail.value.text;
		var url = e.detail.value.url;
		if (text == "" || url == "") {
			wx.showToast({
				title: "网址和文字必填！！！",
				icon: 'none',
				mask: true
			});
			return false;
		}
		if (!this.isUrl(url)) {
			wx.showToast({
				title: "输入的网址必须是url地址，且包含http://",
				icon: 'none',
				mask: true
			});
			return false;
		}
		//将获取的数据本地存储
		var newData = [{
			text: text,
			img: "",
			url: url,
			id: 0 //存一个id便于删除。。
		}];

		//获取以前的存储旧数据，并将新数据追加进数组
		var getData = [];
		wx.getStorage({
			key: 'item',
			success: function (res) {
				//获取旧数据
				getData = res.data;
				//空数组的从零开始
				if (getData.length > 0) {
					var newId = res.data[res.data.length - 1].id + 1; //获取新id
					newData[0].id = newId;
				}
				//新旧数据拼接
				var data = getData.concat(newData);
				//更新本地存储数据
				wx.setStorage({
					key: 'item',
					data: data,
				})



			}, fail: function () {
				wx.setStorage({
					key: 'item',
					data: newData,
				})
			}, complete: function () {
				//赋值列表数据
				self.setItemData();
			}
		})

		//去掉弹窗
		this.setData({
			isLayer: false
		});



	},
	/**
	 * 删除
	 */
	delete: function (e) {
		var id = e.currentTarget.dataset.id;
		var self = this;

		wx.showModal({
			title: '提示',
			content: '确认要删除吗',
			success: function (res) {
				if (!res.confirm) {
					return false;
				}
				wx.getStorage({
					key: 'item',
					success: function (res) {
						var getData = res.data;

						for (var index in getData) {

							if (getData[index].id == id) {
								getData.splice(index, 1);
							}

						}
						wx.setStorage({
							key: 'item',
							data: getData,
						})

						//赋值列表数据
						self.setItemData();
					},
				})
			}

		})

	},
	deleteNo: function () {
		wx.showToast({
			title: '固定列表不可以删除',
			icon: 'none'
		})
	},
	location: function (e) {

		var url = e.currentTarget.dataset.url;

		if (this.data.endTime - this.data.startTime < 350) {
			wx.navigateTo({
				url: '/wjx_liulanqi/pages/detail/index?url=' + url,
			})
		}

	},
	bindTouchStart: function (e) {

		this.setData({
			startTime: e.timeStamp
		});

	},
	bindTouchEnd: function (e) {

		this.setData({
			endTime: e.timeStamp
		});
	}
})
