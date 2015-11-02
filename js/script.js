var nbCurrentSlideTemoignage = 1;

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback){ window.setTimeout(callback, 1000/60); };
})();

// Request anim frame
function scrollPage(){
	myScroll = $(document).scrollTop();

	if (myScroll>40){
		TweenMax.set($("body"), {className:"+=header-on"});
	}else{
		TweenMax.set($("body"), {className:"-=header-on"});
	}

	requestAnimFrame(scrollPage);
}

// Animation des slides de citations
function animatePrevCitation(nbSlide, idWrapperSliderCitation){
	var currentSlideCitationActive = $("ul > li.active", idWrapperSliderCitation);
	var prevSlideCitation = $("ul > li", idWrapperSliderCitation).eq(nbSlide-1);
	TweenMax.set(prevSlideCitation, {x: "-100%"});
	TweenMax.to(currentSlideCitationActive, 0.5, {x: "100%", ease:Cubic.easeInOut});
	TweenMax.to(prevSlideCitation, 0.5, {x: "0%", ease:Cubic.easeInOut, onComplete: completeClickService, onCompleteParams:[currentSlideCitationActive, prevSlideCitation]});
}

function animateNextCitation(nbSlide, idWrapperSliderCitation){
	var currentSlideCitationActive = $("ul > li.active", idWrapperSliderCitation);
	var nextSlideCitation = $("ul > li", idWrapperSliderCitation).eq(nbSlide-1);
	TweenMax.set(nextSlideCitation, {x: "100%"});
	TweenMax.to(currentSlideCitationActive, 0.5, {x: "-100%", ease:Cubic.easeInOut});
	TweenMax.to(nextSlideCitation, 0.5, {x: "0%", ease:Cubic.easeInOut, onComplete: completeClickService, onCompleteParams:[currentSlideCitationActive, nextSlideCitation]});
}

// Mettre à jour les class active des slides de citations
function completeClickService(currentSlideCitationActive, nextSlideCitation){
  TweenMax.set(currentSlideCitationActive, {className:"-=active"});
  TweenMax.set(nextSlideCitation, {className:"+=active"});
}

$(function(){
	// Request anim frame
	scrollPage();

	// Adapter la taille des images à la taille du container parent
	$(".imgLiquidFill").imgLiquid();

	// Clic sur les fleches du slider de citations
	$(".btn-slider-citation").click(function(){
		var idWrapperSliderCitation = $(this).parents(".wrapper-slider-citation");
		if(!TweenMax.isTweening($("ul > li", idWrapperSliderCitation))){
			if ($(this).hasClass("btn-left")){
				if(nbCurrentSlideTemoignage==1){
					nbCurrentSlideTemoignage=$("ul > li", idWrapperSliderCitation).length;
				}else{
					nbCurrentSlideTemoignage--;
				}
				animatePrevCitation(nbCurrentSlideTemoignage, idWrapperSliderCitation);
			}else if($(this).hasClass("btn-right")){
				if(nbCurrentSlideTemoignage==$("ul > li", idWrapperSliderCitation).length){
					nbCurrentSlideTemoignage=1;
				}else{
					nbCurrentSlideTemoignage++;
				}
				animateNextCitation(nbCurrentSlideTemoignage, idWrapperSliderCitation);
			}
		}
		return false;
	});

	// Hover | Animation de la partie choisir
	$(".wrapper-zone-left-choose").hover(
		function() {
			var wrapperChooseParent = $(this).parents(".wrapper-choose");
			if(!wrapperChooseParent.hasClass("survol-left")){
				wrapperChooseParent.addClass("survol-left");
			}
		}, function() {
			var wrapperChooseParent = $(this).parents(".wrapper-choose");
			wrapperChooseParent.removeClass("survol-left");
		}
	);

	$(".wrapper-zone-right-choose").hover(
		function() {
			var wrapperChooseParent = $(this).parents(".wrapper-choose");
			if(!wrapperChooseParent.hasClass("survol-right")){
				wrapperChooseParent.addClass("survol-right");
			}
		}, function() {
			var wrapperChooseParent = $(this).parents(".wrapper-choose");
			wrapperChooseParent.removeClass("survol-right");
		}
	);
});