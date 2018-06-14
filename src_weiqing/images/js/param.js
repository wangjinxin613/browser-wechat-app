/**
 * 获得请求参数的jquery全局插件
 */

$.extend({
	getParam: function(key) {
	
		//获得当前的url
		var url = location.href;
		var index = url.indexOf('?'); //返回问好的位置
		var str = url.substring(index + 1); //截取？后的参数字符串
		//根据&分解字符串
		var arr = str.split('&');
		//遍历
		for(var i = 0; i < arr.length; i++) {
		
			var param = arr[i].split('=');
			if(param[0] == key) {
				return param[1];
			}
		}

	}
});