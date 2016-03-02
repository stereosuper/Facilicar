$("document").ready(function($){
	
	$('.scrollTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});	

    // if (window.matchMedia("(min-width: 1330px)").matches) {
		 // $(function() {
	        // $("select").selectBoxIt({
	        /* Cache la première option */
	       // showFirstOption: false
	     // })
	      // });
	// }


    if (window.matchMedia("(min-width: 695px)").matches && window.matchMedia("(max-width: 960px)").matches) {
		var accueilHeight = $("#cadre-formulaire-accueil").height();
		var etape2Height = $("#cadre-formulaire-620").height();
		var etape3Height = $("#cadre-formulaire-960").height();

		if(accueilHeight > 600 || etape2Height > 600 || etape3Height > 600 ) {
			$('.avantages').addClass('avantages-margin');
		} else {
			$('.avantages').removeClass('avantages-margin');
		}
	}

    // $(function() {
    	// $('#s_date_rdv').glDatePicker({
    		// dowOffset: 1,
    	// });
  	// });

});
