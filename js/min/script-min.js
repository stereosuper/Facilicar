function whichTransitionEvent(){var e,t=document.createElement("fakeelement"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(void 0!==t.style[e])return o[e]}function scrollPage(){myScroll=$(document).scrollTop(),myScroll>40?TweenMax.set($("body"),{className:"+=header-on"}):TweenMax.set($("body"),{className:"-=header-on"}),$("body").hasClass("has-sidebar")&&(myScroll>=$(".navbar").offset().top&&myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"fixed",top:"0px"}):myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"absolute",top:$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+"px"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"})),requestAnimFrame(scrollPage)}function animatePrevCitation(e,t){var o=$("ul > li.active",t),a=$("ul > li",t).eq(e-1);TweenMax.set(a,{x:"-100%"}),TweenMax.to(o,.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to(a,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[o,a]})}function animateNextCitation(e,t){var o=$("ul > li.active",t),a=$("ul > li",t).eq(e-1);TweenMax.set(a,{x:"100%"}),TweenMax.to(o,.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to(a,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[o,a]})}function completeClickService(e,t){TweenMax.set(e,{className:"-=active"}),TweenMax.set(t,{className:"+=active"})}function changeCar(){if($(".wrapper-choose").hasClass("survol-left")||$(".wrapper-choose").hasClass("survol-out-left")||$(".wrapper-choose").hasClass("survol-right")||$(".wrapper-choose").hasClass("survol-out-right"))setTimeout(changeCar,tpsChangeCar);else{var e=$(".car-choose").length,t=$(".car-choose.is-active"),o=t.index();if(e-1>o)var a=t.next(".car-choose");else var a=$(".car-choose").first();var s=new TimelineMax({onComplete:changeCarComplete});s.to(t,.3,{opacity:"0",ease:Cubic.easeInOut}),s.to(a,.3,{opacity:"1",ease:Cubic.easeInOut},0),s.set(t,{className:"-=is-active"}),s.set(a,{className:"+=is-active"})}}function changeCarComplete(){setTimeout(changeCar,tpsChangeCar)}var nbCurrentSlideTemoignage=1,tpsChangeCar=8e3,mobileBreakpoint=767,tabletBreakpoint=979;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(function(){scrollPage();var e=whichTransitionEvent();if("not"==!Cookies.get("acceptCookie"),$("#btn-close-cookies").click(function(){return $(".cookies").removeClass("show"),!1}),$("body").hasClass("has-choose"))for(var t=1,o=1;o<$(".car-choose").length;o++)img=new Image,img.onload=function(){$("[data-src='"+this.src+"']").css({"background-image":"url("+this.src+")"}),t++,console.log(this.src),t===$(".car-choose").length&&setTimeout(changeCar,tpsChangeCar)},img.src=$(".car-choose").eq(o).data("src");$(".imgLiquidFill").imgLiquid(),$("#footer-bottom .list-inline > li").each(function(e){var t=$("ul",this).html();$(".zone-same-footer ul").eq(e).append(t)}),$("a.btn-menu-responsive").click(function(){return $("body").toggleClass("menu-mobile-open"),!1}),$("a.btn-close-popup").click(function(){return $(this).parents(".wrapper-popup").removeClass("open"),!1}),$(".btn-toggle").click(function(){return $(this).toggleClass("open"),$(this).next(".content-toggle").slideToggle(200),!1}),$(".btn-toggle-one").click(function(){if(!$(this).hasClass("open")){var e=$(".btn-toggle-one").index(this),t=$(this).parents(".container-toggle-one");$(".btn-toggle-one",t).toggleClass("open"),$(".content-toggle-one.open").slideToggle(100,function(){$(this).toggleClass("open"),$(".content-toggle-one").eq(e).slideToggle(200,function(){$(this).toggleClass("open")})})}return!1}),$(".btn-slider-citation").click(function(){var e=$(this).parents(".wrapper-slider-citation");return TweenMax.isTweening($("ul > li",e))||($(this).hasClass("btn-left")?(1==nbCurrentSlideTemoignage?nbCurrentSlideTemoignage=$("ul > li",e).length:nbCurrentSlideTemoignage--,animatePrevCitation(nbCurrentSlideTemoignage,e)):$(this).hasClass("btn-right")&&(nbCurrentSlideTemoignage==$("ul > li",e).length?nbCurrentSlideTemoignage=1:nbCurrentSlideTemoignage++,animateNextCitation(nbCurrentSlideTemoignage,e))),!1}),$(".zone-left-survol-out").hover(function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-out-left")||(t.addClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".zone-right-survol-out").hover(function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-out-right")||(t.addClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-left-choose").hover(function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-left")||(t.addClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-right-choose").hover(function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-right")||(t.addClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-choose").click(function(){$(window).width()>tabletBreakpoint&&($(this).hasClass("wrapper-zone-left-choose")?window.location.href="/#acheter":$(this).hasClass("wrapper-zone-right-choose")&&(window.location.href="/#vendre"))}),$(".title-action-choose").click(function(){return $(window).width()<=tabletBreakpoint&&$(window).width()>mobileBreakpoint?($(this).parents(".wrapper-zone-choose").hasClass("open-tablet")||($(".wrapper-zone-choose.open-tablet").removeClass("open-tablet"),$(this).parents(".wrapper-zone-choose").addClass("open-tablet"),$(this).hasClass("left-arrow")?$(this).parents(".wrapper-choose").removeClass("right-tablet").addClass("left-tablet"):$(this).hasClass("right-arrow")&&$(this).parents(".wrapper-choose").removeClass("left-tablet").addClass("right-tablet")),!1):void 0})}),$(window).resize(function(){$(".container-toggle-one").each(function(){$(".content-toggle-one",this).attr("style",""),$(".btn-toggle-one.open",this).removeClass("open"),$(".btn-toggle-one",this).first().addClass("open"),$(".content-toggle-one.open",this).removeClass("open"),$(".content-toggle-one",this).first().addClass("open")}),$("#menu-bottom-header a.open").removeClass("open"),$("#menu-bottom-header .list-inline").attr("style",""),$("body").hasClass("has-choose")&&$(".wrapper-choose").removeClass("survol-left").removeClass("survol-out-left").removeClass("survol-right").removeClass("survol-out-right")});