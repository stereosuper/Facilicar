function whichTransitionEvent(){var e,o=document.createElement("fakeelement"),t={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in t)if(void 0!==o.style[e])return t[e]}function scrollPage(){myScroll=$(document).scrollTop(),myScroll>40?TweenMax.set($("body"),{className:"+=header-on"}):TweenMax.set($("body"),{className:"-=header-on"}),requestAnimFrame(scrollPage)}function animatePrevCitation(e,o){var t=$("ul > li.active",o),a=$("ul > li",o).eq(e-1);TweenMax.set(a,{x:"-100%"}),TweenMax.to(t,.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to(a,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[t,a]})}function animateNextCitation(e,o){var t=$("ul > li.active",o),a=$("ul > li",o).eq(e-1);TweenMax.set(a,{x:"100%"}),TweenMax.to(t,.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to(a,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[t,a]})}function completeClickService(e,o){TweenMax.set(e,{className:"-=active"}),TweenMax.set(o,{className:"+=active"})}function changeCar(){if($(".wrapper-choose").hasClass("survol-left")||$(".wrapper-choose").hasClass("survol-out-left")||$(".wrapper-choose").hasClass("survol-right")||$(".wrapper-choose").hasClass("survol-out-right"))setTimeout(changeCar,tpsChangeCar);else{var e=$(".car-choose").length,o=$(".car-choose.is-active"),t=o.index();if(e-1>t)var a=o.next(".car-choose");else var a=$(".car-choose").first();var n=new TimelineMax({onComplete:changeCarComplete});n.to(o,.3,{opacity:"0",ease:Cubic.easeInOut}),n.to(a,.3,{opacity:"1",ease:Cubic.easeInOut},0),n.set(o,{className:"-=is-active"}),n.set(a,{className:"+=is-active"})}}function changeCarComplete(){setTimeout(changeCar,tpsChangeCar)}var nbCurrentSlideTemoignage=1,tpsChangeCar=8e3,mobileBreakpoint=767,tabletBreakpoint=979;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(function(){scrollPage();var e=whichTransitionEvent();if("not"==!Cookies.get("acceptCookie")&&$(".cookies").addClass("show"),$("#btn-close-cookies").click(function(){return $(".cookies").removeClass("show"),Cookies.set("acceptCookie","not"),!1}),$("body").hasClass("has-choose"))for(var o=1,t=1;t<$(".car-choose").length;t++)img=new Image,img.onload=function(){$("[data-src='"+this.src+"']").css({"background-image":"url("+this.src+")"}),o++,console.log(this.src),o===$(".car-choose").length&&setTimeout(changeCar,tpsChangeCar)},img.src=$(".car-choose").eq(t).data("src");$(".imgLiquidFill").imgLiquid(),$("#footer-bottom .list-inline > li").each(function(e){var o=$("ul",this).html();$(".zone-same-footer ul").eq(e).append(o)}),$("a.btn-menu-responsive").click(function(){return $("body").toggleClass("menu-mobile-open"),!1}),$(".btn-toggle").click(function(){return $(this).toggleClass("open"),$(this).next(".content-toggle").slideToggle(200),!1}),$(".btn-toggle-one").click(function(){if(!$(this).hasClass("open")){var e=$(".btn-toggle-one").index(this),o=$(this).parents(".container-toggle-one");$(".btn-toggle-one",o).toggleClass("open"),$(".content-toggle-one.open").slideToggle(100,function(){$(this).toggleClass("open"),$(".content-toggle-one").eq(e).slideToggle(200,function(){$(this).toggleClass("open")})})}return!1}),$(".btn-slider-citation").click(function(){var e=$(this).parents(".wrapper-slider-citation");return TweenMax.isTweening($("ul > li",e))||($(this).hasClass("btn-left")?(1==nbCurrentSlideTemoignage?nbCurrentSlideTemoignage=$("ul > li",e).length:nbCurrentSlideTemoignage--,animatePrevCitation(nbCurrentSlideTemoignage,e)):$(this).hasClass("btn-right")&&(nbCurrentSlideTemoignage==$("ul > li",e).length?nbCurrentSlideTemoignage=1:nbCurrentSlideTemoignage++,animateNextCitation(nbCurrentSlideTemoignage,e))),!1}),$(".zone-left-survol-out").hover(function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-out-left")||(o.addClass("survol-out-left"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");o.removeClass("survol-out-left"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")})}}),$(".zone-right-survol-out").hover(function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");o.hasClass("survol-out-right")||(o.addClass("survol-out-right"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");o.removeClass("survol-out-right"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")})}}),$(".wrapper-zone-left-choose").hover(function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-left")||(o.addClass("survol-left"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");o.removeClass("survol-left"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")})}}),$(".wrapper-zone-right-choose").hover(function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");o.hasClass("survol-right")||(o.addClass("survol-right"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")}))}},function(){if($(window).width()>tabletBreakpoint){var o=$(this).parents(".wrapper-choose");o.removeClass("survol-right"),o.addClass("animated"),$(".car-choose").one(e,function(e){o.removeClass("animated")})}}),$(".wrapper-zone-choose").click(function(){$(window).width()>tabletBreakpoint&&($(this).hasClass("wrapper-zone-left-choose")?window.location.href="/#acheter":$(this).hasClass("wrapper-zone-right-choose")&&(window.location.href="/#vendre"))}),$(".title-action-choose").click(function(){return $(window).width()<=tabletBreakpoint&&$(window).width()>mobileBreakpoint?($(this).parents(".wrapper-zone-choose").hasClass("open-tablet")||($(".wrapper-zone-choose.open-tablet").removeClass("open-tablet"),$(this).parents(".wrapper-zone-choose").addClass("open-tablet"),$(this).hasClass("left-arrow")?$(this).parents(".wrapper-choose").removeClass("right-tablet").addClass("left-tablet"):$(this).hasClass("right-arrow")&&$(this).parents(".wrapper-choose").removeClass("left-tablet").addClass("right-tablet")),!1):void 0})}),$(window).resize(function(){$(".container-toggle-one").each(function(){$(".content-toggle-one",this).attr("style",""),$(".btn-toggle-one.open",this).removeClass("open"),$(".btn-toggle-one",this).first().addClass("open"),$(".content-toggle-one.open",this).removeClass("open"),$(".content-toggle-one",this).first().addClass("open")}),$("#menu-bottom-header a.open").removeClass("open"),$("#menu-bottom-header .list-inline").attr("style",""),$("body").hasClass("has-choose")&&$(".wrapper-choose").removeClass("survol-left").removeClass("survol-out-left").removeClass("survol-right").removeClass("survol-out-right")});