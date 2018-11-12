var _sdgCopyrightLink = 'http://www.shandagames.com/web/company/shulongzs.html';
var _sdgCopyrightHtml = '';
_sdgCopyrightHtml +='';

_sdgCopyrightHtml +='<link rel="stylesheet" type="text/css" href="'+CopyRightcss+'">'
+'<div class="SDGCOPYRIGHT-wrap20130425" style="height: 138px;">' 
+'	<div id="SDGCOPYRIGHT">'
//盛大游戏LOGO和合作媒体LOGO
+'		<div class="SDGCOPYRIGHT-logo">'
+'			<a href="http://www.shandagames.com/" target="_blank" class="SDGCOPYRIGHT-logol">盛大游戏</a>'
+'		</div>'
//版权主体信息
+'		<div class="SDGCOPYRIGHT-con">'
+'			<p>'
+'				<a href="'+_sdgCopyrightLink+'" target="_blank">增值电信业务经营许可证：沪 B2-20100008 互联网出版许可证：新出网证（沪）字026号</a>'
+'			</p>'
+'			<p>'
+'				<a href="'+_sdgCopyrightLink+'" target="_blank">网络文化经营许可证：沪网文（2017）8902-675号 </a>'
+'				<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502006043" target="_blank" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">'
+'					<img src="http://static.sdg-china.com/copyright/pic/beian/beian.png" alt="公安备案号" style="float:left;"> 沪公网安备 31011502006043号'
+'				</a>'
+'			</p>'
+'			<p class="SDGCOPYRIGHT-sdlogo">'
+'				<span class="SDGCOPYRIGHT-pr3">上海数龙科技有限公司</span>'
+'				版权所有 | <a href="http://www.shandagames.com/web/company/privacy.html" target="_blank">隐私政策</a> | <a href="http://gskd.sdo.com/shandagames/shandagames_gongyue.pdf" target="_blank">上海市网络游戏行业自律公约</a>'
+'			</p>'
+'			<p>'
+'				<span>上海市浦东新区海趣路58号海趣园1号楼  021-50504740</span>'
+'			</p>'
+'      <div class="HJ-1" id ="containerDiv"></div>'
+'		</div>'
//右侧网络警察3个图标
+'		<div class="SDGCOPYRIGHT-priv">'
+'         <div></div>'
+'         <div class="HJ-2" id ="pxDiv"></div>'
+'		</div>'

+'	</div>'
+'</div>'

document.write(_sdgCopyrightHtml);

(function(d, s) {
   var js = d.createElement(s);
   var sc = d.getElementsByTagName(s)[0];
   js.src="http://static.sdg-china.com/copyright/js/copyrightcommon.js";
   sc.parentNode.appendChild(js);
}(document, "script"));

(function(d, s) {
   var js = d.createElement(s);
   var sc = d.getElementsByTagName(s)[0];
   js.src="http://static.sdg-china.com/copyright/js/pxcommon.js";
   sc.parentNode.appendChild(js);
}(document, "script"));

(function(d, s) {
  window.config ={
  bw_enabled:false,
  bw_base:"http://static.sdg-china.com/yxzm/pic/",
  siteid:"SDG-08135-01"
};
   var js = d.createElement(s);
   var sc = d.getElementsByTagName(s)[0];
   js.src="http://static.sdg-china.com/yxzm/js/ac.js";
   sc.parentNode.insertBefore(js, sc);
}(document, "script"));
