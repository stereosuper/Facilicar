function whichTransitionEvent(){var e,t=document.createElement("fakeelement"),a={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in a)if(void 0!==t.style[e])return a[e]}function scrollPage(){if(myScroll=$(document).scrollTop(),myScroll>40?TweenMax.set($("body"),{className:"+=header-on"}):TweenMax.set($("body"),{className:"-=header-on"}),$("body").hasClass("resultat-recherche")&&(myScroll>66?TweenMax.set($(".cars-filters"),{className:"+=fixed"}):TweenMax.set($(".cars-filters"),{className:"-=fixed"})),$("body").hasClass("has-sidebar"))if(viewport().width>tabletBreakpoint?myScroll>=$(".navbar").offset().top-$("#header").outerHeight()&&myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"fixed",top:$("#header").outerHeight()+"px"}):myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"absolute",top:$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+$("#header").outerHeight()+"px"}):TweenMax.set($(".navbar ul"),{position:"absolute",top:"0"}):viewport().width>mobileBreakpoint?myScroll>=$(".navbar").offset().top&&myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"fixed",top:"0px"}):myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()?TweenMax.set($(".navbar ul"),{position:"absolute",top:$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+"px"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"}):TweenMax.set($(".navbar ul"),{position:"relative",top:"inherit"}),viewport().width>tabletBreakpoint){var e=$(document).scrollTop();$(".navbar li.has-content a").each(function(){var t=$(this),a=$(t.attr("href"));a.position().top<=e+20+$("#header").outerHeight()&&a.position().top+a.height()>e+20+$("#header").outerHeight()?($(".navbar li.has-content").removeClass("active"),t.parents("li").addClass("active")):t.parents("li").removeClass("active")})}else if(viewport().width>mobileBreakpoint){var e=$(document).scrollTop();$(".navbar li.has-content a").each(function(){var t=$(this),a=$(t.attr("href"));a.position().top<=e+20&&a.position().top+a.height()>e+20?($(".navbar li.has-content").removeClass("active"),t.parents("li").addClass("active")):t.parents("li").removeClass("active")})}else $(".navbar li.has-content.active").removeClass("active");requestAnimFrame(scrollPage)}function viewport(){var e=window,t="inner";return"innerWidth"in window||(t="client",e=document.documentElement||document.body),{width:e[t+"Width"],height:e[t+"Height"]}}function animatePrevCitation(e,t){var a=$("ul > li.active",t),s=$("ul > li",t).eq(e-1);TweenMax.set(s,{x:"-100%"}),TweenMax.to(a,.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to(s,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[a,s]})}function animateNextCitation(e,t){var a=$("ul > li.active",t),s=$("ul > li",t).eq(e-1);TweenMax.set(s,{x:"100%"}),TweenMax.to(a,.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to(s,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[a,s]})}function completeClickService(e,t){TweenMax.set(e,{className:"-=active"}),TweenMax.set(t,{className:"+=active"})}function changeCar(){if($(".wrapper-choose").hasClass("survol-left")||$(".wrapper-choose").hasClass("survol-out-left")||$(".wrapper-choose").hasClass("survol-right")||$(".wrapper-choose").hasClass("survol-out-right"))setTimeout(changeCar,tpsChangeCar);else{var e=$(".car-choose").length,t=$(".car-choose.is-active"),a=t.index();if(e-1>a)var s=t.next(".car-choose");else var s=$(".car-choose").first();var o=new TimelineMax({onComplete:changeCarComplete});o.to(t,.3,{opacity:"0",ease:Cubic.easeInOut}),o.to(s,.3,{opacity:"1",ease:Cubic.easeInOut},0),o.set(t,{className:"-=is-active"}),o.set(s,{className:"+=is-active"})}}function changeCarComplete(){setTimeout(changeCar,tpsChangeCar)}function majPlaceholder(e){e.hasClass("is-active")?$(".select-placeholder",e).html("<span class='is-disabled'>"+$("select option",e).eq(0).html()+"</span>"):$(".select-options ul li",e).hasClass("is-selected")&&$(".select-placeholder",e).html($(".select-options ul li.is-selected",e).html())}function descRecherche(){if($("body").hasClass("resultat-recherche")){var e=$(".description-recherche").outerHeight();TweenMax.set($("#content-search-results .container"),{paddingBottom:e+"px"}),TweenMax.set($(".description-recherche"),{position:"absolute",bottom:"0px",left:"0px"})}}function animateNextCarSlide(e,t){var a=$(">li.is-active",e),s=$(">li",e).eq(t);TweenMax.set(s,{x:"100%"}),TweenMax.to(a,1,{x:"-100%",ease:Cubic.easeInOut,delay:.5}),TweenMax.to(s,1,{x:"0%",ease:Cubic.easeInOut,delay:.5,onComplete:completeAnimateNextCarSlide,onCompleteParams:[e,t]})}function completeAnimateNextCarSlide(e,t){var a=$(">li",e).length,s=$(">li.is-active",e),o=$(">li",e).eq(t);s.removeClass("is-active"),o.addClass("is-active"),a>t+1?t++:t=0,animateNextCarSlide(e,t)}function completeEndCarSlide(e){var t=$(">li.is-active",e),a=$(">li",e).eq(0);t.removeClass("is-active"),a.addClass("is-active"),TweenMax.set($(">li",e),{x:"100%"}),TweenMax.set($(">li.is-active",e),{x:"0%"})}var nbCurrentSlideTemoignage=1,tpsChangeCar=8e3,mobileBreakpoint=767,tabletBreakpoint=979;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(function(){scrollPage();var e=whichTransitionEvent();if("not"==!Cookies.get("acceptCookie"),$("#btn-close-cookies").click(function(){return $(".cookies").removeClass("show"),!1}),$("body").hasClass("has-choose"))for(var t=1,a=1;a<$(".car-choose").length;a++)img=new Image,img.onload=function(){$("[data-src='"+this.src+"']").css({"background-image":"url("+this.src+")"}),t++,t===$(".car-choose").length&&setTimeout(changeCar,tpsChangeCar)},img.src=$(".car-choose").eq(a).data("src");if($(".imgLiquidFill").imgLiquid(),$("#footer-bottom .list-inline > li").each(function(e){var t=$("ul",this).html();$(".zone-same-footer ul").eq(e).append(t)}),$("a.btn-menu-responsive").click(function(){return $("body").toggleClass("menu-mobile-open"),!1}),$("a.btn-close-popup").click(function(){return $(this).parents(".wrapper-popup").removeClass("open"),!1}),$(".notif").find("button").on("click",function(){$(this).parents(".notif").fadeOut(300,function(){$("#main").removeClass("has-notif")})}),$(".btn-toggle").click(function(){return $("body").hasClass("toggle-all")?$(this).hasClass("open")?($(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200),$(".wrapper-toggle-all .btn-toggle.open").removeClass("open")):($(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200),$(".wrapper-toggle-all .btn-toggle.open").removeClass("open"),$(this).addClass("open"),$(this).next(".content-toggle").slideToggle(200)):($(this).toggleClass("open"),$(this).next(".content-toggle").slideToggle(200)),!1}),$(".btn-toggle-one").click(function(){if(!$(this).hasClass("open")){var e=$(".btn-toggle-one").index(this),t=$(this).parents(".container-toggle-one");$(".btn-toggle-one",t).toggleClass("open"),$(".content-toggle-one.open").slideToggle(100,function(){$(this).toggleClass("open"),$(".content-toggle-one").eq(e).slideToggle(200,function(){$(this).toggleClass("open")})})}return!1}),$(".btn-slider-citation").click(function(){var e=$(this).parents(".wrapper-slider-citation");return TweenMax.isTweening($("ul > li",e))||($(this).hasClass("btn-left")?(1==nbCurrentSlideTemoignage?nbCurrentSlideTemoignage=$("ul > li",e).length:nbCurrentSlideTemoignage--,animatePrevCitation(nbCurrentSlideTemoignage,e)):$(this).hasClass("btn-right")&&(nbCurrentSlideTemoignage==$("ul > li",e).length?nbCurrentSlideTemoignage=1:nbCurrentSlideTemoignage++,animateNextCitation(nbCurrentSlideTemoignage,e))),!1}),$(".zone-left-survol-out").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-out-left")||(t.addClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".zone-right-survol-out").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-out-right")||(t.addClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-out-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-left-choose").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");$(this).parents(".wrapper-choose").hasClass("survol-left")||(t.addClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-left"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-right-choose").hover(function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.hasClass("survol-right")||(t.addClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")}))}},function(){if(viewport().width>tabletBreakpoint&&!$("body").hasClass("page-404")){var t=$(this).parents(".wrapper-choose");t.removeClass("survol-right"),t.addClass("animated"),$(".car-choose").one(e,function(e){t.removeClass("animated")})}}),$(".wrapper-zone-choose").click(function(){viewport().width>tabletBreakpoint&&($(this).hasClass("wrapper-zone-left-choose")?window.location.href="/#acheter":$(this).hasClass("wrapper-zone-right-choose")&&(window.location.href="/#vendre"))}),$(".title-action-choose").click(function(){return viewport().width<=tabletBreakpoint&&viewport().width>mobileBreakpoint?($(this).parents(".wrapper-zone-choose").hasClass("open-tablet")||($(".wrapper-zone-choose.open-tablet").removeClass("open-tablet"),$(this).parents(".wrapper-zone-choose").addClass("open-tablet"),$(this).hasClass("left-arrow")?$(this).parents(".wrapper-choose").removeClass("right-tablet").addClass("left-tablet"):$(this).hasClass("right-arrow")&&$(this).parents(".wrapper-choose").removeClass("left-tablet").addClass("right-tablet")),!1):void 0}),$("body").hasClass("has-sidebar")&&($(".navbar li.has-content a").click(function(){if($("body").hasClass("toggle-all")&&$(".wrapper-toggle-all .btn-toggle").hasClass("open")){var e=$(this),t=this.hash;$(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200,function(){viewport().width>tabletBreakpoint?($(".navbar li.has-content.active").removeClass("active"),e.parents("li").addClass("active"),$target=$(t),TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-85},ease:Power2.easeOut})):viewport().width>mobileBreakpoint?($(".navbar li.has-content.active").removeClass("active"),e.parents("li").addClass("active"),$target=$(t),TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-20},ease:Power2.easeOut})):($(".navbar li.has-content.active").removeClass("active"),$target=$(t),TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-10},ease:Power2.easeOut}))}),$(".wrapper-toggle-all .btn-toggle.open").removeClass("open")}else if(viewport().width>tabletBreakpoint){$(".navbar li.has-content.active").removeClass("active"),$(this).parents("li").addClass("active");var t=this.hash;$target=$(t),TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-85},ease:Power2.easeOut})}else if(viewport().width>mobileBreakpoint){$(".navbar li.has-content.active").removeClass("active"),$(this).parents("li").addClass("active");var t=this.hash;$target=$(t),TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-20},ease:Power2.easeOut})}else{$(".navbar li.has-content.active").removeClass("active");var t=this.hash;$target=$(t),TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-10},ease:Power2.easeOut})}return!1}),window.location.hash)){window.scrollTo(0,0),setTimeout(function(){window.scrollTo(0,0)},1);var s=window.location.hash;if(viewport().width>tabletBreakpoint){$(".navbar li.has-content.active").removeClass("active");var o=s;$target=$(o),setTimeout(function(){TweenMax.to($("html, body"),.5,{scrollTo:{y:$target.offset().top-85},ease:Power2.easeOut})},100)}else if(viewport().width>mobileBreakpoint){$(".navbar li.has-content.active").removeClass("active");var o=s;$target=$(o),setTimeout(function(){TweenMax.set($("html, body"),{scrollTo:{y:$target.offset().top-20},ease:Power2.easeOut})},100)}else{var o=s;$target=$(o),setTimeout(function(){TweenMax.set($("html, body"),{scrollTo:{y:$target.offset().top-10},ease:Power2.easeOut})},100)}}if($(".select-type-car > li a").click(function(){return $(".select-type-car  >li.is-selected").removeClass("is-selected"),$(this).parents("li").first().toggleClass("is-selected"),!1}),$(".select-option-car > li a").click(function(){return $(this).parents("li").toggleClass("is-selected"),!1}),$(".switch").click(function(){return $(this).toggleClass("off").toggleClass("on"),!1}),$("#btn-more-criteres").click(function(){return $(this).toggleClass("open"),$("#content-more-criteres").slideToggle(200),!1}),$(".toggle-filter").click(function(){return $(window).width()<=767&&($(this).hasClass("open")||($(".toggle-filter.open").next(".content-toggle-filter").slideToggle(200),$(".toggle-filter.open").removeClass("open")),$(this).toggleClass("open"),$(this).next(".content-toggle-filter").slideToggle(200)),!1}),$("#button-filter").click(function(){return $(this).hasClass("open")||($(this).addClass("open"),$(this).next(".lines-filters").slideToggle(200)),!1}),$(".zone-right-btn").click(function(){return!$(this).hasClass("disabled")&&$(this).parents(".btn-filter").hasClass("open")?console.log("on filtre !"):$(this).parents(".btn-filter").hasClass("open")||($(this).parents(".btn-filter").addClass("open"),$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200)),!1}),$(".zone-left-btn").click(function(){if($(this).parents(".btn-filter").hasClass("open")){var e=$(this).parents(".btn-filter");$(".zone-right-btn",e).hasClass("disabled")||console.log("on ne filtre pas ! On vide les modifs"),$(this).parents(".btn-filter").removeClass("open"),$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200)}else $(this).parents(".btn-filter").addClass("open"),$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200);return!1}),$(".icon-mosaique").click(function(){return $(".list-cars").hasClass("is-list")&&($(".list-cars").removeClass("is-list"),$(".icon-liste").removeClass("is-selected"),$(".icon-mosaique").addClass("is-selected")),!1}),$(".icon-liste").click(function(){return $(".list-cars").hasClass("is-list")||($(".list-cars").addClass("is-list"),$(".icon-mosaique").removeClass("is-selected"),$(".icon-liste").addClass("is-selected")),!1}),$(".list-cars .wrapper-car").hover(function(){if($(".list-cars").hasClass("is-list")&&$(".bandeau-image-car ul",this).length){var e=$(".bandeau-image-car ul",this),t=$(".bandeau-image-car ul li",this).length;t>1&&animateNextCarSlide(e,1)}},function(){TweenMax.killTweensOf($(".bandeau-image-car ul >li",this));var e=$(".bandeau-image-car ul",this),t=$(">li",e).eq(0);$(".bandeau-image-car ul li",this).first().hasClass("is-active")||TweenMax.set(t,{x:"100%"}),TweenMax.to(t,.2,{x:"0%",ease:Cubic.easeInOut,onComplete:completeEndCarSlide,onCompleteParams:[e]})}),$(".select-placeholder").click(function(){return $(this).parents(".select-custom").hasClass("is-active")?($(".select-custom.is-active").removeClass("is-active"),$("body").removeClass("select-custom-open")):($(".select-custom.is-active").removeClass("is-active"),$(this).parents(".select-custom").addClass("is-active"),$("body").removeClass("select-custom-open").addClass("select-custom-open")),!1}),$(".select-options ul li").click(function(){var e=$(this).parents(".select-options");$("li.is-selected",e).removeClass("is-selected"),$(this).addClass("is-selected");var t=$(".select-custom.is-active");return t.removeClass("is-active"),$("body").removeClass("select-custom-open"),majPlaceholder(t),!1}),$(document).mouseup(function(e){var t=$("a.select-placeholder"),a=$(".select-options ul li");if(!t.is(e.target)&&0===t.has(e.target).length&&!a.is(e.target)&&0===a.has(e.target).length&&$(".select-custom").hasClass("is-active")){var s=$(".select-custom.is-active");s.removeClass("is-active"),$("body").removeClass("select-custom-open"),majPlaceholder(s)}}),$("body").hasClass("resultat-recherche")&&($("#filter-prix").slider({range:!0,min:1e3,max:5e4,step:1e3,values:[1e3,5e4],animate:"slow",create:function(){$("#min").appendTo($("#filter-prix .ui-slider-handle").get(0)),$("#max").appendTo($("#filter-prix .ui-slider-handle").get(1))},slide:function(e,t){$(t.handle).find("span").html(t.value+" €")}}),$("#min").html($("#filter-prix").slider("values",0)+" €").position({my:"center top",at:"center bottom",of:$("#filter-prix .ui-slider-handle").eq(0),offset:"0, 10"}),$("#max").html($("#filter-prix").slider("values",1)+" €").position({my:"center top",at:"center bottom",of:$("#filter-prix .ui-slider-handle").eq(1),offset:"0, 10"})),$("#btn-remove-criteria").click(function(){return $(".select-type-car li.is-selected").removeClass("is-selected"),$(".select-option-car li.is-selected").removeClass("is-selected"),$("#content-more-criteres .switch.on").removeClass("on").addClass("off"),$(".select-options ul li").click(function(){var e=$(this).parents(".select-options");$("li.is-selected",e).removeClass("is-selected"),$(this).addClass("is-selected");var t=$(".select-custom.is-active");return t.removeClass("is-active"),majPlaceholder(t),!1}),$(".lines-filters .select-custom").each(function(){$(".select-options li.is-selected",this).removeClass("is-selected"),$(".select-options li",this).first().addClass("is-selected"),majPlaceholder($(this))}),!1}),descRecherche(),$("body").hasClass("has-map")){var i={scrollwheel:!1,navigationControl:!1,mapTypeControl:!1,center:{lat:45.973759,lng:-4.661462},zoom:6,styles:[{featureType:"all",elementType:"geometry.fill",stylers:[{color:"#92d0df"}]},{featureType:"all",elementType:"labels.text.fill",stylers:[{color:"#175461"}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{color:"#7bc6e9"},{weight:"0.97"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#62a1b2"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#175461"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"#7bc6e9"},{weight:"0.80"}]},{featureType:"administrative.country",elementType:"labels.text.fill",stylers:[{color:"#175667"}]},{featureType:"administrative.country",elementType:"labels.text.stroke",stylers:[{color:"#96d4e4"}]},{featureType:"administrative.province",elementType:"labels.text.fill",stylers:[{color:"#175667"}]},{featureType:"administrative.province",elementType:"labels.text.stroke",stylers:[{color:"#96d4e4"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#175461"}]},{featureType:"administrative.locality",elementType:"labels.text.stroke",stylers:[{color:"#7bc6e9"},{weight:"0.88"}]},{featureType:"administrative.locality",elementType:"labels.icon",stylers:[{color:"#59b1e9"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#92d0df"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"all",stylers:[{visibility:"on"},{color:"#79c6b5"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#989f52"},{weight:"0.5"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#8d9b50"},{gamma:"1.00"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.fill",stylers:[{color:"#ff0000"},{visibility:"off"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#99d8e9"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{color:"#7ebac5"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#99d8e9"}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{color:"#7bbabd"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{saturation:"48"},{lightness:"-1"},{gamma:"6.27"},{color:"#70c3e9"}]}]};map=new google.maps.Map(document.getElementById("map"),i);var l=[["Paris",48.864146,2.337942,"centre"],["Créteil",48.795395,2.45394,"facilistore"]],n=new google.maps.InfoWindow,r,a,c,p="img/centre-essai-livraison.png",h=new google.maps.Size(22,27);window.devicePixelRatio>1.5&&(p="img/centre-essai-livraison@2x.png",h=new google.maps.Size(44,54)),window.devicePixelRatio>2&&(p="img/centre-essai-livraison@3x.png",h=new google.maps.Size(66,81));var d={url:p,size:h,scaledSize:new google.maps.Size(22,26)},g="img/facilistore.png",m=new google.maps.Size(22,26);window.devicePixelRatio>1.5&&(g="img/facilistore@2x.png",m=new google.maps.Size(44,52)),window.devicePixelRatio>2&&(g="img/facilistore@3x.png",m=new google.maps.Size(66,78));var u={url:g,size:m,scaledSize:new google.maps.Size(22,26)},v="img/agence-reprise.png",f=new google.maps.Size(22,27);window.devicePixelRatio>1.5&&(v="img/agence-reprise@2x.png",f=new google.maps.Size(44,54)),window.devicePixelRatio>2&&(v="img/agence-reprise@3x.png",f=new google.maps.Size(66,81));var w={url:v,size:f,scaledSize:new google.maps.Size(22,27)};for(a=0;a<l.length;a++)"centre"==l[a][3]?r=new google.maps.Marker({position:new google.maps.LatLng(l[a][1],l[a][2]),map:map,icon:d}):"facilistore"==l[a][3]?r=new google.maps.Marker({position:new google.maps.LatLng(l[a][1],l[a][2]),map:map,icon:u}):"agence-reprise"==l[a][3]&&(r=new google.maps.Marker({position:new google.maps.LatLng(l[a][1],l[a][2]),map:map,icon:w})),google.maps.event.addListener(r,"click",function(e,t){return function(){n.setContent(l[t][0]),n.open(map,e)}}(r,a))}});var h=$(window).height(),w=$(window).width();$(window).resize(function(){$(".container-toggle-one").each(function(){$(".content-toggle-one",this).attr("style",""),$(".btn-toggle-one.open",this).removeClass("open"),$(".btn-toggle-one",this).first().addClass("open"),$(".content-toggle-one.open",this).removeClass("open"),$(".content-toggle-one",this).first().addClass("open")}),$("#menu-bottom-header a.open").removeClass("open"),$("#menu-bottom-header .list-inline").attr("style",""),$("body").hasClass("has-choose")&&$(".wrapper-choose").removeClass("survol-left").removeClass("survol-out-left").removeClass("survol-right").removeClass("survol-out-right");var e=$(window).height(),t=$(window).width();t!=w&&$("body").hasClass("resultat-recherche")&&(TweenMax.set($(".toggle-filter"),{className:"-=open"}),TweenMax.set($(".content-toggle-filter"),{clearProps:"all"}),TweenMax.set($(".lines-filters"),{clearProps:"all"})),h=e,w=t,descRecherche()});