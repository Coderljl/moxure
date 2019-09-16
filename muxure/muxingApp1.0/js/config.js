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
	userinfo: muxingHost + 'user/get',
	getVerifyCode: muxingHost + 'login/getVerifyCode', //获取验证码
	
	userinfo: muxingHost + 'user/get',
	user_modify: muxingHost + 'user/modify', //修改用户信息
	user_modify_pwd: muxingHost + 'user/modifypwd', //修改用户密码
	// 	user_registerdevice:muxingHost+'user/registerdevice',//注册设备信息

	//获取token
	// 	token1:muxingHost+'sys/token',//获取公共访问令牌
	refreshtoken: muxingHost + 'sys/refreshtoken/', //刷新令牌
	version: muxingHost + 'app/version', //获取软件版本信息
	update:muxingHost+ 'app/update',//版本更新
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

	relationusers_event: 'relationusers_event', //关系用户列表
	userinfo_event: 'userinfo_event', //更新用户信息
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
