var nbCurrentSlideTemoignage = 1,
	tpsChangeCar = 8000,
	mobileBreakpoint = 767,
	tabletBreakpoint = 979,
	timeout;

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

	if($("body").hasClass("detail-vehicule")){
		// Positionnement fixed du btn "Rendez-vous d'essai ou commande"
		if($(window).width()<=979){
			var topBtnEssaiCommande = $("#container-btn-detail").offset().top;
			if(myScroll >= topBtnEssaiCommande-10){
				TweenMax.set($("#btn-essai-commande"), {className:"+=fixed"});
				var heightBtnEssaiCommande = $("#btn-essai-commande").innerHeight();
				TweenMax.set($("#container-btn-detail"), {paddingTop: heightBtnEssaiCommande+"px"});
			}else{
				TweenMax.set($("#btn-essai-commande"), {className:"-=fixed"});
				TweenMax.set($("#container-btn-detail"), {paddingTop: "0"});
			}
		}else{
			TweenMax.set($("#btn-essai-commande"), {className:"-=fixed"});
			TweenMax.set($("#container-btn-detail"), {paddingTop: "0"});
		}
		// Affichage du détail du véhicule au scroll
		if(myScroll >= 400){
			TweenMax.set($(".detail-vehicule-zoom"), {className:"+=scroll"});
		}else{
			TweenMax.set($(".detail-vehicule-zoom"), {className:"-=scroll"});
		}
	}

	if($("body").hasClass("resultat-recherche")){
		if (myScroll>120){
			TweenMax.set($(".cars-filters"), {className:"+=fixed"});
		}else{
			TweenMax.set($(".cars-filters"), {className:"-=fixed"});
		}
	}

	if($("body").hasClass("has-sidebar")){
		// Fixer la sidebar au scroll
		if(viewport().width>tabletBreakpoint){
			if((myScroll>=$(".navbar").offset().top-$("#header").outerHeight()) && (myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight())){
				TweenMax.set($(".navbar ul"), {position: "fixed", top: $("#header").outerHeight()+"px"});
			}else if(myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()){
				//TweenMax.set($(".navbar ul"), {position: "absolute", top: $(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+$("#header").outerHeight()+"px"});
				TweenMax.set($(".navbar ul"), {position: "absolute", top: $(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+$("#header").outerHeight()+"px"});
			}else{
				TweenMax.set($(".navbar ul"), {position: "absolute", top: "0"});
			}
		}else if(viewport().width>mobileBreakpoint){
			if((myScroll>=$(".navbar").offset().top) && (myScroll<$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight())){
				TweenMax.set($(".navbar ul"), {position: "fixed", top: "0px"});
			}else if(myScroll>=$(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()){
				//TweenMax.set($(".navbar ul"), {position: "absolute", top: $(".navbar").offset().top+$(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+"px"});
				TweenMax.set($(".navbar ul"), {position: "absolute", top: $(".content-with-navbar").outerHeight()-$(".navbar ul").outerHeight()+"px"});
			}else{
				TweenMax.set($(".navbar ul"), {position: "relative", top: "inherit"});
			}
		}else{
			TweenMax.set($(".navbar ul"), {position: "relative", top: "inherit"});
		}

		// Rendre les éléments de la sidebar "actifs" au scroll
		if(viewport().width>tabletBreakpoint){
			var scrollPosition = $(document).scrollTop();
			$('.navbar li.has-content a').each(function () {
				var currentLink = $(this);
				var refElement = $(currentLink.attr("href"));
				var firstLink = $('.navbar li.has-content a').first();
				var refFirstElement = $(firstLink.attr("href"));
				var lastLink = $('.navbar li.has-content a').last();
				var refLastElement = $(lastLink.attr("href"));
				
				if ((refElement.offset().top <= scrollPosition+20+$("#header").outerHeight()) && (refElement.offset().top + refElement.height() > scrollPosition+20+$("#header").outerHeight())) {
					$('.navbar li.has-content').removeClass("active");
					currentLink.parents("li").addClass("active");
				}else if(scrollPosition<refFirstElement.offset().top){
					$('.navbar li.has-content').removeClass("active");
					$('.navbar li.has-content').first().addClass("active");
				}else if(scrollPosition>(refLastElement.offset().top+refLastElement.height())){
					$('.navbar li.has-content').removeClass("active");
					$('.navbar li.has-content').last().addClass("active");
				}
			});
		}else if(viewport().width>mobileBreakpoint){
			var scrollPosition = $(document).scrollTop();
			$('.navbar li.has-content a').each(function () {
				var currentLink = $(this);
				var refElement = $(currentLink.attr("href"));
				var firstLink = $('.navbar li.has-content a').first();
				var refFirstElement = $(firstLink.attr("href"));
				var lastLink = $('.navbar li.has-content a').last();
				var refLastElement = $(lastLink.attr("href"));
				
				if (refElement.offset().top <= scrollPosition+20 && refElement.offset().top + refElement.height() > scrollPosition+20) {
					$('.navbar li.has-content').removeClass("active");
					currentLink.parents("li").addClass("active");
				}else if(scrollPosition<refFirstElement.offset().top){
					$('.navbar li.has-content').removeClass("active");
					$('.navbar li.has-content').first().addClass("active");
				}else if(scrollPosition>(refLastElement.offset().top+refLastElement.height())){
					$('.navbar li.has-content').removeClass("active");
					$('.navbar li.has-content').last().addClass("active");
				}
			});
		}else{
			$('.navbar li.has-content.active').removeClass("active");
		}
	}

	requestAnimFrame(scrollPage);
}

// Viewport
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
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

// Fonction pour mettre à jour le contenu du placeholder du select custom
function majPlaceholder(containerSkinSelect){
	if(containerSkinSelect.hasClass("is-active")){
		$(".select-placeholder", containerSkinSelect).html("<span class='is-disabled'>"+$("select option", containerSkinSelect).eq(0).html()+"</span>");
	}else{
		if($(".select-options ul li", containerSkinSelect).hasClass("is-selected")){
			$(".select-placeholder", containerSkinSelect).html($(".select-options ul li.is-selected", containerSkinSelect).html());
		}
	}
}

// Positionnement de la description de recherche
function descRecherche(){
	if($("body").hasClass("resultat-recherche")){
		var heightDescRecherche = $(".description-recherche").outerHeight();
		TweenMax.set($("#content-search-results .container"), {paddingBottom: heightDescRecherche+"px"});
		TweenMax.set($(".description-recherche"), {position: "absolute", bottom: "0px", left: "0px"});
	}
}

// Lancer le slideshow des photos de la voiture
function animateNextCarSlide(ulActiveAze, currentSlideNb){
	var currentSlideActive = $(">li.is-active", ulActiveAze);
	var nextSlide = $(">li", ulActiveAze).eq(currentSlideNb);
	TweenMax.set(nextSlide, {x: "100%"});
	TweenMax.to(currentSlideActive, 1, {x: "-100%", ease:Cubic.easeInOut, delay: 0.5});
	TweenMax.to(nextSlide, 1, {x: "0%", ease:Cubic.easeInOut, delay: 0.5, onComplete: completeAnimateNextCarSlide, onCompleteParams: [ulActiveAze, currentSlideNb]});
}

function completeAnimateNextCarSlide(ulActiveAze, currentSlideNb){
	var nbSlidesCars = $(">li", ulActiveAze).length;
	var currentSlideActive = $(">li.is-active", ulActiveAze);
	var nextSlide = $(">li", ulActiveAze).eq(currentSlideNb);
	currentSlideActive.removeClass("is-active");
	nextSlide.addClass("is-active");
	
	if((currentSlideNb+1)<nbSlidesCars){
		currentSlideNb++;
	}else{
		currentSlideNb=0;
	}
	animateNextCarSlide(ulActiveAze, currentSlideNb);
}

function completeEndCarSlide(ulActiveAze){
	var currentSlideActive = $(">li.is-active", ulActiveAze);
	var nextSlide = $(">li", ulActiveAze).eq(0);
	currentSlideActive.removeClass("is-active");
	nextSlide.addClass("is-active");
	TweenMax.set($(">li", ulActiveAze), {x: "100%"});
	TweenMax.set($(">li.is-active", ulActiveAze), {x: "0%"});
}

function setToolTip(){
	$('.has-tooltip').tooltipster({
	      contentAsHTML: true,
	      theme: '.facilicar-theme'
	});

	$('.zone-picto').tooltipster({
	      contentAsHTML: true,
	      theme: '.facilicar-theme'
	});
}

function setTabsHeight(){
	var tabs = $('.wrapper-tabs');
	tabs.each(function(){
		TweenMax.set($(".tabs-content"), {height:$(".tabs-content li.is-selected").outerHeight()});
	});
}

function setTabs(){
	var tabs = $('.wrapper-tabs');
	tabs.each(function(){
		var tab = $(this),
			tabItems = $('ul.tabs-navigation', tab),
			tabContentWrapper = $('ul.tabs-content', tab);
		tabItems.on('click', 'a', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if( !selectedItem.hasClass('is-selected') ) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
					slectedContentHeight = selectedContent.innerHeight();
				$('html, body').stop().animate( { scrollTop: tabItems.offset().top-150 }, 500 );
				tabItems.find('a.is-selected').removeClass('is-selected');
				selectedItem.addClass('is-selected');
				selectedContent.addClass('is-selected').siblings('li').removeClass('is-selected');
				//animate tabContentWrapper height when content changes 
				tabContentWrapper.animate({
					'height': slectedContentHeight
				}, 200);
			}
		});
	});
}

// Remplissage du Zoom détail véhicule
function zoomDetailVehicule(){
	// Récuperer le prix
	$(".prix-financement-zoom").append($(".prix-financement").html());
	$(".car-details-zoom .car-details-zoom-line-one").append($(".car-details .car-details-line-one").html());
	$(".car-details-zoom .car-details-zoom-line-two").append($(".car-details .car-details-line-two").html());
	$(".car-details-zoom .car-details-zoom-line-three").append($(".car-details .car-details-line-three").html());
}

function doOnOrientationChange(){
	if($("body").hasClass("detail-vehicule")){
		if(isMobile.phone || isMobile.tablet){
			if(window.innerHeight > window.innerWidth){
			    // portrait
			    TweenMax.set($("body"), {className:"+=orientationPortrait"});
			}else{
				// landscape
				TweenMax.set($("body"), {className:"-=orientationPortrait"});
			}
		}
	}
}

function detailDeviceDetection(){
	doOnOrientationChange();
}

function animChangeOrientation(){
	var device = $("#device");
	var fleche = $("#fleche");
	var circle = $(".st2");
	var pointe = $("#pointe");
	tlChangeOrientation = new TimelineMax({repeat:-1, repeatDelay:2}),

	tlChangeOrientation.fromTo(circle,0.5, {drawSVG:"0% 0%"}, {drawSVG:"50% 100%"});
	tlChangeOrientation.staggerTo(pointe, 0.1, {opacity:1}, 0.2);
	tlChangeOrientation.staggerTo(circle,0.5, {drawSVG:"100% 100%"});
	tlChangeOrientation.staggerTo(fleche, 0.1, {opacity:0});
	tlChangeOrientation.to(device, 1, {ease: Back.easeInOut.config(1.7), rotation:90, transformOrigin:"50% 50%"});
}

function loadImages(){
	$(".preloader").addClass("is-visible");
	$(".to-load").on("load", function() {
    	$(this).parents(".preloader").removeClass("is-visible");
    	$(this).addClass("is-loaded");
	}).each(function() {
	    // attempt to defeat cases where load event does not fire
	    // on cached images
	    if(this.complete) $(this).trigger("load");
	});
}

function posiPopup(){
	$(".popup").each(function(index){
		console.log($(this).height());
		TweenMax.set($(this), {"margin-top": -($(this).outerHeight())/2+"px", "margin-left": -($(this).outerWidth())/2+"px"});
	});
}

$(window).load(function() {
	// Tabs
	setTabsHeight();
	setTabs();
	// Positionnement des popup
	posiPopup();
});

$(function(){
	// Request anim frame
	scrollPage();

	var transitionEvent = whichTransitionEvent();

	// Test si il y a un cookie "acceptCookie"
	if(!Cookies.get('acceptCookie')=='not'){
		//$(".cookies").addClass("show");
	}

	// Tooltip
	setToolTip();

	// Load images
	loadImages();

	// Class is-list sur list-cars-small
	if ($(".list-cars-small").length && $(window).width()<=767){
		TweenMax.set($(".list-cars-small"), {className:"+=is-list"});
	}

	// Détection du device pour la page de détail de véhicule
	detailDeviceDetection();

	// Remplissage du Zoom détail véhicule
	if($("body").hasClass("detail-vehicule")){
		zoomDetailVehicule();

		$("#slider-apport").slider({
			min: 0,
			max: 10000,
			step: 500,
			range: "min",
			//values: [3500],
			animate: 'slow',
			// Mettre les labels DANS les ui-slider-handle
		    create: function() {
		        $('#slider-apport .min').appendTo($('#slider-apport .ui-slider-handle').get(0));
		    },
		    slide: function(event, ui) { 
		    	$(ui.handle).find('span').html(ui.value+" €");
		    	if(ui.value<1500){
		    		$("#slider-apport .min-txt").addClass("hide");
		    	}else{
	    			$("#slider-apport .min-txt").removeClass("hide");
		    	}
		    	if(ui.value>7000){
		    		$("#slider-apport .max-txt").addClass("hide");
		    	}else{
	    			$("#slider-apport .max-txt").removeClass("hide");
		    	}
		    }
		});

		// Initialiser le contenu des labels
		$('#slider-apport .min').html($('#slider-apport').slider('values', 0) + " €").position({
		    my: 'center top',
		    at: 'center bottom',
		    of: $('#slider-apport .ui-slider-handle').eq(0),
		    offset: "0, 10"
		});

		$("#slider-mensualites").slider({
			min: 12,
			max: 48,
			step: 1,
			//values: [25],
			range: "min",
			animate: 'slow',
			// Mettre les labels DANS les ui-slider-handle
		    create: function() {
		        $('#slider-mensualites .min').appendTo($('#slider-mensualites .ui-slider-handle').get(0));
		        $('#slider-mensualites .max').appendTo($('#slider-mensualites .ui-slider-handle').get(1));
		    },
		    slide: function(event, ui) { 
		    	$(ui.handle).find('span').html(ui.value+" MOIS");
		    	if(ui.value<=20){
		    		$("#slider-mensualites .min-txt").addClass("hide");
		    	}else{
	    			$("#slider-mensualites .min-txt").removeClass("hide");
		    	}
		    	if(ui.value>=39){
		    		$("#slider-mensualites .max-txt").addClass("hide");
		    	}else{
	    			$("#slider-mensualites .max-txt").removeClass("hide");
		    	}
		    }
		});

		// Initialiser le contenu des labels
		$('#slider-mensualites .min').html($('#slider-mensualites').slider('values', 0) + " MOIS").position({
		    my: 'center top',
		    at: 'center bottom',
		    of: $('#slider-apport .ui-slider-handle').eq(0),
		    offset: "0, 10"
		});

		/*$('#slider-mensualites .min-txt').html($('#slider-mensualites').slider('values', 0) + " MOIS");
		$('#slider-mensualites .max-txt').html($('#slider-mensualites').slider('values', 1) + " MOIS");*/
	}

	// Clic sur un bouton "Haut de page"
	$(".btn-haut-page").click(function(){
		TweenMax.to(window, 0.8, {scrollTo:{y:0}});
		return false;
	});

	// Slider detail
	if($("body").hasClass("slider-detail")){
		// Sur les petites résolutions, on charge les photos du zoom en petite def
		if(isMobile.tablet || isMobile.phone){
			if($(window).width()<1100){
				$(".slider-for-zoom .slide img").each(function(index){
					$(this).attr("src", $(this).prop("src").replace("diapo/", "diapo/small/"));
				});
			}
		}
		var status = $('.paging-info');
		var slickElement = $('.slider-for');
		slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = (currentSlide ? currentSlide : 0) + 1;
			status.text(i + '/' + slick.slideCount);
		});
		 $('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			//fade: true,
			asNavFor: '.slider-nav',
			prevArrow: $('.prev-slider-for'),
			nextArrow: $('.next-slider-for')
		});

		 if(isMobile.tablet || isMobile.phone){
		 	$('.slider-nav').slick({
		 		slidesToShow: 5,
		 		slidesToScroll: 1,
		 		asNavFor: '.slider-for',
		 		dots: false,
		 		// pas d'animation
		 		speed: 0,
		 		centerMode: false,
		 		focusOnSelect: true,
		 		prevArrow: $('.prev-slider-nav'),
		 		nextArrow: $('.next-slider-nav'),
		 		responsive: [
		 		    {
		 		      breakpoint: 1024,
		 		      settings: {
		 		        slidesToShow: 4
		 		      }
		 		    }
		 		 ]
		 	});
		 }else{
		 	$('.slider-nav').slick({
		 		slidesToShow: 5,
		 		slidesToScroll: 1,
		 		asNavFor: '.slider-for',
		 		dots: false,
		 		centerMode: false,
		 		focusOnSelect: true,
		 		prevArrow: $('.prev-slider-nav'),
		 		nextArrow: $('.next-slider-nav'),
		 		responsive: [
		 		    {
		 		      breakpoint: 1024,
		 		      settings: {
		 		        slidesToShow: 4
		 		      }
		 		    }
		 		 ]
		 	});
		 }
		 $('.slider-nav').on('breakpoint', function(slick) {
		 	$(".slider-nav .slide.imgLiquidFill").imgLiquid();
		 });
		
		$('.slider-for-zoom').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			arrows: true,
			//fade: true,
			infinite: true,
			asNavFor: '.slider-nav-zoom',
			prevArrow: $('.prev-slider-for-zoom'),
			nextArrow: $('.next-slider-for-zoom')
		});
		$('.slider-nav-zoom').slick({
			slidesToShow: 20,
			slidesToScroll: 1,
			infinite: false,
			asNavFor: '.slider-for-zoom',
			dots: false,
			centerMode: false,
			arrows: false,
			focusOnSelect: true,
			responsive: [
			    {
			      breakpoint: 1150,
			      settings: {
			        slidesToShow: 15
			      }
			    },
			    {
			      breakpoint: 979,
			      settings: {
			        slidesToShow: 12
			      }
			    }
			 ]
		});
		$('.slider-nav-zoom').on('breakpoint', function(slick) {
			$(".slider-nav-zoom .slide.imgLiquidFill").imgLiquid();
		});

		var currentFilter = $(".filter-nav-zoom").parent("li").attr("id");
		var slides = $(".slider-for-zoom .slick-track > .slick-slide").length;
		$('.slider-for-zoom').on('afterChange', function(event, slick, currentSlide, nextSlide){
			if($(window).width()>=1150 && $(".slider-nav-zoom .slide").length < 20){
				var inFocus = $('.slider-for-zoom .slick-current').attr('data-slick-index');
							$('.slider-nav-zoom .slick-current').removeClass('slick-current');
							$('.slider-nav-zoom .slick-slide[data-slick-index="' + inFocus + '"]').trigger('click');
			}else if($(window).width()>=979 && $(".slider-nav-zoom .slide").length < 15){
				var inFocus = $('.slider-for-zoom .slick-current').attr('data-slick-index');
							$('.slider-nav-zoom .slick-current').removeClass('slick-current');
							$('.slider-nav-zoom .slick-slide[data-slick-index="' + inFocus + '"]').trigger('click');
			}else if($(".slider-nav-zoom .slide").length < 12){
				var inFocus = $('.slider-for-zoom .slick-current').attr('data-slick-index');
							$('.slider-nav-zoom .slick-current').removeClass('slick-current');
							$('.slider-nav-zoom .slick-slide[data-slick-index="' + inFocus + '"]').trigger('click');
			}
			// vérifier et mettre à jour le filtre actif
			var currentSlideFilter = $(".slider-nav-zoom .slide:eq("+currentSlide+")").data("filter");
			if(!$(".btn-filters li#"+currentSlideFilter+" .filter-nav-zoom").hasClass("is-active")){
				TweenMax.set($('.filter-nav-zoom.is-active'), {className:"-=is-active"});
				TweenMax.set($(".btn-filters li#"+currentSlideFilter+" .filter-nav-zoom"), {className:"+=is-active"});
			}
		});

		// Affichage du zoom
		$(".slider-for .slick-slide").click(function(){
			if(!$(".detail-vehicule-zoom").hasClass("open")){
				openZoom();
			}
		});

		$("#btn-open-zoom").click(function(){
			openZoom();
			return false;
		});

		function openZoom(){
			if(!$(".detail-vehicule-zoom").hasClass("open")){
				TweenMax.set($(".detail-vehicule-zoom"), {className:"+=open"});
				TweenMax.to($(".detail-vehicule-zoom"), 0.3, {opacity: 1});
				TweenMax.set($(".wrapper-top-zoom"), {className:"+=is-white"});
				var indexCurrentSlide = $('.slider-for .slick-active.slick-current').index();
				$('.slider-for-zoom').get(0).slick.slickGoTo(indexCurrentSlide-1, false);
				$('.slider-nav-zoom').get(0).slick.slickGoTo(indexCurrentSlide-1, false);
				$('.slider-for-zoom').get(0).slick.setPosition();
				$('.slider-nav-zoom').get(0).slick.setPosition();
				animChangeOrientation();
			}
		}

		// Masquage du zoom
		$("#btn-close-zoom").click(function(){
			var indexCurrentSlide = $('.slider-for-zoom .slick-active.slick-current').index();
			$('.slider-for').get(0).slick.slickGoTo(indexCurrentSlide-1, false);
			$('.slider-nav').get(0).slick.slickGoTo(indexCurrentSlide-1, false);
			TweenMax.set($(".detail-vehicule-zoom"), {autoAlpha: 0, className:"-=open", onComplete: function(){
				TweenMax.set($(".detail-vehicule-zoom"), {clearProps:"all"});
			}});
			TweenMax.set($(".wrapper-top-zoom"), {className:"-=is-white"});
			return false;
		});
		
	}

	// Filtrer le slideshow
	$('.filter-nav-zoom').on('click', function(){
		if(!$(this).hasClass("is-active")){
			TweenMax.set($('.filter-nav-zoom.is-active'), {className:"-=is-active"});
			TweenMax.set($(this), {className:"+=is-active"});
		}
		// Nom du filtre cliqué
		var filtername = $(this).parent('li').attr('id');
		var indexFirstWithFilter = $(".slider-nav-zoom .slide[data-filter='"+filtername+"']:first").index();
		$('.slider-for-zoom').get(0).slick.slickGoTo(indexFirstWithFilter);
		$('.slider-nav-zoom').get(0).slick.slickGoTo(indexFirstWithFilter);
	});

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

	// Ouverture popup
	$(".has-popup").click(function(){
		if($(this).prop("id")=="btn-essai-commande-zoom" || $(this).prop("id")=="btn-rappel-zoom"){
			TweenMax.set($(".detail-vehicule-zoom"), {className:"-=open"});
			TweenMax.set($(".wrapper-top-zoom"), {className:"-=is-white"});
		}
		var contentDataPopup = $(this).data('ref-popup');
		var selectedPopup = $(".wrapper-popup[data-popup='"+contentDataPopup+"']");
		if(!selectedPopup.hasClass("open")){
			TweenMax.set($(".wrapper-popup"), {className:"-=open"});
			TweenMax.set(selectedPopup, {className:"+=open"});
		}
		TweenMax.set($("html"), {className:"+=popup-open"});
		posiPopup();
		return false;
	});

	// Clic sur le bouton pour fermer le popup
	$("a.btn-close-popup").click(function(){
		$(this).parents(".wrapper-popup").removeClass("open");
		TweenMax.set($("html"), {className:"-=popup-open"});
		return false;
	});

	// Clic pour fermer les notifications
	$('.notif').find('button').on('click', function(){
		$(this).parents('.notif').fadeOut(300, function(){
			$('#main').removeClass('has-notif');
		});

	});

	// Clic sur les boutons toggle
	$(".btn-toggle").click(function(){
		if($("body").hasClass("toggle-all")){
			if(!$(this).hasClass("open")){
				$(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200);
				$(".wrapper-toggle-all .btn-toggle.open").removeClass("open");
				$(this).addClass("open");
				$(this).next(".content-toggle").slideToggle(200);
			}else{
				$(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200);
				$(".wrapper-toggle-all .btn-toggle.open").removeClass("open");
			}
		}else{
			$(this).toggleClass("open");
			$(this).next(".content-toggle").slideToggle(200);
		}
		var btnClique = $(this);
		setTimeout(function(){
			$('html, body').stop().animate( { scrollTop: btnClique.offset().top-12 }, 500 );
		}, 200);
		return false;
	});

	$(".btn-toggle-once").click(function(){
		if(!$(this).hasClass("open")){
			$(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200);
			$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open");
			$(this).addClass("open");
			$(this).next(".content-toggle-once").slideToggle(200);
			//var contentToggleEqui = $(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once");
		}else{
			$(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200);
			$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open");
			var contentToggleEqui = $(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once");
		}
		var btnClique = $(this);
		setTimeout(function(){
			if($("body").hasClass("detail-vehicule")){
				$('html, body').stop().animate( { scrollTop: btnClique.offset().top-82 }, 500 );
			}else{
				$('html, body').stop().animate( { scrollTop: btnClique.offset().top-12 }, 500 );
			}
		}, 200);
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
			if(viewport().width>tabletBreakpoint && !($("body").hasClass("page-404"))){
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
		//if(viewport().width>tabletBreakpoint){
		if (!Modernizr.touch) { 
			if($(this).hasClass("wrapper-zone-left-choose")){
				window.location.href = "/#acheter";
			}else if($(this).hasClass("wrapper-zone-right-choose")){
				window.location.href = "/#vendre";
			}
		}
	});

	// Clic sur les boutons de la partie choose pour tablette
	$(".title-action-choose").click(function(){
		if((viewport().width<=tabletBreakpoint)&&(viewport().width>mobileBreakpoint)){
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
	
	if($("body").hasClass("has-sidebar")){
		/*// Définir la hauteur minimale du content-with-navbar en fonction de la sidebar
		// Récupérer la hauteur de la sidebar
		var heightNavbar = 0;
		$(".navbar ul li").each(function() {
		   heightNavbar += $(this).height();
		});
		console.log(heightNavbar);
		// Récupérer la hauteur du content-with-navbar
		var heightContentWithNavbar = $(".content-with-navbar").height();
		if(heightContentWithNavbar<heightNavbar){
			TweenMax.set($(".content-with-navbar"), {"min-height": heightNavbar+"px"});
		}else{
			TweenMax.set($(".content-with-navbar"), {clearProps:"all"});
		}*/

		// Clic sur un lien de la sidebar
		$('.navbar li.has-content a').click(function(){
			if(($("body").hasClass("toggle-all"))&&($(".wrapper-toggle-all .btn-toggle").hasClass("open"))){
				var btnToggleThis = $(this);
				var target = this.hash;
				$(".wrapper-toggle-all .btn-toggle.open").next(".content-toggle").slideToggle(200, function(){
					if(viewport().width>tabletBreakpoint){
						$('.navbar li.has-content.active').removeClass("active");
						btnToggleThis.parents("li").addClass('active');
						$target = $(target);
						$('html, body').animate( { scrollTop: $target.offset().top-85 }, 500 );
						//TweenMax.to($('html, body'), 0.5, {scrollTo:{y:$target.offset().top-85}, ease:Power2.easeOut});
					}else if(viewport().width>mobileBreakpoint){
						$('.navbar li.has-content.active').removeClass("active");
						btnToggleThis.parents("li").addClass('active');
						$target = $(target);
						$('html, body').animate( { scrollTop: $target.offset().top-20 }, 500 );
						//TweenMax.to($('html, body'), 0.5, {scrollTo:{y:$target.offset().top-20}, ease:Power2.easeOut});
					}else{
						$('.navbar li.has-content.active').removeClass("active");
						$target = $(target);
						$('html, body').animate( { scrollTop: $target.offset().top-10 }, 500 );
						//TweenMax.to($('html, body'), 0.5, {scrollTo:{y:$target.offset().top-10}, ease:Power2.easeOut});
					}
				});
				$(".wrapper-toggle-all .btn-toggle.open").removeClass("open");
			}else{
				if(viewport().width>tabletBreakpoint){
					$('.navbar li.has-content.active').removeClass("active");
					$(this).parents("li").addClass('active');
					var target = this.hash;
					$target = $(target);
					$('html, body').animate( { scrollTop: $target.offset().top-85 }, 500 );
					//TweenMax.to($('html, body'), 0.5, {scrollTo:{y:$target.offset().top-85}, ease:Power2.easeOut});
				}else if(viewport().width>mobileBreakpoint){
					$('.navbar li.has-content.active').removeClass("active");
					$(this).parents("li").addClass('active');
					var target = this.hash;
					$target = $(target);
					$('html, body').animate( { scrollTop: $target.offset().top-20 }, 500 );
					//TweenMax.to($('html, body'), 0.5, {scrollTo:{y:$target.offset().top-20}, ease:Power2.easeOut});
				}else{
					$('.navbar li.has-content.active').removeClass("active");
					var target = this.hash;
					$target = $(target);
					$('html, body').animate( { scrollTop: $target.offset().top-10 }, 500 );
					//TweenMax.to($('html, body'), 0.5, {scrollTo:{y:$target.offset().top-10}, ease:Power2.easeOut});
				}
			}
			return false;
		});

		if(window.location.hash) {
			window.scrollTo(0, 0);
			setTimeout(function() {
				window.scrollTo(0, 0);
			}, 1);
			var hashAze = window.location.hash;
			if(viewport().width>tabletBreakpoint){
				$('.navbar li.has-content.active').removeClass("active");
				var target = hashAze;
				$target = $(target);
				setTimeout(function(){ 
					TweenMax.to($('html, body'), 0.5, {scrollTo:{y:$target.offset().top-85}, ease:Power2.easeOut});
				}, 100);
			}else if(viewport().width>mobileBreakpoint){
				$('.navbar li.has-content.active').removeClass("active");
				var target = hashAze;
				$target = $(target);
				setTimeout(function(){
					TweenMax.set($('html, body'), {scrollTo:{y:$target.offset().top-20}, ease:Power2.easeOut});
				}, 100);
			}else{
				var target = hashAze;
				$target = $(target);
				setTimeout(function(){
					TweenMax.set($('html, body'), {scrollTo:{y:$target.offset().top-10}, ease:Power2.easeOut});
				}, 100);
			}
		}
	}

	// Clics sur les filters
	$(".select-type-car > li a").click(function(){
		$(".select-type-car  >li.is-selected").removeClass("is-selected");
		$(this).parents("li").first().toggleClass("is-selected");
		return false;
	});

	$(".select-option-car > li a").click(function(){
		$(this).parents("li").toggleClass("is-selected");
		return false;
	});

	$(".switch").click(function(){
		$(this).toggleClass("off").toggleClass("on");
		return false;
	});

	// Clic sur le btn "Plus de critères de recherche"
	$("#btn-more-criteres").click(function(){
		$(this).toggleClass("open");
		$("#content-more-criteres").slideToggle(200);
		return false;
	});

	// Clic sur les toggle filter
	$(".toggle-filter").click(function(){
		if($(window).width()<=767){
			if(!$(this).hasClass("open")){
				$(".toggle-filter.open").next(".content-toggle-filter").slideToggle(200);
				$(".toggle-filter.open").removeClass("open");
			}
			$(this).toggleClass("open");
			$(this).next(".content-toggle-filter").slideToggle(200);
		}
		return false;
	});

	// Clic sur le bouton filtrer au responsive
	$("#button-filter").click(function(){
		if(!$(this).hasClass("open")){
			$(this).addClass("open");
			$(this).next(".lines-filters").slideToggle(200);
		}
		return false;
	});

	$(".zone-right-btn").click(function(){
		if((!$(this).hasClass("disabled"))&&($(this).parents(".btn-filter").hasClass("open"))){
			console.log("on filtre !");
		}else if(!$(this).parents(".btn-filter").hasClass("open")){
			$(this).parents(".btn-filter").addClass("open");
			$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200);
		}
		return false;
	});

	$(".zone-left-btn").click(function(){
		if(!$(this).parents(".btn-filter").hasClass("open")){
			$(this).parents(".btn-filter").addClass("open");
			$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200);
		}else{
			var parent = $(this).parents(".btn-filter");
			if(!$(".zone-right-btn", parent).hasClass("disabled")){
				console.log("on ne filtre pas ! On vide les modifs");
			}
			$(this).parents(".btn-filter").removeClass("open");
			$(this).parents(".btn-filter").next(".lines-filters").slideToggle(200);
		}
		return false;
	});

	// Clic sur les boutons mosaique / liste
	$(".icon-mosaique").click(function(){
		if($(".list-cars").hasClass("is-list")){
			$(".list-cars").removeClass("is-list");
			$(".icon-liste").removeClass("is-selected");
			$(".icon-mosaique").addClass("is-selected");
		}
		return false;
	});

	$(".icon-liste").click(function(){
		if(!$(".list-cars").hasClass("is-list")){
			$(".list-cars").addClass("is-list");
			$(".icon-mosaique").removeClass("is-selected");
			$(".icon-liste").addClass("is-selected");
		}
		return false;
	});

	// Hover wrapper car
	$(".list-cars .wrapper-car").hover(
		function() {
			if($(".list-cars").hasClass("is-list")){
				// Lancer le slideshow des photos de la voiture
				if($(".bandeau-image-car ul", this).length){
					var ulActive = $(".bandeau-image-car ul", this);
					var nbSlidesCars = $(".bandeau-image-car ul li", this).length;
					if(nbSlidesCars>1){
						animateNextCarSlide(ulActive, 1);
					}
				}
			}
		}, function() {
			// Arreter le slideshow
			TweenMax.killTweensOf($(".bandeau-image-car ul >li", this));
			var ulActiveAze = $(".bandeau-image-car ul", this);
			var slideOne = $(">li", ulActiveAze).eq(0);

			if(!$(".bandeau-image-car ul li", this).first().hasClass("is-active")){
				TweenMax.set(slideOne, {x: "100%"});
			}
			
			TweenMax.to(slideOne, 0.2, {x: "0%", ease:Cubic.easeInOut, onComplete: completeEndCarSlide, onCompleteParams: [ulActiveAze]});
		}
	);

	// Clic sur un select custom
	$(".select-placeholder").click(function(){
		if(!$(this).parents(".select-custom").hasClass("is-active")){
			$(".select-custom.is-active").removeClass("is-active");
			$(this).parents(".select-custom").addClass("is-active");
			$("body").removeClass("select-custom-open").addClass("select-custom-open");
		}else{
			$(".select-custom.is-active").removeClass("is-active");
			$("body").removeClass("select-custom-open");
		}
		return false;
	});

	// Clic sur un choix du select custom
	$(".select-options ul li").click(function(){
		var sOptionsParent = $(this).parents(".select-options");
		$("li.is-selected", sOptionsParent).removeClass("is-selected");
		$(this).addClass("is-selected");
		// maj du réel select
		/*var sSkinParent = $(this).parents(".select-skin");
		var indexSelectCustom = $(this).index();
		$("select.select-skinned option:enabled", sSkinParent).eq(indexSelectCustom).prop('selected', true);*/

		var sSkinActive = $(".select-custom.is-active");
		sSkinActive.removeClass("is-active");
		$("body").removeClass("select-custom-open");
		majPlaceholder(sSkinActive);
		return false;
	});

	$(document).mouseup(function (e)
	{
	    var placeholder = $("a.select-placeholder");
	    var optionSelect = $(".select-options ul li");

	    if (!placeholder.is(e.target) // if the target of the click isn't the container...
	        && placeholder.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	    	if(!optionSelect.is(e.target) && optionSelect.has(e.target).length === 0){
	    		if($(".select-custom").hasClass("is-active")){
	    			var sSkinActive = $(".select-custom.is-active");
	    			sSkinActive.removeClass("is-active");
	    			$("body").removeClass("select-custom-open");
	    			majPlaceholder(sSkinActive);
	    		}
	    	}
	    }
	});

	// Slider | Range
	if($("body").hasClass("resultat-recherche")){
		$("#filter-prix").slider({
			range: true,
			min: 1000,
			max: 50000,
			step: 1000,
			values: [1000, 50000],
			animate: 'slow',
			// Mettre les labels DANS les ui-slider-handle
		    create: function() {
		        $('#min').appendTo($('#filter-prix .ui-slider-handle').get(0));
		        $('#max').appendTo($('#filter-prix .ui-slider-handle').get(1));
		    },
		    slide: function(event, ui) { $(ui.handle).find('span').html(ui.value+" €"); }
		});

		// Initialiser le contenu des labels
		$('#min').html($('#filter-prix').slider('values', 0) + " €").position({
		    my: 'center top',
		    at: 'center bottom',
		    of: $('#filter-prix .ui-slider-handle').eq(0),
		    offset: "0, 10"
		});

		$('#max').html($('#filter-prix').slider('values', 1) + " €").position({
		    my: 'center top',
		    at: 'center bottom',
		    of: $('#filter-prix .ui-slider-handle').eq(1),
		    offset: "0, 10"
		});

		if($(window).width()<=767){
			TweenMax.set($(".list-cars"), {className:"+=is-list"});
			TweenMax.set($("#change-liste-mosaique"), {display:"none"});
		}
	}

	// Effacer tous les critères
	$("#btn-remove-criteria").click(function(){
		$(".select-type-car li.is-selected").removeClass("is-selected");
		$(".select-option-car li.is-selected").removeClass("is-selected");
		$("#content-more-criteres .switch.on").removeClass("on").addClass("off");


		$(".select-options ul li").click(function(){
			var sOptionsParent = $(this).parents(".select-options");
			$("li.is-selected", sOptionsParent).removeClass("is-selected");
			$(this).addClass("is-selected");
			// maj du réel select
			/*var sSkinParent = $(this).parents(".select-skin");
			var indexSelectCustom = $(this).index();
			$("select.select-skinned option:enabled", sSkinParent).eq(indexSelectCustom).prop('selected', true);*/

			var sSkinActive = $(".select-custom.is-active");
			sSkinActive.removeClass("is-active");
			majPlaceholder(sSkinActive);
			return false;
		});

		$(".lines-filters .select-custom").each(function(){
			$(".select-options li.is-selected", this).removeClass("is-selected");
			$(".select-options li", this).first().addClass("is-selected");
			majPlaceholder($(this));
		});


		return false;
	});

	// Positionnement de la description de recherche
	descRecherche();

	// Google map
	if($("body").hasClass("has-map")){
		var bounds = new google.maps.LatLngBounds();
		var mapOptions = {
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		center: { lat: 45.973759, lng: -4.661462},
		zoom: 6,
		

			
			styles: [
			    {
			        "featureType": "all",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
				                "color": "#dfdfdf"
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#175461"
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "color": "#7bc6e9"
			            },
			            {
			                "weight": "0.97"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#606060"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "color": "#606060"
			            },
			            {
			                "weight": "0.80"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.country",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#606060"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.country",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "color": "#606060"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.province",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			            	"display" : 'none',
			                "color": "#606060"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.province",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "color": "#606060"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.locality",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#606060"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.locality",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "color": "#7bc6e9"
			            },
			            {
			                "weight": "0.88"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.locality",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "all",
			        "stylers": [
			            {
			                "color": "#dfdfdf"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "poi.park",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#dfdfdf"
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            },
			            {
			                "weight": "0.5"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            },
			            {
			                "gamma": "1.00"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway.controlled_access",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            },
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#e4e4e4"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "all",
			        "stylers": [
			            {
			                "saturation": "48"
			            },
			            {
			                "lightness": "-1"
			            },
			            {
			                "gamma": "6.27"
			            },
			            {
			                "color": "#a1cbde"
			            }
			        ]
			    }
			]
		};

	map = new google.maps.Map(document.getElementById('map'),
	      mapOptions);
	

	// Markers
	var locations = [
		['Paris', 48.864146, 2.337942, 'centre'],
		['Créteil', 48.795395, 2.453940, 'facilistore']
	];

	var infowindow = new google.maps.InfoWindow();

	var marker, i, image;

	var urlCentreEssaiLivraison = 'img/centre-essai-livraison.png';
	var sizeCentreEssaiLivraison = new google.maps.Size(22, 27);

	if(window.devicePixelRatio > 1.5){
		urlCentreEssaiLivraison = 'img/centre-essai-livraison@2x.png';
		sizeCentreEssaiLivraison = new google.maps.Size(44, 54);
	}
	
	if(window.devicePixelRatio > 2){
		urlCentreEssaiLivraison = 'img/centre-essai-livraison@3x.png';
		sizeCentreEssaiLivraison = new google.maps.Size(66, 81);
	}

	var imageCentreEssaiLivraison = {
		url: urlCentreEssaiLivraison,
		size: sizeCentreEssaiLivraison,
		scaledSize: new google.maps.Size(22, 26)
	};

	var urlFacilistore = 'img/facilistore.png';
	var sizeFacilistore = new google.maps.Size(22, 26);

	if(window.devicePixelRatio > 1.5){
		urlFacilistore = 'img/facilistore@2x.png';
		sizeFacilistore = new google.maps.Size(44, 52);
	}
	
	if(window.devicePixelRatio > 2){
		urlFacilistore = 'img/facilistore@3x.png';
		sizeFacilistore = new google.maps.Size(66, 78);
	}

	var imageFacilistore = {
		url: urlFacilistore,
		size: sizeFacilistore,
		scaledSize: new google.maps.Size(22, 26)
	};

	var urlAgenceReprise = 'img/agence-reprise.png';
	var sizeAgenceReprise = new google.maps.Size(22, 27);

	if(window.devicePixelRatio > 1.5){
		urlAgenceReprise = 'img/agence-reprise@2x.png';
		sizeAgenceReprise = new google.maps.Size(44, 54);
	}
	
	if(window.devicePixelRatio > 2){
		urlAgenceReprise = 'img/agence-reprise@3x.png';
		sizeAgenceReprise = new google.maps.Size(66, 81);
	}

	var imageAgenceReprise = {
		url: urlAgenceReprise,
		size: sizeAgenceReprise,
		scaledSize: new google.maps.Size(22, 27)
	};

	for (i = 0; i < locations.length; i++) {
		if(locations[i][3] == "centre"){
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map,
				icon: imageCentreEssaiLivraison
			});
		}else if(locations[i][3] == "facilistore"){
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map,
				icon: imageFacilistore
			});
		}else if(locations[i][3] == "agence-reprise"){
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map,
				icon: imageAgenceReprise
			});
		}
		bounds.extend(marker.position);
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
			  infowindow.setContent(locations[i][0]);
			  infowindow.open(map, marker);
			}
		})(marker, i));
	}
	map.fitBounds(bounds);
	//console.log($(window).width()/5);
	//var decalage = $(window).width()/5;
	//map.panBy(-decalage,0);
	var margeExterieureDroite = ($(window).width()-$("#wrapper-map .container").width())/2;
	//var widthRestanteContainer = $("#wrapper-map .container").width()-$(".wrapper-map-search").width();
	var widthRestanteContainer = $("#wrapper-map .container").width()/2;
	var decalage = (widthRestanteContainer+margeExterieureDroite)/2;
	map.panBy(-decalage,0);
	}

	// Hover des boutons pour passer d'un véhicule à un autre
	$(".btn-change-car").hover(
		function() {
			TweenMax.to($(".bg-btn-change-car"), 0.2, {display: "block", opacity: 1});
		}, function() {
			TweenMax.to($(".bg-btn-change-car"), 0.2, {display: "none", opacity: 0});
		}
	);

	// Clic sur le bouton financement de la page détail
	$("#btn-financement").click(function(){
		if($(window).width()>979){
			var tab =	$('.wrapper-tabs'),
						tabItems = $('ul.tabs-navigation'),
						tabContentWrapper = $('ul.tabs-content');

			var selectedItem = $("ul.tabs-navigation li a[data-content='financement']");
			if( !selectedItem.hasClass('is-selected') ) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
					slectedContentHeight = selectedContent.innerHeight();
				tabItems.find('a.is-selected').removeClass('is-selected');
				selectedItem.addClass('is-selected');
				selectedContent.addClass('is-selected').siblings('li').removeClass('is-selected');
				//animate tabContentWrapper height when content changes 
				tabContentWrapper.animate({
					'height': slectedContentHeight
				}, 200);
			}
			TweenMax.to(window, 0.5, {scrollTo:{y:$(".wrapper-tabs").offset().top-160+"px"}});
		}else{
			var btnToggleEqui = $("ul.tabs-content li[data-content='financement'] a");
			if(!btnToggleEqui.hasClass("open")){
				$(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200);
				$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open");
				btnToggleEqui.addClass("open");
				btnToggleEqui.next(".content-toggle-once").slideToggle(200);
			}
			TweenMax.to(window, 0.5, {scrollTo:{y:btnToggleEqui.offset().top-80+"px"}});
		}
		return false;
	});

	// Clic sur les AAC au dessus des tabs
	$(".wrapper-caracteristiques .caracteristiques li a").click(function(){
		if($(window).width()>979){
			var tab =	$('.wrapper-tabs'),
						tabItems = $('ul.tabs-navigation'),
						tabContentWrapper = $('ul.tabs-content');

			var selectedItem = $("ul.tabs-navigation li a[data-content='qualite']");
			if( !selectedItem.hasClass('is-selected') ) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
					slectedContentHeight = selectedContent.innerHeight();
				tabItems.find('a.is-selected').removeClass('is-selected');
				selectedItem.addClass('is-selected');
				selectedContent.addClass('is-selected').siblings('li').removeClass('is-selected');
				//animate tabContentWrapper height when content changes 
				tabContentWrapper.animate({
					'height': slectedContentHeight
				}, 200);
			}
			if($(this).parents("li").hasClass("historique")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".historique-tab").offset().top-160+"px"}});
			}else if($(this).parents("li").hasClass("inspection")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".inspection-tab").offset().top-160+"px"}});
			}else if($(this).parents("li").hasClass("renovation")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".renovation-tab").offset().top-160+"px"}});
			}else if($(this).parents("li").hasClass("garantie")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".garantie-tab").offset().top-160+"px"}});
			}else if($(this).parents("li").hasClass("satisfait-rembourse")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".satisfait-rembourse-tab").offset().top-160+"px"}});
			}
		}else{
			var btnToggleEqui = $("ul.tabs-content li[data-content='qualite'] a");
			if(!btnToggleEqui.hasClass("open")){
				$(".wrapper-toggle-once .btn-toggle-once.open").next(".content-toggle-once").slideToggle(200);
				$(".wrapper-toggle-once .btn-toggle-once.open").removeClass("open");
				btnToggleEqui.addClass("open");
				btnToggleEqui.next(".content-toggle-once").slideToggle(200);
			}
			if($(this).parents("li").hasClass("historique")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".historique-tab").offset().top-80+"px"}});
			}else if($(this).parents("li").hasClass("inspection")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".inspection-tab").offset().top-80+"px"}});
			}else if($(this).parents("li").hasClass("renovation")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".renovation-tab").offset().top-80+"px"}});
			}else if($(this).parents("li").hasClass("garantie")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".garantie-tab").offset().top-80+"px"}});
			}else if($(this).parents("li").hasClass("satisfait-rembourse")){
				TweenMax.to(window, 0.5, {scrollTo:{y:$(".satisfait-rembourse-tab").offset().top-80+"px"}});
			}
		}
		return false;
	});

	// Clic sur les radios de l'onglet "Financement" de la page détail
	$(".credit-financement").click(function(){
		if(!$(this).hasClass("is-selected")){
			var creditsParents = $(this).parents(".credits-financement");
			TweenMax.set($(".credit-financement.is-selected", creditsParents), {className:"-=is-selected"});
			TweenMax.set($(this), {className:"+=is-selected"});
		}
	});
	$(".credit-financement .btn-accord-principe").click(function(){
		if(!$(this).parents(".credit-financement").hasClass("is-selected")){
			var creditsParents = $(this).parents(".credits-financement");
			TweenMax.set($(".credit-financement.is-selected", creditsParents), {className:"-=is-selected"});
			TweenMax.set($(this).parents(".credit-financement"), {className:"+=is-selected"});
			return false;
		}
	});
});

var h = $(window).height(), w = $(window).width();
$(window).resize(function(){
	setTabsHeight();
	// Positionnement des popup
	posiPopup();
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

	var nh = $(window).height(), nw = $(window).width();
	if (nw != w){
		// Le resize se fait au moins sur la largeur, p-e sur la largeur et la hauteur
		if($("body").hasClass("resultat-recherche")){
			TweenMax.set($(".toggle-filter"), {className:"-=open"});
			TweenMax.set($(".content-toggle-filter"), {clearProps:"all"});
			TweenMax.set($(".lines-filters"), {clearProps:"all"});
		}

		// Slider | Range
		if($("body").hasClass("resultat-recherche")){
			if($(window).width()<=767){
				TweenMax.set($(".list-cars"), {className:"+=is-list"});
				TweenMax.set($("#change-liste-mosaique"), {display:"none"});
			}else{
				TweenMax.set($(".list-cars"), {className:"-=is-list"});
				TweenMax.set($("#change-liste-mosaique"), {clearProps:"all"});
				TweenMax.set($("#change-liste-mosaique .icon-mosaique"), {className:"+=is-selected"});
				TweenMax.set($("#change-liste-mosaique .icon-liste"), {className:"-=is-selected"});
			}
		}

		// Class is-list sur list-cars-small
		if ($(".list-cars-small").length){
			if($(window).width()<=767){
				TweenMax.set($(".list-cars-small"), {className:"+=is-list"});
			}else{
				TweenMax.set($(".list-cars-small"), {className:"-=is-list"});
			}
		}

		// Clearer le js inline dans les tabs
		$(".tabs-content").each(function(){
			$(".content-toggle-once", this).attr("style", "");
			$(".btn-toggle-once.open", this).removeClass("open");
			$(".content-toggle-once.open", this).removeClass("open");
		});
	}
	h = nh; w = nw;
	
	// Positionnement de la description de recherche
	descRecherche();

	doOnOrientationChange();
});