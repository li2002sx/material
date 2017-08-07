/**
 * 自定义常用类
 */

// global.webUrl = 'http://www.chechehulian.cn:8080/'
// global.webUrl = 'http://172.168.1.26:8080/'
global.webUrl = 'http://gxcy.iubeier.com/'

// global.apiUrl = 'http://172.168.1.26:8071/'
global.apiUrl = 'http://chechehulian.cn/'

global.wxAppId = 'wxf0263f5d7f90b3ba'

global.wxAuthNotifyUrl = global.webUrl + '?#/wx/authnotify'

global.wxAuthorizeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + global.wxAppId + '&redirect_uri=' + encodeURIComponent(global.wxAuthNotifyUrl) + '&response_type=code&scope=snsapi_base&state=succ#wechat_redirect'
