/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./js/bundle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by v.pandeng on 2016/2/24.
	 */
	__webpack_require__(1);
	__webpack_require__(2);
	var ServerAPI = __webpack_require__(5);
	var Tools = __webpack_require__(3);
	var MAX__SWIPER_SLIDER = 8;
	var header = __webpack_require__(11);
	var dialog = __webpack_require__(6);
	var Storage = __webpack_require__(10);
	var incom = __webpack_require__(16);
	//浏览器低版本提示
	var sdoIE6_html = '' + '<div id="sdo-IE6wrap" style="position: absolute;top:40%;left:50%;margin-top:-168px;margin-left:-295px;width: 590px;height: 335px;background: #fff;z-index:101;">' + '   <a href="javascript:void(0)" class="close" style="position: absolute;right: 16px;top:13px;height: 18px;width: 16px;background: url(\'http://static.sdg-china.com/jijiamobile/pic/ie6/ie6Close.jpg\') no-repeat 0 0;text-indent: -999999px;">关闭</a>' + '   <div style="position:absolute;top:25px;left:215px;;width:164px;height:127px;background: url(\'http://static.sdg-china.com/jijiamobile/pic/ie6/ie6Bg.jpg\') no-repeat 0 0;"></div>' + '   <div style="text-align: center;padding-top:165px;line-height: 20px;">' + '       <p>亲，您的浏览器版本过低！</p>' + '       <p>为了获得更好的浏览体验，请升级到最新版本。</p>' + '       <a href="javascript:void(0)" class="close" style="margin-top:10px;display: inline-block;text-align: center;width: 90px;height: 30px;line-height:30px;color:#fff;background: #f68b1e;">继续访问</a>' + '   </div>' + '   <div style="position: absolute;left:30px;bottom: 22px;width:264px;height:22px;background: url(\'http://static.sdg-china.com/jijiamobile/pic/ie6/ie6Bottom.png\') no-repeat 0 0;"></div>' + '</div>';
	//视频播放
	var popup_html = '';
	var pageIndex = 1;
	var totalCount = 0;
	//页面初始化方法
	$(function () {
	    incom.init();
	    websitePage.init();
	});

	var websitePage = {

	    init: function () {

	        //添加header
	        header.init();

	        var params = { "page_name": "index" };
	        ServerAPI.getList({ 'type': 'index_ad' }, _this.successCallback);
	        //获取推荐游戏列表
	        //点击刷新推荐列表
	        ServerAPI.getList({ 'type': 'index_game' }, function (data) {
	            totalCount = data.count;
	            _this.getGameList();
	        });
	    },

	    successCallback: function (data) {
	        var params = { 'count': '4', 'category_id': '18,19,6763' };
	        ServerAPI.getNewsList(params, function (data) {
	            if (!Tools.isEmpty(data)) {
	                var newsList = data.dataList;
	                var _html = '<ul>';
	                $.each(newsList, function (index, item) {
	                    var time = newsList[index].PublishDate.substring(5, 10);
	                    var id = newsList[index].ID;
	                    var category = newsList[index].CategoryCode;
	                    var title = newsList[index].Title;
	                    var tab = '';
	                    switch (category) {

	                        case '18':
	                            tab = '1';
	                            break;
	                        case '6763':
	                            tab = '2';
	                            break;
	                        case '19':
	                            tab = '3';
	                            break;
	                        default:
	                            tab = '0';
	                    }
	                    //获取5条新闻
	                    _html += '<li>' + '<a href="./detail?id=' + id + '&type=' + category + '#' + tab + '"><p>' + title + '</p><span>' + time + '</span></a>' + '</li>';
	                });
	                _html += '</ul>';
	                $("#newsList").append(_html);
	            }
	        });
	        if (!Tools.isEmpty(data)) {

	            var bannerList = data.list; //轮播图
	            var _liHtml = "";
	            // 是那种比较方正的显示器
	            var isNormalScreen = parseInt(screen.width / screen.height * 100) > 150;
	            var isSmallScreenWidth = screen.width <= 1366;
	            var isSmallScreen = isSmallScreenWidth && isNormalScreen;
	            // var bannerHeight = isSmallScreen ? $(window).height() - 240 : 600;
	            var bannerHeight = $(window).height() - 240;

	            $.each(bannerList, function (index, item) {
	                var _liBgUrl = bannerList[index].thumbnail;
	                var _goToUrl = Tools.judgeGoToUrl(bannerList[index].goto_url);
	                var _title = bannerList[index].title;
	                var _subTitle = bannerList[index].sub_title;
	                var _intro = bannerList[index].intro;
	                _liHtml += '<div class="fn_con_item con_item" style="background:url(' + _liBgUrl + ') no-repeat center top; width:100%; height:' + bannerHeight + 'px;">' + '<a  href="' + _goToUrl + '" target="_blank">' + '<span class="des">' + '<h3>' + _title + '</h3>' + '<span class="sub_title">' + _subTitle + '</span>' + '<span class="intro">' + _intro + '</span>' + '</span>' + '</a>' + '</div>';
	            });

	            $("#banner_ul").append(_liHtml).css('height', bannerHeight + 'px');
	            $('#J_sliderBanner').eslider({
	                type: 'a',
	                hideTitleBar: true,
	                //boolean:是否循环展示
	                animationLoop: true,
	                // 1[自动隐藏]，2[始终显示]，3[始终隐藏]
	                showBtn: 3,
	                //延迟触发时长，事件为mouseover时启用，防止切换按钮误触
	                hoverDelay: 50,
	                //是否自动切换 true\false
	                auto: true,
	                //动画速度
	                speed: 500,
	                //切换时间
	                time: 5000
	            });

	            // 当banner宽度小于1200，就固定为1200不变
	            if ($(window).width() < 1200) {
	                $('#J_sliderBanner').css('width', '1200px');
	            }

	            $(window).resize(function () {
	                var windowWidth = $(window).width();
	                if (windowWidth < 1200) {
	                    $('#J_sliderBanner').css('width', '1200px');
	                } else {
	                    $('#J_sliderBanner').css('width', '100%');
	                }
	            });

	            $(".video-box").delegate("span", "click", function () {
	                // $('.video-play').show()
	                //  $('.index-mask').show()
	                var url = $(".video-box").attr('data-url');
	                popup_html = '<div class="video-play">\
	                    <div class="video-close"></div>\
	                    <div class="video-main">\
	                        <video preload="auto" controls="controls" width="100%" height="460" autoplay="autoplay" preload="auto"><source  src="' + url + '" type="video/mp4"></source></video>\
	                    </div>\
	                </div>';
	                var templatePopup = Handlebars.compile(popup_html);
	                var html = templatePopup();
	                dialog({
	                    title: '',
	                    content: html,
	                    fixed: true
	                }).showModal();
	            });
	            $(document).off("click", ".video-close").on("click", ".video-close", function (e) {

	                $("div[tabindex='-1']").remove();
	                $('div[tabindex=0]').remove();
	            });
	            $(document).off("click", ".btn-refresh").on("click", ".btn-refresh", function (e) {
	                _this.getGameList();
	            });

	            $("#loading").hide();
	            $("#website_index_wrap").fadeIn('slow');

	            if (Tools.IsThisOs('ie7') || Tools.IsThisOs('ie8')) {
	                //IE8 低版本浏览器

	                var _lowVersionFlag = Storage.get('lowVersionFlag');
	                if (Tools.isEmpty(_lowVersionFlag)) {
	                    var _whIE6 = $(window).height();
	                    var _maskHtml = '<div id="sdo-overlay" style="height:' + _whIE6 + 'px"></div>';
	                    $('body').append(sdoIE6_html);
	                    $('body').append(_maskHtml);

	                    $('#sdo-IE6wrap .close').click(function () {
	                        $('#sdo-IE6wrap').remove();
	                        $('#sdo-overlay').remove();
	                    });

	                    Storage.set('lowVersionFlag', 'true');
	                }
	            }
	        }
	    },
	    getGameList: function () {
	        if (totalCount <= 4 * (pageIndex - 1)) {
	            pageIndex = 1;
	        }
	        //点击刷新推荐列表
	        ServerAPI.getList({ 'type': 'index_game', 'page_index': pageIndex, 'page_size': 4 }, function (data) {
	            if (data.count > 0) {
	                var gameList = data.list;
	                var _html = '';
	                $.each(gameList, function (index, item) {
	                    var game_logo = gameList[index].game_logo;
	                    var game_name = gameList[index].game_name;
	                    var summary = gameList[index].summary;
	                    var code = gameList[index].code;
	                    var game_type = gameList[index].game_type;
	                    var game_url = gameList[index].game_url;
	                    var intro = gameList[index].intro;
	                    _html += '<li>' + '<div class="item">' + '<img src="' + game_logo + '" alt="">' + '<div class="info">' + '<h3>' + game_name + '</h3>' + '<p>' + summary + '</p>' + '</div>' + '<div class="recommend-item">' + '<div class="over-lay"></div>' + '<div class="re-hd">' + '<div class="code">' + '<img src="' + code + '" alt="">' + '<p>微信公众号</p>' + '</div>' + '<div class="re-info">' + '<h4>' + game_name + '</h4>' + '<p>游戏类型：' + game_type + '</p>' + '<a href="' + game_url + '" class="btn-re"  target="_blank">进入官网</a>' + '</div>' + '</div>' + '<div class="empty"></div>' + '</div>' + '</div>' + '</li>';
	                });
	            }
	            $('.reGameList').empty().append(_html);
	            pageIndex = pageIndex + 1;
	        });
	    }

	};

	var _this = websitePage;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/*

	Copyright (C) 2011 by Yehuda Katz

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/

	// lib/handlebars/base.js

	/*jshint eqnull:true*/
	var Handlebars = window.Handlebars = {};

	(function (Handlebars) {

	  Handlebars.VERSION = "1.0.0-rc.3";
	  Handlebars.COMPILER_REVISION = 2;

	  Handlebars.REVISION_CHANGES = {
	    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	    2: '>= 1.0.0-rc.3'
	  };

	  Handlebars.helpers = {};
	  Handlebars.partials = {};

	  Handlebars.registerHelper = function (name, fn, inverse) {
	    if (inverse) {
	      fn.not = inverse;
	    }
	    this.helpers[name] = fn;
	  };

	  Handlebars.registerPartial = function (name, str) {
	    this.partials[name] = str;
	  };

	  Handlebars.registerHelper('helperMissing', function (arg) {
	    if (arguments.length === 2) {
	      return undefined;
	    } else {
	      throw new Error("Could not find property '" + arg + "'");
	    }
	  });

	  var toString = Object.prototype.toString,
	      functionType = "[object Function]";

	  Handlebars.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse || function () {},
	        fn = options.fn;

	    var ret = "";
	    var type = toString.call(context);

	    if (type === functionType) {
	      context = context.call(this);
	    }

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (type === "[object Array]") {
	      if (context.length > 0) {
	        return Handlebars.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      return fn(context);
	    }
	  });

	  Handlebars.K = function () {};

	  Handlebars.createFrame = Object.create || function (object) {
	    Handlebars.K.prototype = object;
	    var obj = new Handlebars.K();
	    Handlebars.K.prototype = null;
	    return obj;
	  };

	  Handlebars.logger = {
	    DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

	    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	    // can be overridden in the host environment
	    log: function (level, obj) {
	      if (Handlebars.logger.level <= level) {
	        var method = Handlebars.logger.methodMap[level];
	        if (typeof console !== 'undefined' && console[method]) {
	          console[method].call(console, obj);
	        }
	      }
	    }
	  };

	  Handlebars.log = function (level, obj) {
	    Handlebars.logger.log(level, obj);
	  };

	  Handlebars.registerHelper('each', function (context, options) {
	    var fn = options.fn,
	        inverse = options.inverse;
	    var i = 0,
	        ret = "",
	        data;

	    if (options.data) {
	      data = Handlebars.createFrame(options.data);
	    }

	    if (context && typeof context === 'object') {
	      if (context instanceof Array) {
	        for (var j = context.length; i < j; i++) {
	          if (data) {
	            data.index = i;
	          }
	          ret = ret + fn(context[i], { data: data });
	        }
	      } else {
	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            if (data) {
	              data.key = key;
	            }
	            ret = ret + fn(context[key], { data: data });
	            i++;
	          }
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  Handlebars.registerHelper('if', function (context, options) {
	    var type = toString.call(context);
	    if (type === functionType) {
	      context = context.call(this);
	    }

	    if (!context || Handlebars.Utils.isEmpty(context)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  Handlebars.registerHelper('unless', function (context, options) {
	    var fn = options.fn,
	        inverse = options.inverse;
	    options.fn = inverse;
	    options.inverse = fn;

	    return Handlebars.helpers['if'].call(this, context, options);
	  });

	  Handlebars.registerHelper('with', function (context, options) {
	    return options.fn(context);
	  });

	  Handlebars.registerHelper('log', function (context, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    Handlebars.log(level, context);
	  });
	})(window.Handlebars);
	;
	// lib/handlebars/compiler/parser.js
	/* Jison generated parser */
	var handlebars = function () {
	  var parser = { trace: function trace() {},
	    yy: {},
	    symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "simpleInverse": 6, "statements": 7, "statement": 8, "openInverse": 9, "closeBlock": 10, "openBlock": 11, "mustache": 12, "partial": 13, "CONTENT": 14, "COMMENT": 15, "OPEN_BLOCK": 16, "inMustache": 17, "CLOSE": 18, "OPEN_INVERSE": 19, "OPEN_ENDBLOCK": 20, "path": 21, "OPEN": 22, "OPEN_UNESCAPED": 23, "OPEN_PARTIAL": 24, "partialName": 25, "params": 26, "hash": 27, "DATA": 28, "param": 29, "STRING": 30, "INTEGER": 31, "BOOLEAN": 32, "hashSegments": 33, "hashSegment": 34, "ID": 35, "EQUALS": 36, "PARTIAL_NAME": 37, "pathSegments": 38, "SEP": 39, "$accept": 0, "$end": 1 },
	    terminals_: { 2: "error", 5: "EOF", 14: "CONTENT", 15: "COMMENT", 16: "OPEN_BLOCK", 18: "CLOSE", 19: "OPEN_INVERSE", 20: "OPEN_ENDBLOCK", 22: "OPEN", 23: "OPEN_UNESCAPED", 24: "OPEN_PARTIAL", 28: "DATA", 30: "STRING", 31: "INTEGER", 32: "BOOLEAN", 35: "ID", 36: "EQUALS", 37: "PARTIAL_NAME", 39: "SEP" },
	    productions_: [0, [3, 2], [4, 2], [4, 3], [4, 2], [4, 1], [4, 1], [4, 0], [7, 1], [7, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 3], [13, 4], [6, 2], [17, 3], [17, 2], [17, 2], [17, 1], [17, 1], [26, 2], [26, 1], [29, 1], [29, 1], [29, 1], [29, 1], [29, 1], [27, 1], [33, 2], [33, 1], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [25, 1], [21, 1], [38, 3], [38, 1]],
	    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

	      var $0 = $$.length - 1;
	      switch (yystate) {
	        case 1:
	          return $$[$0 - 1];
	          break;
	        case 2:
	          this.$ = new yy.ProgramNode([], $$[$0]);
	          break;
	        case 3:
	          this.$ = new yy.ProgramNode($$[$0 - 2], $$[$0]);
	          break;
	        case 4:
	          this.$ = new yy.ProgramNode($$[$0 - 1], []);
	          break;
	        case 5:
	          this.$ = new yy.ProgramNode($$[$0]);
	          break;
	        case 6:
	          this.$ = new yy.ProgramNode([], []);
	          break;
	        case 7:
	          this.$ = new yy.ProgramNode([]);
	          break;
	        case 8:
	          this.$ = [$$[$0]];
	          break;
	        case 9:
	          $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
	          break;
	        case 10:
	          this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1].inverse, $$[$0 - 1], $$[$0]);
	          break;
	        case 11:
	          this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1], $$[$0 - 1].inverse, $$[$0]);
	          break;
	        case 12:
	          this.$ = $$[$0];
	          break;
	        case 13:
	          this.$ = $$[$0];
	          break;
	        case 14:
	          this.$ = new yy.ContentNode($$[$0]);
	          break;
	        case 15:
	          this.$ = new yy.CommentNode($$[$0]);
	          break;
	        case 16:
	          this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
	          break;
	        case 17:
	          this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
	          break;
	        case 18:
	          this.$ = $$[$0 - 1];
	          break;
	        case 19:
	          this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
	          break;
	        case 20:
	          this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1], true);
	          break;
	        case 21:
	          this.$ = new yy.PartialNode($$[$0 - 1]);
	          break;
	        case 22:
	          this.$ = new yy.PartialNode($$[$0 - 2], $$[$0 - 1]);
	          break;
	        case 23:
	          break;
	        case 24:
	          this.$ = [[$$[$0 - 2]].concat($$[$0 - 1]), $$[$0]];
	          break;
	        case 25:
	          this.$ = [[$$[$0 - 1]].concat($$[$0]), null];
	          break;
	        case 26:
	          this.$ = [[$$[$0 - 1]], $$[$0]];
	          break;
	        case 27:
	          this.$ = [[$$[$0]], null];
	          break;
	        case 28:
	          this.$ = [[new yy.DataNode($$[$0])], null];
	          break;
	        case 29:
	          $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
	          break;
	        case 30:
	          this.$ = [$$[$0]];
	          break;
	        case 31:
	          this.$ = $$[$0];
	          break;
	        case 32:
	          this.$ = new yy.StringNode($$[$0]);
	          break;
	        case 33:
	          this.$ = new yy.IntegerNode($$[$0]);
	          break;
	        case 34:
	          this.$ = new yy.BooleanNode($$[$0]);
	          break;
	        case 35:
	          this.$ = new yy.DataNode($$[$0]);
	          break;
	        case 36:
	          this.$ = new yy.HashNode($$[$0]);
	          break;
	        case 37:
	          $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
	          break;
	        case 38:
	          this.$ = [$$[$0]];
	          break;
	        case 39:
	          this.$ = [$$[$0 - 2], $$[$0]];
	          break;
	        case 40:
	          this.$ = [$$[$0 - 2], new yy.StringNode($$[$0])];
	          break;
	        case 41:
	          this.$ = [$$[$0 - 2], new yy.IntegerNode($$[$0])];
	          break;
	        case 42:
	          this.$ = [$$[$0 - 2], new yy.BooleanNode($$[$0])];
	          break;
	        case 43:
	          this.$ = [$$[$0 - 2], new yy.DataNode($$[$0])];
	          break;
	        case 44:
	          this.$ = new yy.PartialNameNode($$[$0]);
	          break;
	        case 45:
	          this.$ = new yy.IdNode($$[$0]);
	          break;
	        case 46:
	          $$[$0 - 2].push($$[$0]);this.$ = $$[$0 - 2];
	          break;
	        case 47:
	          this.$ = [$$[$0]];
	          break;
	      }
	    },
	    table: [{ 3: 1, 4: 2, 5: [2, 7], 6: 3, 7: 4, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 1: [3] }, { 5: [1, 17] }, { 5: [2, 6], 7: 18, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 6], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 5: [2, 5], 6: 20, 8: 21, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 20: [2, 5], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 17: 23, 18: [1, 22], 21: 24, 28: [1, 25], 35: [1, 27], 38: 26 }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 16: [2, 8], 19: [2, 8], 20: [2, 8], 22: [2, 8], 23: [2, 8], 24: [2, 8] }, { 4: 28, 6: 3, 7: 4, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 20: [2, 7], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 4: 29, 6: 3, 7: 4, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 20: [2, 7], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 5: [2, 12], 14: [2, 12], 15: [2, 12], 16: [2, 12], 19: [2, 12], 20: [2, 12], 22: [2, 12], 23: [2, 12], 24: [2, 12] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 16: [2, 13], 19: [2, 13], 20: [2, 13], 22: [2, 13], 23: [2, 13], 24: [2, 13] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 16: [2, 14], 19: [2, 14], 20: [2, 14], 22: [2, 14], 23: [2, 14], 24: [2, 14] }, { 5: [2, 15], 14: [2, 15], 15: [2, 15], 16: [2, 15], 19: [2, 15], 20: [2, 15], 22: [2, 15], 23: [2, 15], 24: [2, 15] }, { 17: 30, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26 }, { 17: 31, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26 }, { 17: 32, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26 }, { 25: 33, 37: [1, 34] }, { 1: [2, 1] }, { 5: [2, 2], 8: 21, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 2], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 17: 23, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26 }, { 5: [2, 4], 7: 35, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 4], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 16: [2, 9], 19: [2, 9], 20: [2, 9], 22: [2, 9], 23: [2, 9], 24: [2, 9] }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 16: [2, 23], 19: [2, 23], 20: [2, 23], 22: [2, 23], 23: [2, 23], 24: [2, 23] }, { 18: [1, 36] }, { 18: [2, 27], 21: 41, 26: 37, 27: 38, 28: [1, 45], 29: 39, 30: [1, 42], 31: [1, 43], 32: [1, 44], 33: 40, 34: 46, 35: [1, 47], 38: 26 }, { 18: [2, 28] }, { 18: [2, 45], 28: [2, 45], 30: [2, 45], 31: [2, 45], 32: [2, 45], 35: [2, 45], 39: [1, 48] }, { 18: [2, 47], 28: [2, 47], 30: [2, 47], 31: [2, 47], 32: [2, 47], 35: [2, 47], 39: [2, 47] }, { 10: 49, 20: [1, 50] }, { 10: 51, 20: [1, 50] }, { 18: [1, 52] }, { 18: [1, 53] }, { 18: [1, 54] }, { 18: [1, 55], 21: 56, 35: [1, 27], 38: 26 }, { 18: [2, 44], 35: [2, 44] }, { 5: [2, 3], 8: 21, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 3], 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 14: [2, 17], 15: [2, 17], 16: [2, 17], 19: [2, 17], 20: [2, 17], 22: [2, 17], 23: [2, 17], 24: [2, 17] }, { 18: [2, 25], 21: 41, 27: 57, 28: [1, 45], 29: 58, 30: [1, 42], 31: [1, 43], 32: [1, 44], 33: 40, 34: 46, 35: [1, 47], 38: 26 }, { 18: [2, 26] }, { 18: [2, 30], 28: [2, 30], 30: [2, 30], 31: [2, 30], 32: [2, 30], 35: [2, 30] }, { 18: [2, 36], 34: 59, 35: [1, 60] }, { 18: [2, 31], 28: [2, 31], 30: [2, 31], 31: [2, 31], 32: [2, 31], 35: [2, 31] }, { 18: [2, 32], 28: [2, 32], 30: [2, 32], 31: [2, 32], 32: [2, 32], 35: [2, 32] }, { 18: [2, 33], 28: [2, 33], 30: [2, 33], 31: [2, 33], 32: [2, 33], 35: [2, 33] }, { 18: [2, 34], 28: [2, 34], 30: [2, 34], 31: [2, 34], 32: [2, 34], 35: [2, 34] }, { 18: [2, 35], 28: [2, 35], 30: [2, 35], 31: [2, 35], 32: [2, 35], 35: [2, 35] }, { 18: [2, 38], 35: [2, 38] }, { 18: [2, 47], 28: [2, 47], 30: [2, 47], 31: [2, 47], 32: [2, 47], 35: [2, 47], 36: [1, 61], 39: [2, 47] }, { 35: [1, 62] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 16: [2, 10], 19: [2, 10], 20: [2, 10], 22: [2, 10], 23: [2, 10], 24: [2, 10] }, { 21: 63, 35: [1, 27], 38: 26 }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 16: [2, 11], 19: [2, 11], 20: [2, 11], 22: [2, 11], 23: [2, 11], 24: [2, 11] }, { 14: [2, 16], 15: [2, 16], 16: [2, 16], 19: [2, 16], 20: [2, 16], 22: [2, 16], 23: [2, 16], 24: [2, 16] }, { 5: [2, 19], 14: [2, 19], 15: [2, 19], 16: [2, 19], 19: [2, 19], 20: [2, 19], 22: [2, 19], 23: [2, 19], 24: [2, 19] }, { 5: [2, 20], 14: [2, 20], 15: [2, 20], 16: [2, 20], 19: [2, 20], 20: [2, 20], 22: [2, 20], 23: [2, 20], 24: [2, 20] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 16: [2, 21], 19: [2, 21], 20: [2, 21], 22: [2, 21], 23: [2, 21], 24: [2, 21] }, { 18: [1, 64] }, { 18: [2, 24] }, { 18: [2, 29], 28: [2, 29], 30: [2, 29], 31: [2, 29], 32: [2, 29], 35: [2, 29] }, { 18: [2, 37], 35: [2, 37] }, { 36: [1, 61] }, { 21: 65, 28: [1, 69], 30: [1, 66], 31: [1, 67], 32: [1, 68], 35: [1, 27], 38: 26 }, { 18: [2, 46], 28: [2, 46], 30: [2, 46], 31: [2, 46], 32: [2, 46], 35: [2, 46], 39: [2, 46] }, { 18: [1, 70] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 16: [2, 22], 19: [2, 22], 20: [2, 22], 22: [2, 22], 23: [2, 22], 24: [2, 22] }, { 18: [2, 39], 35: [2, 39] }, { 18: [2, 40], 35: [2, 40] }, { 18: [2, 41], 35: [2, 41] }, { 18: [2, 42], 35: [2, 42] }, { 18: [2, 43], 35: [2, 43] }, { 5: [2, 18], 14: [2, 18], 15: [2, 18], 16: [2, 18], 19: [2, 18], 20: [2, 18], 22: [2, 18], 23: [2, 18], 24: [2, 18] }],
	    defaultActions: { 17: [2, 1], 25: [2, 28], 38: [2, 26], 57: [2, 24] },
	    parseError: function parseError(str, hash) {
	      throw new Error(str);
	    },
	    parse: function parse(input) {
	      var self = this,
	          stack = [0],
	          vstack = [null],
	          lstack = [],
	          table = this.table,
	          yytext = "",
	          yylineno = 0,
	          yyleng = 0,
	          recovering = 0,
	          TERROR = 2,
	          EOF = 1;
	      this.lexer.setInput(input);
	      this.lexer.yy = this.yy;
	      this.yy.lexer = this.lexer;
	      this.yy.parser = this;
	      if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
	      var yyloc = this.lexer.yylloc;
	      lstack.push(yyloc);
	      var ranges = this.lexer.options && this.lexer.options.ranges;
	      if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
	      function popStack(n) {
	        stack.length = stack.length - 2 * n;
	        vstack.length = vstack.length - n;
	        lstack.length = lstack.length - n;
	      }
	      function lex() {
	        var token;
	        token = self.lexer.lex() || 1;
	        if (typeof token !== "number") {
	          token = self.symbols_[token] || token;
	        }
	        return token;
	      }
	      var symbol,
	          preErrorSymbol,
	          state,
	          action,
	          a,
	          r,
	          yyval = {},
	          p,
	          len,
	          newState,
	          expected;
	      while (true) {
	        state = stack[stack.length - 1];
	        if (this.defaultActions[state]) {
	          action = this.defaultActions[state];
	        } else {
	          if (symbol === null || typeof symbol == "undefined") {
	            symbol = lex();
	          }
	          action = table[state] && table[state][symbol];
	        }
	        if (typeof action === "undefined" || !action.length || !action[0]) {
	          var errStr = "";
	          if (!recovering) {
	            expected = [];
	            for (p in table[state]) if (this.terminals_[p] && p > 2) {
	              expected.push("'" + this.terminals_[p] + "'");
	            }
	            if (this.lexer.showPosition) {
	              errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	            } else {
	              errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	            }
	            this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
	          }
	        }
	        if (action[0] instanceof Array && action.length > 1) {
	          throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	        }
	        switch (action[0]) {
	          case 1:
	            stack.push(symbol);
	            vstack.push(this.lexer.yytext);
	            lstack.push(this.lexer.yylloc);
	            stack.push(action[1]);
	            symbol = null;
	            if (!preErrorSymbol) {
	              yyleng = this.lexer.yyleng;
	              yytext = this.lexer.yytext;
	              yylineno = this.lexer.yylineno;
	              yyloc = this.lexer.yylloc;
	              if (recovering > 0) recovering--;
	            } else {
	              symbol = preErrorSymbol;
	              preErrorSymbol = null;
	            }
	            break;
	          case 2:
	            len = this.productions_[action[1]][1];
	            yyval.$ = vstack[vstack.length - len];
	            yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
	            if (ranges) {
	              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	            }
	            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	            if (typeof r !== "undefined") {
	              return r;
	            }
	            if (len) {
	              stack = stack.slice(0, -1 * len * 2);
	              vstack = vstack.slice(0, -1 * len);
	              lstack = lstack.slice(0, -1 * len);
	            }
	            stack.push(this.productions_[action[1]][0]);
	            vstack.push(yyval.$);
	            lstack.push(yyval._$);
	            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	            stack.push(newState);
	            break;
	          case 3:
	            return true;
	        }
	      }
	      return true;
	    }
	  };
	  /* Jison generated lexer */
	  var lexer = function () {
	    var lexer = { EOF: 1,
	      parseError: function parseError(str, hash) {
	        if (this.yy.parser) {
	          this.yy.parser.parseError(str, hash);
	        } else {
	          throw new Error(str);
	        }
	      },
	      setInput: function (input) {
	        this._input = input;
	        this._more = this._less = this.done = false;
	        this.yylineno = this.yyleng = 0;
	        this.yytext = this.matched = this.match = '';
	        this.conditionStack = ['INITIAL'];
	        this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
	        if (this.options.ranges) this.yylloc.range = [0, 0];
	        this.offset = 0;
	        return this;
	      },
	      input: function () {
	        var ch = this._input[0];
	        this.yytext += ch;
	        this.yyleng++;
	        this.offset++;
	        this.match += ch;
	        this.matched += ch;
	        var lines = ch.match(/(?:\r\n?|\n).*/g);
	        if (lines) {
	          this.yylineno++;
	          this.yylloc.last_line++;
	        } else {
	          this.yylloc.last_column++;
	        }
	        if (this.options.ranges) this.yylloc.range[1]++;

	        this._input = this._input.slice(1);
	        return ch;
	      },
	      unput: function (ch) {
	        var len = ch.length;
	        var lines = ch.split(/(?:\r\n?|\n)/g);

	        this._input = ch + this._input;
	        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	        //this.yyleng -= len;
	        this.offset -= len;
	        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	        this.match = this.match.substr(0, this.match.length - 1);
	        this.matched = this.matched.substr(0, this.matched.length - 1);

	        if (lines.length - 1) this.yylineno -= lines.length - 1;
	        var r = this.yylloc.range;

	        this.yylloc = { first_line: this.yylloc.first_line,
	          last_line: this.yylineno + 1,
	          first_column: this.yylloc.first_column,
	          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	        };

	        if (this.options.ranges) {
	          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	        }
	        return this;
	      },
	      more: function () {
	        this._more = true;
	        return this;
	      },
	      less: function (n) {
	        this.unput(this.match.slice(n));
	      },
	      pastInput: function () {
	        var past = this.matched.substr(0, this.matched.length - this.match.length);
	        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
	      },
	      upcomingInput: function () {
	        var next = this.match;
	        if (next.length < 20) {
	          next += this._input.substr(0, 20 - next.length);
	        }
	        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	      },
	      showPosition: function () {
	        var pre = this.pastInput();
	        var c = new Array(pre.length + 1).join("-");
	        return pre + this.upcomingInput() + "\n" + c + "^";
	      },
	      next: function () {
	        if (this.done) {
	          return this.EOF;
	        }
	        if (!this._input) this.done = true;

	        var token, match, tempMatch, index, col, lines;
	        if (!this._more) {
	          this.yytext = '';
	          this.match = '';
	        }
	        var rules = this._currentRules();
	        for (var i = 0; i < rules.length; i++) {
	          tempMatch = this._input.match(this.rules[rules[i]]);
	          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	            match = tempMatch;
	            index = i;
	            if (!this.options.flex) break;
	          }
	        }
	        if (match) {
	          lines = match[0].match(/(?:\r\n?|\n).*/g);
	          if (lines) this.yylineno += lines.length;
	          this.yylloc = { first_line: this.yylloc.last_line,
	            last_line: this.yylineno + 1,
	            first_column: this.yylloc.last_column,
	            last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
	          this.yytext += match[0];
	          this.match += match[0];
	          this.matches = match;
	          this.yyleng = this.yytext.length;
	          if (this.options.ranges) {
	            this.yylloc.range = [this.offset, this.offset += this.yyleng];
	          }
	          this._more = false;
	          this._input = this._input.slice(match[0].length);
	          this.matched += match[0];
	          token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
	          if (this.done && this._input) this.done = false;
	          if (token) return token;else return;
	        }
	        if (this._input === "") {
	          return this.EOF;
	        } else {
	          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
	        }
	      },
	      lex: function lex() {
	        var r = this.next();
	        if (typeof r !== 'undefined') {
	          return r;
	        } else {
	          return this.lex();
	        }
	      },
	      begin: function begin(condition) {
	        this.conditionStack.push(condition);
	      },
	      popState: function popState() {
	        return this.conditionStack.pop();
	      },
	      _currentRules: function _currentRules() {
	        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	      },
	      topState: function () {
	        return this.conditionStack[this.conditionStack.length - 2];
	      },
	      pushState: function begin(condition) {
	        this.begin(condition);
	      } };
	    lexer.options = {};
	    lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

	      var YYSTATE = YY_START;
	      switch ($avoiding_name_collisions) {
	        case 0:
	          if (yy_.yytext.slice(-1) !== "\\") this.begin("mu");
	          if (yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 1), this.begin("emu");
	          if (yy_.yytext) return 14;

	          break;
	        case 1:
	          return 14;
	          break;
	        case 2:
	          if (yy_.yytext.slice(-1) !== "\\") this.popState();
	          if (yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 1);
	          return 14;

	          break;
	        case 3:
	          yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 4);this.popState();return 15;
	          break;
	        case 4:
	          this.begin("par");return 24;
	          break;
	        case 5:
	          return 16;
	          break;
	        case 6:
	          return 20;
	          break;
	        case 7:
	          return 19;
	          break;
	        case 8:
	          return 19;
	          break;
	        case 9:
	          return 23;
	          break;
	        case 10:
	          return 23;
	          break;
	        case 11:
	          this.popState();this.begin('com');
	          break;
	        case 12:
	          yy_.yytext = yy_.yytext.substr(3, yy_.yyleng - 5);this.popState();return 15;
	          break;
	        case 13:
	          return 22;
	          break;
	        case 14:
	          return 36;
	          break;
	        case 15:
	          return 35;
	          break;
	        case 16:
	          return 35;
	          break;
	        case 17:
	          return 39;
	          break;
	        case 18:
	          /*ignore whitespace*/
	          break;
	        case 19:
	          this.popState();return 18;
	          break;
	        case 20:
	          this.popState();return 18;
	          break;
	        case 21:
	          yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2).replace(/\\"/g, '"');return 30;
	          break;
	        case 22:
	          yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2).replace(/\\'/g, "'");return 30;
	          break;
	        case 23:
	          yy_.yytext = yy_.yytext.substr(1);return 28;
	          break;
	        case 24:
	          return 32;
	          break;
	        case 25:
	          return 32;
	          break;
	        case 26:
	          return 31;
	          break;
	        case 27:
	          return 35;
	          break;
	        case 28:
	          yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);return 35;
	          break;
	        case 29:
	          return 'INVALID';
	          break;
	        case 30:
	          /*ignore whitespace*/
	          break;
	        case 31:
	          this.popState();return 37;
	          break;
	        case 32:
	          return 5;
	          break;
	      }
	    };
	    lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[} ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:\s+)/, /^(?:[a-zA-Z0-9_$-/]+)/, /^(?:$)/];
	    lexer.conditions = { "mu": { "rules": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [3], "inclusive": false }, "par": { "rules": [30, 31], "inclusive": false }, "INITIAL": { "rules": [0, 1, 32], "inclusive": true } };
	    return lexer;
	  }();
	  parser.lexer = lexer;
	  function Parser() {
	    this.yy = {};
	  }Parser.prototype = parser;parser.Parser = Parser;
	  return new Parser();
	}();;
	// lib/handlebars/compiler/base.js
	Handlebars.Parser = handlebars;

	Handlebars.parse = function (input) {

	  // Just return if an already-compile AST was passed in.
	  if (input.constructor === Handlebars.AST.ProgramNode) {
	    return input;
	  }

	  Handlebars.Parser.yy = Handlebars.AST;
	  return Handlebars.Parser.parse(input);
	};

	Handlebars.print = function (ast) {
	  return new Handlebars.PrintVisitor().accept(ast);
	};;
	// lib/handlebars/compiler/ast.js
	(function () {

	  Handlebars.AST = {};

	  Handlebars.AST.ProgramNode = function (statements, inverse) {
	    this.type = "program";
	    this.statements = statements;
	    if (inverse) {
	      this.inverse = new Handlebars.AST.ProgramNode(inverse);
	    }
	  };

	  Handlebars.AST.MustacheNode = function (rawParams, hash, unescaped) {
	    this.type = "mustache";
	    this.escaped = !unescaped;
	    this.hash = hash;

	    var id = this.id = rawParams[0];
	    var params = this.params = rawParams.slice(1);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var eligibleHelper = this.eligibleHelper = id.isSimple;

	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    this.isHelper = eligibleHelper && (params.length || hash);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	  };

	  Handlebars.AST.PartialNode = function (partialName, context) {
	    this.type = "partial";
	    this.partialName = partialName;
	    this.context = context;
	  };

	  var verifyMatch = function (open, close) {
	    if (open.original !== close.original) {
	      throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
	    }
	  };

	  Handlebars.AST.BlockNode = function (mustache, program, inverse, close) {
	    verifyMatch(mustache.id, close);
	    this.type = "block";
	    this.mustache = mustache;
	    this.program = program;
	    this.inverse = inverse;

	    if (this.inverse && !this.program) {
	      this.isInverse = true;
	    }
	  };

	  Handlebars.AST.ContentNode = function (string) {
	    this.type = "content";
	    this.string = string;
	  };

	  Handlebars.AST.HashNode = function (pairs) {
	    this.type = "hash";
	    this.pairs = pairs;
	  };

	  Handlebars.AST.IdNode = function (parts) {
	    this.type = "ID";
	    this.original = parts.join(".");

	    var dig = [],
	        depth = 0;

	    for (var i = 0, l = parts.length; i < l; i++) {
	      var part = parts[i];

	      if (part === ".." || part === "." || part === "this") {
	        if (dig.length > 0) {
	          throw new Handlebars.Exception("Invalid path: " + this.original);
	        } else if (part === "..") {
	          depth++;
	        } else {
	          this.isScoped = true;
	        }
	      } else {
	        dig.push(part);
	      }
	    }

	    this.parts = dig;
	    this.string = dig.join('.');
	    this.depth = depth;

	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

	    this.stringModeValue = this.string;
	  };

	  Handlebars.AST.PartialNameNode = function (name) {
	    this.type = "PARTIAL_NAME";
	    this.name = name;
	  };

	  Handlebars.AST.DataNode = function (id) {
	    this.type = "DATA";
	    this.id = id;
	  };

	  Handlebars.AST.StringNode = function (string) {
	    this.type = "STRING";
	    this.string = string;
	    this.stringModeValue = string;
	  };

	  Handlebars.AST.IntegerNode = function (integer) {
	    this.type = "INTEGER";
	    this.integer = integer;
	    this.stringModeValue = Number(integer);
	  };

	  Handlebars.AST.BooleanNode = function (bool) {
	    this.type = "BOOLEAN";
	    this.bool = bool;
	    this.stringModeValue = bool === "true";
	  };

	  Handlebars.AST.CommentNode = function (comment) {
	    this.type = "comment";
	    this.comment = comment;
	  };
	})();;
	// lib/handlebars/utils.js

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	Handlebars.Exception = function (message) {
	  var tmp = Error.prototype.constructor.apply(this, arguments);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }
	};
	Handlebars.Exception.prototype = new Error();

	// Build out our basic SafeString type
	Handlebars.SafeString = function (string) {
	  this.string = string;
	};
	Handlebars.SafeString.prototype.toString = function () {
	  return this.string.toString();
	};

	(function () {
	  var escape = {
	    "&": "&amp;",
	    "<": "&lt;",
	    ">": "&gt;",
	    '"': "&quot;",
	    "'": "&#x27;",
	    "`": "&#x60;"
	  };

	  var badChars = /[&<>"'`]/g;
	  var possible = /[&<>"'`]/;

	  var escapeChar = function (chr) {
	    return escape[chr] || "&amp;";
	  };

	  Handlebars.Utils = {
	    escapeExpression: function (string) {
	      // don't escape SafeStrings, since they're already safe
	      if (string instanceof Handlebars.SafeString) {
	        return string.toString();
	      } else if (string == null || string === false) {
	        return "";
	      }

	      if (!possible.test(string)) {
	        return string;
	      }
	      return string.replace(badChars, escapeChar);
	    },

	    isEmpty: function (value) {
	      if (!value && value !== 0) {
	        return true;
	      } else if (Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  };
	})();;
	// lib/handlebars/compiler/compiler.js

	/*jshint eqnull:true*/
	Handlebars.Compiler = function () {};
	Handlebars.JavaScriptCompiler = function () {};

	(function (Compiler, JavaScriptCompiler) {
	  // the foundHelper register will disambiguate helper lookup from finding a
	  // function in a context. This is necessary for mustache compatibility, which
	  // requires that context functions in blocks are evaluated by blockHelperMissing,
	  // and then proceed as if the resulting value was provided to blockHelperMissing.

	  Compiler.prototype = {
	    compiler: Compiler,

	    disassemble: function () {
	      var opcodes = this.opcodes,
	          opcode,
	          out = [],
	          params,
	          param;

	      for (var i = 0, l = opcodes.length; i < l; i++) {
	        opcode = opcodes[i];

	        if (opcode.opcode === 'DECLARE') {
	          out.push("DECLARE " + opcode.name + "=" + opcode.value);
	        } else {
	          params = [];
	          for (var j = 0; j < opcode.args.length; j++) {
	            param = opcode.args[j];
	            if (typeof param === "string") {
	              param = "\"" + param.replace("\n", "\\n") + "\"";
	            }
	            params.push(param);
	          }
	          out.push(opcode.opcode + " " + params.join(" "));
	        }
	      }

	      return out.join("\n");
	    },
	    equals: function (other) {
	      var len = this.opcodes.length;
	      if (other.opcodes.length !== len) {
	        return false;
	      }

	      for (var i = 0; i < len; i++) {
	        var opcode = this.opcodes[i],
	            otherOpcode = other.opcodes[i];
	        if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
	          return false;
	        }
	        for (var j = 0; j < opcode.args.length; j++) {
	          if (opcode.args[j] !== otherOpcode.args[j]) {
	            return false;
	          }
	        }
	      }
	      return true;
	    },

	    guid: 0,

	    compile: function (program, options) {
	      this.children = [];
	      this.depths = { list: [] };
	      this.options = options;

	      // These changes will propagate to the other compiler components
	      var knownHelpers = this.options.knownHelpers;
	      this.options.knownHelpers = {
	        'helperMissing': true,
	        'blockHelperMissing': true,
	        'each': true,
	        'if': true,
	        'unless': true,
	        'with': true,
	        'log': true
	      };
	      if (knownHelpers) {
	        for (var name in knownHelpers) {
	          this.options.knownHelpers[name] = knownHelpers[name];
	        }
	      }

	      return this.program(program);
	    },

	    accept: function (node) {
	      return this[node.type](node);
	    },

	    program: function (program) {
	      var statements = program.statements,
	          statement;
	      this.opcodes = [];

	      for (var i = 0, l = statements.length; i < l; i++) {
	        statement = statements[i];
	        this[statement.type](statement);
	      }
	      this.isSimple = l === 1;

	      this.depths.list = this.depths.list.sort(function (a, b) {
	        return a - b;
	      });

	      return this;
	    },

	    compileProgram: function (program) {
	      var result = new this.compiler().compile(program, this.options);
	      var guid = this.guid++,
	          depth;

	      this.usePartial = this.usePartial || result.usePartial;

	      this.children[guid] = result;

	      for (var i = 0, l = result.depths.list.length; i < l; i++) {
	        depth = result.depths.list[i];

	        if (depth < 2) {
	          continue;
	        } else {
	          this.addDepth(depth - 1);
	        }
	      }

	      return guid;
	    },

	    block: function (block) {
	      var mustache = block.mustache,
	          program = block.program,
	          inverse = block.inverse;

	      if (program) {
	        program = this.compileProgram(program);
	      }

	      if (inverse) {
	        inverse = this.compileProgram(inverse);
	      }

	      var type = this.classifyMustache(mustache);

	      if (type === "helper") {
	        this.helperMustache(mustache, program, inverse);
	      } else if (type === "simple") {
	        this.simpleMustache(mustache);

	        // now that the simple mustache is resolved, we need to
	        // evaluate it by executing `blockHelperMissing`
	        this.opcode('pushProgram', program);
	        this.opcode('pushProgram', inverse);
	        this.opcode('emptyHash');
	        this.opcode('blockValue');
	      } else {
	        this.ambiguousMustache(mustache, program, inverse);

	        // now that the simple mustache is resolved, we need to
	        // evaluate it by executing `blockHelperMissing`
	        this.opcode('pushProgram', program);
	        this.opcode('pushProgram', inverse);
	        this.opcode('emptyHash');
	        this.opcode('ambiguousBlockValue');
	      }

	      this.opcode('append');
	    },

	    hash: function (hash) {
	      var pairs = hash.pairs,
	          pair,
	          val;

	      this.opcode('pushHash');

	      for (var i = 0, l = pairs.length; i < l; i++) {
	        pair = pairs[i];
	        val = pair[1];

	        if (this.options.stringParams) {
	          this.opcode('pushStringParam', val.stringModeValue, val.type);
	        } else {
	          this.accept(val);
	        }

	        this.opcode('assignToHash', pair[0]);
	      }
	      this.opcode('popHash');
	    },

	    partial: function (partial) {
	      var partialName = partial.partialName;
	      this.usePartial = true;

	      if (partial.context) {
	        this.ID(partial.context);
	      } else {
	        this.opcode('push', 'depth0');
	      }

	      this.opcode('invokePartial', partialName.name);
	      this.opcode('append');
	    },

	    content: function (content) {
	      this.opcode('appendContent', content.string);
	    },

	    mustache: function (mustache) {
	      var options = this.options;
	      var type = this.classifyMustache(mustache);

	      if (type === "simple") {
	        this.simpleMustache(mustache);
	      } else if (type === "helper") {
	        this.helperMustache(mustache);
	      } else {
	        this.ambiguousMustache(mustache);
	      }

	      if (mustache.escaped && !options.noEscape) {
	        this.opcode('appendEscaped');
	      } else {
	        this.opcode('append');
	      }
	    },

	    ambiguousMustache: function (mustache, program, inverse) {
	      var id = mustache.id,
	          name = id.parts[0],
	          isBlock = program != null || inverse != null;

	      this.opcode('getContext', id.depth);

	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);

	      this.opcode('invokeAmbiguous', name, isBlock);
	    },

	    simpleMustache: function (mustache) {
	      var id = mustache.id;

	      if (id.type === 'DATA') {
	        this.DATA(id);
	      } else if (id.parts.length) {
	        this.ID(id);
	      } else {
	        // Simplified ID for `this`
	        this.addDepth(id.depth);
	        this.opcode('getContext', id.depth);
	        this.opcode('pushContext');
	      }

	      this.opcode('resolvePossibleLambda');
	    },

	    helperMustache: function (mustache, program, inverse) {
	      var params = this.setupFullMustacheParams(mustache, program, inverse),
	          name = mustache.id.parts[0];

	      if (this.options.knownHelpers[name]) {
	        this.opcode('invokeKnownHelper', params.length, name);
	      } else if (this.knownHelpersOnly) {
	        throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
	      } else {
	        this.opcode('invokeHelper', params.length, name);
	      }
	    },

	    ID: function (id) {
	      this.addDepth(id.depth);
	      this.opcode('getContext', id.depth);

	      var name = id.parts[0];
	      if (!name) {
	        this.opcode('pushContext');
	      } else {
	        this.opcode('lookupOnContext', id.parts[0]);
	      }

	      for (var i = 1, l = id.parts.length; i < l; i++) {
	        this.opcode('lookup', id.parts[i]);
	      }
	    },

	    DATA: function (data) {
	      this.options.data = true;
	      this.opcode('lookupData', data.id);
	    },

	    STRING: function (string) {
	      this.opcode('pushString', string.string);
	    },

	    INTEGER: function (integer) {
	      this.opcode('pushLiteral', integer.integer);
	    },

	    BOOLEAN: function (bool) {
	      this.opcode('pushLiteral', bool.bool);
	    },

	    comment: function () {},

	    // HELPERS
	    opcode: function (name) {
	      this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
	    },

	    declare: function (name, value) {
	      this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
	    },

	    addDepth: function (depth) {
	      if (isNaN(depth)) {
	        throw new Error("EWOT");
	      }
	      if (depth === 0) {
	        return;
	      }

	      if (!this.depths[depth]) {
	        this.depths[depth] = true;
	        this.depths.list.push(depth);
	      }
	    },

	    classifyMustache: function (mustache) {
	      var isHelper = mustache.isHelper;
	      var isEligible = mustache.eligibleHelper;
	      var options = this.options;

	      // if ambiguous, we can possibly resolve the ambiguity now
	      if (isEligible && !isHelper) {
	        var name = mustache.id.parts[0];

	        if (options.knownHelpers[name]) {
	          isHelper = true;
	        } else if (options.knownHelpersOnly) {
	          isEligible = false;
	        }
	      }

	      if (isHelper) {
	        return "helper";
	      } else if (isEligible) {
	        return "ambiguous";
	      } else {
	        return "simple";
	      }
	    },

	    pushParams: function (params) {
	      var i = params.length,
	          param;

	      while (i--) {
	        param = params[i];

	        if (this.options.stringParams) {
	          if (param.depth) {
	            this.addDepth(param.depth);
	          }

	          this.opcode('getContext', param.depth || 0);
	          this.opcode('pushStringParam', param.stringModeValue, param.type);
	        } else {
	          this[param.type](param);
	        }
	      }
	    },

	    setupMustacheParams: function (mustache) {
	      var params = mustache.params;
	      this.pushParams(params);

	      if (mustache.hash) {
	        this.hash(mustache.hash);
	      } else {
	        this.opcode('emptyHash');
	      }

	      return params;
	    },

	    // this will replace setupMustacheParams when we're done
	    setupFullMustacheParams: function (mustache, program, inverse) {
	      var params = mustache.params;
	      this.pushParams(params);

	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);

	      if (mustache.hash) {
	        this.hash(mustache.hash);
	      } else {
	        this.opcode('emptyHash');
	      }

	      return params;
	    }
	  };

	  var Literal = function (value) {
	    this.value = value;
	  };

	  JavaScriptCompiler.prototype = {
	    // PUBLIC API: You can override these methods in a subclass to provide
	    // alternative compiled forms for name lookup and buffering semantics
	    nameLookup: function (parent, name /* , type*/) {
	      if (/^[0-9]+$/.test(name)) {
	        return parent + "[" + name + "]";
	      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
	        return parent + "." + name;
	      } else {
	        return parent + "['" + name + "']";
	      }
	    },

	    appendToBuffer: function (string) {
	      if (this.environment.isSimple) {
	        return "return " + string + ";";
	      } else {
	        return {
	          appendToBuffer: true,
	          content: string,
	          toString: function () {
	            return "buffer += " + string + ";";
	          }
	        };
	      }
	    },

	    initializeBuffer: function () {
	      return this.quotedString("");
	    },

	    namespace: "Handlebars",
	    // END PUBLIC API

	    compile: function (environment, options, context, asObject) {
	      this.environment = environment;
	      this.options = options || {};

	      Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n");

	      this.name = this.environment.name;
	      this.isChild = !!context;
	      this.context = context || {
	        programs: [],
	        environments: [],
	        aliases: {}
	      };

	      this.preamble();

	      this.stackSlot = 0;
	      this.stackVars = [];
	      this.registers = { list: [] };
	      this.compileStack = [];
	      this.inlineStack = [];

	      this.compileChildren(environment, options);

	      var opcodes = environment.opcodes,
	          opcode;

	      this.i = 0;

	      for (l = opcodes.length; this.i < l; this.i++) {
	        opcode = opcodes[this.i];

	        if (opcode.opcode === 'DECLARE') {
	          this[opcode.name] = opcode.value;
	        } else {
	          this[opcode.opcode].apply(this, opcode.args);
	        }
	      }

	      return this.createFunctionContext(asObject);
	    },

	    nextOpcode: function () {
	      var opcodes = this.environment.opcodes;
	      return opcodes[this.i + 1];
	    },

	    eat: function () {
	      this.i = this.i + 1;
	    },

	    preamble: function () {
	      var out = [];

	      if (!this.isChild) {
	        var namespace = this.namespace;
	        var copies = "helpers = helpers || " + namespace + ".helpers;";
	        if (this.environment.usePartial) {
	          copies = copies + " partials = partials || " + namespace + ".partials;";
	        }
	        if (this.options.data) {
	          copies = copies + " data = data || {};";
	        }
	        out.push(copies);
	      } else {
	        out.push('');
	      }

	      if (!this.environment.isSimple) {
	        out.push(", buffer = " + this.initializeBuffer());
	      } else {
	        out.push("");
	      }

	      // track the last context pushed into place to allow skipping the
	      // getContext opcode when it would be a noop
	      this.lastContext = 0;
	      this.source = out;
	    },

	    createFunctionContext: function (asObject) {
	      var locals = this.stackVars.concat(this.registers.list);

	      if (locals.length > 0) {
	        this.source[1] = this.source[1] + ", " + locals.join(", ");
	      }

	      // Generate minimizer alias mappings
	      if (!this.isChild) {
	        for (var alias in this.context.aliases) {
	          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
	        }
	      }

	      if (this.source[1]) {
	        this.source[1] = "var " + this.source[1].substring(2) + ";";
	      }

	      // Merge children
	      if (!this.isChild) {
	        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
	      }

	      if (!this.environment.isSimple) {
	        this.source.push("return buffer;");
	      }

	      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

	      for (var i = 0, l = this.environment.depths.list.length; i < l; i++) {
	        params.push("depth" + this.environment.depths.list[i]);
	      }

	      // Perform a second pass over the output to merge content when possible
	      var source = this.mergeSource();

	      if (!this.isChild) {
	        var revision = Handlebars.COMPILER_REVISION,
	            versions = Handlebars.REVISION_CHANGES[revision];
	        source = "this.compilerInfo = [" + revision + ",'" + versions + "'];\n" + source;
	      }

	      if (asObject) {
	        params.push(source);

	        return Function.apply(this, params);
	      } else {
	        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
	        Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
	        return functionSource;
	      }
	    },
	    mergeSource: function () {
	      // WARN: We are not handling the case where buffer is still populated as the source should
	      // not have buffer append operations as their final action.
	      var source = '',
	          buffer;
	      for (var i = 0, len = this.source.length; i < len; i++) {
	        var line = this.source[i];
	        if (line.appendToBuffer) {
	          if (buffer) {
	            buffer = buffer + '\n    + ' + line.content;
	          } else {
	            buffer = line.content;
	          }
	        } else {
	          if (buffer) {
	            source += 'buffer += ' + buffer + ';\n  ';
	            buffer = undefined;
	          }
	          source += line + '\n  ';
	        }
	      }
	      return source;
	    },

	    // [blockValue]
	    //
	    // On stack, before: hash, inverse, program, value
	    // On stack, after: return value of blockHelperMissing
	    //
	    // The purpose of this opcode is to take a block of the form
	    // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
	    // replace it on the stack with the result of properly
	    // invoking blockHelperMissing.
	    blockValue: function () {
	      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

	      var params = ["depth0"];
	      this.setupParams(0, params);

	      this.replaceStack(function (current) {
	        params.splice(1, 0, current);
	        return "blockHelperMissing.call(" + params.join(", ") + ")";
	      });
	    },

	    // [ambiguousBlockValue]
	    //
	    // On stack, before: hash, inverse, program, value
	    // Compiler value, before: lastHelper=value of last found helper, if any
	    // On stack, after, if no lastHelper: same as [blockValue]
	    // On stack, after, if lastHelper: value
	    ambiguousBlockValue: function () {
	      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

	      var params = ["depth0"];
	      this.setupParams(0, params);

	      var current = this.topStack();
	      params.splice(1, 0, current);

	      // Use the options value generated from the invocation
	      params[params.length - 1] = 'options';

	      this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
	    },

	    // [appendContent]
	    //
	    // On stack, before: ...
	    // On stack, after: ...
	    //
	    // Appends the string value of `content` to the current buffer
	    appendContent: function (content) {
	      this.source.push(this.appendToBuffer(this.quotedString(content)));
	    },

	    // [append]
	    //
	    // On stack, before: value, ...
	    // On stack, after: ...
	    //
	    // Coerces `value` to a String and appends it to the current buffer.
	    //
	    // If `value` is truthy, or 0, it is coerced into a string and appended
	    // Otherwise, the empty string is appended
	    append: function () {
	      // Force anything that is inlined onto the stack so we don't have duplication
	      // when we examine local
	      this.flushInline();
	      var local = this.popStack();
	      this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
	      if (this.environment.isSimple) {
	        this.source.push("else { " + this.appendToBuffer("''") + " }");
	      }
	    },

	    // [appendEscaped]
	    //
	    // On stack, before: value, ...
	    // On stack, after: ...
	    //
	    // Escape `value` and append it to the buffer
	    appendEscaped: function () {
	      this.context.aliases.escapeExpression = 'this.escapeExpression';

	      this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
	    },

	    // [getContext]
	    //
	    // On stack, before: ...
	    // On stack, after: ...
	    // Compiler value, after: lastContext=depth
	    //
	    // Set the value of the `lastContext` compiler value to the depth
	    getContext: function (depth) {
	      if (this.lastContext !== depth) {
	        this.lastContext = depth;
	      }
	    },

	    // [lookupOnContext]
	    //
	    // On stack, before: ...
	    // On stack, after: currentContext[name], ...
	    //
	    // Looks up the value of `name` on the current context and pushes
	    // it onto the stack.
	    lookupOnContext: function (name) {
	      this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
	    },

	    // [pushContext]
	    //
	    // On stack, before: ...
	    // On stack, after: currentContext, ...
	    //
	    // Pushes the value of the current context onto the stack.
	    pushContext: function () {
	      this.pushStackLiteral('depth' + this.lastContext);
	    },

	    // [resolvePossibleLambda]
	    //
	    // On stack, before: value, ...
	    // On stack, after: resolved value, ...
	    //
	    // If the `value` is a lambda, replace it on the stack by
	    // the return value of the lambda
	    resolvePossibleLambda: function () {
	      this.context.aliases.functionType = '"function"';

	      this.replaceStack(function (current) {
	        return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
	      });
	    },

	    // [lookup]
	    //
	    // On stack, before: value, ...
	    // On stack, after: value[name], ...
	    //
	    // Replace the value on the stack with the result of looking
	    // up `name` on `value`
	    lookup: function (name) {
	      this.replaceStack(function (current) {
	        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
	      });
	    },

	    // [lookupData]
	    //
	    // On stack, before: ...
	    // On stack, after: data[id], ...
	    //
	    // Push the result of looking up `id` on the current data
	    lookupData: function (id) {
	      this.push(this.nameLookup('data', id, 'data'));
	    },

	    // [pushStringParam]
	    //
	    // On stack, before: ...
	    // On stack, after: string, currentContext, ...
	    //
	    // This opcode is designed for use in string mode, which
	    // provides the string value of a parameter along with its
	    // depth rather than resolving it immediately.
	    pushStringParam: function (string, type) {
	      this.pushStackLiteral('depth' + this.lastContext);

	      this.pushString(type);

	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    },

	    emptyHash: function () {
	      this.pushStackLiteral('{}');

	      if (this.options.stringParams) {
	        this.register('hashTypes', '{}');
	      }
	    },
	    pushHash: function () {
	      this.hash = { values: [], types: [] };
	    },
	    popHash: function () {
	      var hash = this.hash;
	      this.hash = undefined;

	      if (this.options.stringParams) {
	        this.register('hashTypes', '{' + hash.types.join(',') + '}');
	      }
	      this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
	    },

	    // [pushString]
	    //
	    // On stack, before: ...
	    // On stack, after: quotedString(string), ...
	    //
	    // Push a quoted version of `string` onto the stack
	    pushString: function (string) {
	      this.pushStackLiteral(this.quotedString(string));
	    },

	    // [push]
	    //
	    // On stack, before: ...
	    // On stack, after: expr, ...
	    //
	    // Push an expression onto the stack
	    push: function (expr) {
	      this.inlineStack.push(expr);
	      return expr;
	    },

	    // [pushLiteral]
	    //
	    // On stack, before: ...
	    // On stack, after: value, ...
	    //
	    // Pushes a value onto the stack. This operation prevents
	    // the compiler from creating a temporary variable to hold
	    // it.
	    pushLiteral: function (value) {
	      this.pushStackLiteral(value);
	    },

	    // [pushProgram]
	    //
	    // On stack, before: ...
	    // On stack, after: program(guid), ...
	    //
	    // Push a program expression onto the stack. This takes
	    // a compile-time guid and converts it into a runtime-accessible
	    // expression.
	    pushProgram: function (guid) {
	      if (guid != null) {
	        this.pushStackLiteral(this.programExpression(guid));
	      } else {
	        this.pushStackLiteral(null);
	      }
	    },

	    // [invokeHelper]
	    //
	    // On stack, before: hash, inverse, program, params..., ...
	    // On stack, after: result of helper invocation
	    //
	    // Pops off the helper's parameters, invokes the helper,
	    // and pushes the helper's return value onto the stack.
	    //
	    // If the helper is not found, `helperMissing` is called.
	    invokeHelper: function (paramSize, name) {
	      this.context.aliases.helperMissing = 'helpers.helperMissing';

	      var helper = this.lastHelper = this.setupHelper(paramSize, name, true);

	      this.push(helper.name);
	      this.replaceStack(function (name) {
	        return name + ' ? ' + name + '.call(' + helper.callParams + ") " + ": helperMissing.call(" + helper.helperMissingParams + ")";
	      });
	    },

	    // [invokeKnownHelper]
	    //
	    // On stack, before: hash, inverse, program, params..., ...
	    // On stack, after: result of helper invocation
	    //
	    // This operation is used when the helper is known to exist,
	    // so a `helperMissing` fallback is not required.
	    invokeKnownHelper: function (paramSize, name) {
	      var helper = this.setupHelper(paramSize, name);
	      this.push(helper.name + ".call(" + helper.callParams + ")");
	    },

	    // [invokeAmbiguous]
	    //
	    // On stack, before: hash, inverse, program, params..., ...
	    // On stack, after: result of disambiguation
	    //
	    // This operation is used when an expression like `{{foo}}`
	    // is provided, but we don't know at compile-time whether it
	    // is a helper or a path.
	    //
	    // This operation emits more code than the other options,
	    // and can be avoided by passing the `knownHelpers` and
	    // `knownHelpersOnly` flags at compile-time.
	    invokeAmbiguous: function (name, helperCall) {
	      this.context.aliases.functionType = '"function"';

	      this.pushStackLiteral('{}'); // Hash value
	      var helper = this.setupHelper(0, name, helperCall);

	      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

	      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
	      var nextStack = this.nextStack();

	      this.source.push('if (' + nextStack + ' = ' + helperName + ') { ' + nextStack + ' = ' + nextStack + '.call(' + helper.callParams + '); }');
	      this.source.push('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '.apply(depth0) : ' + nextStack + '; }');
	    },

	    // [invokePartial]
	    //
	    // On stack, before: context, ...
	    // On stack after: result of partial invocation
	    //
	    // This operation pops off a context, invokes a partial with that context,
	    // and pushes the result of the invocation back.
	    invokePartial: function (name) {
	      var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

	      if (this.options.data) {
	        params.push("data");
	      }

	      this.context.aliases.self = "this";
	      this.push("self.invokePartial(" + params.join(", ") + ")");
	    },

	    // [assignToHash]
	    //
	    // On stack, before: value, hash, ...
	    // On stack, after: hash, ...
	    //
	    // Pops a value and hash off the stack, assigns `hash[key] = value`
	    // and pushes the hash back onto the stack.
	    assignToHash: function (key) {
	      var value = this.popStack(),
	          type;

	      if (this.options.stringParams) {
	        type = this.popStack();
	        this.popStack();
	      }

	      var hash = this.hash;
	      if (type) {
	        hash.types.push("'" + key + "': " + type);
	      }
	      hash.values.push("'" + key + "': (" + value + ")");
	    },

	    // HELPERS

	    compiler: JavaScriptCompiler,

	    compileChildren: function (environment, options) {
	      var children = environment.children,
	          child,
	          compiler;

	      for (var i = 0, l = children.length; i < l; i++) {
	        child = children[i];
	        compiler = new this.compiler();

	        var index = this.matchExistingProgram(child);

	        if (index == null) {
	          this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
	          index = this.context.programs.length;
	          child.index = index;
	          child.name = 'program' + index;
	          this.context.programs[index] = compiler.compile(child, options, this.context);
	          this.context.environments[index] = child;
	        } else {
	          child.index = index;
	          child.name = 'program' + index;
	        }
	      }
	    },
	    matchExistingProgram: function (child) {
	      for (var i = 0, len = this.context.environments.length; i < len; i++) {
	        var environment = this.context.environments[i];
	        if (environment && environment.equals(child)) {
	          return i;
	        }
	      }
	    },

	    programExpression: function (guid) {
	      this.context.aliases.self = "this";

	      if (guid == null) {
	        return "self.noop";
	      }

	      var child = this.environment.children[guid],
	          depths = child.depths.list,
	          depth;

	      var programParams = [child.index, child.name, "data"];

	      for (var i = 0, l = depths.length; i < l; i++) {
	        depth = depths[i];

	        if (depth === 1) {
	          programParams.push("depth0");
	        } else {
	          programParams.push("depth" + (depth - 1));
	        }
	      }

	      if (depths.length === 0) {
	        return "self.program(" + programParams.join(", ") + ")";
	      } else {
	        programParams.shift();
	        return "self.programWithDepth(" + programParams.join(", ") + ")";
	      }
	    },

	    register: function (name, val) {
	      this.useRegister(name);
	      this.source.push(name + " = " + val + ";");
	    },

	    useRegister: function (name) {
	      if (!this.registers[name]) {
	        this.registers[name] = true;
	        this.registers.list.push(name);
	      }
	    },

	    pushStackLiteral: function (item) {
	      return this.push(new Literal(item));
	    },

	    pushStack: function (item) {
	      this.flushInline();

	      var stack = this.incrStack();
	      if (item) {
	        this.source.push(stack + " = " + item + ";");
	      }
	      this.compileStack.push(stack);
	      return stack;
	    },

	    replaceStack: function (callback) {
	      var prefix = '',
	          inline = this.isInline(),
	          stack;

	      // If we are currently inline then we want to merge the inline statement into the
	      // replacement statement via ','
	      if (inline) {
	        var top = this.popStack(true);

	        if (top instanceof Literal) {
	          // Literals do not need to be inlined
	          stack = top.value;
	        } else {
	          // Get or create the current stack name for use by the inline
	          var name = this.stackSlot ? this.topStackName() : this.incrStack();

	          prefix = '(' + this.push(name) + ' = ' + top + '),';
	          stack = this.topStack();
	        }
	      } else {
	        stack = this.topStack();
	      }

	      var item = callback.call(this, stack);

	      if (inline) {
	        if (this.inlineStack.length || this.compileStack.length) {
	          this.popStack();
	        }
	        this.push('(' + prefix + item + ')');
	      } else {
	        // Prevent modification of the context depth variable. Through replaceStack
	        if (!/^stack/.test(stack)) {
	          stack = this.nextStack();
	        }

	        this.source.push(stack + " = (" + prefix + item + ");");
	      }
	      return stack;
	    },

	    nextStack: function () {
	      return this.pushStack();
	    },

	    incrStack: function () {
	      this.stackSlot++;
	      if (this.stackSlot > this.stackVars.length) {
	        this.stackVars.push("stack" + this.stackSlot);
	      }
	      return this.topStackName();
	    },
	    topStackName: function () {
	      return "stack" + this.stackSlot;
	    },
	    flushInline: function () {
	      var inlineStack = this.inlineStack;
	      if (inlineStack.length) {
	        this.inlineStack = [];
	        for (var i = 0, len = inlineStack.length; i < len; i++) {
	          var entry = inlineStack[i];
	          if (entry instanceof Literal) {
	            this.compileStack.push(entry);
	          } else {
	            this.pushStack(entry);
	          }
	        }
	      }
	    },
	    isInline: function () {
	      return this.inlineStack.length;
	    },

	    popStack: function (wrapped) {
	      var inline = this.isInline(),
	          item = (inline ? this.inlineStack : this.compileStack).pop();

	      if (!wrapped && item instanceof Literal) {
	        return item.value;
	      } else {
	        if (!inline) {
	          this.stackSlot--;
	        }
	        return item;
	      }
	    },

	    topStack: function (wrapped) {
	      var stack = this.isInline() ? this.inlineStack : this.compileStack,
	          item = stack[stack.length - 1];

	      if (!wrapped && item instanceof Literal) {
	        return item.value;
	      } else {
	        return item;
	      }
	    },

	    quotedString: function (str) {
	      return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
	    },

	    setupHelper: function (paramSize, name, missingParams) {
	      var params = [];
	      this.setupParams(paramSize, params, missingParams);
	      var foundHelper = this.nameLookup('helpers', name, 'helper');

	      return {
	        params: params,
	        name: foundHelper,
	        callParams: ["depth0"].concat(params).join(", "),
	        helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
	      };
	    },

	    // the params and contexts arguments are passed in arrays
	    // to fill in
	    setupParams: function (paramSize, params, useRegister) {
	      var options = [],
	          contexts = [],
	          types = [],
	          param,
	          inverse,
	          program;

	      options.push("hash:" + this.popStack());

	      inverse = this.popStack();
	      program = this.popStack();

	      // Avoid setting fn and inverse if neither are set. This allows
	      // helpers to do a check for `if (options.fn)`
	      if (program || inverse) {
	        if (!program) {
	          this.context.aliases.self = "this";
	          program = "self.noop";
	        }

	        if (!inverse) {
	          this.context.aliases.self = "this";
	          inverse = "self.noop";
	        }

	        options.push("inverse:" + inverse);
	        options.push("fn:" + program);
	      }

	      for (var i = 0; i < paramSize; i++) {
	        param = this.popStack();
	        params.push(param);

	        if (this.options.stringParams) {
	          types.push(this.popStack());
	          contexts.push(this.popStack());
	        }
	      }

	      if (this.options.stringParams) {
	        options.push("contexts:[" + contexts.join(",") + "]");
	        options.push("types:[" + types.join(",") + "]");
	        options.push("hashTypes:hashTypes");
	      }

	      if (this.options.data) {
	        options.push("data:data");
	      }

	      options = "{" + options.join(",") + "}";
	      if (useRegister) {
	        this.register('options', options);
	        params.push('options');
	      } else {
	        params.push(options);
	      }
	      return params.join(", ");
	    }
	  };

	  var reservedWords = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield").split(" ");

	  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

	  for (var i = 0, l = reservedWords.length; i < l; i++) {
	    compilerWords[reservedWords[i]] = true;
	  }

	  JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
	    if (!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
	      return true;
	    }
	    return false;
	  };
	})(Handlebars.Compiler, Handlebars.JavaScriptCompiler);

	Handlebars.precompile = function (input, options) {
	  if (!input || typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode) {
	    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  var ast = Handlebars.parse(input);
	  var environment = new Handlebars.Compiler().compile(ast, options);
	  return new Handlebars.JavaScriptCompiler().compile(environment, options);
	};

	Handlebars.compile = function (input, options) {
	  if (!input || typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode) {
	    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  var compiled;
	  function compile() {
	    var ast = Handlebars.parse(input);
	    var environment = new Handlebars.Compiler().compile(ast, options);
	    var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return Handlebars.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  return function (context, options) {
	    if (!compiled) {
	      compiled = compile();
	    }
	    return compiled.call(this, context, options);
	  };
	};
	;
	// lib/handlebars/runtime.js
	Handlebars.VM = {
	  template: function (templateSpec) {
	    // Just add water
	    var container = {
	      escapeExpression: Handlebars.Utils.escapeExpression,
	      invokePartial: Handlebars.VM.invokePartial,
	      programs: [],
	      program: function (i, fn, data) {
	        var programWrapper = this.programs[i];
	        if (data) {
	          return Handlebars.VM.program(fn, data);
	        } else if (programWrapper) {
	          return programWrapper;
	        } else {
	          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
	          return programWrapper;
	        }
	      },
	      programWithDepth: Handlebars.VM.programWithDepth,
	      noop: Handlebars.VM.noop,
	      compilerInfo: null
	    };

	    return function (context, options) {
	      options = options || {};
	      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

	      var compilerInfo = container.compilerInfo || [],
	          compilerRevision = compilerInfo[0] || 1,
	          currentRevision = Handlebars.COMPILER_REVISION;

	      if (compilerRevision !== currentRevision) {
	        if (compilerRevision < currentRevision) {
	          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
	              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
	          throw "Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").";
	        } else {
	          // Use the embedded version info since the runtime doesn't know about this revision yet
	          throw "Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + compilerInfo[1] + ").";
	        }
	      }

	      return result;
	    };
	  },

	  programWithDepth: function (fn, data, $depth) {
	    var args = Array.prototype.slice.call(arguments, 2);

	    return function (context, options) {
	      options = options || {};

	      return fn.apply(this, [context, options.data || data].concat(args));
	    };
	  },
	  program: function (fn, data) {
	    return function (context, options) {
	      options = options || {};

	      return fn(context, options.data || data);
	    };
	  },
	  noop: function () {
	    return "";
	  },
	  invokePartial: function (partial, name, context, helpers, partials, data) {
	    var options = { helpers: helpers, partials: partials, data: data };

	    if (partial === undefined) {
	      throw new Handlebars.Exception("The partial " + name + " could not be found");
	    } else if (partial instanceof Function) {
	      return partial(context, options);
	    } else if (!Handlebars.compile) {
	      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
	    } else {
	      partials[name] = Handlebars.compile(partial, { data: data !== undefined });
	      return partials[name](context, options);
	    }
	  }
	};

	Handlebars.template = Handlebars.VM.template;
	;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by liyongliang on 2015/11/3.
	 */

	__webpack_require__(1);
	var Tools = __webpack_require__(3);

	var helpers = {

	    sliderIndexBanner: function () {}

	};

	for (var helper in helpers) {
	    if (helpers.hasOwnProperty(helper)) {
	        Handlebars.registerHelper(helper, helpers[helper]);
	    }
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by liyongliang on 2015/11/3.
	 */

	var mouseHover = __webpack_require__(4);

	var Tools = {

	    //判断对象是否为空。包括"" null undefined
	    isEmpty: function (obj) {
	        if (typeof obj == 'undefined') {
	            return true;
	        }

	        if (obj == 'undefined') {
	            return true;
	        }

	        if (obj == null) {
	            return true;
	        }

	        if (obj == 'null') {
	            return true;
	        }

	        if (typeof obj === 'boolean' && !obj) {
	            return true;
	        }

	        if (obj === 'false') {
	            return true;
	        }

	        return false;
	    },

	    isSessionStorageSupported: function () {

	        if ('sessionStorage' in window && window['sessionStorage'] !== null) {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    addCSS: function (cssText) {
	        var style = document.createElement('style'); //创建一个style元素
	        var head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
	        style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
	        if (style.styleSheet) {
	            //IE
	            var func = function () {
	                try {
	                    //防止IE中stylesheet数量超过限制而发生错误
	                    style.styleSheet.cssText = cssText;
	                } catch (e) {}
	            };
	            //如果当前styleSheet还不能用，则放到异步中则行
	            if (style.styleSheet.disabled) {
	                setTimeout(func, 10);
	            } else {
	                func();
	            }
	        } else {
	            //w3c
	            //w3c浏览器中只要创建文本节点插入到style元素中就行了
	            var textNode = document.createTextNode(cssText);
	            style.appendChild(textNode);
	        }
	        head.appendChild(style); //把创建的style元素插入到head中
	    },

	    createMeta: function () {

	        var _pattern = "android|blackberry|googlebot-mobile|iemobile|ipad|iphone|ipod|opera mobile|palmos|webos";
	        var _regex = new RegExp(_pattern, "ig");
	        var _UA = navigator.userAgent;
	        if (_regex.test(_UA)) {
	            // 手机端创建meta viewport
	            var metaTag = document.createElement('meta');
	            metaTag.name = 'viewport';
	            metaTag.content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no';
	            document.getElementsByTagName('head')[0].appendChild(metaTag);
	        }
	    },

	    //判断当前是属于pc端还是mobile端，flag为true表示为pc端，flag为false为mobile端
	    judgePlatform: function () {
	        var userAgentInfo = navigator.userAgent;
	        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	        var flag = true;
	        for (var v = 0; v < Agents.length; v++) {
	            if (userAgentInfo.indexOf(Agents[v]) > 0) {
	                flag = false;
	                break;
	            }
	        }
	        return flag;
	    },

	    getOs: function () {

	        var OsObject = "other";
	        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
	            OsObject = "ie6";
	        } else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
	            OsObject = "ie7";
	        } else if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
	            OsObject = "ie8";
	        } else if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
	            OsObject = "ie9";
	        } else if (navigator.userAgent.indexOf("MSIE 10.0") > 0) {
	            OsObject = "ie10";
	        } else if (navigator.userAgent.indexOf("Firefox") > 0) {
	            OsObject = "Firefox";
	        } else if (navigator.userAgent.indexOf("Chrome") > 0) {
	            OsObject = "Chrome";
	        } else if (navigator.userAgent.indexOf("Safari") > 0) {
	            OsObject = "Safari";
	        } else if (navigator.userAgent.indexOf("Camino") > 0) {
	            OsObject = "Camino";
	        } else if (navigator.userAgent.indexOf("Gecko/") > 0) {
	            OsObject = "Gecko";
	        }
	        return OsObject;
	    },

	    IsThisOs: function (os) {

	        var thisOs = Tools.getOs();
	        var hasThisOs = os.indexOf(thisOs);
	        return hasThisOs != -1;
	    },
	    getLowV: function () {
	        if (Tools.IsThisOs('ie6') || Tools.IsThisOs('ie7') || Tools.IsThisOs('ie8')) {
	            alert(1);
	            return true;
	        } else {
	            return false;
	        }
	    },
	    supports: function (prop) {

	        var div = document.createElement('div');
	        var vendors = 'Khtml O Moz Webkit'.split(' ');
	        var len = vendors.length;

	        if (prop in div.style) return true;
	        if ('-ms-' + prop in div.style) return true;

	        prop = prop.replace(/^[a-z]/, function (val) {
	            return val.toUpperCase();
	        });

	        while (len--) {
	            if (vendors[len] + prop in div.style) {
	                return true;
	            }
	        }
	        return false;
	    },

	    formatDate: function (str) {

	        var formatTime = "";
	        if (str.indexOf("(") > 0) {

	            var timeStamp = str.substring(str.indexOf("(") + 1, str.indexOf("+"));

	            var changeTime = new Date(parseInt(timeStamp));
	            var year = changeTime.getFullYear();
	            var month = changeTime.getMonth() + 1;
	            var date = changeTime.getDate();
	            var hour = changeTime.getHours();
	            var minute = changeTime.getMinutes();
	            var second = changeTime.getSeconds();

	            if (month < 10) {
	                month = "0" + month;
	            }

	            if (date < 10) {
	                date = "0" + date;
	            }

	            if (hour < 10) {
	                hour = "0" + hour;
	            }

	            if (minute < 10) {
	                minute = "0" + minute;
	            }

	            if (second < 10) {
	                second = "0" + second;
	            }

	            formatTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	        }

	        return formatTime;
	    },

	    getPageCount: function (total) {

	        var pageCount = 0;
	        if (!Tools.isEmpty(total)) {

	            if (total % 10 == 0) {
	                pageCount = total / 10;
	            } else {
	                pageCount = parseInt(total / 10) + 1;
	            }
	        }

	        return pageCount;
	    },

	    scrollTop: function (domParam) {

	        var $this = $(domParam);
	        var _topDistance = $this.offset().top;
	        $("html,body").animate({ scrollTop: _topDistance }, 800);
	    },

	    scrollLeft: function (elemId) {

	        var $sidebar_menu_wrap = $('#' + elemId);

	        if ($sidebar_menu_wrap.length) {

	            setTimeout(function () {
	                $sidebar_menu_wrap.animate({
	                    right: -188
	                }, 'slow');
	            }, 3000);

	            mouseHover($sidebar_menu_wrap, {

	                hoverDuring: 200,
	                outDuring: 300,

	                hoverEvent: function () {
	                    $(this).animate({
	                        right: 10
	                    }, 'slow');
	                },

	                outEvent: function () {
	                    $(this).animate({
	                        right: -188
	                    }, 'slow');
	                }

	            });
	        }
	    },

	    judgeGoToUrl: function (_goToUrl) {

	        var _linkUrl = "";
	        if (null == _goToUrl || "" == _goToUrl) {

	            _linkUrl = "javascript:void(0)";
	        } else {

	            _linkUrl = _goToUrl;
	        }

	        return _linkUrl;
	    },
	    GetQueryString: function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return decodeURIComponent(r[2]);return null;
	    },
	    sort: function (array) {
	        var len = array.length,
	            i,
	            j,
	            tmp,
	            result;
	        result = array.slice(0);
	        for (i = 0; i < len; i++) {
	            for (j = len - 1; j > i; j--) {

	                if (new Date(result[j].PublishDate) > new Date(result[j - 1].PublishDate)) {
	                    tmp = result[j - 1];
	                    result[j - 1] = result[j];
	                    result[j] = tmp;
	                }
	            }
	        }
	        //数据月份第一个加一个day：1
	        for (i = 0; i < result.length - 1; i++) {

	            var curMonth = parseInt(new Date(result[i].PublishDate).getMonth());
	            var nextMonth = parseInt(new Date(result[i + 1].PublishDate).getMonth());
	            if (curMonth > nextMonth) {
	                result[i].first = 1;
	            }
	        }
	        return result;
	    }

	};

	module.exports = Tools;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/**
	 * Created by liyongliang on 2015/11/5.
	 */
	function mouseHover(elem, options) {

	    var $this = $(elem);

	    var defaults = {

	        hoverDuring: 200,

	        outDuring: 200,

	        hoverEvent: function () {
	            $.noop();
	        },

	        outEvent: function () {
	            $.noop();
	        }
	    };

	    var sets = $.extend(defaults, options || {});

	    var hoverTimer,
	        outTimer,
	        that = $this;

	    return $this.each(function (e) {

	        $(this).hover(function () {

	            clearTimeout(outTimer);

	            hoverTimer = setTimeout(function () {
	                sets.hoverEvent.apply(that);
	            }, sets.hoverDuring);
	        }, function () {

	            clearTimeout(hoverTimer);

	            outTimer = setTimeout(function () {
	                sets.outEvent.apply(that);
	            }, sets.outDuring);
	        });
	    });
	}

	module.exports = mouseHover;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by v.pandeng on 2016/2/24.
	 */
	var isDev = false;

	var BASE_URL = isDev ? 'http://dev.www.shandagames.com:8081' : 'http://www.shandagames.com';

	var dialog = __webpack_require__(6);
	var Storage = __webpack_require__(10);

	var STATIC_URL = {
	    GetIndexBannerPic: BASE_URL + '/getPic', //轮播图                                                   //游戏列表
	    GetJobList: BASE_URL + '/getJob', //职位列表
	    GetJobDetail: BASE_URL + '/getJob', //职位详情
	    getNewsList: BASE_URL + '/getNews?model=search&org=0', //新闻列表
	    GetNewsDetail: BASE_URL + '/getNews',
	    getGames: BASE_URL + '/site/list',
	    GetGameList: BASE_URL + '/site/list',
	    getSearchList: BASE_URL + '/site/list?type=search_config',
	    getPhotoList: BASE_URL + '/site/list',
	    getList: BASE_URL + '/site/list'
	};

	var SERVER_JSON = {
	    ReturnCode: 'return_code',
	    ReturnMessage: 'return_msg',
	    errorCode: 'error_code',
	    Data: 'data',
	    ReturnNo: 'errno'

	};

	var SERVER_ERROR_CODE = {
	    SUCCESS: 0 //成功
	    , NOT_LOGIN: -1 //未登录


	    /*
	     * 小小提示框，随后整理下放在一个js里
	     * */
	};var Modal = function (content) {

	    var modal = dialog({
	        title: '温馨提示',
	        content: content,
	        fixed: true,
	        width: 480
	    });
	    modal.showModal();

	    setTimeout(function () {
	        modal.close().remove();
	    }, 3000);
	};

	//调用Jsonp
	var serverJsonP = function (url, params, fn) {

	    params['_'] = new Date().getTime();

	    $.ajax({
	        url: url,
	        type: 'get',
	        dataType: 'jsonp',
	        data: params,
	        timeout: 5000,
	        success: function (json) {
	            if (json[SERVER_JSON.ReturnCode] == SERVER_ERROR_CODE.SUCCESS || json[SERVER_JSON.errorCode] == SERVER_ERROR_CODE.SUCCESS) {
	                fn(json[SERVER_JSON.Data]);
	            }
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            //接口调用报错，也需要重新刷新页面
	            Storage.set("status", XMLHttpRequest.status);
	            Storage.set("textStatus", textStatus);
	        },
	        complete: function (XMLHttpRequest, textStatus) {
	            //超时,status还有success,error等值的情况
	            if (textStatus == 'timeout') {
	                Modal('网络请求超时，请稍后再试!');
	            }
	        }

	    });
	};

	var ServerAPI = {

	    //轮播图片
	    getIndexBannerPic: function (params, successCallback) {
	        serverJsonP(STATIC_URL.GetIndexBannerPic, params, successCallback);
	    },

	    //游戏产品
	    getGameList: function (params, successCallback) {
	        serverJsonP(STATIC_URL.GetGameList, params, successCallback);
	    },

	    //职位招聘
	    getJobList: function (params, successCallback) {
	        serverJsonP(STATIC_URL.GetJobList, params, successCallback);
	    },

	    //职位详情
	    getJobDetail: function (params, successCallback) {
	        serverJsonP(STATIC_URL.GetJobDetail, params, successCallback);
	    },

	    //新闻列表
	    getNewsList: function (params, successCallback) {
	        serverJsonP(STATIC_URL.getNewsList, params, successCallback);
	    },

	    //新闻详情
	    getNewsDetail: function (params, successCallback) {
	        serverJsonP(STATIC_URL.GetNewsDetail, params, successCallback);
	    },
	    getGames: function (params, successCallback) {
	        serverJsonP(STATIC_URL.getGames, params, successCallback);
	    },
	    getSearchList: function (params, successCallback) {
	        serverJsonP(STATIC_URL.getSearchList, params, successCallback);
	    },
	    getPhotoList: function (params, successCallback) {
	        serverJsonP(STATIC_URL.getPhotoList, params, successCallback);
	    },
	    getList: function (params, successCallback) {
	        serverJsonP(STATIC_URL.getList, params, successCallback);
	    }

	};

	module.exports = ServerAPI;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by liyongliang on 2015/11/3.
	 */
	/*!
	 * artDialog
	 * Date: 2014-06-29
	 * https://github.com/aui/artDialog
	 * (c) 2009-2013 TangBin, http://www.planeArt.cn
	 *
	 * This is licensed under the GNU LGPL, version 2.1 or later.
	 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
	 */

	var Popup = __webpack_require__(7);
	var defaults = __webpack_require__(8);

	var css = defaults.cssUri;

	// css loader: RequireJS & SeaJS
	if (css) {
	    var fn = __webpack_require__(9)[__webpack_require__(9).toUrl ? 'toUrl' : 'resolve'];
	    if (fn) {
	        css = fn(css);
	        css = '<link rel="stylesheet" href="' + css + '" />';
	        if ($('base')[0]) {
	            $('base').before(css);
	        } else {
	            $('head').append(css);
	        }
	    }
	}

	var _count = 0;
	var _expando = new Date() - 0; // Data.now()
	var _isIE6 = !('minWidth' in $('html')[0].style);
	var _isMobile = 'createTouch' in document && !('onmousemove' in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	var _isFixed = !_isIE6 && !_isMobile;

	var artDialog = function (options, ok, cancel) {

	    var originalOptions = options = options || {};

	    if (typeof options === 'string' || options.nodeType === 1) {

	        options = { content: options, fixed: !_isMobile };
	    }

	    options = $.extend(true, {}, artDialog.defaults, options);
	    options._ = originalOptions;

	    var id = options.id = options.id || _expando + _count;
	    var api = artDialog.get(id);

	    // 如果存在同名的对话框对象，则直接返回
	    if (api) {
	        return api.focus();
	    }

	    // 目前主流移动设备对fixed支持不好，禁用此特性
	    if (!_isFixed) {
	        options.fixed = false;
	    }

	    // 快捷关闭支持：点击对话框外快速关闭对话框
	    if (options.quickClose) {
	        options.modal = true;
	        if (!originalOptions.backdropOpacity) {
	            options.backdropOpacity = 0;
	        }
	    }

	    // 按钮组
	    if (!$.isArray(options.button)) {
	        options.button = [];
	    }

	    // 确定按钮
	    if (ok !== undefined) {
	        options.ok = ok;
	    }

	    if (options.ok) {
	        options.button.push({
	            id: 'ok',
	            value: options.okValue,
	            callback: options.ok,
	            autofocus: true
	        });
	    }

	    // 取消按钮
	    if (cancel !== undefined) {
	        options.cancel = cancel;
	    }

	    if (options.cancel) {
	        options.button.push({
	            id: 'cancel',
	            value: options.cancelValue,
	            callback: options.cancel,
	            display: options.cancelDisplay
	        });
	    }

	    return artDialog.list[id] = new artDialog.create(options);
	};

	var popup = function () {};
	popup.prototype = Popup.prototype;
	var prototype = artDialog.prototype = new popup();

	artDialog.create = function (options) {
	    var that = this;

	    $.extend(this, new Popup());

	    var $popup = $(this.node).html(options.innerHTML);

	    this.options = options;
	    this._popup = $popup;

	    $.each(options, function (name, value) {
	        if (typeof that[name] === 'function') {
	            that[name](value);
	        } else {
	            that[name] = value;
	        }
	    });

	    // 更新 zIndex 全局配置
	    if (options.zIndex) {
	        Popup.zIndex = options.zIndex;
	    }

	    // 设置 ARIA 信息
	    $popup.attr({
	        'aria-labelledby': this._$('title').attr('id', 'title:' + this.id).attr('id'),
	        'aria-describedby': this._$('content').attr('id', 'content:' + this.id).attr('id')
	    });

	    // 关闭按钮
	    this._$('close').css('display', this.cancel === false ? 'none' : '').attr('title', this.cancelValue).on('click', function (event) {
	        that._trigger('cancel');
	        event.preventDefault();
	    });

	    // 添加视觉参数
	    this._$('dialog').addClass(this.skin);
	    this._$('body').css('padding', this.padding);

	    // 按钮组点击
	    $popup.on('click', '[data-id]', function (event) {
	        var $this = $(this);
	        if (!$this.attr('disabled')) {
	            // IE BUG
	            that._trigger($this.data('id'));
	        }

	        event.preventDefault();
	    });

	    // 点击遮罩自动关闭对话框
	    if (options.quickClose) {
	        $(this.backdrop).on('onmousedown' in document ? 'mousedown' : 'click', function () {
	            that._trigger('cancel');
	        });
	    }

	    // ESC 快捷键关闭对话框
	    this._esc = function (event) {
	        var target = event.target;
	        var nodeName = target.nodeName;
	        var rinput = /^input|textarea$/i;
	        var isTop = Popup.current === that;
	        var keyCode = event.keyCode;

	        // 避免输入状态中 ESC 误操作关闭
	        if (!isTop || rinput.test(nodeName) && target.type !== 'button') {
	            return;
	        }

	        if (keyCode === 27) {
	            that._trigger('cancel');
	        }
	    };

	    $(document).on('keydown', this._esc);
	    this.addEventListener('remove', function () {
	        $(document).off('keydown', this._esc);
	        delete artDialog.list[this.id];
	    });

	    _count++;

	    artDialog.oncreate(this);

	    return this;
	};

	artDialog.create.prototype = prototype;

	$.extend(prototype, {

	    /**
	     * 显示对话框
	     * @name artDialog.prototype.show
	     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
	     */

	    /**
	     * 显示对话框（模态）
	     * @name artDialog.prototype.showModal
	     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
	     */

	    /**
	     * 关闭对话框
	     * @name artDialog.prototype.close
	     * @param   {String, Number}    返回值，可被 onclose 事件收取（可选）
	     */

	    /**
	     * 销毁对话框
	     * @name artDialog.prototype.remove
	     */

	    /**
	     * 重置对话框位置
	     * @name artDialog.prototype.reset
	     */

	    /**
	     * 让对话框聚焦（同时置顶）
	     * @name artDialog.prototype.focus
	     */

	    /**
	     * 让对话框失焦（同时置顶）
	     * @name artDialog.prototype.blur
	     */

	    /**
	     * 添加事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     * @name artDialog.prototype.addEventListener
	     */

	    /**
	     * 删除事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     * @name artDialog.prototype.removeEventListener
	     */

	    /**
	     * 对话框显示事件，在 show()、showModal() 执行
	     * @name artDialog.prototype.onshow
	     * @event
	     */

	    /**
	     * 关闭事件，在 close() 执行
	     * @name artDialog.prototype.onclose
	     * @event
	     */

	    /**
	     * 销毁前事件，在 remove() 前执行
	     * @name artDialog.prototype.onbeforeremove
	     * @event
	     */

	    /**
	     * 销毁事件，在 remove() 执行
	     * @name artDialog.prototype.onremove
	     * @event
	     */

	    /**
	     * 重置事件，在 reset() 执行
	     * @name artDialog.prototype.onreset
	     * @event
	     */

	    /**
	     * 焦点事件，在 foucs() 执行
	     * @name artDialog.prototype.onfocus
	     * @event
	     */

	    /**
	     * 失焦事件，在 blur() 执行
	     * @name artDialog.prototype.onblur
	     * @event
	     */

	    /**
	     * 设置内容
	     * @param    {String, HTMLElement}   内容
	     */
	    content: function (html) {

	        this._$('content').empty('')[typeof html === 'object' ? 'append' : 'html'](html);

	        return this.reset();
	    },

	    /**
	     * 设置标题
	     * @param    {String}   标题内容
	     */
	    title: function (text) {
	        this._$('title').text(text);
	        this._$('header')[text ? 'show' : 'hide']();
	        return this;
	    },

	    /** 设置宽度 */
	    width: function (value) {
	        this._$('content').css('width', value);
	        return this.reset();
	    },

	    /** 设置高度 */
	    height: function (value) {
	        this._$('content').css('height', value);
	        return this.reset();
	    },

	    /**
	     * 设置按钮组
	     * @param   {Array, String}
	     */
	    button: function (args) {
	        args = args || [];
	        var that = this;
	        var html = '';
	        var number = 0;
	        this.callbacks = {};

	        if (typeof args === 'string') {
	            html = args;
	        } else {
	            $.each(args, function (i, val) {

	                val.id = val.id || val.value;
	                that.callbacks[val.id] = val.callback;

	                var style = '';

	                if (val.display === false) {
	                    style = ' style="display:none"';
	                } else {
	                    number++;
	                }

	                html += '<button' + ' type="button"' + ' data-id="' + val.id + '"' + style + (val.disabled ? ' disabled' : '') + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : '') + '>' + val.value + '</button>';
	            });
	        }

	        this._$('footer')[number ? 'show' : 'hide']();
	        this._$('button').html(html);

	        return this;
	    },

	    statusbar: function (html) {
	        this._$('statusbar').html(html)[html ? 'show' : 'hide']();

	        return this;
	    },

	    _$: function (i) {
	        return this._popup.find('[i=' + i + ']');
	    },

	    // 触发按钮回调函数
	    _trigger: function (id) {

	        var fn = this.callbacks[id];

	        return typeof fn !== 'function' || fn.call(this) !== false ? this.close().remove() : this;
	    }

	});

	artDialog.oncreate = $.noop;

	/** 最顶层的对话框API */
	artDialog.getCurrent = function () {
	    return Popup.current;
	};

	/**
	 * 根据 ID 获取某对话框 API
	 * @param    {String}    对话框 ID
	 * @return   {Object}    对话框 API (实例)
	 */
	artDialog.get = function (id) {
	    return id === undefined ? artDialog.list : artDialog.list[id];
	};

	artDialog.list = {};

	/**
	 * 默认配置
	 */
	artDialog.defaults = defaults;

	// dialog demo
	//var d = dialog({
	//    title: '消息',
	//    content: '风吹起的青色衣衫，夕阳里的温暖容颜，你比以前更加美丽，像盛开的花<br>——许巍《难忘的一天》',
	//    okValue: '确 定',
	//    ok: function () {
	//        var that = this;
	//        setTimeout(function () {
	//            that.title('提交中..')
	//        }, 2000)
	//        return false
	//    },
	//    fixed: true,
	//    cancelValue: '取消',
	//    cancel: function () {},
	//
	//})
	//
	//d.showModal()

	module.exports = artDialog;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/**
	 * Created by liyongliang on 2015/11/3.
	 */
	/*!
	 * popupjs
	 * Date: 2014-01-15
	 * https://github.com/aui/popupjs
	 * (c) 2009-2013 TangBin, http://www.planeArt.cn
	 *
	 * This is licensed under the GNU LGPL, version 2.1 or later.
	 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
	 */

	//var $ = window.$;

	var _count = 0;
	var _isIE6 = !('minWidth' in $('html')[0].style);
	var _isFixed = !_isIE6;

	function Popup() {

	    this.destroyed = false;

	    this.__popup = $('<div />').attr({
	        tabindex: '-1'
	    }).css({
	        display: 'none',
	        position: 'absolute',
	        left: 0,
	        top: 0,
	        bottom: 'auto',
	        right: 'auto',
	        margin: 0,
	        padding: 0,
	        outline: 0,
	        border: '0 none',
	        background: 'transparent'
	    }).html(this.innerHTML).appendTo('body');

	    this.__backdrop = $('<div />');

	    // 使用 HTMLElement 作为外部接口使用，而不是 jquery 对象
	    // 统一的接口利于未来 Popup 移植到其他 DOM 库中
	    this.node = this.__popup[0];
	    this.backdrop = this.__backdrop[0];

	    _count++;
	}

	$.extend(Popup.prototype, {

	    /**
	     * 初始化完毕事件，在 show()、showModal() 执行
	     * @name Popup.prototype.onshow
	     * @event
	     */

	    /**
	     * 关闭事件，在 close() 执行
	     * @name Popup.prototype.onclose
	     * @event
	     */

	    /**
	     * 销毁前事件，在 remove() 前执行
	     * @name Popup.prototype.onbeforeremove
	     * @event
	     */

	    /**
	     * 销毁事件，在 remove() 执行
	     * @name Popup.prototype.onremove
	     * @event
	     */

	    /**
	     * 重置事件，在 reset() 执行
	     * @name Popup.prototype.onreset
	     * @event
	     */

	    /**
	     * 焦点事件，在 foucs() 执行
	     * @name Popup.prototype.onfocus
	     * @event
	     */

	    /**
	     * 失焦事件，在 blur() 执行
	     * @name Popup.prototype.onblur
	     * @event
	     */

	    /** 浮层 DOM 素节点 */
	    node: null,

	    /** 遮罩 DOM 节点 */
	    backdrop: null,

	    /** 是否开启固定定位 */
	    fixed: false,

	    /** 判断对话框是否删除 */
	    destroyed: true,

	    /** 判断对话框是否显示 */
	    open: false,

	    /** close 返回值 */
	    returnValue: '',

	    /** 是否自动聚焦 */
	    autofocus: true,

	    /** 对齐方式 */
	    align: 'bottom left',

	    /** 设置遮罩背景颜色 */
	    backdropBackground: '#000',

	    /** 设置遮罩透明度 */
	    backdropOpacity: 0.4,

	    /** 内部的 HTML 字符串 */
	    innerHTML: '',

	    /** 类名 */
	    className: 'ui-popup',

	    /**
	     * 显示浮层
	     * @param   {HTMLElement, Event}  指定位置（可选）
	     */
	    show: function (anchor) {

	        if (this.destroyed) {
	            return this;
	        }

	        var that = this;
	        var popup = this.__popup;

	        this.__activeElement = this.__getActive();

	        this.open = true;
	        this.follow = anchor || this.follow;

	        if (!this.__ready) {

	            popup.addClass(this.className);

	            if (this.modal) {
	                this.__lock();
	            }

	            if (!popup.html()) {
	                popup.html(this.innerHTML);
	            }

	            if (!_isIE6) {
	                $(window).on('resize', this.__onresize = function () {
	                    that.reset();
	                });
	            }

	            this.__ready = true;
	        }

	        popup.addClass(this.className + '-show').attr('role', this.modal ? 'alertdialog' : 'dialog').css('position', this.fixed ? 'fixed' : 'absolute').show();

	        this.__backdrop.show();

	        this.reset().focus();
	        this.__dispatchEvent('show');

	        return this;
	    },

	    /** 显示模态浮层。参数参见 show() */
	    showModal: function () {
	        this.modal = true;
	        return this.show.apply(this, arguments);
	    },

	    /** 关闭浮层 */
	    close: function (result) {

	        if (!this.destroyed && this.open) {

	            if (result !== undefined) {
	                this.returnValue = result;
	            }

	            this.__popup.hide().removeClass(this.className + '-show');
	            this.__backdrop.hide();
	            this.open = false;
	            this.blur();
	            this.__dispatchEvent('close');
	        }

	        return this;
	    },

	    /** 销毁浮层 */
	    remove: function () {

	        if (this.destroyed) {
	            return this;
	        }

	        this.__dispatchEvent('beforeremove');

	        if (Popup.current === this) {
	            Popup.current = null;
	        }

	        this.__unlock();
	        this.__popup.remove();
	        this.__backdrop.remove();

	        // 恢复焦点，照顾键盘操作的用户
	        this.blur();

	        if (!_isIE6) {
	            $(window).off('resize', this.__onresize);
	        }

	        this.__dispatchEvent('remove');

	        for (var i in this) {
	            delete this[i];
	        }

	        return this;
	    },

	    /** 手动刷新位置 */
	    reset: function () {

	        var elem = this.follow;

	        if (elem) {
	            this.__follow(elem);
	        } else {
	            this.__center();
	        }

	        this.__dispatchEvent('reset');

	        return this;
	    },

	    /** 让浮层获取焦点 */
	    focus: function () {

	        var node = this.node;
	        var current = Popup.current;

	        if (current && current !== this) {
	            current.blur(false);
	        }

	        // 检查焦点是否在浮层里面
	        if (!$.contains(node, this.__getActive())) {
	            var autofocus = this.__popup.find('[autofocus]')[0];

	            if (!this._autofocus && autofocus) {
	                this._autofocus = true;
	            } else {
	                autofocus = node;
	            }

	            this.__focus(autofocus);
	        }

	        Popup.current = this;
	        this.__popup.addClass(this.className + '-focus');
	        this.__zIndex();
	        this.__dispatchEvent('focus');

	        return this;
	    },

	    /** 让浮层失去焦点。将焦点退还给之前的元素，照顾视力障碍用户 */
	    blur: function () {

	        var activeElement = this.__activeElement;
	        var isBlur = arguments[0];

	        if (isBlur !== false) {
	            this.__focus(activeElement);
	        }

	        this._autofocus = false;
	        this.__popup.removeClass(this.className + '-focus');
	        this.__dispatchEvent('blur');

	        return this;
	    },

	    /**
	     * 添加事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     */
	    addEventListener: function (type, callback) {
	        this.__getEventListener(type).push(callback);
	        return this;
	    },

	    /**
	     * 删除事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     */
	    removeEventListener: function (type, callback) {
	        var listeners = this.__getEventListener(type);
	        for (var i = 0; i < listeners.length; i++) {
	            if (callback === listeners[i]) {
	                listeners.splice(i--, 1);
	            }
	        }
	        return this;
	    },

	    // 获取事件缓存
	    __getEventListener: function (type) {
	        var listener = this.__listener;
	        if (!listener) {
	            listener = this.__listener = {};
	        }
	        if (!listener[type]) {
	            listener[type] = [];
	        }
	        return listener[type];
	    },

	    // 派发事件
	    __dispatchEvent: function (type) {
	        var listeners = this.__getEventListener(type);

	        if (this['on' + type]) {
	            this['on' + type]();
	        }

	        for (var i = 0; i < listeners.length; i++) {
	            listeners[i].call(this);
	        }
	    },

	    // 对元素安全聚焦
	    __focus: function (elem) {
	        // 防止 iframe 跨域无权限报错
	        // 防止 IE 不可见元素报错
	        try {
	            // ie11 bug: iframe 页面点击会跳到顶部
	            if (this.autofocus && !/^iframe$/i.test(elem.nodeName)) {
	                elem.focus();
	            }
	        } catch (e) {}
	    },

	    // 获取当前焦点的元素
	    __getActive: function () {
	        try {
	            // try: ie8~9, iframe #26
	            var activeElement = document.activeElement;
	            var contentDocument = activeElement.contentDocument;
	            var elem = contentDocument && contentDocument.activeElement || activeElement;
	            return elem;
	        } catch (e) {}
	    },

	    // 置顶浮层
	    __zIndex: function () {

	        var index = Popup.zIndex++;

	        // 设置叠加高度
	        this.__popup.css('zIndex', index);
	        this.__backdrop.css('zIndex', index - 1);
	        this.zIndex = index;
	    },

	    // 居中浮层
	    __center: function () {

	        var popup = this.__popup;
	        var $window = $(window);
	        var $document = $(document);
	        var fixed = this.fixed;
	        var dl = fixed ? 0 : $document.scrollLeft();
	        var dt = fixed ? 0 : $document.scrollTop();
	        var ww = $window.width();
	        var wh = $window.height();
	        var ow = popup.width();
	        var oh = popup.height();
	        var left = (ww - ow) / 2 + dl;
	        var top = (wh - oh) * 500 / 1000 + dt; // 上下对齐
	        var style = popup[0].style;

	        style.left = Math.max(parseInt(left), dl) + 'px';
	        style.top = Math.max(parseInt(top), dt) + 'px';
	    },

	    // 指定位置 @param    {HTMLElement, Event}  anchor
	    __follow: function (anchor) {

	        var $elem = anchor.parentNode && $(anchor);
	        var popup = this.__popup;

	        if (this.__followSkin) {
	            popup.removeClass(this.__followSkin);
	        }

	        // 隐藏元素不可用
	        if ($elem) {
	            var o = $elem.offset();
	            if (o.left * o.top < 0) {
	                return this.__center();
	            }
	        }

	        var that = this;
	        var fixed = this.fixed;

	        var $window = $(window);
	        var $document = $(document);
	        var winWidth = $window.width();
	        var winHeight = $window.height();
	        var docLeft = $document.scrollLeft();
	        var docTop = $document.scrollTop();

	        var popupWidth = popup.width();
	        var popupHeight = popup.height();
	        var width = $elem ? $elem.outerWidth() : 0;
	        var height = $elem ? $elem.outerHeight() : 0;
	        var offset = this.__offset(anchor);
	        var x = offset.left;
	        var y = offset.top;
	        var left = fixed ? x - docLeft : x;
	        var top = fixed ? y - docTop : y;

	        var minLeft = fixed ? 0 : docLeft;
	        var minTop = fixed ? 0 : docTop;
	        var maxLeft = minLeft + winWidth - popupWidth;
	        var maxTop = minTop + winHeight - popupHeight;

	        var css = {};
	        var align = this.align.split(' ');
	        var className = this.className + '-';
	        var reverse = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
	        var name = { top: 'top', bottom: 'top', left: 'left', right: 'left' };

	        var temp = [{
	            top: top - popupHeight,
	            bottom: top + height,
	            left: left - popupWidth,
	            right: left + width
	        }, {
	            top: top,
	            bottom: top - popupHeight + height,
	            left: left,
	            right: left - popupWidth + width
	        }];

	        var center = {
	            left: left + width / 2 - popupWidth / 2,
	            top: top + height / 2 - popupHeight / 2
	        };

	        var range = {
	            left: [minLeft, maxLeft],
	            top: [minTop, maxTop]
	        };

	        // 超出可视区域重新适应位置
	        $.each(align, function (i, val) {

	            // 超出右或下边界：使用左或者上边对齐
	            if (temp[i][val] > range[name[val]][1]) {
	                val = align[i] = reverse[val];
	            }

	            // 超出左或右边界：使用右或者下边对齐
	            if (temp[i][val] < range[name[val]][0]) {
	                align[i] = reverse[val];
	            }
	        });

	        // 一个参数的情况
	        if (!align[1]) {
	            name[align[1]] = name[align[0]] === 'left' ? 'top' : 'left';
	            temp[1][align[1]] = center[name[align[1]]];
	        }

	        className += align.join('-');

	        that.__followSkin = className;

	        if ($elem) {
	            popup.addClass(className);
	        }

	        css[name[align[0]]] = parseInt(temp[0][align[0]]);
	        css[name[align[1]]] = parseInt(temp[1][align[1]]);
	        popup.css(css);
	    },

	    // 获取元素相对于页面的位置（包括iframe内的元素）
	    // 暂时不支持两层以上的 iframe 套嵌
	    __offset: function (anchor) {

	        var isNode = anchor.parentNode;
	        var offset = isNode ? $(anchor).offset() : {
	            left: anchor.pageX,
	            top: anchor.pageY
	        };

	        anchor = isNode ? anchor : anchor.target;
	        var ownerDocument = anchor.ownerDocument;
	        var defaultView = ownerDocument.defaultView || ownerDocument.parentWindow;

	        if (defaultView == window) {
	            // IE <= 8 只能使用两个等于号
	            return offset;
	        }

	        // {Element Ifarme}
	        var frameElement = defaultView.frameElement;
	        var $ownerDocument = $(ownerDocument);
	        var docLeft = $ownerDocument.scrollLeft();
	        var docTop = $ownerDocument.scrollTop();
	        var frameOffset = $(frameElement).offset();
	        var frameLeft = frameOffset.left;
	        var frameTop = frameOffset.top;

	        return {
	            left: offset.left + frameLeft - docLeft,
	            top: offset.top + frameTop - docTop
	        };
	    },

	    // 设置屏锁遮罩
	    __lock: function () {

	        var that = this;
	        var popup = this.__popup;
	        var backdrop = this.__backdrop;
	        var backdropCss = {
	            position: 'fixed',
	            left: 0,
	            top: 0,
	            width: '100%',
	            height: '100%',
	            overflow: 'hidden',
	            userSelect: 'none',
	            opacity: 0,
	            background: this.backdropBackground
	        };

	        popup.addClass(this.className + '-modal');

	        // 避免遮罩不能盖住上一次的对话框
	        // 如果当前对话框是上一个对话框创建，点击的那一瞬间它会增长 zIndex 值
	        Popup.zIndex = Popup.zIndex + 2;
	        this.__zIndex();

	        if (!_isFixed) {
	            $.extend(backdropCss, {
	                position: 'absolute',
	                width: $(window).width() + 'px',
	                height: $(document).height() + 'px'
	            });
	        }

	        backdrop.css(backdropCss).animate({ opacity: this.backdropOpacity }, 150).insertAfter(popup)
	        // 锁住模态对话框的 tab 简单办法
	        // 甚至可以避免焦点落入对话框外的 iframe 中
	        .attr({ tabindex: '0' }).on('focus', function () {
	            that.focus();
	        });
	    },

	    // 卸载屏锁遮罩
	    __unlock: function () {

	        if (this.modal) {
	            this.__popup.removeClass(this.className + '-modal');
	            this.__backdrop.remove();
	            delete this.modal;
	        }
	    }

	});

	/** 当前叠加高度 */
	Popup.zIndex = 1024;

	/** 顶层浮层的实例 */
	Popup.current = null;

	module.exports = Popup;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/**
	 * Created by liyongliang on 2015/11/3.
	 */
	/*!
	 * artDialog - 默认配置
	 * http://aui.github.io/artDialog/doc/index.html
	 */
	var dialogConfigs = {
	    /* -----已注释的配置继承自 popup.js，仍可以再这里重新定义它----- */

	    // 对齐方式
	    //align: 'bottom left',

	    // 是否固定定位
	    //fixed: false,

	    // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
	    //zIndex: 1024,

	    // 设置遮罩背景颜色
	    //backdropBackground: '#000',

	    // 设置遮罩透明度
	    //backdropOpacity: 0.7,

	    // 消息内容
	    content: '<span class="ui-dialog-loading">Loading...</span>',

	    // 标题
	    title: '',

	    // 对话框状态栏区域 HTML 代码
	    statusbar: '',

	    // 自定义按钮
	    button: null,

	    // 确定按钮回调函数
	    ok: null,

	    // 取消按钮回调函数
	    cancel: null,

	    // 确定按钮文本
	    okValue: 'ok',

	    // 取消按钮文本
	    cancelValue: 'cancel',

	    cancelDisplay: true,

	    // 内容宽度
	    width: '',

	    // 内容高度
	    height: '',

	    // 内容与边界填充距离
	    padding: '',

	    // 对话框自定义 className
	    skin: '',

	    // 是否支持快捷关闭（点击遮罩层自动关闭）
	    quickClose: false,

	    // css 文件路径，留空则不会使用 js 自动加载样式
	    // 注意：css 只允许加载一个
	    cssUri: null,

	    // 模板（使用 table 解决 IE7 宽度自适应的 BUG）
	    // js 使用 i="***" 属性识别结构，其余的均可自定义
	    innerHTML: '<div i="dialog" class="ui-dialog">' + '<div class="ui-dialog-arrow-a"></div>' + '<div class="ui-dialog-arrow-b"></div>' + '<table class="ui-dialog-grid">' + '<tr>' + '<td i="header" class="ui-dialog-header">' + '<button i="close" class="ui-dialog-close"></button>' + '<div i="title" class="ui-dialog-title"></div>' + '</td>' + '</tr>' + '<tr>' + '<td i="body" class="ui-dialog-body">' + '<div i="content" class="ui-dialog-content"></div>' + '</td>' + '</tr>' + '<tr>' + '<td i="footer" class="ui-dialog-footer">' + '<div i="statusbar" class="ui-dialog-statusbar"></div>' + '<div i="button" class="ui-dialog-button"></div>' + '</td>' + '</tr>' + '</table>' + '</div>'

	};

	module.exports = dialogConfigs;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./dialog": 6,
		"./dialog-config": 8,
		"./dialog-config.js": 8,
		"./dialog.js": 6,
		"./popup": 7,
		"./popup.js": 7
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 9;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by liyongliang on 2015/11/3.
	 */
	/**
	 * @title 读写cookie   是全局方法
	 * @param name
	 * @param value
	 * @param options
	 * @returns {*}
	 */

	var Tools = __webpack_require__(3);

	$.cookie = function (name, value, options) {
	    // name and value given, set cookie
	    if (typeof value != 'undefined') {
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';

	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	        // only name given, get cookie
	    } else {
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = $JQ.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == name + '=') {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};

	//数据存储
	var Storage = window.Storage = {
	    expires: 365,
	    init: function () {
	        //检测浏览器是否支持sessionStorage
	        if ('sessionStorage' in window && window['sessionStorage'] !== null) {
	            return true;
	        } else {
	            return false;
	        }
	    },
	    get: function (name) {
	        if (this.init()) {
	            return sessionStorage.getItem(name);
	        } else {
	            return this.getCookie(name);
	        }
	    },
	    set: function (name, value) {
	        if (this.init()) {
	            sessionStorage.setItem(name, value);
	        } else {
	            this.setCookie(name, value);
	        }
	    },
	    getCookie: function (name) {
	        return $.cookie(name);
	    },
	    setCookie: function (name, value) {
	        $.cookie(name, value, this.expires);
	    },
	    isSuccess: function () {
	        Storage.set("test", "test");
	        var _test = Storage.get("test");
	        if (Tools.isEmpty(_test)) {
	            return false;
	        } else {
	            return true;
	        }
	    }
	};

	module.exports = Storage;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var ServerAPI = __webpack_require__(5);
	var header = {

	    init: function () {
	        ServerAPI.getGames({ 'type': 'game_list' }, this.successCallback);
	    },
	    successCallback: function (data) {
	        var gameList = data.list;
	        var _html = '';
	        if (data.count > 0) {

	            $.each(gameList, function (index, item) {
	                var title = gameList[index].title;

	                _html += '<dd>' + '<a href="./game#' + index + '">' + title + '</a>' + '</dd>';
	            });
	        }
	        var headerHtml = '<div class="header">' + '<a class="logo" href="http://www.shandagames.com/"></a>' + '<ul class="nav-list">' + '<li class="item"><a href="./index" data="index">首&nbsp;&nbsp;页</a></li>' + '<li class="item">' + '<a href="./about" class="item" data="about">关于我们</a>' + '<dl>' + '<dd>' + '<a href="./about#0" data="about">公司简介</a>' + '</dd>' + '<dd>' + '<a href="./about#1" data="about">发展历程</a>' + '</dd>' + '<dd>' + '<a href="./about#2" data="about">企业文化</a>' + '</dd>' + '<dd>' + '<a href="./about#3" data="about">管理团队</a>' + '</dd>' + '<dd>' + '<a href="./about#4" data="about">获得荣誉</a>' + '</dd>' + '<dd>' + '<a href="./about#5" data="about">企业战略</a>' + '</dd>' + '</dl>' + '</li>' + '<li class="item" >' + '<a  href="./game" class="item" data="game">产品介绍</a>' + '<dl>' + _html + '</dl>' + '</li>' + '<li class="item">' + '<a href="./news" class="item news"  data="news">新闻动态</a>' + '<dl>' + '<dd>' + '<a href="./news#1" data="news">企业动态</a>' + '</dd>' + '<dd>' + '<a href="./news#2" data="news">产品资讯</a>' + '</dd>' + '<dd>' + '<a href="./news#3" data="news">媒体报道</a>' + '</dd>' + '</dl>' + '</li>' + '<li class="item">' + '<a href="./join" class="item" data="join">加入我们</a>' + '<dl>' + '<dd>' + '<a href="http://shandagames.zhiye.com/Social" target="_blank" data="join">社会招聘</a>' + '</dd>' + '<dd>' + '<a href="http://recruit.shandagames.com/2019/pc/index.html" target="_blank" data="join">校园招聘</a>' + '</dd>' + '<dd>' + '<a href="http://shandagames.zhiye.com/Intern" target="_blank" data="join">实习机会</a>' + '</dd>' + '</dl>' + '</li>' + '<li class="item">' + '<a href="./download" class="item" data="download">素材下载</a>' + '<dl>' + '<dd>' + '<a href="./download#0" data="download">企业标志</a>' + '</dd>' + '<dd>' + '<a href="./download#1" data="download">企业图片</a>' + '</dd>' + '<dd>' + '<a href="./download#2" data="download">企业介绍</a>' + '</dd>' + '<dd>' + '<a href="./download#3" data="download">人才白皮书</a>' + '</dd>' + '</dl>' + '</li>' + '<li>' + '<a href="./contact" class="item" data="contact">联系我们</a>' + '</li>' + '</ul>' + '<div class="search-wrap">' + '<div class="search-box">' + '<input class="input" placeholder="请输入关键字"  id="s_key">' + '<div class="search-btn" id="searchNews"><div class="btn-back"></div></div>' + '</div>' + '</div>' + '</div>' + '<div class="header_mb"><a class="logo" href="http://www.shandagames.com/"></a>' + '</div>';
	        var page = window.location.pathname.split(".")[0].substring(1);
	        $('.header_wrap').append(headerHtml);
	        $('.header .nav-list li a').each(function () {
	            if ($($(this))[0].href == String(window.location).split('#')[0]) {
	                $(this).parent().addClass('active');
	            }
	        });
	        if (window.location.pathname.indexOf('detail') > 0) {
	            $('.header .nav-list li a.news').parent().addClass('active');
	        }
	        //搜索新闻输入框
	        $("#s_key").bind("keypress", function (event) {
	            var key = encodeURIComponent($("#s_key").val());

	            if (event.keyCode == "13") {
	                if (!key) return;
	                window.location.href = "./search?key=" + key + "#!currentPage=1";
	            }
	        });
	        $("#searchNews").unbind('click').click(function (e) {
	            var key = encodeURIComponent($("#s_key").val());
	            if (!key) return;
	            window.location.href = "./search?key=" + key + "#!currentPage=1";
	        });
	        $("#searchNews").unbind('mouseenter').mouseenter(function (e) {

	            $('.search-box').addClass('show');
	        });
	        $(".search-box").unbind('mouseleave').mouseleave(function (e) {

	            $('.search-box').removeClass('show');
	        });
	    }
	};
	module.exports = header;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

	var incom = {
	    init: function () {
	        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	        var isIE = userAgent.indexOf("MSIE") > -1;
	        if (isIE) {
	            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
	            reIE.test(userAgent);
	            var fIEVersion = parseFloat(RegExp["$1"]);
	            if (fIEVersion < 10) {
	                window.location.href = "./incompatible";
	            }
	        } else {
	            return;
	        }
	    }
	};
	module.exports = incom;

/***/ })
/******/ ]);