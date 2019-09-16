/***************************************
 *
 * js公共类 该类库依赖于mui.js
 *
 *
 **************************************/
(function(window) {
	var muxingjs = muxingjs || {};
	muxingjs.data = muxingjs.data || {}; //当前运行参数
	muxingjs.vesion = '0.0.0.1';
	muxingjs.clientId = '000000'; //客户端编号
	muxingjs.clientSect = '000000'; //验证
	muxingjs.localstorage = muxingjs.localstorage || {}; //本地存储对象最大支持5M
	//登录用户信息
	muxingjs.user = function() {
		var _user = muxingjs.getLocalStorage(localstoragekey.userinfo, 'json');
		// if(_user == null){
		// 	_user = {"userId":112,"userCode":"test","userPhone":null,"userEmail":null,"userNickname":"Mr.康巴什","userHeadImgUrl":"https://tfs.alipayobjects.com/images/partner/TB12lqJX3OJDuNjme6jXXbelpXa","userReqTime":"2019-05-05T16:34:37.000+0800","firstReceiveAddress":null,"createTime":"2019-05-05T16:34:37.000+0800","updateTime":"2019-05-05T16:34:37.000+0800","userSex":null,"otherId":null};
		// }	
		return _user;
	}
	//登录用户钱包信息
	muxingjs.wallet = function() {
		return muxingjs.getLocalStorage(localstoragekey.wallet, 'json');
	}
	//初始化参数
	muxingjs.init = function() {
		try {
			//从存储中加载本地信息
			var _token = muxingjs.getLocalStorage(localstoragekey.token, '');
			//为空 怎么处理
			// 			if (_token === null) {
			// 				muxingjs.gettoken1();
			// 			}

		} catch (ex) {
			console.log(ex);
		}
	}
	//#Id
	muxingjs.getById = function(id) {
		var tmps = mui('#' + id);
		return tmps != null ? tmps[0] : undefined;
	}
	
	//存储LocalStorage
	muxingjs.setLocalStorage = function(key, value) {
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}
		localStorage.setItem(key, value);
	}
	//获取LocalStorage type=json 或null
	muxingjs.getLocalStorage = function(key, type) {
		var value = localStorage.getItem(key);
		return type === 'json' ? JSON.parse(value) : value;
	}
	//删除key
	muxingjs.removeLocalStorage = function(key) {
		localStorage.removeItem(key);
	}
	muxingjs.ReplaceEnterToBr = function(text) {
		var i = 0;
		while (text.indexOf("\r\n") > -1) {
			text = text.replace("\r\n", "<br/>");
			i = i + 1;
			if (i > 100)
				break;
		}
		i = 0;
		while (text.indexOf("\n") > -1) {
			text = text.replace("\n", "<br/>");
			i = i + 1;
			if (i > 100)
				break;
		}
		return text;
	}
	//get 返回json
	muxingjs.ajaxGet = function(url, data, callback) {
		console.log(url);
		try {
			if (!muxingjs.IsNet()) {
				plus.nativeUI.toast('似乎与网络断开了连接，请检查网络设置！', {
					verticalAlign: 'top'
				});
				return;
			}
			var options = {
				url: url,
				dataType: config.datatype,
				type: 'GET',
				async: true,
				timeout: 3000,
				headers: {
					// 'Authorization': config.bearer + ' ' + muxingjs.token().access_token
				},
				data: data,
				success: callback,
				error: function(xhr, type, errorThrown) {
					muxingjs.ajaxError(xhr, type, errorThrown)
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			};
			mui.ajax(options);
		} catch (ex) {
			plus.nativeUI.closeWaiting();
			console.log(ex);
		}
	}
	/*封装ajax方法*/
	muxingjs.ajaxGet_wait = function(url, data, callback) {
		try {
			console.log(url);
			if (!muxingjs.IsNet()) {
				plus.nativeUI.toast('网络异常，请检查网络设置！');
				return;
			}
			var options = {
				url: url,
				dataType: config.datatype,
				type: 'GET',
				headers: {
					// 'Authorization': config.bearer + ' ' + muxingjs.token().access_token
				},
				data: data,
				timeout: 6000,
				success: callback,
				error: function(xhr, type, errorThrown) {
					muxingjs.ajaxError(xhr, type, errorThrown)
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting();
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			};
			mui.ajax(options);
		} catch (ex) {
			plus.nativeUI.showWaiting();
			console.log(ex);
		}

	}
	//post  
	muxingjs.ajaxPost_x3w = function(url, data, callback) {
		// console.log(url);
		try {
			if (!muxingjs.IsNet()) {
				plus.nativeUI.toast('似乎与网络断开了连接，请检查网络设置！', {
					verticalAlign: 'top'
				});
				return;
			}
			var options = {
				url: url,
				dataType: config.datatype,
				type: 'POST',
				contentType: 'application/x-www-form-urlencoded;charset=utf-8',
				headers: {
					//'Authorization': config.bearer + ' ' + muxingjs.token().access_token
					'deviceInfo': muxingjs.device().devuuid
				},
				data: data,
				timeout: 10000,
				success: callback,
				error: function(xhr, type, errorThrown) {
					muxingjs.ajaxError(xhr, type, errorThrown)
				},
				complete: function() {
					//plus.nativeUI.closeWaiting();
				}
			};
			mui.ajax(options);
		} catch (ex) {
			plus.nativeUI.closeWaiting();
			console.log(ex);
		}
	}
	muxingjs.ajaxError = function(xhr, type, errorThrown) {
		console.log(xhr.responseURL);
		if (type === 'timeout') {
			mui.toast('请求超时,稍后重试');
			return;
		}
		switch (xhr.status) {
			case 401:
				muxingjs.error(JSON.parse(xhr.responseText));
				muxingjs.Logout();
				break;
			case 403:
				alert("系统拒绝：您没有访问权限。");
				break;
			case 404:
				mui.toast("很抱歉，请求方法丢失或不存在！");
				break;
			case 500:
				mui.toast("很抱歉，服务器发生了错误，请稍后重试！");
				break;
			case 502:
				muxingjs.error(JSON.parse(xhr.responseText));
				break;
			case 503:
				mui.toast("很抱歉，服务器超时！");
				break;
			default:
				mui.toast("未知网络错误，请稍后重试！");
				break;
		}

	}
	//错误通用处理方法
	muxingjs.error = function(obj) {
		if (!obj) {
			return;
		}
		if (typeof(obj) === 'object') {
			if (obj.success) {
				return;
			}
			if (obj.code) {

			}
			plus.nativeUI.toast(obj.error);
			return;
		}
	}
	muxingjs.ajaxPost = function(url, data, callback) {
		try {
			console.log(url);
			if (!muxingjs.IsNet()) {
				mui.toast('网络异常，请检查网络设置！');
				return;
			}
			var options = {
				url: url,
				dataType: config.datatype,
				type: 'POST',
				contentType: 'application/json;charset=utf-8',
				headers: {
					//'Authorization': config.bearer + ' ' + muxingjs.token().access_token,
					'deviceInfo': muxingjs.device().devuuid //JSON.stringify(muxingjs.device())传对象需要转成字符串
				},
				data: JSON.stringify(data),
				timeout: 3000,
				success: callback,
				error: function(xhr, type, errorThrown) {
					muxingjs.ajaxError(xhr, type, errorThrown)
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			};
			mui.ajax(options);
		} catch (ex) {
			plus.nativeUI.closeWaiting();
			console.log(ex);
		}
	}
	//同步方法
	muxingjs.ajaxPost_Async = function(url, data, callback, istoken) {
		try {
			console.log(url);
			if (!muxingjs.IsNet()) {
				plus.nativeUI.toast('网络异常，请检查网络设置！');
				return;
			}
			var options = {
				url: url,
				dataType: config.datatype,
				async: false,
				type: 'POST',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify(data),
				timeout: 3000,
				success: callback,
				error: function(xhr, type, errorThrown) {
					if (type === 'timeout') {
						plus.nativeUI.toast('请求超时,稍后重试');
						return;
					}
					if (xhr.status === 401) {
						muxingjs.error(JSON.parse(xhr.responseText));
						muxingjs.Logout();
					} else if (xhr.status === 502) {
						muxingjs.error(JSON.parse(xhr.responseText));
					} else {
						var _json = JSON.parse(xhr.responseText);
						plus.nativeUI.toast(_json.error);
					}
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			};
			if (istoken) {
				options.headers = {
					'Authorization': config.bearer + ' ' + muxingjs.token().access_token
				};
			}
			mui.ajax(options);
		} catch (ex) {
			plus.nativeUI.closeWaiting();
			console.log(ex);
		}
	}
	//post 带提示框
	muxingjs.ajaxPost_wait = function(url, data, callback) {
		try {
			console.log(url);
			if (!muxingjs.IsNet()) {
				plus.nativeUI.toast('网络异常，请检查网络设置！');
				return;
			}
			var options = {
				url: url,
				dataType: config.datatype,
				type: 'POST',
				contentType: 'application/json;charset=UTF-8',
				headers: {
					'Authorization': config.bearer + ' ' + muxingjs.token().access_token
				},
				data: JSON.stringify(data),
				timeout: 3000,
				success: callback,
				error: function(xhr, type, errorThrown) {
					if (type === 'timeout') {
						plus.nativeUI.toast('请求超时,稍后重试');
						return;
					}
					if (xhr.status === 401) {
						muxingjs.error(JSON.parse(xhr.responseText));
						muxingjs.Logout();
					} else if (xhr.status === 502) {
						muxingjs.error(JSON.parse(xhr.responseText));
					} else {
						var _json = JSON.parse(xhr.responseText);
						plus.nativeUI.toast(_json.error);
					}
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting();
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			};
			mui.ajax(options);
		} catch (ex) {
			plus.nativeUI.showWaiting();
			console.log(ex);
		}
	}
	//获取用户信息
	muxingjs.getuserinfo = function(callback, refresh) {
		var options = {
			url: url.userinfo,
			dataType: config.datatype,
			headers: {
				'Authorization': config.bearer + ' ' + muxingjs.token().access_token
			},
			timeout: 3000,
			success: function(result, status, xhr) {
				if (result.success) {
					muxingjs.setLocalStorage(localstoragekey.userinfo, result.data);
					if (refresh) {
						callback(result.data);
					}
				} else {
					muxingjs.error(result);
				}
			},
			error: function(xhr, type, error) {
				if (type === 'timeout') {
					plus.nativeUI.toast('请求超时,稍后重试');
					return;
				}
				if (xhr.status === 401) {
					muxingjs.error(JSON.parse(xhr.responseText));
					muxingjs.Logout();
				} else if (xhr.status === 502) {
					muxingjs.error(JSON.parse(xhr.responseText));
				} else {
					var _json = JSON.parse(xhr.responseText);
					plus.nativeUI.toast(_json.error);
				}
			}
		};

		mui.ajax(options);
	}
	//根据im账号获取用户信息
	muxingjs.getuserbyim = function(fromid, callback) {
		var options = {
			url: url.userinfo_im + fromid,
			dataType: config.datatype,
			headers: {
				'Authorization': config.bearer + ' ' + muxingjs.token().access_token
			},
			async: false,
			success: function(result, status, xhr) {
				if (result.success) {
					callback(result.data);
				} else {
					muxingjs.error(result);
				}
			},
			error: function(xhr, type, error) {
				console.log(url.userinfo_im + fromid);
				console.log(xhr.responseText);
			}
		};

		mui.ajax(options);
	}
	
	muxingjs.addSearchTemp = function(value) {
		if (value === undefined || value === "")
			return;
		var searchTemp = plus.storage.getItem(localstoragekey.searchtemp);
		if (searchTemp === null) {
			searchTemp = value;
			plus.storage.setItem(localstoragekey.searchtemp, searchTemp);
		} else {
			var _array = searchTemp.split(',');
			var _isbool = false;
			for (var i in _array) {
				if (_array[i] === value) {
					_isbool = true;
					break;
				}
			}
			if (!_isbool) {
				if (_array.length >= 7) {
					searchTemp = '';
					var _index = _array.length - 6;
					for (var i = 0; i < 6; i++) {
						searchTemp += _array[i + _index] + ',';
					}
					searchTemp += value;
				} else {
					searchTemp += ',' + value;
				}
				plus.storage.setItem(localstoragekey.searchtemp, searchTemp);
			}
		}
	}
	muxingjs.getSearchTemp = function() {
		var search = plus.storage.getItem(localstoragekey.searchtemp);
		return search;
	}

	muxingjs.clearSearchTemp = function() {
		plus.storage.removeItem(localstoragekey.searchtemp);
	}

	//发送验证码
	var wait = 90;
	muxingjs.sendSms = function(tel, dom) {
		if (tel == '' || tel == null || tel.length > 20 || tel.length < 11) {
			plus.nativeUI.toast('请输入手机号');
			return;
		}
		muxingjs._sendSms(dom);
		plus.nativeUI.toast('验证码已发');
		muxingjs.ajaxGet(url.sms + tel, null, function(result) {
			/*if(result.success){
				muxingjs._sendSms(dom);
				plus.nativeUI.toast('验证码已发');
			}else{
				plus.nativeUI.toast(result.error);
			}*/
		});
	}
	muxingjs._sendSms = function(dom) {
		if (wait == 0) {
			dom.removeAttribute("disabled");
			dom.value = "发送验证码";
			wait = 90;
		} else {
			dom.setAttribute("disabled", true);
			dom.value = "" + wait + "";
			wait--;
			setTimeout(function() {
				muxingjs._sendSms(dom);
			}, 1000);
		}
	}
	//获取hashcode
	muxingjs.hashcode = function(str) {
		return '123456';
	}
	/*
	 * 打开webview
	 */
	muxingjs.openView = function(url, id, styles, anishow, duration, showedcb) {
		var _viewId = plus.webview.getWebviewById(id); //先判断是否存在,存在直接刷新
		if (!_viewId) {
			var _styles = styles || {
				popGesture: 'none'
			};
			var _anishow = anishow || 'slide-in-right';
			var _duration = duration || 250;
			var _showedcb = showedcb || null;
			plus.webview.open(url, id, _styles, _anishow, _duration, _showedcb);
		} else {
			_viewId.reload(true);
		}

	}
	/*
	 * show webview窗体
	 */
	muxingjs.showView = function(obj, anishow, duration, showedcb) {
		var _anishow = anishow || 'pop-in';
		var _duration = duration || 300;
		var _showedcb = showedcb || null;
		console.log("show");
		if (!obj) {
			return;
		}
		obj.show(_anishow, _duration, _showedcb);
	}
	/*
	 * 根据窗口id显示
	 */
	muxingjs.showView_id = function(id, anishow, duration, showedcb) {
		var _anishow = anishow || 'pop-in';
		var _duration = duration || 300;
		var _showedcb = showedcb || null;
		if (!id) {
			return;
		}
		plus.webview.show(id, _anishow, _duration, _showedcb);
	}

	/*
	 * 下载文件
	 */
	muxingjs.download = function(url, callback) {
		//下载图片并保存
		var _download = plus.downloader.createDownload(url, null, callback(download, status));
		_download.start();
	}

	/*
	 * ISO日期转换为本地日期
	 */
	muxingjs.ISODateFormat = function(date, format) {
		if (!date) {
			return '';
		}
		var _dt = new Date(date);
		//_dt=new Date(_tims);
		var map = {
			"M": _dt.getMonth() + 1, //月份
			"d": _dt.getDate(), //日
			"h": _dt.getHours(), //小时
			"m": _dt.getMinutes(), //分
			"s": _dt.getSeconds(), //秒
			"q": Math.floor((_dt.getMonth() + 3) / 3), //季度
			"S": _dt.getMilliseconds() //毫秒
		};
		format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
			var v = map[t];
			if (v !== undefined) {
				if (all.length > 1) {
					v = '0' + v;
					v = v.substr(v.length - 2);
				}
				return v;
			} else if (t === 'y') {
				return (_dt.getFullYear() + '').substr(4 - all.length);
			}
			return all;
		});
		return format;
	}

	//设置图片
	muxingjs.setImg = function(element, url, default_ur) {
		if (!element) {
			return;
		}
		element.onload = function() {
			objImg.setAttribute('src', default_ur);
			objImg.onload = null;
		};
		element.onerror = function() {
			default_ur = default_ur || config.avatar;
			objImg.setAttribute('src', default_ur); //如果加载图片出现错误，给一个默认图片
		};
	}
	//通过IM账号获取头像和昵称
	muxingjs.getIM = function(uid) {
		var _obj = muxingjs.getLocalStorage(localstoragekey.im_user + uid, 'json');
		if (_obj) {
			return _obj;
		}
		return null;
		/*
		muxingjs.getuserbyim(uid,function(result){
			_obj={
				avatar:result.avatar,
				nickname:result.nickname
			};
			muxingjs.setLocalStorage(localstoragekey.im_user+uid,_obj);
			return _obj;
		});*/
	}

	//获取设备信息
	muxingjs.device = function() {
		var info = plus.push.getClientInfo();
		var _device = {
			devcode: info.token,
			devmodel: plus.device.model,
			devsys: plus.os.name + '_' + plus.os.version + '_' + plus.os.language,
			token: info.token,
			clientid: info.clientid,
			devimei: plus.device.imei,
			devimsi: plus.device.imsi,
			devvendor: plus.device.vendor,
			devuuid: plus.device.uuid
		};
		return _device;
	}
	//创建消息提醒

	//获取访问令牌
	muxingjs.token = function() {

		// 		if (_token === null || _token === undefined) {
		// 			_token = null;
		// 			return;
		// 			//muxingjs.gettoken1();
		// 		}
		//console.log("_token"+_token);
		var _token = muxingjs.getLocalStorage(localstoragekey.token, 'json');
		console.log(_token);
		// 		if (_token === null || _token === undefined) {
		// 		 			_token = '1234';//如果为空，本地生成
		// 		 		}
		return _token;
	}
	//获取访问令牌
	muxingjs.gettoken1 = function(callback) {
		try {
			var _appid = 'Sunrise_member'; //需要更改的地方
			var _appsecret = 'e1d0b361201e4324b37c968fb71f0d3c';
			var _timestamp = Date.parse((new Date()).toUTCString()) / 1000;
			var _nonce = Math.round(Math.random() * 10000);
			var _array = new Array(_nonce, _appsecret, _timestamp + '');
			_array.sort();
			var tmp = _array.join('');
			var _signature = md5(tmp).toUpperCase();
			var rq = {
				appid: _appid,
				appsecret: _appsecret,
				timestamp: _timestamp,
				signature: _signature,
				nonce: _nonce
			};
			muxingjs.ajaxPost_Async(url.token1, JSON.stringify(rq), function(result) {
				if (result.success) {
					var _token = {
						access_token: result.data.token,
						refresh_token: result.data.refresh_token,
						expires_in: result.data.expires_in,
						timestamp: _timestamp
					};
					console.log("access_token:-->" + result.data.token + "<--:refresh_token:-->" + result.data.refresh_token +
						"<--:expires_in:-->" + result.data.expires_in + "<--:timestamp:-->" + _timestamp);
					console.log(JSON.stringify(result));
					muxingjs.removeLocalStorage(localstoragekey.token);
					muxingjs.setLocalStorage(localstoragekey.token, _token);
					//muxingjs.token=_token;
					callback && callback(result.data);
				} else {
					muxingjs.error(result);
				}
			});
		} catch (ex) {
			console.log(ex);
		}
	}
	//刷新访问令牌
	muxingjs.refreshtoken = function() {
		try {
			var _url = url.refreshtoken + muxingjs.token().refresh_token;
			var _timestamp = Date.parse((new Date()).toUTCString()) / 1000;
			console.log(muxingjs.token().refresh_token);
			muxingjs.ajaxPost_Async(_url, null, function(result) {
				console.log(JSON.stringify(result));
				if (result.success) {
					var _token = {
						access_token: result.data.token,
						refresh_token: result.data.refresh_token,
						expires_in: result.data.expires_in,
						timestamp: _timestamp
					};
					muxingjs.setLocalStorage(localstoragekey.token, _token);
					console.log(JSON.stringify(_token));
					//muxingjs.token=_token;
				} else {
					muxingjs.error(result);
				}
			}, true);
		} catch (ex) {
			console.log(ex);
		}
	}
	//获取用户头像和昵称 fid=用户编号
	muxingjs.getFriendInfo = function(fid) {
		//获取好友信息
		var _values = plus.storage.getItem('friends' + muxingjs.user().id);
		if (_values === null) {
			return null;
		}
		var _friends = JSON.parse(_values);
		for (var j = 0; j < _friends.length; j++) {
			if (_friends[j].id + '' === fid + '') {
				return {
					nickname: _friends[j].nickname,
					avatar: _friends[j].avatar
				};
			}
		}
		return null;
	}
	//推送本地消息
	muxingjs.push = function(content, payload, options) {
		if ((typeof payload) === 'object') {
			payload = JSON.stringify(payload);
		}
		options = options || null;
		console.log(JSON.stringify(payload));
		plus.push.createMessage(content, payload, options);
	}
	//获取网络情况 true=有网络 false=无网络
	muxingjs.IsNet = function() {
		var nt = plus.networkinfo.getCurrentType();
		if (nt === plus.networkinfo.CONNECTION_NONE) {
			return false;
		}
		return true;
	}
	//删除会话
	muxingjs.clearChat = function(uid) {
		try {
			plus.storage.removeItem(localstoragekey.chathistory + '_' + muxingjs.user().id + '_u' + uid);
			var _sessions = muxingjs.getLocalStorage(localstoragekey.chatsession + '_' + muxingjs.user().id, 'json');
			if (_sessions) {
				for (var i in _sessions) {
					if (_sessions[i].to === 'u' + uid) {
						_sessions.splice(i, 1);
						break;
					}
				}
				muxingjs.setLocalStorage(localstoragekey.chatsession + '_' + muxingjs.user().id, _sessions);
			}
			//删除好友
			var _values = plus.storage.getItem('friends' + muxingjs.user().id);
			if (_values !== null) {
				var _friends = JSON.parse(_values);
				for (var i = 0; i < _friends.length; i++) {
					if (_friends[i].id + '' === uid + '') {
						_friends.splice(i, 1);
					}
				}
				plus.storage.setItem('friends' + muxingjs.user().id, JSON.stringify(_friends));
			}
			var _view = plus.webview.getWebviewById('message');
			if (_view) {
				mui.fire(_view, 'delete_uid', {
					id: uid
				});
			}
		} catch (ex) {
			console.log(ex);
		}
	}
	//清空用户信息
	muxingjs.Logout = function() {
		try {
			//清空用信息
			muxingjs.removeLocalStorage(localstoragekey.userinfo);
			//清空会话列表
			muxingjs.removeLocalStorage(localstoragekey.chatsession);
			//token
			muxingjs.removeLocalStorage(localstoragekey.token);

			var _view = plus.webview.getWebviewById('personal');
			if (_view) {
				_view.reload(true);
			}
		} catch (ex) {
			console.log(ex);
		}
	}
	window.muxingjs = muxingjs;

})(window);



function loginSuccess(result) {
	if (result.status === "success") {
		var _token = {
			access_token: result.token,
			//refresh_token: result.refresh_token,
			expires_in: result.data.expires_in,
			//timestamp:_timestamp
		};
		muxingjs.removeLocalStorage(localstoragekey.userinfo);
		muxingjs.setLocalStorage(localstoragekey.userinfo, result.data.user);
		//console.log("access_token:-->"+result.data.token+"<--:refresh_token:-->"+result.data.refresh_token+"<--:expires_in:-->"+result.data.expires_in+"<--:timestamp:-->"+_timestamp);
		muxingjs.removeLocalStorage(localstoragekey.token);
		muxingjs.setLocalStorage(localstoragekey.token, _token);
		mui.fire(plus.webview.getWebviewById('frameGeRenSheZhi'), 'refreshPage');
		mui.fire(plus.webview.getWebviewById('frameYujian'), 'refreshPage');
		mui.fire(plus.webview.getWebviewById('framePengFenZi'), 'refreshPage');
		mui.fire(plus.webview.getWebviewById('frameHuoDong'), 'refreshPage');
		mui.fire(plus.webview.getWebviewById('frameYangMaoShangCheng'), 'refreshPage');

		setTimeout(function() {
			plus.nativeUI.closeWaiting();
			plus.webview.currentWebview().close('none');
		}, 1000);

		//plus.webview.currentWebview().close();
	} else if (result.status === "error") {
		mui.toast(result.msg); // 显示错误信息
		return;
	}
}