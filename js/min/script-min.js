function scrollPage(){myScroll=$(document).scrollTop(),myScroll>40?TweenMax.set($("body"),{className:"+=header-on"}):TweenMax.set($("body"),{className:"-=header-on"}),requestAnimFrame(scrollPage)}function animatePrevCitation(e,n){var i=$("ul > li.active",n),t=$("ul > li",n).eq(e-1);TweenMax.set(t,{x:"-100%"}),TweenMax.to(i,.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to(t,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[i,t]})}function animateNextCitation(e,n){var i=$("ul > li.active",n),t=$("ul > li",n).eq(e-1);TweenMax.set(t,{x:"100%"}),TweenMax.to(i,.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to(t,.5,{x:"0%",ease:Cubic.easeInOut,onComplete:completeClickService,onCompleteParams:[i,t]})}function completeClickService(e,n){TweenMax.set(e,{className:"-=active"}),TweenMax.set(n,{className:"+=active"})}var nbCurrentSlideTemoignage=1;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(function(){scrollPage(),$(".imgLiquidFill").imgLiquid(),$(".btn-slider-citation").click(function(){var e=$(this).parents(".wrapper-slider-citation");return TweenMax.isTweening($("ul > li",e))||($(this).hasClass("btn-left")?(1==nbCurrentSlideTemoignage?nbCurrentSlideTemoignage=$("ul > li",e).length:nbCurrentSlideTemoignage--,animatePrevCitation(nbCurrentSlideTemoignage,e)):$(this).hasClass("btn-right")&&(nbCurrentSlideTemoignage==$("ul > li",e).length?nbCurrentSlideTemoignage=1:nbCurrentSlideTemoignage++,animateNextCitation(nbCurrentSlideTemoignage,e))),!1}),$(".wrapper-zone-left-choose").hover(function(){var e=$(this).parents(".wrapper-choose");e.addClass("survol-left")},function(){var e=$(this).parents(".wrapper-choose");e.removeClass("survol-left")}),$(".wrapper-zone-right-choose").hover(function(){var e=$(this).parents(".wrapper-choose");e.addClass("survol-right")},function(){var e=$(this).parents(".wrapper-choose");e.removeClass("survol-right")})});