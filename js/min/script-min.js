function whichTransitionEvent(){var e,t=document.createElement("fakeelement"),a={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in a)if(void 0!==t.style[e])return a[e]}function scrollPage(){if(myScroll=$(document).scrollTop(),myScroll>40?TweenMax.set($("body"),{className:"+=header-on"}):TweenMax.set($("body"),{className:"-=header-on"}),$("body").hasClass("has-sidebar"))if(viewport().width>tabletBreakpoint?myScroll>=$(".navbar").offset().top-$("#header").outerHeight()&&myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"fixed",top:$("#header").outerHeight()+"px"}):myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"absolute",top:$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+$("#header").outerHeight()+"px"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"}):viewport().width>mobileBreakpoint?myScroll>=$(".navbar").offset().top&&myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"fixed",top:"0px"}):myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"absolute",top:$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+"px"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"}),viewport().width>tabletBreakpoint){var e=$(document).scrollTop();$(".navbar li.has-content a").each(function(){var t=$(this),a=$(t.attr("href"));a.position().top<=e+20+$("#header").outerHeight()&&a.position().top+a.height()>e+20+$("#header").outerHeight()?($(".navbar li.has-content").removeClass("active"),t.parents("li").addClass("active")):t.parents("li").removeClass("active")})}else if(viewport().width>mobileBreakpoint){var e=$(document).scrollTop();$(".navbar li.has-content a").each(function(){var t=$(this),a=$(t.attr("href"));a.position().top<=e+20&&a.position().top+a.height()>e+20?($(".navbar li.has-content").removeClass("active"),t.parents("li").addClass("active")):t.parents("li").removeClass("active")})}else $(".navbar li.has-content.active").removeClass("active");requestAnimFrame(scrollPage)}function viewport(){var e=window,t="inner";return"innerWidth"in window||(t="client",e=document.documentElement||document.body),{width:e[t+"Width"],height:e[t+"Height"]}}function animatePrevCitation(e,t){var a=$("ul > li.active",t),s=$("ul > li",t).eq(e-1);TweenMax.set(s,{x:"-100%"}),TweenMax.to(a,.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to(s,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[a,s]})}function animateNextCitation(e,t){var a=$("ul > li.active",t),s=$("ul > li",t).eq(e-1);TweenMax.set(s,{x:"100%"}),TweenMax.to(a,.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to(s,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[a,s]})}function completeClickService(e,t){TweenMax.set(e,{className:"-=active"}),TweenMax.set(t,{className:"+=active"})}function changeCar(){if($(".wrapper-choose").hasClass("survol-left")||$(".wrapper-choose").hasClass("survol-out-left")||$(".wrapper-choose").hasClass("survol-right")||$(".wrapper-choose").hasClass("survol-out-right"))setTimeout(changeCar,tpsChangeCar);else{var e=$(".car-choose").length,t=$(".car-choose.is-active"),a=t.index();if(e-1>a)var s=t.next(".car-choose");else var s=$(".car-choose").first();var o=new TimelineMax({onComplete:changeCarComplete});o.to(t,.3,{opacity:"0",ease:Cubic.easeInOut}),o.to(s,.3,{opacity:"1",ease:Cubic.easeInOut},0),o.set(t,{className:"-=is-active"}),o.set(s,{className:"+=is-active"})}}function changeCarComplete(){setTimeout(changeCar,tpsChangeCar)}function majPlaceholder(e){e.hasClass("is-active")?$(".select-placeholder",e).html("<span class='is-disabled'>"+$("select option",e).eq(0).html()+"</span>"):$(".select-options ul li",e).hasClass("is-selected")&&$(".select-placeholder",e).html($(".select-options ul li.is-selected",e).html())}function descRecherche(){if($("body").hasClass("resultat-recherche")){var e=$(".description-recherche").outerHeight();TweenMax.set($("#content-search-results .container"),{paddingBottom:e+"px"}),TweenMax.set($(".description-recherche"),{position:"absolute",bottom:"0px",left:"0px"})}}var nbCurrentSlideTemoignage=1,tpsChangeCar=8e3,mobileBreakpoint=767,tabletBreakpoint=979;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(function(){scrollPage();var e=whichTransitionEvent();if("not"==!Cookies.get("acceptCookie"),$("#btn-close-cookies").click(function(){return $(".cookies").removeClass("show"),!1}),$("body").hasClass("has-choose"))for(var t=1,a=1;a<$(".car-choose").length;a++)img=new Image,img.onload=function(){$("[data-src='"+this.src+"']").css({"background-image":"url("+this.src+")"}),t++,t===$(".car-choose").length&&setTimeout(changeCar,tpsChangeCar)},img.src=$(".car-choose").eq(a).data("src");if($(".imgLiquidFill").imgLiquid(),$("#footer-bottom .list-inline > li").each(function(e){var t=$("ul",this).html();$(".zone-same-footer ul").eq(e).append(t)}),$("a.btn-menu-responsive").click(function(){return $("body").toggleClass("menu-mobile-open"),!1}),$("a.btn-close-popup").click(function(){return $(this).parents(".wrapper-popup").removeClass("open"),!1}),$(".btn-toggle").click(function(){return $(this).toggleClass("open"),$(this).next(".content-toggle").slideToggle(200),!1}),$(".btn-toggle-one").click(function(){if(!$(this).hasClass("open")){var e=$(".btn-toggle-one").index(this),t=$(this).parents(".container-toggle-one");$(".btn-toggle-one",t).toggleClass("open"),$(".content-toggle-one.open").slideToggle(100,function(){$(this).toggleClass("open"),$(".content-toggle-one").eq(e).slideToggle(200,function(){$(this).toggleClass("open")})})}return!1}),$(".btn-slider-citation").click(function(){var e=$(this).parents(".wrapper-slider-citation");return TweenMax.isTweening($("ul > li",e))||($(this).hasClass("btn-left")?(1==nbCurrentSlideTemoignage?nbCurrentSlideTemoignage=$("ul > li",e).length:nbCurrentSlideTemoignage--,animatePrevCitation(nbCurrentSlideTemoignage,e)):$(this).hasClass("btn-right")&&(nbCurrentSlideTemoignage==$("ul > li",e).length?nbCurrentSlideTemoignage=1:nbCurrentSlideTemoignage++,animateNextCitation(nbCurrentSlideTemoignage,e))),!1}),$(".zone-left-survol-out").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-out-left")||(t.addClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".zone-right-survol-out").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-out-right")||(t.addClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-left-choose").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-left")||(t.addClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-right-choose").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-right")||(t.addClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-choose").click(function(){viewport().width>tabletBreakpoint&&($(this).hasClass("wrapper-zone-left-choose")?window.location.href="/#acheter":$(this).hasClass("wrapper-zone-right-choose")&&(window.location.href="/#vendre"))}),$(".title-action-choose").click(function(){return viewport().width<=tabletBreakpoint&&viewport().width>mobileBreakpoint?($(this).parents(".wrapper-zone-choose").hasClass("open-tablet")||($(".wrapper-zone-choose.open-tablet").removeClass("open-tablet"),$(this).parents(".wrapper-zone-choose").addClass("open-tablet"),$(this).hasClass("left-arrow")?$(this).parents(".wrapper-choose").removeClass("right-tablet").addClass("left-tablet"):$(this).hasClass("right-arrow")&&$(this).parents(".wrapper-choose").removeClass("left-tablet").addClass("right-tablet")),!1):void 0}),$("body").hasClass("has-sidebar")&&($(".navbar li.has-content a").click(function(){if(viewport().width>tabletBreakpoint){$(".navbar li.has-content.active").removeClass("active"),$(this).parents("li").addClass("active");var e=this.hash;$target=$(e),TweenMax.to($("body"),.5,{scrollTo:{y:$target.offset().top-85},ease:Power2.easeOut}),console.log(this.hash)}else if(viewport().width>mobileBreakpoint){$(".navbar li.has-content.active").removeClass("active"),$(this).parents("li").addClass("active");var e=this.hash;$target=$(e),TweenMax.to($("body"),.5,{scrollTo:{y:$target.offset().top-20},ease:Power2.easeOut})}else{$(".navbar li.has-content.active").removeClass("active");var e=this.hash;$target=$(e),TweenMax.to($("body"),.5,{scrollTo:{y:$target.offset().top-10},ease:Power2.easeOut})}return!1}),window.location.hash)){window.scrollTo(0,0),setTimeout(function(){window.scrollTo(0,0)},1);var s=window.location.hash;if(viewport().width>tabletBreakpoint){$(".navbar li.has-content.active").removeClass("active");var o=s;$target=$(o),setTimeout(function(){TweenMax.to($("body"),.5,{scrollTo:{y:$target.offset().top-85},ease:Power2.easeOut})},100)}else if(viewport().width>mobileBreakpoint){$(".navbar li.has-content.active").removeClass("active");var o=s;$target=$(o),setTimeout(function(){TweenMax.set($("body"),{scrollTo:{y:$target.offset().top-20},ease:Power2.easeOut})},100)}else{var o=s;$target=$(o),setTimeout(function(){TweenMax.set($("body"),{scrollTo:{y:$target.offset().top-10},ease:Power2.easeOut})},100)}}$(".select-type-car > li a").click(function(){return $(".select-type-car  >li.is-selected").removeClass("is-selected"),$(this).parents("li").first().toggleClass("is-selected"),!1}),$(".select-option-car > li a").click(function(){return $(this).parents("li").toggleClass("is-selected"),!1}),$(".switch").click(function(){return $(this).toggleClass("off").toggleClass("on"),!1}),$("#btn-more-criteres").click(function(){return $(this).toggleClass("open"),$("#content-more-criteres").slideToggle(200),!1}),$(".select-placeholder").click(function(){return $(this).parents(".select-custom").hasClass("is-active")?$(".select-custom.is-active").removeClass("is-active"):($(".select-custom.is-active").removeClass("is-active"),$(this).parents(".select-custom").addClass("is-active")),!1}),$(".select-options ul li").click(function(){var e=$(this).parents(".select-options");$("li.is-selected",e).removeClass("is-selected"),$(this).addClass("is-selected");var t=$(".select-custom.is-active");return t.removeClass("is-active"),majPlaceholder(t),!1}),$(document).mouseup(function(e){var t=$("a.select-placeholder"),a=$(".select-options ul li");if(!t.is(e.target)&&0===t.has(e.target).length&&!a.is(e.target)&&0===a.has(e.target).length&&$(".select-custom").hasClass("is-active")){var s=$(".select-custom.is-active");s.removeClass("is-active"),majPlaceholder(s)}}),$("body").hasClass("resultat-recherche")&&($("#filter-prix").slider({range:!0,min:1e3,max:5e4,step:1e3,values:[1e3,5e4],animate:"slow",create:function(){$("#min").appendTo($("#filter-prix .ui-slider-handle").get(0)),$("#max").appendTo($("#filter-prix .ui-slider-handle").get(1))},slide:function(e,t){$(t.handle).find("span").html(t.value+" €")}}),$("#min").html($("#filter-prix").slider("values",0)+" €").position({my:"center top",at:"center bottom",of:$("#filter-prix .ui-slider-handle").eq(0),offset:"0, 10"}),$("#max").html($("#filter-prix").slider("values",1)+" €").position({my:"center top",at:"center bottom",of:$("#filter-prix .ui-slider-handle").eq(1),offset:"0, 10"})),$("#btn-remove-criteria").click(function(){return $(".select-type-car li.is-selected").removeClass("is-selected"),$(".select-option-car li.is-selected").removeClass("is-selected"),$("#content-more-criteres .switch.on").removeClass("on").addClass("off"),$(".select-options ul li").click(function(){var e=$(this).parents(".select-options");$("li.is-selected",e).removeClass("is-selected"),$(this).addClass("is-selected");var t=$(".select-custom.is-active");return t.removeClass("is-active"),majPlaceholder(t),!1}),$(".lines-filters .select-custom").each(function(){$(".select-options li.is-selected",this).removeClass("is-selected"),$(".select-options li",this).first().addClass("is-selected"),majPlaceholder($(this))}),!1}),descRecherche()}),$(window).resize(function(){$(".container-toggle-one").each(function(){$(".content-toggle-one",this).attr("style",""),$(".btn-toggle-one.open",this).removeClass("open"),$(".btn-toggle-one",this).first().addClass("open"),$(".content-toggle-one.open",this).removeClass("open"),$(".content-toggle-one",this).first().addClass("open")}),$("#menu-bottom-header a.open").removeClass("open"),$("#menu-bottom-header .list-inline").attr("style",""),$("body").hasClass("has-choose")&&$(".wrapper-choose").removeClass("survol-left").removeClass("survol-out-left").removeClass("survol-right").removeClass("survol-out-right"),descRecherche()});