$(function () {
    var isBrowser = browserType();
    var baseUrl = "http://www.shandagames.com";
    var url = location.href;
    var site;
    if (url.indexOf("?") == -1) {
        site = url.substring((url.lastIndexOf("/")) + 1, url.length);
    } else {
        site = url.substring((url.lastIndexOf("/")) + 1, url.lastIndexOf("?"));
    }
    if (isBrowser.isPhone) {
        switch (site) {
            //首页跳转
            case "index":
                window.location.href = baseUrl + "/m/cn/index.html";
                break;
            //首页跳转
            case "www.shandagames.com":
                window.location.href = baseUrl + "/m/cn/index.html";
                break;
            //关于我们跳转
            case "about":
                window.location.href = baseUrl + "/m/cn/about.html";
                break;
            //产品介绍跳转
            case "game":
                window.location.href = baseUrl + "/m/cn/game.html";
                break;
            //新闻动态跳转
            case "news":
                window.location.href = baseUrl + "/m/cn/news.html?type=18,19,6763&num=1";
                break;
            //加入我们跳转
            case "join":
                window.location.href = baseUrl + "/m/cn/join.html";
                break;
            //素材下载跳转
            case "download":
                window.location.href = baseUrl + "/m/cn/download.html";
                break;
            //联系我们跳转
            case "contact":
                window.location.href = baseUrl + "/m/cn/contact.html";
                break;
            //相关资质跳转
            case "shulongzs":
                window.location.href = baseUrl+"/m/cn/shulongzs.html";
                break;
            //搜索跳转
            case "search":
                window.location.href = baseUrl+"/m/cn/search.html";
                break;
            //新闻详情跳转
            case "detail":
                var id = getUrlParam("id");
                var type = getUrlParam("type");
                window.location.href = baseUrl + "/m/cn/detail.html?id=" + id + "&type=" + type;
                break;
        }
    }
})
//设备检测
function browserType() {
    var u = window.navigator.userAgent.toLowerCase();
    var bIsIpad = u.match(/ipad/i) == "ipad";
    var bIsIphoneOs = u.match(/iphone os/i) == "iphone os";
    var bIsMidp = u.match(/midp/i) == "midp";
    var bIsUc7 = u.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = u.match(/ucweb/i) == "ucweb";
    var bIsAndroid = u.match(/android/i) == "android";
    var bIsCE = u.match(/windows ce/i) == "windows ce";
    var bIsWM = u.match(/windows mobile/i) == "windows mobile";
    var bIsIOS = !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) || u.indexOf('ios') > -1;
    var isPhone=false;
    var isPc=false;
    if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsIOS) {
        isPhone=true;
    } else {
        isPc=true;
    }
    var Obj={
        userAgent:u,
        isWindows:u.match(/windows/i) == "windows",
        isMac:u.match(/macintosh/i) == "macintosh",
        isWeChat:u.match(/MicroMessenger/i) == "micromessenger",
        isWeibo:u.match(/WeiBo/i) == "weibo",
        isBeareadApp:u.indexOf('bearead') > -1 ,
        isAndroid:u.indexOf('android') > -1 || u.indexOf('adr') > -1 ,
        isIOS:bIsIOS ,
        isQQ:u.match(/qq\//i) == "qq/",
        isPC:isPc,
        isPhone:isPhone
    };
    return Obj;
}