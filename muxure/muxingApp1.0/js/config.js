/*******************************************
 * 
 * app config信息 
 * 保存URL 常量 设置参数等
 * 
 ******************************************/

//var muxingHost = "www.muxingtianxia.com";//正式
var myUrl = muxingHost; //调试用，上线删除
var muxingHost = "http://182.148.17.119:9000/muxingSystem/"; //调试用，上线删除
//var muxingHost = "http://www.moxure.com:9000/muxingSystem/";


//var _muxingAvatar='https://srappcloud.blob.core.chinacloudapi.cn/avatar/';
var config = {
	version: '0.0.1',
	grant_type_password: 'password', //登录授权方式
	grant_type_client: 'client_credentials', //客户端授权
	basic: 'Basic', //基本认证
	bearer: 'Bearer',
	datatype: 'json', //数据返回类型json
	im_url: 'im-api.easemob.com', //im url连接地址
	im_appkey: 'chueitou#demo', //im appkey
	avatar: '../../img/default_avatar.jpg', //默认头像地址
	version_type: 'v3'
};
//本地存储key
var localstoragekey = {
	token: 'token',
	version: 'version',
	lauchFlag: 'lauchFlag',
	userinfo: 'userinfo',
	wallet:'wallet',
	chatsession: 'chatsession',
	chathistory: 'chathistory_',
	searchtemp: 'searchtemp',
	islogin: 'islogin', //存储是否已登录
	avatar: 'avatar', //头像
	im_user: 'im', //im用户相关,
	LOCAL_STROAGE_BRANDCATE: "LOCAL_STROAGE_BRANDCATE", //品牌分类KEY
	LOCAL_STROAGE_BRANDLIST: "LOCAL_STROAGE_BRANDLIST", //品牌列表KEY
	sys_message: 'sys_message_', //系统消息
	search_obj: 'search_obj', //查询对象
	friends_id: '', //好友编号
	product_id: 'product_id', //产品编号
	goods_class: 'serListIcon', //商品列表显示方式
	search_category: 'search_category', //高级搜索分类
	fingerprintPayment: 'fingerprintPayment'
}
var STAT = {
	SUCCESS: 0,
	FAILED: -1,
}
//url
var url = {

	// 	token:muxingHost+ 'token',
	//商品,购物相关
	goodsdetail: muxingHost + 'api/getGoodsDetail.do',
	goodsDetailByID: muxingHost + 'mall/getGoodsByID',
	goodsList: muxingHost + 'mall/getGoods', 
	goodsDo: muxingHost + 'goods.do',
	addGoods: muxingHost + 'goods/addGoods',//添加商品
	selectAllByUserId: muxingHost + 'mall/selectAllByUserId',//获取商家的商品
	updateGoodsInfoById: muxingHost + 'goods/updateGoodsInfoById',//根据商品id修改商品信息

	orderLists: muxingHost + 'user/getOrderList', //获取用户订单列表
	addOrderList: muxingHost + 'user/setOrder', //创建用户订单
	payOrder: muxingHost + 'user/orderPay', //支付用户订单

	walletDeposit: muxingHost + 'wallet/deposit', //充值
	walletWithdraw: muxingHost + 'wallet/withdraw', //提现
	
	//分享相关
	addShareHistory: muxingHost + 'share/addShareHistory',//用户通过分享的链接访问
	addShareInfo: muxingHost + 'share/addShareInfo',//新增分享记录
	getShareInfo: muxingHost + 'share/getShareInfo',//获取分享信息 
	
	// 	addresslist:muxingHost+'api/User',//获取用户地址列表

	// 	//couponlist:muxingHost+'couponlist/', //获取优惠券
	// 	//couponone:muxingHost+'coupon/',		//获取优惠券详情 加参数得到明细
	// 	exchangelist:muxingHost+'rights/exchangelist/',//获取折扣兑换券列表
	// 	exchangelistisexchange:muxingHost+'rights/exchangelistisexchange/',//获取折扣兑换券列表
	// 	exchangeintegrationlist:muxingHost+'rights/exchangeintegrationlist/',//积分兑换券列表
	// 	exchangeone:muxingHost+'rights/exchange/',	//兑换一张兑换券
	// 	getexchangedetail:muxingHost+'rights/getexchange/',
	// 	pointslist:muxingHost+'user/integrationlist/',//获取所有积分列表 加参数获取消费还是获得
	points: muxingHost + 'user/getWallet', //获取当前用户的钱包信息
	tradeHistory: muxingHost + '/user/getTradeHistory', //获取当前用户的交易记录
	// 	checkin:muxingHost+'user/daily',//签到
	couponlist: muxingHost + 'rights/couponlist/', //兑换券

	//用户相关
	loginByPhone: muxingHost + 'login/loginByPhone', //用户登录
	loginByPwd: muxingHost + 'login/loginByPwd', //用户密码登录
	WeChatLogin: muxingHost + 'login/loginByWeChat', //微信授权登录

	qqLogin: muxingHost + 'login/loginByQQ', //QQ授权登录
	sinaLogin: muxingHost + 'login/loginBySina', //微博授权登录
	alipayLogin:muxingHost+'login/loginByAlipay',//支付宝授权登录
	alipayInfo:muxingHost+'alipay/sign/android',//获取支付宝授权登录预处理信息
	logout: muxingHost + 'login/logout', //注销登录
	register: muxingHost + 'login/register', //用户注册
	collections: muxingHost + '/user/getCollectionByUserCode', //获取用户收藏
	updateUserinfo: muxingHost + '/user/updateUserInfo', //更新用户资料
	
	getShopById: muxingHost + 'shop/getShopById',//根据用户id获取商家信息
	
	
	addShop: muxingHost + 'shop/addShop',//新增商户信息 
	updateShopById: muxingHost + 'shop/updateShopById',//修改商户信息
	
	userlogout: muxingHost + 'login/logout', //注销登录
	userinfo: muxingHost + 'user/get',
	// 	usercustomserviceinfo:muxingHost+'user/getcustomservicebyid/',//获取专属客服信息
	// 	usersessions:muxingHost+'user/sessions',

	getVerifyCode: muxingHost + 'login/getVerifyCode', //获取验证码
	
	
	userinfo: muxingHost + 'user/get',
	getOrderForStatus: muxingHost + '/user/getOrderForStatus', //根据状态获取订单
	getCollectionByUserCode: muxingHost + 'user/getCollectionByUserCode',//获取用户的收藏
	user_modify: muxingHost + 'user/modify', //修改用户信息
	user_modify_pwd: muxingHost + 'user/modifypwd', //修改用户密码
	user_address_edit: muxingHost + 'user/address', //编辑用户地址
	// 	user_address_getdelete:muxingHost+'user/address/',//获取用户地址详细和删除同一地址
	// 	user_address_addressisdefault:muxingHost+'user/addressisdefault/',//设置默认配送地址
	user_findpwd: muxingHost + 'user/findpwd', //找回密码
	// 	user_default_address:muxingHost+'user/address/defaultaddress',//默认配送地址
	// 	user_registerdevice:muxingHost+'user/registerdevice',//注册设备信息

	//获取token
	// 	token1:muxingHost+'sys/token',//获取公共访问令牌
	refreshtoken: muxingHost + 'sys/refreshtoken/', //刷新令牌
	version: muxingHost + 'app/version', //获取软件版本信息
	update:muxingHost+ 'app/update',//版本更新

	// 	delete_order:muxingHost+'order/delete/',//删除订单
	// 	cancel_order:muxingHost+'order/cancelorder/',//取消订单
	activeList:muxingHost + 'active/activeList',//活动列表
	activeListByUserId:muxingHost + 'active/activeListByUserId',//根据用户id获取活动列表
	addActive:muxingHost + 'active/addActive',//新增活动
	getActiveById:muxingHost + 'active/getActiveById',//依据id获取活动详情
	handBillList:muxingHost + 'handBill/handBillList',//传单列表
	getHandBillById:muxingHost +  'handBill/getHandBillById',//依据id获取电子传单
	addHandBill:muxingHost + 'handBill/addHandBill',//新增传单
	surveyList:muxingHost + 'survey/getAllSurvey',//问卷列表
	addSurvey:muxingHost + 'survey/addSurvey',//新增问卷
	addResult:muxingHost + 'survey/addResult',//新增问卷答案
	getSurveyById:muxingHost + 'survey/getSurveyById',
	meetList:muxingHost + 'Meet/meetList' ,//获取遇见列表
	addMeet:muxingHost + '/Meet/addMeet', //新增遇见
	addComment:muxingHost + '/Meet/addComment',//新增遇见评论
	addReply:muxingHost + '/Meet/addReply',//新增评论回复
	commentList:muxingHost + '/Meet/commentList',//获取评论列表
	replyList:muxingHost + '/Meet/replyList',//获取回复列表
	updateMeetLikeCount:muxingHost + '/Meet/updateMeetLikeCount',//添加喜欢（遇见里面点爱心取消爱心的功能）
	getMeetById:muxingHost + 'Meet/getMeetById',//通过id获取遇见详情
	fileUpload:muxingHost + 'common/fileUpload'//文件上传  //参数type代表文件类型 0：商品图片；1：传单图片；2：传单结尾小视频；3：头像图片；4：活动图；5：遇见图片 ...（如有需求，再增加）
}
var wechatLogin = {
	url: url.WeChatLogin,
	scope: 'snsapi_userinfo',
	state: 'authorize test',
	appid: 'wx26218f6aab6320ec'
}
//自定义事件
var eventkey = {
	sendmsg_event: 'sendmsg', //发送消息事件
	updatesession_event: 'updatesession', //关系会话事件
	chat_event: 'chat_event', //更新聊天信息
	updatetip_event: 'updatetip_event', //更新消息tip
	closesplash_event: 'closesplash_event', //关闭splash页面
	initwindow_event: 'initwindow_event', //初始化窗体
	iminit_event: 'iminit_event', //IM初始化
	newsdetail_event: 'newsdetail_event', //新闻详情
	goodsdetail_event: 'goodsdetail_event', //商品详情
	productlist_event: 'productlist_event', //商品列表
	productlistadvanced_envent: 'productlistadvanced_envent', //商品高级查询时传递的数据
	searchadvancedbackbrand_envent: 'searchadvancedbackbrand_envent', //得到返回的品牌
	searchadvancedbackcategory_envent: 'searchadvancedbackbrand_envent', //得到返回的分类
	searchadvancedbrand_event: 'searchadvancedbrand_event', //查找时传递的品牌
	searchadvancedcategory_event: 'searchadvancedcategory_event', //查找时传递的分类
	relationusers_event: 'relationusers_event', //关系用户列表
	tripdetail_event: 'tripdetail_event', //旅行团详细事件
	wishdetail_event: 'wishdetail_event', //心愿单详细
	userinfo_event: 'userinfo_event', //更新用户信息
	addressisselect_envent: 'addressisselect_envent', //进入地址列表,是否是要点击返回的
	addressselect_event: 'addressselect_event', //进入选择地址返回信息
	//loginsuccess_event:'loginsuccess_event'//进入某个页面时,没有登录,跳转登录后回调
	exchangedetail_event: 'exchangedetail_event', //进入兑换券详情传递的参数
	exchangelist_event: 'exchangelist_event', //兑换券列表(两种 类型,积分兑换券(10),折扣兑换券(1) ,便于扩展,传的数据就是类型)
	refresh_event: 'refresh_event', //页面刷新事件
	cart_event: 'cart_event', //购物车刷新事件
	grid_line_event: 'grid_line_event' //商品列表
};
//IM相关
var imkey = {
	chat: 'chat', //单聊
	groupchat: 'groupchat', //群聊
	text_msg: 'text', //文字
	emotion_msg: 'emotion', //表情
	picture_msg: 'image', //图片
	audio_msg: 'audio', //语音
	location_msg: 'location', //位置
	file_msg: 'file', //文件
	video_msg: 'video' //视频
};
//需要登录后才能查看的页面
var loginUrl = ['right_main', 'relationship'];

//需要推送的action
var push_action = ['tourguideaudituser', 'tourguideadduser', 'tourguidecreate', 'allowfriends', 'addfriends',
	'tourguideaudit', 'tourguidecoupon'
];

//获得屏幕宽度
var watchWidth = document.documentElement.clientWidth;
//获得屏幕高度
var watchHeight = document.documentElement.clientHeight;

//支付宝服务
var ALIPAYSERVER = muxingHost+'alipay/appPay?orderNo=';
//var ALIPAYSERVER='http://10.20.6.123:8080/muxingSystem/Order/CreateHuoDongOrder.do?total=';
//微信服务      
var WXPAYSERVER = 'http://demo.dcloud.net.cn/helloh5/payment/wxpay.php?total=';
