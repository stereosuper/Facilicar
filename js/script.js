var nbCurrentSlideTemoignage = 1,
	tpsChangeCar = 8000,
	mobileBreakpoint = 767,
	tabletBreakpoint = 979;

function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

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

	if($("body").hasClass("has-sidebar")){
		if($(window).width()>tabletBreakpoint){
			if((myScroll>=$(".navbar").offset().top-$("#header").outerHeight()) && (myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight())){
				TweenMax.set($(".navbar ul"), {position: "fixed", top: $("#header").outerHeight()+"px"});
			}else if(myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()){
				TweenMax.set($(".navbar ul"), {position: "absolute", top: $(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+$("#header").outerHeight()+"px"});
			}else{
				TweenMax.set($(".navbar ul"), {position: "relative", top: "inherit"});
			}
		}else{
			TweenMax.set($(".navbar ul"), {position: "relative", top: "inherit"});
		}
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

// Fondu entre les voiture | Choose
function changeCar(){
	if($(".wrapper-choose").hasClass("survol-left")||$(".wrapper-choose").hasClass("survol-out-left")||$(".wrapper-choose").hasClass("survol-right")||$(".wrapper-choose").hasClass("survol-out-right")){
		setTimeout(changeCar, tpsChangeCar);
	}else{
		var nbCars = $(".car-choose").length;
		var currentCarActive = $(".car-choose.is-active");
		var indexCurrentCarActive = currentCarActive.index();
		if(indexCurrentCarActive<(nbCars-1)){
			var nextCarActive = currentCarActive.next(".car-choose");
		}else{
			var nextCarActive = $(".car-choose").first();
		}
		var tlAnimCar = new TimelineMax({onComplete: changeCarComplete});
		tlAnimCar.to(currentCarActive, 0.3, {opacity: "0", ease:Cubic.easeInOut});
		tlAnimCar.to(nextCarActive, 0.3, {opacity: "1", ease:Cubic.easeInOut}, 0);
		tlAnimCar.set(currentCarActive, {className:"-=is-active"});
		tlAnimCar.set(nextCarActive, {className:"+=is-active"});
	}
}

function changeCarComplete(){
	setTimeout(changeCar, tpsChangeCar);
}

$(function(){
	// Request anim frame
	scrollPage();

	var transitionEvent = whichTransitionEvent();

	// Test si il y a un cookie "acceptCookie"
	if(!Cookies.get('acceptCookie')=='not'){
		//$(".cookies").addClass("show");
	}

	// Clic sur le bouton close des cookies
	$("#btn-close-cookies").click(function(){
		$(".cookies").removeClass("show");
		// Création du cookie
		//Cookies.set('acceptCookie', 'not');
		return false;
	});

	if($("body").hasClass("has-choose")){
		var count = 1;
		for(var i = 1; i<$(".car-choose").length; i++){
			img = new Image();
			img.onload = function(){
				$("[data-src='"+this.src+"']").css({"background-image": 'url('+this.src+')'});
				count ++;
				console.log(this.src);
				if(count === $(".car-choose").length){
					// Lancer l'anim entre les voitures
					setTimeout(changeCar, tpsChangeCar);
				}
			}
			img.src = $(".car-choose").eq(i).data('src');
		}
	}

	// Adapter la taille des images à la taille du container parent
	$(".imgLiquidFill").imgLiquid();

	// Charger le contenu du footer dans le menu responsive
	$("#footer-bottom .list-inline > li").each(function(index){
			// récupérer le contenu du li du footer
			var contentLiFooter = $("ul", this).html();
			// le mettre dans le header
			$(".zone-same-footer ul").eq(index).append(contentLiFooter);
	});

	// Ouverture du menu responsive
	$("a.btn-menu-responsive").click(function(){
		$("body").toggleClass("menu-mobile-open");
		return false;
	});

	// Clic sur le bouton pour fermer le popup
	$("a.btn-close-popup").click(function(){
		$(this).parents(".wrapper-popup").removeClass("open");
		return false;
	});

	// Clic sur les boutons toggle
	$(".btn-toggle").click(function(){
		$(this).toggleClass("open");
		$(this).next(".content-toggle").slideToggle(200);
		return false;
	});

	// Clic sur les boutons toggle one
	$(".btn-toggle-one").click(function(){
		if(!$(this).hasClass("open")){
			var indexClique = $(".btn-toggle-one").index(this);
			var parentToggleOne = $(this).parents(".container-toggle-one");
			$(".btn-toggle-one", parentToggleOne).toggleClass("open");

			$(".content-toggle-one.open").slideToggle(100, function() {
				$(this).toggleClass("open");
				$(".content-toggle-one").eq(indexClique).slideToggle(200, function() {
					$(this).toggleClass("open");
				});
			});
		}
		return false;
	});

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
	$(".zone-left-survol-out").hover(
		function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				if(!$(this).parents(".wrapper-choose").hasClass("survol-out-left")){
					wrapperChooseParent.addClass("survol-out-left");
					wrapperChooseParent.addClass("animated");
					$(".car-choose").one(transitionEvent, function(event){
						wrapperChooseParent.removeClass("animated");
					});
				}
			}
		}, function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				wrapperChooseParent.removeClass("survol-out-left");
				wrapperChooseParent.addClass("animated");
				$(".car-choose").one(transitionEvent, function(event){
					wrapperChooseParent.removeClass("animated");
				});
			}
		}
	);

	$(".zone-right-survol-out").hover(
		function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				if(!wrapperChooseParent.hasClass("survol-out-right")){
					wrapperChooseParent.addClass("survol-out-right");
					wrapperChooseParent.addClass("animated");
					$(".car-choose").one(transitionEvent, function(event){
						wrapperChooseParent.removeClass("animated");
					});
				}
			}
		}, function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				wrapperChooseParent.removeClass("survol-out-right");
				wrapperChooseParent.addClass("animated");
				$(".car-choose").one(transitionEvent, function(event){
					wrapperChooseParent.removeClass("animated");
				});
			}
		}
	);

	$(".wrapper-zone-left-choose").hover(
		function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				if(!$(this).parents(".wrapper-choose").hasClass("survol-left")){
					wrapperChooseParent.addClass("survol-left");
					wrapperChooseParent.addClass("animated");
					$(".car-choose").one(transitionEvent, function(event){
						wrapperChooseParent.removeClass("animated");
					});
				}
			}
		}, function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				wrapperChooseParent.removeClass("survol-left");
				wrapperChooseParent.addClass("animated");
				$(".car-choose").one(transitionEvent, function(event){
					wrapperChooseParent.removeClass("animated");
				});
			}
		}
	);

	$(".wrapper-zone-right-choose").hover(
		function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				if(!wrapperChooseParent.hasClass("survol-right")){
					wrapperChooseParent.addClass("survol-right");
					wrapperChooseParent.addClass("animated");
					$(".car-choose").one(transitionEvent, function(event){
						wrapperChooseParent.removeClass("animated");
					});
				}
			}
		}, function() {
			if($(window).width()>tabletBreakpoint && !($("body").hasClass("page-404"))){
				var wrapperChooseParent = $(this).parents(".wrapper-choose");
				wrapperChooseParent.removeClass("survol-right");
				wrapperChooseParent.addClass("animated");
				$(".car-choose").one(transitionEvent, function(event){
					wrapperChooseParent.removeClass("animated");
				});
			}
		}
	);

	$(".wrapper-zone-choose").click(function(){
		if($(window).width()>tabletBreakpoint){
			if($(this).hasClass("wrapper-zone-left-choose")){
				window.location.href = "/#acheter";
			}else if($(this).hasClass("wrapper-zone-right-choose")){
				window.location.href = "/#vendre";
			}
		}
	});

	// Clic sur les boutons de la partie choose pour tablette
	$(".title-action-choose").click(function(){
		if(($(window).width()<=tabletBreakpoint)&&($(window).width()>mobileBreakpoint)){
			if(!($(this).parents(".wrapper-zone-choose").hasClass("open-tablet"))){
				$(".wrapper-zone-choose.open-tablet").removeClass("open-tablet");
				$(this).parents(".wrapper-zone-choose").addClass("open-tablet");
				if($(this).hasClass("left-arrow")){
					$(this).parents(".wrapper-choose").removeClass("right-tablet").addClass("left-tablet");
				}else if($(this).hasClass("right-arrow")){
					$(this).parents(".wrapper-choose").removeClass("left-tablet").addClass("right-tablet");
				}
			}
			return false;
		}
	});
});

$(window).resize(function(){
	// Remettre les toggle btn
	$(".container-toggle-one").each(function(){
		// clearer le js en style inline
		$(".content-toggle-one", this).attr("style", "");

		$(".btn-toggle-one.open", this).removeClass("open");
		$(".btn-toggle-one", this).first().addClass("open");

		$(".content-toggle-one.open", this).removeClass("open");
		$(".content-toggle-one", this).first().addClass("open");
	});
	$("#menu-bottom-header a.open").removeClass("open");
	$("#menu-bottom-header .list-inline").attr("style", "");

	if($("body").hasClass("has-choose")){
		$(".wrapper-choose").removeClass("survol-left").removeClass("survol-out-left").removeClass("survol-right").removeClass("survol-out-right");
	}
});