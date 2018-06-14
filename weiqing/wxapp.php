<?php
/**
 * wjx_liulanqi模块小程序接口定义
 *
 * @author 18841692393
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class Wjx_liulanqiModuleWxapp extends WeModuleWxapp {
	public function doPageTest(){
		global $_GPC, $_W;
		$errno = 0;
		$message = '返回消息';
		$data = array();
		return $this->result($errno, $message, $data);
	}
}