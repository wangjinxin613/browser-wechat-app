<?php
/**
 * wjx_liulanqi模块微站定义
 *
 * @author 18841692393
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class Wjx_liulanqiModuleSite extends WeModuleSite {


	public function doWebIcons() {
		//这个操作被定义用来呈现 管理中心导航菜单
	}
	public function doWebSetting() {
		//这个操作被定义用来呈现 管理中心导航菜单
	}
    public function doWebIndex() {

        include $this->template('index');
    }

}