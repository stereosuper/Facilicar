function fixedElements(){var e=secondMenu.height()+70,t=main.height(),n=body.width();n>767?myScroll>blocTopHeight-headerHeight?(header.addClass("scrolled"),arianne.length&&secondMenu.length&&!htmlTag.hasClass("lt-ie9")&&((t>e||979>n)&&arianne.addClass("fixed"),n>979&&t>e&&secondMenu.addClass("fixed"),myScroll+arianne.outerHeight()+secondMenu.outerHeight()+header.outerHeight()>=$("footer").offset().top?(arianne.addClass("bottom").css("bottom",secondMenu.outerHeight()),secondMenu.addClass("bottom")):(arianne.removeClass("bottom").css("bottom","auto"),secondMenu.removeClass("bottom")))):(scrollMenu||header.removeClass("scrolled"),arianne.length&&secondMenu.length&&!htmlTag.hasClass("lt-ie9")&&(arianne.removeClass("fixed"),secondMenu.removeClass("fixed"))):myScroll>50?(header.addClass("scrolled"),arianne.length&&t>e&&!htmlTag.hasClass("lt-ie9")&&arianne.addClass("fixed")):(scrollMenu||header.removeClass("scrolled"),arianne.length&&!htmlTag.hasClass("lt-ie9")&&arianne.removeClass("fixed")),979>=n&&secondMenu.length&&!htmlTag.hasClass("lt-ie9")&&secondMenu.removeClass("fixed")}function parallax(){$("#bg-top").css("top",myScroll/10-100+"px"),blocTop.find(".college").length&&blocTop.find(".college").find("img").css("opacity",1-myScroll/150),$("#btn-down-study.on").length&&$("#btn-down-study.on").css("opacity",1-myScroll/150)}function scrollPage(){myScroll=$(document).scrollTop(),$(window).height()>600&&fixedElements(),$("#bg-top").length&&parallax(),requestAnimFrame(scrollPage)}function setScrollMenu(){function e(){nav.removeClass("oAuto"),htmlTag.removeClass("oHidden")}$(window).height()<=$("#menu-main").height()&&nav.hasClass("open")?(nav.addClass("oAuto"),htmlTag.addClass("oHidden")):e()}function openCloseMenu(){burger.toggleClass("on"),nav.toggleClass("open"),body.toggleClass("pushed"),header.toggleClass("pushed"),nav.hasClass("open")?txtMenu.html("Close"):txtMenu.html("Menu"),mask.fadeToggle(300),setScrollMenu()}var burger=$("#hamburger-menu"),nav=$("nav"),body=$("body"),htmlTag=$("html"),header=$("header"),mask=$("#mask"),txtMenu=burger.find(".txt-menu"),blocTop=$("#bloc-top"),blocTxtHome=$("#bloc-txt-home"),blocTopHeight=blocTop.height(),headerHeight=header.innerHeight(),arianne=$('[data-scroll="arianne"]'),secondMenu=$('[data-scroll="submenu"]'),main=$('[data-scroll="submenu"] + .main'),myScroll,scrollMenu=!1;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),filterInt=function(e){return/^(\-|\+)?([0-9]+|Infinity)$/.test(e)?Number(e):0},$(function(){isMobile.any?htmlTag.addClass("mobile"):htmlTag.addClass("no-mobile");try{Typekit.load()}catch(e){}if($(".imgLiquidFill").imgLiquid(),scrollPage(),burger.on("click",function(e){e.preventDefault(),openCloseMenu()}),mask.on("click",function(e){e.preventDefault(),openCloseMenu()}),$("#btn-study").click(function(e){$("html, body").animate({scrollTop:$(".bloc-content").offset().top-headerHeight},500),e.preventDefault()}).hover(function(){blocTxtHome.addClass("hover-btn-study")},function(){blocTxtHome.removeClass("hover-btn-study")}),$("#btn-live").click(function(e){$("html, body").animate({scrollTop:$("#live-top").offset().top-headerHeight},500),e.preventDefault()}).hover(function(){blocTxtHome.addClass("hover-btn-live")},function(){blocTxtHome.removeClass("hover-btn-live")}),$("#btn-down-study").on("click",function(e){$("html, body").animate({scrollTop:$(".bloc-content").offset().top-headerHeight},500),e.preventDefault()}),$('[data-click="back"]').on("click",function(e){e.preventDefault(),history.back()}),$(".gf_page_steps").length){$(".gf_page_steps").wrap('<div id="wrapSteps"></div>');var t=0,n=$(".gf_step"),o=n.length;for(t;o>t;t++)n.eq(t).html(n.eq(t).html().replace(/&nbsp;/g,""))}if($(".browse").length){var a=$(".browse"),l=a.find("input[type=file]"),s,i="Browse...";a.find("#upload").length||(a.hasClass("fr")&&(i="Parcourir..."),a.find(".ginput_container").append('<input type="button" value="'+i+'" id="upload">'),a.prepend('<img src="" class="hidden" alt="Uploaded file" id="uploadImg" width="100">'),s=a.find("#uploadImg")),a.on("click","#upload",function(){l.click()}),l.on("change",function(e){a.find("label").html(l.val());var t=0;for(t;t<e.originalEvent.srcElement.files.length;t++){var n=e.originalEvent.srcElement.files[t],o=new FileReader;o.onloadend=function(){s.attr("src",o.result)},o.readAsDataURL(n),s.removeClass("hidden")}})}}),$(window).load(function(){function e(){$("#btn-down-study").addClass("on"),blocTop.find(".college").addClass("on")}if(body.hasClass("home")){if(!htmlTag.hasClass("lt-ie9")){var t=$("#bloc-logo-home"),n=TweenMax.to(t,.5,{opacity:"1",y:"30px",z:"1px"}),o=TweenMax.to(t,1,{y:"-20px",z:"1px"}),a=TweenMax.to(t,.4,{opacity:"0",y:"-120px",z:"1px"}),l=new TimelineMax({ease:Quad.easeInOut}).add(n).add(o).add(a);l.to([blocTxtHome,$("#logo-institut-avignon")],.2,{opacity:"1",y:"0px",z:"1px",ease:Sine.easeOut,delay:.5,onComplete:e})}htmlTag.hasClass("lt-ie9")||(window.sr=new scrollReveal({easing:"ease-in-out",over:"0.5s",move:"50px",scale:{direction:"up",power:"0%"},reset:!0,vFactor:"0.50",wait:"0.5s",delay:"onload"})),!function(e,t,n){var o,a=e.getElementsByTagName(t)[0],l=/^http:/.test(e.location)?"http":"https";e.getElementById(n)||(o=e.createElement(t),o.id=n,o.src=l+"://platform.twitter.com/widgets.js",a.parentNode.insertBefore(o,a))}(document,"script","twitter-wjs")}});