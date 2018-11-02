/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地c址
 * API: 接口路径
 * 
 */

let baseUrl = ''; 
let routerMode = 'hash';
let imgBaseUrl;


if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'http://tweb.fundog.cn';
	baseUrl = '/apis'
  	imgBaseUrl = 'http://tweb.fundog.cn/img/';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://tweb.fundog.cn';
  	imgBaseUrl = 'http://tweb.fundog.cn/img/';
}

let API = {
	login: baseUrl + "/auth/login", //登录
	logout: baseUrl + "/auth/logout", //退出登录
	app_navtab: baseUrl + "/home/app_navtab", //底部tabBar
	home_data: baseUrl + "/home/home_data", //首页
	baseinfo: baseUrl + "/auth/baseinfo", //个人中心入口列表
	left_category_data: baseUrl + "/category/left_category_data", //分类列表tab
	right_category_data: baseUrl + "/category/right_category_data", //分类商品
	cart_index_v: baseUrl + "/cart/index_v", //购物车
	cart_update: baseUrl + "/cart/update", //购物车改变数量
	cart_check: baseUrl + "/cart/update_check", //购物车改变选中状态
	wscart_index: baseUrl + "/wscart/index", //采购清单
	wscart_update: baseUrl + "/wscart/update", //采购清单改变数量
	wscart_check: baseUrl + "/wscart/update_check", //采购清单改变选中状态
	collect_add: baseUrl + "/collect/add", //收藏
	cart_delete: baseUrl + "/cart/delete", //删除购物车
	wscart_delete: baseUrl + "/wscart/delete", //删除采购订单
	bupload_single: baseUrl + "/bupload/single", //上传头像
	user_modifyinfo: baseUrl + "/user/modifyinfo", //上传头像、修改昵称
	order_index: baseUrl + "/order/index", //订单列表
	order_detail: baseUrl + "/order/detail", //订单详情
	order_delete: baseUrl + "/order/delete", //删除订单
	order_redo: baseUrl + "/order/redo", //再次购买
	collect_index: baseUrl + "/collect/index", //收藏
	collect_cancel: baseUrl + "/collect/cancel", //删除收藏
	address_index: baseUrl + "/address/index", //地址列表
	address_set_default: baseUrl + "/address/set_default", //默认地址
}
export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	API,
}