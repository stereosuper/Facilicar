function whichTransitionEvent(){var e,t=document.createElement("fakeelement"),s={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in s)if(void 0!==t.style[e])return s[e]}function scrollPage(){if(myScroll=$(document).scrollTop(),myScroll>40?TweenMax.set($("body"),{className:"+=header-on"}):TweenMax.set($("body"),{className:"-=header-on"}),$("body").hasClass("detail-vehicule")){if($(window).width()<=979){var e=$("#container-btn-detail").offset().top;if(myScroll>=e-10){TweenMax.set($("#btn-essai-commande"),{className:"+=fixed"});var t=$("#btn-essai-commande").innerHeight();TweenMax.set($("#container-btn-detail"),{paddingTop:t+"px"})}else TweenMax.set($("#btn-essai-commande"),{className:"-=fixed"}),TweenMax.set($("#container-btn-detail"),{paddingTop:"0"})}else TweenMax.set($("#btn-essai-commande"),{className:"-=fixed"}),TweenMax.set($("#container-btn-detail"),{paddingTop:"0"});myScroll>=400?TweenMax.set($(".detail-vehicule-zoom"),{className:"+=scroll"}):TweenMax.set($(".detail-vehicule-zoom"),{className:"-=scroll"})}if($("body").hasClass("resultat-recherche")&&(myScroll>120?TweenMax.set($(".cars-filters"),{className:"+=fixed"}):TweenMax.set($(".cars-filters"),{className:"-=fixed"})),$("body").hasClass("has-sidebar"))if(viewport().width>tabletBreakpoint?myScroll>=$(".navbar").offset().top-$("#header").outerHeight()&&myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"fixed",top:$("#header").outerHeight()+"px"}):myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"absolute",top:$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+$("#header").outerHeight()+"px"}):TweenMax.set($(".navbar ul"),{position:"absolute",top:"0"}):viewport().width>mobileBreakpoint?myScroll>=$(".navbar").offset().top&&myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"fixed",top:"0px"}):myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"absolute",top:$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+"px"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"}),viewport().width>tabletBreakpoint){var s=$(document).scrollTop();$(".navbar li.has-content a").each(function(){var e=$(this),t=$(e.attr("href"));t.position().top<=s+20+$("#header").outerHeight()&&t.position().top+t.height()>s+20+$("#header").outerHeight()?($(".navbar li.has-content").removeClass("active"),e.parents("li").addClass("active")):e.parents("li").removeClass("active")})}else if(viewport().width>mobileBreakpoint){var s=$(document).scrollTop();$(".navbar li.has-content a").each(function(){var e=$(this),t=$(e.attr("href"));t.position().top<=s+20&&t.position().top+t.height()>s+20?($(".navbar li.has-content").removeClass("active"),e.parents("li").addClass("active")):e.parents("li").removeClass("active")})}else $(".navbar li.has-content.active").removeClass("active");requestAnimFrame(scrollPage)}function viewport(){var e=window,t="inner";return"innerWidth"in window||(t="client",e=document.documentElement||document.body),{width:e[t+"Width"],height:e[t+"Height"]}}function animatePrevCitation(e,t){var s=$("ul > li.active",t),a=$("ul > li",t).eq(e-1);TweenMax.set(a,{x:"-100%"}),TweenMax.to(s,.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to(a,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[s,a]})}function animateNextCitation(e,t){var s=$("ul > li.active",t),a=$("ul > li",t).eq(e-1);TweenMax.set(a,{x:"100%"}),TweenMax.to(s,.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to(a,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[s,a]})}function completeClickService(e,t){TweenMax.set(e,{className:"-=active"}),TweenMax.set(t,{className:"+=active"})}function changeCar(){if($(".wrapper-choose").hasClass("survol-left")||$(".wrapper-choose").hasClass("survol-out-left")||$(".wrapper-choose").hasClass("survol-right")||$(".wrapper-choose").hasClass("survol-out-right"))setTimeout(changeCar,tpsChangeCar);else{var e=$(".car-choose").length,t=$(".car-choose.is-active"),s=t.index();if(e-1>s)var a=t.next(".car-choose");else var a=$(".car-choose").first();var i=new TimelineMax({onComplete:changeCarComplete});i.to(t,.3,{opacity:"0",ease:Cubic.easeInOut}),i.to(a,.3,{opacity:"1",ease:Cubic.easeInOut},0),i.set(t,{className:"-=is-active"}),i.set(a,{className:"+=is-active"})}}function changeCarComplete(){setTimeout(changeCar,tpsChangeCar)}function majPlaceholder(e){e.hasClass("is-active")?$(".select-placeholder",e).html("<span class='is-disabled'>"+$("select option",e).eq(0).html()+"</span>"):$(".select-options ul li",e).hasClass("is-selected")&&$(".select-placeholder",e).html($(".select-options ul li.is-selected",e).html())}function descRecherche(){if($("body").hasClass("resultat-recherche")){var e=$(".description-recherche").outerHeight();TweenMax.set($("#content-search-results .container"),{paddingBottom:e+"px"}),TweenMax.set($(".description-recherche"),{position:"absolute",bottom:"0px",left:"0px"})}}function animateNextCarSlide(e,t){var s=$(">li.is-active",e),a=$(">li",e).eq(t);TweenMax.set(a,{x:"100%"}),TweenMax.to(s,1,{x:"-100%",ease:Cubic.easeInOut,delay:.5}),TweenMax.to(a,1,{x:"0%",ease:Cubic.easeInOut,delay:.5,onComplete:completeAnimateNextCarSlide,onCompleteParams:[e,t]})}function completeAnimateNextCarSlide(e,t){var s=$(">li",e).length,a=$(">li.is-active",e),i=$(">li",e).eq(t);a.removeClass("is-active"),i.addClass("is-active"),s>t+1?t++:t=0,animateNextCarSlide(e,t)}function completeEndCarSlide(e){var t=$(">li.is-active",e),s=$(">li",e).eq(0);t.removeClass("is-active"),s.addClass("is-active"),TweenMax.set($(">li",e),{x:"100%"}),TweenMax.set($(">li.is-active",e),{x:"0%"})}function setToolTip(){$(".has-tooltip").tooltipster({contentAsHTML:!0,theme:".facilicar-theme"}),$(".zone-picto").tooltipster({contentAsHTML:!0,theme:".facilicar-theme"})}function setTabsHeight(){var e=$(".wrapper-tabs");e.each(function(){TweenMax.set($(".tabs-content"),{height:$(".tabs-content li.is-selected").outerHeight()})})}function setTabs(){var e=$(".wrapper-tabs");e.each(function(){var e=$(this),t=$("ul.tabs-navigation",e),s=$("ul.tabs-content",e);t.on("click","a",function(e){e.preventDefault();var a=$(this);if(!a.hasClass("is-selected")){var i=a.data("content"),o=s.find('li[data-content="'+i+'"]'),n=o.innerHeight();$("html, body").stop().animate({scrollTop:t.offset().top-150},500),t.find("a.is-selected").removeClass("is-selected"),a.addClass("is-selected"),o.addClass("is-selected").siblings("li").removeClass("is-selected"),s.animate({height:n},200)}})})}function zoomDetailVehicule(){$(".prix-financement-zoom").append($(".prix-financement").html()),$(".car-details-zoom .car-details-zoom-line-one").append($(".car-details .car-details-line-one").html()),$(".car-details-zoom .car-details-zoom-line-two").append($(".car-details .car-details-line-two").html()),$(".car-details-zoom .car-details-zoom-line-three").append($(".car-details .car-details-line-three").html())}function doOnOrientationChange(){$("body").hasClass("detail-vehicule")&&(isMobile.phone||isMobile.tablet)&&(window.innerHeight>window.innerWidth?TweenMax.set($("body"),{className:"+=orientationPortrait"}):TweenMax.set($("body"),{className:"-=orientationPortrait"}))}function detailDeviceDetection(){doOnOrientationChange()}function animChangeOrientation(){}function loadImages(){$(".preloader").addClass("is-visible"),$(".to-load").on("load",function(){$(this).parents(".preloader").removeClass("is-visible"),$(this).addClass("is-loaded")}).each(function(){this.complete&&$(this).trigger("load")})}var nbCurrentSlideTemoignage=1,tpsChangeCar=8e3,mobileBreakpoint=767,tabletBreakpoint=979,timeout;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(window).load(function(){setTabsHeight(),setTabs()}),$(function(){scrollPage();var e=whichTransitionEvent();if("not"==!Cookies.get("acceptCookie"),setToolTip(),loadImages(),$(".list-cars-small").length&&$(window).width()<=767&&TweenMax.set($(".list-cars-small"),{className:"+=is-list"}),detailDeviceDetection(),$("body").hasClass("detail-vehicule")&&(zoomDetailVehicule(),$("#slider-apport").slider({min:0,max:1e4,step:500,range:"min",animate:"slow",create:function(){$("#slider-apport .min").appendTo($("#slider-apport .ui-slider-handle").get(0))},slide:function(e,t){$(t.handle).find("span").html(t.value+" €"),t.value<1500?$("#slider-apport .min-txt").addClass("hide"):$("#slider-apport .min-txt").removeClass("hide"),t.value>7e3?$("#slider-apport .max-txt").addClass("hide"):$("#slider-apport .max-txt").removeClass("hide")}}),$("#slider-apport .min").html($("#slider-apport").slider("values",0)+" €").position({my:"center top",at:"center bottom",of:$("#slider-apport .ui-slider-handle").eq(0),offset:"0, 10"}),$("#slider-mensualites").slider({min:12,max:48,step:1,range:"min",animate:"slow",create:function(){$("#slider-mensualites .min").appendTo($("#slider-mensualites .ui-slider-handle").get(0)),$("#slider-mensualites .max").appendTo($("#slider-mensualites .ui-slider-handle").get(1))},slide:function(e,t){$(t.handle).find("span").html(t.value+" MOIS"),t.value<=20?$("#slider-mensualites .min-txt").addClass("hide"):$("#slider-mensualites .min-txt").removeClass("hide"),t.value>=39?$("#slider-mensualites .max-txt").addClass("hide"):$("#slider-mensualites .max-txt").removeClass("hide")}}),$("#slider-mensualites .min").html($("#slider-mensualites").slider("values",0)+" MOIS").position({my:"center top",at:"center bottom",of:$("#slider-apport .ui-slider-handle").eq(0),offset:"0, 10"})),$(".btn-haut-page").click(function(){return TweenMax.to(window,.8,{scrollTo:{y:0}}),!1}),$("body").hasClass("slider-detail")){var t=$(".paging-info"),s=$(".slider-for");s.on("init reInit afterChange",function(e,s,a,i){var o=(a?a:0)+1;t.text(o+"/"+s.slideCount)}),$(".slider-for").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,asNavFor:".slider-nav",prevArrow:$(".prev-slider-for"),nextArrow:$(".next-slider-for")}),$(".slider-nav").slick(isMobile.tablet||isMobile.phone?{slidesToShow:5,slidesToScroll:1,asNavFor:".slider-for",dots:!1,speed:0,centerMode:!1,focusOnSelect:!0,prevArrow:$(".prev-slider-nav"),nextArrow:$(".next-slider-nav"),responsive:[{breakpoint:1024,settings:{slidesToShow:4}}]}:{slidesToShow:5,slidesToScroll:1,asNavFor:".slider-for",dots:!1,centerMode:!1,focusOnSelect:!0,prevArrow:$(".prev-slider-nav"),nextArrow:$(".next-slider-nav"),responsive:[{breakpoint:1024,settings:{slidesToShow:4}}]}),$(".slider-nav").on("breakpoint",function(e){$(".slider-nav .slide.imgLiquidFill").imgLiquid()}),$(".slider-for-zoom").slick({slidesToShow:1,slidesToScroll:1,infinite:!1,arrows:!0,infinite:!0,asNavFor:".slider-nav-zoom",prevArrow:$(".prev-slider-for-zoom"),nextArrow:$(".next-slider-for-zoom")}),$(".slider-nav-zoom").slick({slidesToShow:20,slidesToScroll:1,infinite:!1,asNavFor:".slider-for-zoom",dots:!1,centerMode:!1,arrows:!1,focusOnSelect:!0,responsive:[{breakpoint:1150,settings:{slidesToShow:15}},{breakpoint:979,settings:{slidesToShow:12}}]}),$(".slider-nav-zoom").on("breakpoint",function(e){$(".slider-nav-zoom .slide.imgLiquidFill").imgLiquid()});var a=$(".filter-nav-zoom").parent("li").attr("id"),i=$(".slider-for-zoom .slick-track > .slick-slide").length;$(".slider-for-zoom").on("afterChange",function(e,t,s,a){if($(window).width()>=1150&&$(".slider-nav-zoom .slide").length<20){var i=$(".slider-for-zoom .slick-current").attr("data-slick-index");$(".slider-nav-zoom .slick-current").removeClass("slick-current"),$('.slider-nav-zoom .slick-slide[data-slick-index="'+i+'"]').trigger("click")}else if($(window).width()>=979&&$(".slider-nav-zoom .slide").length<15){var i=$(".slider-for-zoom .slick-current").attr("data-slick-index");$(".slider-nav-zoom .slick-current").removeClass("slick-current"),$('.slider-nav-zoom .slick-slide[data-slick-index="'+i+'"]').trigger("click")}else if($(".slider-nav-zoom .slide").length<12){var i=$(".slider-for-zoom .slick-current").attr("data-slick-index");$(".slider-nav-zoom .slick-current").removeClass("slick-current"),$('.slider-nav-zoom .slick-slide[data-slick-index="'+i+'"]').trigger("click")}var o=$(".slider-nav-zoom .slide:eq("+s+")").data("filter");$(".btn-filters li#"+o+" .filter-nav-zoom").hasClass("is-active")||(TweenMax.set($(".filter-nav-zoom.is-active"),{className:"-=is-active"}),TweenMax.set($(".btn-filters li#"+o+" .filter-nav-zoom"),{className:"+=is-active"}))}),$(".slider-for .slick-slide").click(function(){$(".detail-vehicule-zoom").hasClass("open")||(TweenMax.set($(".detail-vehicule-zoom"),{className:"+=open"}),TweenMax.to($(".detail-vehicule-zoom"),.3,{opacity:1}),TweenMax.set($(".wrapper-top-zoom"),{className:"+=is-white"}),animChangeOrientation())}),$("#btn-open-zoom").click(function(){return $(".detail-vehicule-zoom").hasClass("open")||(TweenMax.set($(".detail-vehicule-zoom"),{className:"+=open"}),TweenMax.to($(".detail-vehicule-zoom"),.3,{opacity:1}),TweenMax.set($(".wrapper-top-zoom"),{className:"+=is-white"}),animChangeOrientation()),!1}),$("#btn-close-zoom").click(function(){var e=$(".slider-for-zoom .slick-active.slick-current").index();return $(".slider-for").get(0).slick.slickGoTo(e,!1),$(".slider-nav").get(0).slick.slickGoTo(e,!1),TweenMax.set($(".detail-vehicule-zoom"),{autoAlpha:0,className:"-=open",onComplete:function(){TweenMax.set($(".detail-vehicule-zoom"),{clearProps:"all"})}}),TweenMax.set($(".wrapper-top-zoom"),{className:"-=is-white"}),!1})}if($(".filter-nav-zoom").on("click",function(){$(this).hasClass("is-active")||(TweenMax.set($(".filter-nav-zoom.is-active"),{className:"-=is-active"}),TweenMax.set($(this),{className:"+=is-active"}));var e=$(this).parent("li").attr("id"),t=$(".slider-nav-zoom .slide[data-filter='"+e+"']:first").index();$(".slider-for-zoom").get(0).slick.slickGoTo(t),$(".slider-nav-zoom").get(0).slick.slickGoTo(t)}),$("#btn-close-cookies").click(function(){return $(".cookies").removeClass("show"),!1}),$("body").hasClass("has-choose"))for(var o=1,n=1;n<$(".car-choose").length;n++)img=new Image,img.onload=function(){$("[data-src='"+this.src+"']").css({"background-image":"url("+this.src+")"}),o++,o===$(".car-choose").length&&setTimeout(changeCar,tpsChangeCar)},img.src=$(".car-choose").eq(n).data("src");if($(".imgLiquidFill").imgLiquid(),$("#footer-bottom .list-inline > li").each(function(e){var t=$("ul",this).html();$(".zone-same-footer ul").eq(e).append(t)}),$("a.btn-menu-responsive").click(function(){return $("body").toggleClass("menu-mobile-open"),!1}),$(".has-popup").click(function(){var e=$(this).data("ref-popup"),t=$(".wrapper-popup[data-popup='"+e+"']");return t.hasClass("open")||(TweenMax.set($(".wrapper-popup"),{className:"-=open"}),TweenMax.set(t,{className:"+=open"})),!1}),$("a.btn-close-popup").click(function(){return $(this).parents(".wrapper-popup").removeClass("open"),!1}),$(".notif").find("button").on("click",function(){$(this).parents(".notif").fadeOut(300,function(){$("#main").removeClass("has-notif")})}),$(".btn-toggle").click(function(){$("body").hasClass("toggle-all")?$(this).hasClass("open")?($(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200),$(".wrapper-toggle-all .btn-toggle.open").removeClass("open")):($(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200),$(".wrapper-toggle-all .btn-toggle.open").removeClass("open"),$(this).addClass("open"),$(this).next(".content-toggle").slideToggle(200)):($(this).toggleClass("open"),$(this).next(".content-toggle").slideToggle(200));var e=$(this);return setTimeout(function(){$("html, body").stop().animate({scrollTop:e.offset().top-12},500)},200),!1}),$(".btn-toggle-once").click(function(){if($(this).hasClass("open")){$(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200),$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open");var e=$(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once")}else $(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200),$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open"),$(this).addClass("open"),$(this).next(".content-toggle-once").slideToggle(200);var t=$(this);return setTimeout(function(){$("body").hasClass("detail-vehicule")?$("html, body").stop().animate({scrollTop:t.offset().top-82},500):$("html, body").stop().animate({scrollTop:t.offset().top-12},500)},200),!1}),$(".btn-toggle-one").click(function(){if(!$(this).hasClass("open")){var e=$(".btn-toggle-one").index(this),t=$(this).parents(".container-toggle-one");$(".btn-toggle-one",t).toggleClass("open"),$(".content-toggle-one.open").slideToggle(100,function(){$(this).toggleClass("open"),$(".content-toggle-one").eq(e).slideToggle(200,function(){$(this).toggleClass("open")})})}return!1}),$(".btn-slider-citation").click(function(){var e=$(this).parents(".wrapper-slider-citation");return TweenMax.isTweening($("ul > li",e))||($(this).hasClass("btn-left")?(1==nbCurrentSlideTemoignage?nbCurrentSlideTemoignage=$("ul > li",e).length:nbCurrentSlideTemoignage--,animatePrevCitation(nbCurrentSlideTemoignage,e)):$(this).hasClass("btn-right")&&(nbCurrentSlideTemoignage==$("ul > li",e).length?nbCurrentSlideTemoignage=1:nbCurrentSlideTemoignage++,animateNextCitation(nbCurrentSlideTemoignage,e))),!1}),$(".zone-left-survol-out").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-out-left")||(t.addClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".zone-right-survol-out").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-out-right")||(t.addClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-left-choose").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-left")||(t.addClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-right-choose").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-right")||(t.addClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-choose").click(function(){Modernizr.touch||($(this).hasClass("wrapper-zone-left-choose")?window.location.href="/#acheter":$(this).hasClass("wrapper-zone-right-choose")&&(window.location.href="/#vendre"))}),$(".title-action-choose").click(function(){return viewport().width<=tabletBreakpoint&&viewport().width>mobileBreakpoint?($(this).parents(".wrapper-zone-choose").hasClass("open-tablet")||($(".wrapper-zone-choose.open-tablet").removeClass("open-tablet"),$(this).parents(".wrapper-zone-choose").addClass("open-tablet"),$(this).hasClass("left-arrow")?$(this).parents(".wrapper-choose").removeClass("right-tablet").addClass("left-tablet"):$(this).hasClass("right-arrow")&&$(this).parents(".wrapper-choose").removeClass("left-tablet").addClass("right-tablet")),!1):void 0}),$("body").hasClass("has-sidebar")&&($(".navbar li.has-content a").click(function(){if($("body").hasClass("toggle-all")&&$(".wrapper-toggle-all .btn-toggle").hasClass("open")){var e=$(this),t=this.hash;$(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200,function(){viewport().width>tabletBreakpoint?($(".navbar li.has-content.active").removeClass("active"),e.parents("li").addClass("active"),$target=$(t),$("html, body").animate({scrollTop:$target.offset().top-85},500)):viewport().width>mobileBreakpoint?($(".navbar li.has-content.active").removeClass("active"),e.parents("li").addClass("active"),$target=$(t),$("html, body").animate({scrollTop:$target.offset().top-20},500)):($(".navbar li.has-content.active").removeClass("active"),$target=$(t),$("html, body").animate({scrollTop:$target.offset().top-10},500))}),$(".wrapper-toggle-all .btn-toggle.open").removeClass("open")}else if(viewport().width>tabletBreakpoint){$(".navbar li.has-content.active").removeClass("active"),$(this).parents("li").addClass("active");var t=this.hash;$target=$(t),$("html, body").animate({scrollTop:$target.offset().top-85},500)}else if(viewport().width>mobileBreakpoint){$(".navbar li.has-content.active").removeClass("active"),$(this).parents("li").addClass("active");var t=this.hash;$target=$(t),$("html, body").animate({scrollTop:$target.offset().top-20},500)}else{$(".navbar li.has-content.active").removeClass("active");var t=this.hash;$target=$(t),$("html, body").animate({scrollTop:$target.offset().top-10},500)}return!1}),window.location.hash)){window.scrollTo(0,0),setTimeout(function(){window.scrollTo(0,0)},1);var l=window.location.hash;if(viewport().width>tabletBreakpoint){$(".navbar li.has-content.active").removeClass("active");var r=l;$target=$(r),setTimeout(function(){TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-85},ease:Power2.easeOut})},100)}else if(viewport().width>mobileBreakpoint){$(".navbar li.has-content.active").removeClass("active");var r=l;$target=$(r),setTimeout(function(){TweenMax.set($("html, body"),{scrollTo:{y:$target.offset().top-20},ease:Power2.easeOut})},100)}else{var r=l;$target=$(r),setTimeout(function(){TweenMax.set($("html, body"),{scrollTo:{y:$target.offset().top-10},ease:Power2.easeOut})},100)}}if($(".select-type-car > li a").click(function(){return $(".select-type-car  >li.is-selected").removeClass("is-selected"),$(this).parents("li").first().toggleClass("is-selected"),!1}),$(".select-option-car > li a").click(function(){return $(this).parents("li").toggleClass("is-selected"),!1}),$(".switch").click(function(){return $(this).toggleClass("off").toggleClass("on"),!1}),$("#btn-more-criteres").click(function(){return $(this).toggleClass("open"),$("#content-more-criteres").slideToggle(200),!1}),$(".toggle-filter").click(function(){return $(window).width()<=767&&($(this).hasClass("open")||($(".toggle-filter.open").next(".content-toggle-filter").slideToggle(200),$(".toggle-filter.open").removeClass("open")),$(this).toggleClass("open"),$(this).next(".content-toggle-filter").slideToggle(200)),!1}),$("#button-filter").click(function(){return $(this).hasClass("open")||($(this).addClass("open"),$(this).next(".lines-filters").slideToggle(200)),!1}),$(".zone-right-btn").click(function(){return!$(this).hasClass("disabled")&&$(this).parents(".btn-filter").hasClass("open")?console.log("on filtre !"):$(this).parents(".btn-filter").hasClass("open")||($(this).parents(".btn-filter").addClass("open"),$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200)),!1}),$(".zone-left-btn").click(function(){if($(this).parents(".btn-filter").hasClass("open")){var e=$(this).parents(".btn-filter");$(".zone-right-btn",e).hasClass("disabled")||console.log("on ne filtre pas ! On vide les modifs"),$(this).parents(".btn-filter").removeClass("open"),$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200)}else $(this).parents(".btn-filter").addClass("open"),$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200);return!1}),$(".icon-mosaique").click(function(){return $(".list-cars").hasClass("is-list")&&($(".list-cars").removeClass("is-list"),$(".icon-liste").removeClass("is-selected"),$(".icon-mosaique").addClass("is-selected")),!1}),$(".icon-liste").click(function(){return $(".list-cars").hasClass("is-list")||($(".list-cars").addClass("is-list"),$(".icon-mosaique").removeClass("is-selected"),$(".icon-liste").addClass("is-selected")),!1}),$(".list-cars .wrapper-car").hover(function(){if($(".list-cars").hasClass("is-list")&&$(".bandeau-image-car ul",this).length){var e=$(".bandeau-image-car ul",this),t=$(".bandeau-image-car ul li",this).length;t>1&&animateNextCarSlide(e,1)}},function(){TweenMax.killTweensOf($(".bandeau-image-car ul >li",this));var e=$(".bandeau-image-car ul",this),t=$(">li",e).eq(0);$(".bandeau-image-car ul li",this).first().hasClass("is-active")||TweenMax.set(t,{x:"100%"}),TweenMax.to(t,.2,{x:"0%",ease:Cubic.easeInOut,onComplete:completeEndCarSlide,onCompleteParams:[e]})}),$(".select-placeholder").click(function(){return $(this).parents(".select-custom").hasClass("is-active")?($(".select-custom.is-active").removeClass("is-active"),$("body").removeClass("select-custom-open")):($(".select-custom.is-active").removeClass("is-active"),$(this).parents(".select-custom").addClass("is-active"),$("body").removeClass("select-custom-open").addClass("select-custom-open")),!1}),$(".select-options ul li").click(function(){var e=$(this).parents(".select-options");$("li.is-selected",e).removeClass("is-selected"),$(this).addClass("is-selected");var t=$(".select-custom.is-active");return t.removeClass("is-active"),$("body").removeClass("select-custom-open"),majPlaceholder(t),!1}),$(document).mouseup(function(e){var t=$("a.select-placeholder"),s=$(".select-options ul li");if(!t.is(e.target)&&0===t.has(e.target).length&&!s.is(e.target)&&0===s.has(e.target).length&&$(".select-custom").hasClass("is-active")){var a=$(".select-custom.is-active");a.removeClass("is-active"),$("body").removeClass("select-custom-open"),majPlaceholder(a)}}),$("body").hasClass("resultat-recherche")&&($("#filter-prix").slider({range:!0,min:1e3,max:5e4,step:1e3,values:[1e3,5e4],animate:"slow",create:function(){$("#min").appendTo($("#filter-prix .ui-slider-handle").get(0)),$("#max").appendTo($("#filter-prix .ui-slider-handle").get(1))},slide:function(e,t){$(t.handle).find("span").html(t.value+" €")}}),$("#min").html($("#filter-prix").slider("values",0)+" €").position({my:"center top",at:"center bottom",of:$("#filter-prix .ui-slider-handle").eq(0),offset:"0, 10"}),$("#max").html($("#filter-prix").slider("values",1)+" €").position({my:"center top",at:"center bottom",of:$("#filter-prix .ui-slider-handle").eq(1),offset:"0, 10"}),$(window).width()<=767&&(TweenMax.set($(".list-cars"),{className:"+=is-list"}),TweenMax.set($("#change-liste-mosaique"),{display:"none"}))),$("#btn-remove-criteria").click(function(){return $(".select-type-car li.is-selected").removeClass("is-selected"),$(".select-option-car li.is-selected").removeClass("is-selected"),$("#content-more-criteres .switch.on").removeClass("on").addClass("off"),$(".select-options ul li").click(function(){var e=$(this).parents(".select-options");$("li.is-selected",e).removeClass("is-selected"),$(this).addClass("is-selected");var t=$(".select-custom.is-active");return t.removeClass("is-active"),majPlaceholder(t),!1}),$(".lines-filters .select-custom").each(function(){$(".select-options li.is-selected",this).removeClass("is-selected"),$(".select-options li",this).first().addClass("is-selected"),majPlaceholder($(this))}),!1}),descRecherche(),$("body").hasClass("has-map")){var c={scrollwheel:!1,navigationControl:!1,mapTypeControl:!1,center:{lat:45.973759,lng:-4.661462},zoom:6,styles:[{featureType:"all",elementType:"geometry.fill",stylers:[{color:"#dfdfdf"}]},{featureType:"all",elementType:"labels.text.fill",stylers:[{color:"#175461"}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{color:"#7bc6e9"},{weight:"0.97"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#e4e4e4"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#606060"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"#606060"},{weight:"0.80"}]},{featureType:"administrative.country",elementType:"labels.text.fill",stylers:[{color:"#606060"}]},{featureType:"administrative.country",elementType:"labels.text.stroke",stylers:[{color:"#606060"}]},{featureType:"administrative.province",elementType:"labels.text.fill",stylers:[{display:"none",color:"#606060"}]},{featureType:"administrative.province",elementType:"labels.text.stroke",stylers:[{color:"#606060"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#606060"}]},{featureType:"administrative.locality",elementType:"labels.text.stroke",stylers:[{color:"#7bc6e9"},{weight:"0.88"}]},{featureType:"administrative.locality",elementType:"labels.icon",stylers:[{color:"#e4e4e4"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#dfdfdf"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"all",stylers:[{visibility:"on"},{color:"#dfdfdf"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#e4e4e4"},{weight:"0.5"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e4e4e4"},{gamma:"1.00"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.fill",stylers:[{color:"#e4e4e4"},{visibility:"off"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#e4e4e4"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{color:"#e4e4e4"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#e4e4e4"}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{color:"#e4e4e4"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{saturation:"48"},{lightness:"-1"},{gamma:"6.27"},{color:"#a1cbde"}]}]};map=new google.maps.Map(document.getElementById("map"),c);var d=[["Paris",48.864146,2.337942,"centre"],["Créteil",48.795395,2.45394,"facilistore"]],p=new google.maps.InfoWindow,h,n,m,g="img/centre-essai-livraison.png",u=new google.maps.Size(22,27);window.devicePixelRatio>1.5&&(g="img/centre-essai-livraison@2x.png",u=new google.maps.Size(44,54)),window.devicePixelRatio>2&&(g="img/centre-essai-livraison@3x.png",u=new google.maps.Size(66,81));var f={url:g,size:u,scaledSize:new google.maps.Size(22,26)},v="img/facilistore.png",w=new google.maps.Size(22,26);window.devicePixelRatio>1.5&&(v="img/facilistore@2x.png",w=new google.maps.Size(44,52)),window.devicePixelRatio>2&&(v="img/facilistore@3x.png",w=new google.maps.Size(66,78));var b={url:v,size:w,scaledSize:new google.maps.Size(22,26)},C="img/agence-reprise.png",T=new google.maps.Size(22,27);window.devicePixelRatio>1.5&&(C="img/agence-reprise@2x.png",
T=new google.maps.Size(44,54)),window.devicePixelRatio>2&&(C="img/agence-reprise@3x.png",T=new google.maps.Size(66,81));var x={url:C,size:T,scaledSize:new google.maps.Size(22,27)};for(n=0;n<d.length;n++)"centre"==d[n][3]?h=new google.maps.Marker({position:new google.maps.LatLng(d[n][1],d[n][2]),map:map,icon:f}):"facilistore"==d[n][3]?h=new google.maps.Marker({position:new google.maps.LatLng(d[n][1],d[n][2]),map:map,icon:b}):"agence-reprise"==d[n][3]&&(h=new google.maps.Marker({position:new google.maps.LatLng(d[n][1],d[n][2]),map:map,icon:x})),google.maps.event.addListener(h,"click",function(e,t){return function(){p.setContent(d[t][0]),p.open(map,e)}}(h,n))}$(".btn-change-car").hover(function(){TweenMax.to($(".bg-btn-change-car"),.2,{display:"block",opacity:1})},function(){TweenMax.to($(".bg-btn-change-car"),.2,{display:"none",opacity:0})}),$("#btn-financement").click(function(){if($(window).width()>979){var e=$(".wrapper-tabs"),t=$("ul.tabs-navigation"),s=$("ul.tabs-content"),a=$("ul.tabs-navigation li a[data-content='financement']");if(!a.hasClass("is-selected")){var i=a.data("content"),o=s.find('li[data-content="'+i+'"]'),n=o.innerHeight();t.find("a.is-selected").removeClass("is-selected"),a.addClass("is-selected"),o.addClass("is-selected").siblings("li").removeClass("is-selected"),s.animate({height:n},200)}TweenMax.to(window,.5,{scrollTo:{y:$(".wrapper-tabs").offset().top-160+"px"}})}else{var l=$("ul.tabs-content li[data-content='financement'] a");l.hasClass("open")||($(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200),$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open"),l.addClass("open"),l.next(".content-toggle-once").slideToggle(200)),TweenMax.to(window,.5,{scrollTo:{y:l.offset().top-80+"px"}})}return!1}),$(".wrapper-caracteristiques .caracteristiques li a").click(function(){if($(window).width()>979){var e=$(".wrapper-tabs"),t=$("ul.tabs-navigation"),s=$("ul.tabs-content"),a=$("ul.tabs-navigation li a[data-content='qualite']");if(!a.hasClass("is-selected")){var i=a.data("content"),o=s.find('li[data-content="'+i+'"]'),n=o.innerHeight();t.find("a.is-selected").removeClass("is-selected"),a.addClass("is-selected"),o.addClass("is-selected").siblings("li").removeClass("is-selected"),s.animate({height:n},200)}$(this).parents("li").hasClass("historique")?TweenMax.to(window,.5,{scrollTo:{y:$(".historique-tab").offset().top-160+"px"}}):$(this).parents("li").hasClass("inspection")?TweenMax.to(window,.5,{scrollTo:{y:$(".inspection-tab").offset().top-160+"px"}}):$(this).parents("li").hasClass("renovation")?TweenMax.to(window,.5,{scrollTo:{y:$(".renovation-tab").offset().top-160+"px"}}):$(this).parents("li").hasClass("garantie")?TweenMax.to(window,.5,{scrollTo:{y:$(".garantie-tab").offset().top-160+"px"}}):$(this).parents("li").hasClass("satisfait-rembourse")&&TweenMax.to(window,.5,{scrollTo:{y:$(".satisfait-rembourse-tab").offset().top-160+"px"}})}else{var l=$("ul.tabs-content li[data-content='qualite'] a");l.hasClass("open")||($(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200),$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open"),l.addClass("open"),l.next(".content-toggle-once").slideToggle(200)),$(this).parents("li").hasClass("historique")?TweenMax.to(window,.5,{scrollTo:{y:$(".historique-tab").offset().top-80+"px"}}):$(this).parents("li").hasClass("inspection")?TweenMax.to(window,.5,{scrollTo:{y:$(".inspection-tab").offset().top-80+"px"}}):$(this).parents("li").hasClass("renovation")?TweenMax.to(window,.5,{scrollTo:{y:$(".renovation-tab").offset().top-80+"px"}}):$(this).parents("li").hasClass("garantie")?TweenMax.to(window,.5,{scrollTo:{y:$(".garantie-tab").offset().top-80+"px"}}):$(this).parents("li").hasClass("satisfait-rembourse")&&TweenMax.to(window,.5,{scrollTo:{y:$(".satisfait-rembourse-tab").offset().top-80+"px"}})}return!1}),$(".credit-financement").click(function(){if(!$(this).hasClass("is-selected")){var e=$(this).parents(".credits-financement");TweenMax.set($(".credit-financement.is-selected",e),{className:"-=is-selected"}),TweenMax.set($(this),{className:"+=is-selected"})}}),$(".credit-financement .btn-accord-principe").click(function(){if(!$(this).parents(".credit-financement").hasClass("is-selected")){var e=$(this).parents(".credits-financement");return TweenMax.set($(".credit-financement.is-selected",e),{className:"-=is-selected"}),TweenMax.set($(this).parents(".credit-financement"),{className:"+=is-selected"}),!1}})});var h=$(window).height(),w=$(window).width();$(window).resize(function(){setTabsHeight(),$(".container-toggle-one").each(function(){$(".content-toggle-one",this).attr("style",""),$(".btn-toggle-one.open",this).removeClass("open"),$(".btn-toggle-one",this).first().addClass("open"),$(".content-toggle-one.open",this).removeClass("open"),$(".content-toggle-one",this).first().addClass("open")}),$("#menu-bottom-header a.open").removeClass("open"),$("#menu-bottom-header .list-inline").attr("style",""),$("body").hasClass("has-choose")&&$(".wrapper-choose").removeClass("survol-left").removeClass("survol-out-left").removeClass("survol-right").removeClass("survol-out-right");var e=$(window).height(),t=$(window).width();t!=w&&($("body").hasClass("resultat-recherche")&&(TweenMax.set($(".toggle-filter"),{className:"-=open"}),TweenMax.set($(".content-toggle-filter"),{clearProps:"all"}),TweenMax.set($(".lines-filters"),{clearProps:"all"})),$("body").hasClass("resultat-recherche")&&($(window).width()<=767?(TweenMax.set($(".list-cars"),{className:"+=is-list"}),TweenMax.set($("#change-liste-mosaique"),{display:"none"})):(TweenMax.set($(".list-cars"),{className:"-=is-list"}),TweenMax.set($("#change-liste-mosaique"),{clearProps:"all"}),TweenMax.set($("#change-liste-mosaique .icon-mosaique"),{className:"+=is-selected"}),TweenMax.set($("#change-liste-mosaique .icon-liste"),{className:"-=is-selected"}))),$(".list-cars-small").length&&($(window).width()<=767?TweenMax.set($(".list-cars-small"),{className:"+=is-list"}):TweenMax.set($(".list-cars-small"),{className:"-=is-list"})),$(".tabs-content").each(function(){$(".content-toggle-once",this).attr("style",""),$(".btn-toggle-once.open",this).removeClass("open"),$(".content-toggle-once.open",this).removeClass("open")})),h=e,w=t,descRecherche(),doOnOrientationChange()});