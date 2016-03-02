//	Ajax functionality:
var ajax_url = webpath_http+'includes/ajax.php';

// A partir du moment ou un utilisateur a cliqué sur le bouton "valider" de la côte de marché on le modifie en "ok"
// Tant qu'il n'a pas cliqué sur le bouton d'enregistrement on l'empêche de sortir de la page (enfin on essaye)
var isset_valeur_marche = 'no';

// Empeche de rentrer des caratères
function verif(chars) {
    // Caractères autorisés
    var regex = new RegExp("[0-9 ]+", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid == false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1); x--;
        }
    }
}

//	String, numbers, inputs functionality:
function format(value,decimal,separator)
{
	var deci=Math.round( Math.pow(10,decimal)*(Math.abs(value)-Math.floor(Math.abs(value)))) ;
	var val=Math.floor(Math.abs(value));

	if ((decimal===0)||(deci==Math.pow(10,decimal)))
	{
		val=Math.floor(Math.abs(value)); deci=0;
	}

	var val_format=val+"";
	var nb=val_format.length;

	for (var i=1;i<4;i++)
	{
		if (val>=Math.pow(10,(3*i)))
		{
			val_format=val_format.substring(0,nb-(3*i))+separator+val_format.substring(nb-(3*i));
		}
	}

	if (parseFloat(value)<0)
	{
		val_format="-"+val_format;
	}

	return val_format;
}

function check_date_pattern( date )
{
	var pattern = /^[0-9]{2}[\/ ]?[0-9]{2}[\/ ]?[0-9]{4}$/;

	if ( pattern.test( date ) )
	{
		return true;
	} else {
		return false;
	}
}



function load(url,event)
{
	location.href=url;
}

//	------------------------------------------------	Popup Functions
function Show_Popup() {
	$('#popup').fadeIn('fast');
	$('#window').fadeIn('fast');
}

function Close_Popup() {
	$('#popup').fadeOut('fast');
	$('#window').fadeOut('fast');
}

//	------------------------------------------------	Login Functions
function LoginCheck()
{
	$("#catalogue_vncodex").css( "display", "none" );
	$("#catalogue_vnvo").css( "display", "none" );
	$("#comparateur").css( "display", "none" );
	$("#valeur_de_marche").css( "display", "none" );
	$("#frevo").css( "display", "none" );
	$("#valeurs_futures").css( "display", "none" );
	$("#ere").css( "display", "none" );
	$("#error1").css( "display", "none" );
	$("#error2").css( "display", "none" );
	var username = $("#username").val();
	var password = $("#password").val();
	var mdl = $("#mdl").val();
	$.get( ajax_url, { action: "get_access", username: username, password: password, mdl: mdl },
		function( data )
		{
			if ( data == "success" )
			{
				document.login.submit();
			}
			else if ( data == "error1" || data == "error2" )
			{
				$("#"+data).css( "display", "block" );
				return false;
			}
			else
			{
				return false;
			}
		}
	);
}

function Login()
{
	var username = $("#username").val();
	var password = $("#password").val();
	var concession = $("#concession").val();
	$.get( ajax_url, { action: "login", username: username, password: password, concession: concession },
		function( data )
		{
			if ( data.statut == "success" )
			{
				if(data.reponse != ''){
                    $("#f_login .concession").removeClass("hide");
                    $("#f_login .concession .controls").empty().html(data.reponse);
                }else{
                    $("#f_login").submit();
                }
			}
			else
			{
				$("#error").css( "display", "block" );
				$("#error").html(data.reponse);
				return false;
			}
		}, "json"
	);
}

//	------------------------------------------------	Bca information:
function get_pdf_bca()
{
    var tab_id = [];
    $(".display_book_vm table tr td.value_bca img").each(function()
    {
        tab_id.push($(this).attr("id").replace('valeur_bca_', ''));
    });
    // console.log(tab_id);
    
    $.get( ajax_url, { action: "get_pdf_bca", tableau: tab_id },
        function( data )
        {
            if (data != 'no') {
                // var tab_pdfs = JSON.parse(data);
                var tab_pdfs = $.parseJSON(data);
                // console.log(pdfs);
                for (var id in tab_pdfs) {
                    // console.log(id+' : '+tab_pdfs[id]+'<br />');
                    $("#valeur_bca_"+id).attr('src', 'images/'+tab_pdfs[id]+'.png').attr('title', '');
                }
            }
        }
    );
}

//	------------------------------------------------	Car information:
function car_details(index)
{
	var vat = $("#vat").val();
	var natcode = $("#natcode").val();
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "car_details", natcode: natcode, vat: vat, index: index },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").html(data);
			}
		}
	);
}

function car_equipments()
{
	var natcode = $("#natcode").val();
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "car_equipments", natcode: natcode },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").html(data);
			}
		}
	);
}

function car_options()
{
	var natcode = $("#natcode").val();
	var prival = $("#prival").val();
	var option_ids = $("#option_ids").val();
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "car_options", natcode: natcode, prival: prival, option_ids: option_ids },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").html(data);
			}
		}
	);
}

function car_pricehistory()
{
	var natcode = $("#natcode").val();
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "car_pricehistory", natcode: natcode },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").html(data);
			}
		}
	);
}

function car_photos()
{
	var natcode = $("#natcode").val();
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "car_photos", natcode: natcode },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").css( "padding-top", "0px" );
				$("div.info-options").css( "padding-bottom", "20px" );
				$("div.info-options").html(data);
				$('a.info-photos').fancybox();
			}
		}
	);
}

//	------------------------------------------------	Validate functions
function validate_email(email)
{
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
    
    // var filter2 = /^abuse@|help@/;
    
    if (filter.test(email))
	{
		return true;
	}
	return false;
    

// '^abuse@'
// '^help@'
// '^hostmaster@'
// '^info@'
// '^ipadmin@'
// '^noc@'
// '^postmaster@'
// '^privacy@'
// '^root@'
// '^sales@'
// '^security@'
// '^support@'
// '^usenet@'
// '^webmaster@'
// '@10minutemail\.[a-z]+'
// '@anonymbox\.[a-z]+'
// '@bugmenot\.[a-z]+'
// '@deadaddress\.[a-z]+'
// '@deagot\.[a-z]+'
// '@dispostable\.[a-z]+'
// '@dodgit\.[a-z]+'
// '@e4ward\.[a-z]+'
// '@emailias\.[a-z]+'
// '@filzmail\.[a-z]+'
// '@gishpuppy\.[a-z]+'
// '@guerillamail\.[a-z]+'
// '@guerrillamail\.[a-z]+'
// '@haltospam\.[a-z]+'
// '@inboxfreedom\.[a-z]+'
// '@incognitomail\.[a-z]+'
// '@iximail\.[a-z]+'
// '@jetable\.[a-z]+$'
// '@link2mail\.[a-z]+'
// '@mailboxable\.[a-z]+'
// '@mailcatch\.[a-z]+'
// '@maileater\.[a-z]+'
// '@mailexpire\.[a-z]+'
// '@mailinator\.[a-z]+'
// '@mailnull\.[a-z]+'
// '@mailscrap\.[a-z]+'
// '@mailtemporaire\.[a-z]+'
// '@makemetheking\.[a-z]+'
// '@meltmail\.[a-z]+'
// '@mintemail\.[a-z]+'
// '@mytempemail\.[a-z]+'
// '@mytrashmail\.[a-z]+'
// '@onewaymail\.[a-z]+'
// '@privy-mail\.[a-z]+'
// '@sneakemail\.[a-z]+'
// '@soodonims\.[a-z]+'
// '@spamavert\.[a-z]+'
// '@spambox\.[a-z]+'
// '@spamcero\.[a-z]+'
// '@spamevader\.[a-z]+'
// '@spamex\.[a-z]+'
// '@spamfree24\.[a-z]+'
// '@spamgourmet\.[a-z]+'
// '@spamhole\.[a-z]+'
// '@spammotel\.[a-z]+'
// '@spamobox\.[a-z]+'
// '@spamspot\.[a-z]+'
// '@tempail\.[a-z]+'
// '@tempemail\.[a-z]+'
// '@tempomail\.[a-z]+'
// '@temporaryinbox\.[a-z]+'
// '@trashinbox\.[a-z]+'
// '@trashmail\.[a-z]+'
// '@trashymail\.[a-z]+'
// '@whyspamme\.[a-z]+'
// '@yopmail\.[a-z]+'
// '@youmailr\.[a-z]+'
// '^comments*@'
// '^admin.*@'
// '^webmaster.*@'
// '^info.*@'
// '^bounce.*@'
// '^tech.*@'
// '[-_\.]admin.*@'
// '^spam.*@'
// '[-_\.]spam.*@'
// '^abuse.*@'
// '^[-_\.]abuse.*@'
// '@cauce\.org$'
// '@maps\.org$'
// '@ftc\.gov$'
// '@abuse\.'
// '@.*2xlp\.com$'
// '@.*citicomp\.com$'
// '@.*deadbeef\.com$'
// '@.*five-ten-sg\.com$'
// '@.*osirusoft'
// '@.*selwerd\.nl$'
// '@.*spam'
// '@.*spews\.org$'
// '@.*neterior\.com$'
// '@.*dontknow\.org$'
// '@.*dontknow\.dk$'
// '@driden\.net$'
// '@webcrunchers\.com$'
// '@.*shopip\.com$'

    
    
    
    
}
 
function validate_phone(phone)
{
    
	filter = new RegExp(/^(06|07)[ \.\-]?[0-9]{2}[ \.\-]?[0-9]{2}[ \.\-]?[0-9]{2}[ \.\-]?[0-9]{2}$/);
	// filter = new RegExp(/^(0[6-78])(?:[ _.-]?(\d{2})){4}$/);
	if (filter.test(phone)) {
        return true;
	}
	// alert("Phone Number Must Be Entered As: (555) 555-1234");
    return false;
}

function validate_cp(cp)
{
	filter = new RegExp(/^(\d{2,5})+/);
	if (filter.test(cp)) {
        return true;
	}
	// alert("Phone Number Must Be Entered As: (555) 555-1234");
    return false;
}

function validate_date(date)
{
	filter = new RegExp(/(?:0[1-9]|[12][0-2]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{4})/);
	if (!filter.test(date)) {
		alert("Enter date jj/mm/aaaa");
		return false;
	}
	return true;
}

function validate_required(field)
{
	if ( field !== null && field !== "" )
	{
		return true;
	}
	return false;
}



function load_valid_form( field )
{  
    var input = $("#"+field).val();
      
      // alert(input); 
    if ( input == '0') {
        // alert(input);  
        $('#'+field).removeAttr('form-valid');
        $('#'+field).attr('class','form-error');
    } else {
        $('#'+field).removeAttr('form-error');
        $('#'+field).attr('class','form-valid');
    }

}

function load_valid_form_input( field )
{  
    var input = $("#"+field).val();
    
    // alert(field);
    // alert(input);
    
    if ( field == "s_email" && input != 'Votre e-mail *' && validate_email(input)  ){
        $('#'+field).removeAttr('form-error');
        $('#'+field).attr('class','form-valid');
    } else if( field == "s_cp" && input != 'Code postal *' && input != '' && validate_cp(input) ){
        $('#'+field).removeAttr('form-error'); 
        $('#'+field).attr('class','form-valid');
    } else if( field == "s_telephone" && input != 'Numéro de téléphone portable *' && input != '' && validate_phone(input) ){ 
        $('#'+field).removeAttr('form-error');
        $('#'+field).attr('class','form-valid');
    } else {
        $('#'+field).removeAttr('form-valid');
        $('#'+field).attr('class','form-error');
    }
}





function load_search_fields( field )
{
	if ( field == 's_model' )
	{
		$("select#s_model").html('<option value="0">Sélectionner le modèle</option>');
		//$("select#s_engine").html('<option value="0">choisir</option>');
		// $("select#s_motorisation").html('<option value="0">Motorisation</option>');
		// $("select#s_finition").html('<option value="0">Finition</option>');
	}

	if ( field == 's_motorisation' )
	{
		$("select#s_motorisation").html('<option value="0">2- Sélectionner la version</option>');
		$("select#s_finition").html('<option value="0">3- Sélectionner la finition</option>');
	}

	if ( field == 's_finition' )
	{
		$("select#s_finition").html('<option value="0">3- Sélectionner la finition</option>');
	}

	if ( field == 's_engine' )
	{
		$("select#s_engine").html('<option value="0">1- Sélectionner l\'énergie </option>');
	}

	$("div.info").css( "display", "none" );
	$("#taxes").css( "display", "none" );
    
	$("#results").css( "display", "none" );
	$("#preloader").css( "display", "none" );
	$("#v-content").css( "display", "none" );
    
	$("#results_preloader").css( "display", "block" );

	var condition = $("#car_vn").val();
	var s_vehtype = $("#s_vehtype").val();
	var s_year = $("#s_year").val();
	var s_brand = $("#s_brand").val();
	var s_model = $("#s_model").val();
	var s_engine = $("#s_engine").val();
	var s_motorisation = $("#s_motorisation").val();
	var s_finition = $("#s_finition").val();

	$.get( ajax_url, {
                action: "load_search_fields",
                field: field,
                condition: condition,
                s_vehtype: s_vehtype,
                s_year: s_year,
                s_brand: s_brand,
                s_model: s_model,
                s_engine: s_engine,
                s_motorisation: s_motorisation,
                s_finition: s_finition
            },
		function( data )
		{
			
			// if ( field == 's_brand' )
			// {
				//alert(data);
                // $("select#"+field).removeAttr("disabled");
			// }

			if ( data == "error" )
			{
				return false;
			}
			else
			{ 
                // alert(field);    
				// load_search_results(0);
				$("select#"+field).removeAttr("disabled");
				$("select#"+field).html(data);
			}
		}
	);
}

function load_search_s_condition(condition)
{
	if ( condition == "1" )
	{
		$("#car_vnvo").removeAttr("checked");
		$("#car_vnvo").val(0);
		$("#car_vn").attr("checked",true);
		$("#car_vn").val(1);
	} else {
		$("#car_vn").removeAttr("checked");
		$("#car_vn").val(0);
		$("#car_vnvo").attr("checked",true);
		$("#car_vnvo").val(1);
	}
}

function load_search_s_vehtype(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition)
{
	$.get( ajax_url, {	action: "load_search_s_vehtype", s_vehtype: s_vehtype },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#s_vehtype").removeAttr("disabled");
				$("select#s_vehtype").html(data);
				load_search_s_year(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition);
			}
		}
	);
}

function load_search_s_year(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition)
{
	$.get( ajax_url, {	action: "load_search_s_year", s_year: s_year },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#s_year").removeAttr("disabled");
				$("select#s_year").html(data);
				load_search_s_brand(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition);
			}
		}
	);
}

function load_search_s_brand(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition)
{
	$.get( ajax_url, {	action: "load_search_s_brand", s_brand: s_brand },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#s_brand").removeAttr("disabled");
				$("select#s_brand").html(data);
				load_search_s_model(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition);
			}
		}
	);
}

function load_search_s_model(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition)
{
	$.get( ajax_url, {	action: "load_search_s_model", condition: condition, s_vehtype: s_vehtype, s_year: s_year, s_brand: s_brand, s_model: s_model },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#s_model").removeAttr("disabled");
				$("select#s_model").html(data);
				load_search_s_engine(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition);
			}
		}
	);
}

function load_search_s_engine(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition)
{
	$.get( ajax_url, {	action: "load_search_s_engine", condition: condition, s_vehtype: s_vehtype, s_year: s_year, s_brand: s_brand, s_model: s_model, s_engine: s_engine },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#s_engine").removeAttr("disabled");
				$("select#s_engine").html(data);
				load_search_s_motorisation(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition);
			}
		}
	);
}

function load_search_s_motorisation(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition)
{
	$.get( ajax_url, {	action: "load_search_s_motorisation", s_vehtype: s_vehtype, s_year: s_year, s_brand: s_brand, s_model: s_model, s_engine: s_engine, s_motorisation: s_motorisation },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#s_motorisation").removeAttr("disabled");
				$("select#s_motorisation").html(data);
				load_search_s_finition(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition);
			}
		}
	);
}

function load_search_s_finition(condition,s_vehtype,s_year,s_brand,s_model,s_engine,s_motorisation,s_finition)
{
	$.get( ajax_url, {	action: "load_search_s_finition", s_vehtype: s_vehtype, s_year: s_year, s_brand: s_brand, s_model: s_model, s_engine: s_engine, s_motorisation: s_motorisation, s_finition: s_finition },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#s_finition").removeAttr("disabled");
				$("select#s_finition").html(data);
				load_search_results(0);
			}
		}
	);
}

function load_search_results(start)
{
	$("#offset").val(start);
	var offset = $("#offset").val();

	var condition = $("#car_vn").val();
	var s_vehtype = $("#s_vehtype").val();
	var s_year = $("#s_year").val();
	var s_brand = $("#s_brand").val();
	var s_model = $("#s_model").val();
	var s_engine = $("#s_engine").val();
	var s_motorisation = $("#s_motorisation").val();
	var s_finition = $("#s_finition").val();

	$("div.info").css( "display", "none" );
	$("#taxes").css( "display", "none" );
	$("#results").css( "display", "none" );
	$("#preloader").css( "display", "none" );
	$("#results_preloader").css( "display", "block" );

	$.get( ajax_url, {
						action: "load_search_results",
						offset: offset,
						condition: condition,
						s_vehtype: s_vehtype,
						s_year: s_year,
						s_brand: s_brand,
						s_model: s_model,
						s_engine: s_engine,
						s_motorisation: s_motorisation,
						s_finition: s_finition
                    },
		function( data )
		{
			//alert(data);
			$("#results_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{

				$("#results").css( "display", "block" );
				$("div#results").removeAttr("disabled");
                $("select#s_km").removeAttr("disabled");
				$("div#results").html(data);

				/*	-----------------------------------------------------------
				*	Redirect to natcode page:
				*/

				// $("#search-results tr.result-row").hover(
					// function(){
						// $(this).css("color", "#000000");
					// },
					// function(){
						// $(this).css("color", "#6B6A68");
					// }
				// );
			}
		}
	);
}

function GetInfoByNatCodeVN()
{
	var natcode = $("#natcode").val();

	$("div.info").css( "display", "none" );
	$("#taxes").css( "display", "none" );
	$("#results").css( "display", "none" );
	$("#results_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "get_results_by_natcode", natcode: natcode },
		function( data )
		{
			$("#results_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("#results").css( "display", "block" );
				$("div#results").removeAttr("disabled");
				$("div#results").html(data);
			}
		}
	);
}

function GetInfoByCnitVN(start)
{
	$("#offset").val(start);
	var offset = $("#offset").val();
	var cnit = $("#cnit").val();
	$("div.info").css( "display", "none" );
	$("#taxes").css( "display", "none" );
	$("#results").css( "display", "none" );
	$("#results_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "get_results_by_cnit", cnit: cnit, offset: offset },
		function( data )
		{
			$("#results_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div#results").css( "display", "block" );
				$("div#results").html(data);
			}
		}
	);
}

//	------------------------------------------------	Comparateur

function exceed_comparateur() {
	$.get( ajax_url, { action: "exceed_comparateur" },
		function( data )
		{
			if ( data == "true" )
			{
				alert("Vous pouvez comparer uniquement 3 véhicules.");
			}
			else
			{
				window.location.href = webpath_http+'recherche.php';
			}
		}
	);
}


function check_comparateur()
{
	$.get( ajax_url, { action: "check_comparateur" },
		function( data )
		{
			if ( data == "error" )
			{
				alert("Vous devez sélectionner un deuxième véhicule pour comparer.");
				return false;
			}
			else
			{
				window.location.href = webpath_http+'services/comparateur.php';
			}
		}
	);
}

//	------------------------------------------------	Car information:
function comparateur_car_details()
{
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "comparateur_car_details" },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").css( "width", "auto" );
				$("div.info-options").html(data);

				$("#taxes").css( "display", "none" );
				$("#ht").attr("disabled","disabled");
				$("#ttc").attr("disabled","disabled");

				$('a.info-photos').fancybox();
				$('a.info-photos img').css("margin","0px");

				var height = 15;
				$("div.info-options tr td[title='t4']").each(function() {
				});
			}
		}
	);
}

function comparateur_car_equipments()
{
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "comparateur_car_equipments" },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").css( "width", "auto" );
				$("div.info-options").html(data);

				$("#taxes").css( "display", "none" );
				$("#ht").attr("disabled","disabled");
				$("#ttc").attr("disabled","disabled");

				$('a.info-photos').fancybox();
				$('a.info-photos img').css("margin","0px");
			}
		}
	);
}

function comparateur_car_options()
{
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "comparateur_car_options" },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").css( "width", "auto" );
				$("div.info-options").html(data);

				$("#taxes").css( "display", "block" );
				$("#ht").attr("disabled","");
				$("#ttc").attr("disabled","");

				$('a.info-photos').fancybox();
				$('a.info-photos img').css("margin","0px");
			}
		}
	);
}

function comparateur_car_pricehistory()
{
	$("#results").css( "display", "none" );
	$("div.info-options").css( "display", "none" );
	$("#options_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "comparateur_car_pricehistory" },
		function( data )
		{
			$("#options_preloader").css( "display", "none" );
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("div.info-options").css( "display", "block" );
				$("div.info-options").css( "width", "auto" );
				$("div.info-options").html(data);

				$("#taxes").css( "display", "none" );
				$("#ht").attr("disabled","disabled");
				$("#ttc").attr("disabled","disabled");

				$('a.info-photos').fancybox();
				$('a.info-photos img').css("margin","0px");
			}
		}
	);
}

//	------------------------------------------------	 Calculate functions
function calculate_options()
{
//	Define variables:
	var TotalOptions = document.getElementById('TotalOptions');
	var TotalPrice = document.getElementById('TotalPrice');
	var NewPrice = document.getElementById('NewPrice');
	var price_ttc = parseFloat($("#price_ttc").val());
	var price_ht = parseFloat($("#price_ht").val());
	var o_ttc = 0;
	var o_ttc_total = 0;
	var o_ht = 0;
	var o_ht_total = 0;
	var option_ids = "";
	var option_hidden = "";

//	Get all options prices:
	for (i=0, n=document.form1.elements.length; i<n; i++)
	{
		if ((document.form1.elements[i].type == "checkbox") && (document.form1.elements[i].name == "seloption[]"))
		{
			if (document.form1.elements[i].checked === true)
			{
				option = document.form1.elements[i].value;
				option_hidden += '<input type="checkbox" value="'+option+'" name="selopt[]" checked="checked">';
			}
		}
	}
	if ( option_hidden.length > 0 && option_hidden != "empty" )
	{
		$("#io2").html(option_hidden);
	}
	for (j=0, m=document.form1.elements.length; j<m; j++)
	{
		if ((document.form1.elements[j].type == "checkbox") && (document.form1.elements[j].name == "selopt[]"))
		{
			if (document.form1.elements[j].checked === true)
			{
				option = document.form1.elements[j].value;
				option_array = option.split("|");

				o_ttc = parseFloat(option_array[0]);
				o_ttc_total += o_ttc;

				o_ht = parseFloat(option_array[1]);
				o_ht_total += o_ht;

				option_id = option_array[2];

				option_ids += option_id+',';
			}
		}
	}
//	Selected options:
	$("#option_ids").val(option_ids);

	if ($("input[name='taxes']:checked").val() == 0)
	{
		//Options price
		$("#TotalOptions").html(format(o_ht_total, 2, " ") + " &euro;");
		//Price HT
		$("#NewPrice").html(format(price_ht, 2, " ") + " &euro;");
		//Price HT + Options
		$("#TotalPrice").html(format(price_ht+o_ht_total, 2, " ") + " &euro;");
	}
	else if ($("input[name='taxes']:checked").val() == 1)
	{
		//Options price
		$("#TotalOptions").html(format(o_ttc_total, 2, " ") + " &euro;");
		//Price TTC
		$("#NewPrice").html(format(price_ttc, 2, " ") + " &euro;");
		//Price TTC + Options
		$("#TotalPrice").html(format(price_ttc+o_ttc_total, 2, " ") + " &euro;");
	}
}

function calculate_comparateur_options()
{
	var count = $("#count_comparateur").val();

	for ( i = 0, m = count ; i < m ; i++ )
	{
		if ( $("input[name='prices_ht_"+i+"']").val() != null && $("input[name='prices_ht_"+i+"']").val() != 'undefined' && $("input[name='prices_ttc_"+i+"']").val() != null && $("input[name='prices_ttc_"+i+"']").val() != 'undefined' )
		{
			var o_ttc = 0;
			var o_ttc_total = 0;
			var o_ht = 0;
			var o_ht_total = 0;
			var option_code = 0;
			var option_codes = "";

			var prices_ht = $("input[name='prices_ht_"+i+"']").val();
			var prices_ttc = $("input[name='prices_ttc_"+i+"']").val();

			var total_des_options_ht = 0;
			var total_des_options_ttc = 0;

			var total_du_vehicule_ht = 0;
			var total_du_vehicule_ttc = 0;

			var prix_hors_options = 0;
			var prix_options = 0;
			var prix_incluses_options = 0;

			$("input[name='option_"+i+"']:checked").each(function() {

				option = $(this).val();
				option_array = option.split("|");

				o_ttc = parseFloat(option_array[0]);
				o_ttc_total += o_ttc;

				o_ht = parseFloat(option_array[1]);
				o_ht_total += o_ht;

				option_code = parseFloat(option_array[2]);
				option_codes += option_code+',';

			});

			$("input[name='option_codes_"+i+"']").val(option_codes);

			$.get( ajax_url, { action: "comparateur_save_options", i: i, option_codes: option_codes },
				function( data )
				{
					if ( data == "error" )
					{
						return false;
					}
					else
					{
						//alert(data);
					}
				}
			);

			/*
			$("input[name='option_"+i+"']:not(:checked)").each(function() {

				option = $(this).val();
				option_array = option.split("|");

				option_code = parseFloat(option_array[2]);

				$.get( ajax_url, { action: "comparateur_delete_options", i: i, option_code: option_code },
					function( data )
					{
						if ( data == "error" )
						{
							return false;
						}
						else
						{
							//alert(data);
						}
					}
				);

			});
			*/
			total_des_options_ht = o_ht_total;
			total_des_options_ttc = o_ttc_total;

			if ( $("#ttc").attr("checked") === true )
			{
				prix_options = total_des_options_ttc;
				prix_incluses_options = parseFloat(prices_ttc) + parseFloat(total_des_options_ttc);

				$("#prix_hors_options_"+i+"").html(format(prices_ttc, 2, " ") + " &euro;");
				$("#prix_options_"+i+"").html(format(prix_options, 2, " ") + " &euro;");
				$("#prix_incluses_options_"+i+"").html(format(prix_incluses_options, 2, " ") + " &euro;");
			}
			else
			{
				prix_options = total_des_options_ht;
				prix_incluses_options = parseFloat(prices_ht) + parseFloat(total_des_options_ht);

				$("#prix_hors_options_"+i+"").html(format(prices_ht, 2, " ") + " &euro;");
				$("#prix_options_"+i+"").html(format(prix_options, 2, " ") + " &euro;");
				$("#prix_incluses_options_"+i+"").html(format(prix_incluses_options, 2, " ") + " &euro;");
			}
		}
	}
}

//	------------------------------------------------	 asasas
function GetOptionsVMListing()
{
	var options_codes = '';
	//var options_enabled = document.getElementById('options_enabled').value;
	var val = 0;
	var option_ids = "";
	// Get all options prices:
	for (i=0, n=document.form1.elements.length; i<n; i++)
	{
		if ((document.form1.elements[i].type == "checkbox") && (document.form1.elements[i].name == "seloption[]"))
		{
			if (document.form1.elements[i].checked === true)
			{
				option = document.form1.elements[i].value;
				options_codes += option+',';

				valeur = option.split("|");
				option_ids += valeur[1]+',';
			}
		}
	}
	if ( options_codes.length < 2)
	{
		options_codes = '0';
	}
	document.form1.options_codes.value = options_codes;
//	Selected options:
	$("#option_ids").val(option_ids);
	//alert ('All selected options codes: ' +options_codes);
	/*
	if ( options_codes.length > 0)
	{
		document.form1.options_enabled.value = '1';
		document.form1.options_codes.value = options_codes;
		alert (options_enabled);
	}
	*/
}

function ShowDetailsFV(id)
{
	var status = $("#"+id).css('display');

	if ( status == 'none')
	{
		$("#"+id).show("slow");
		$("#"+id+"_td").attr("class","info-label-minus");
	}
	else if ( status == 'block')
	{
		$("#"+id).hide("slow");
		$("#"+id+"_td").attr("class","info-label");
	}
}

function equalHeight(group) {

	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});

	group.height(tallest);
}

function ShowDetailsC(cid)
{

	var status = $("."+cid).css('display');

	if ( status == 'none')
	{
		$("."+cid).show(0);
		$("#"+cid+"_td").attr("class","info-label-minus");


	}
	else if ( status == 'block')
	{
		$("."+cid).hide(0);
		$("#"+cid+"_td").attr("class","info-label");
	}

	equalHeight($("."+cid));

}

function ShowVA(id)
{
	var status = $("#"+id).css('display');
	if ( status == 'none')
	{
		$("#"+id).show("slow");
		$("#p_"+id).attr("src","images/icons/icon_minus.gif");
	}
	else if ( status == 'block')
	{
		$("#"+id).hide("slow");
		$("#p_"+id).attr("src","images/icons/icon_plus.gif");
	}
}

function getCarCondition()
{
	if ( $("#cc_info").length > 0 && $("#cc_info2").length > 0 )
	{
		var cc_status = '';
		var cc_info = document.getElementById('cc_info');
		var cc_info2 = document.getElementById('cc_info2');
		if ( $("[name=condition]:checked").val() > 0 && $("[name=condition]:checked").val() < 6)
		{
			var condition = $("[name=condition]:checked").val();
		}
		else
		{
			var condition = '0';
		}
		if ( condition == 1 )
		{
			cc_status = 'bon &eacute;tat';
		}
		else if ( condition == 2 )
		{
			cc_status = '&eacute;tat moyen';
		}
		else if ( condition == 4 )
		{
			cc_status = 'mauvais &eacute;tat';
		}
		else
		{
			cc_status = 'non d&eacute;clar&eacute;';
		}
		cc_info.innerHTML = cc_status;
		cc_info2.innerHTML = cc_status;
	}
}

function form_input_is_string(input) {
        return typeof(input)=='string' && isNaN(input);
}

function CalTotalPriceVN2() {
//	Get taxes calculation - Yes or Not:
	for (i=0;i<document.form1.taxes.length;i++)
	{
		    if (document.form1.taxes[i].checked)
		    {
				 var taxes_value = document.form1.taxes[i].value;
		    }
	}

	if ( taxes_value == 0 )
	{
		var vat = 0;
	}
	else if ( taxes_value == 1 )
	{
		var vat = parseFloat(document.form1.vat.value);
	}
//	Get new price:
	var price = parseFloat(document.form1.price.value);
//	Get Elemenets By Id:
	var TotalOptions = document.getElementById('TotalOptions');
	var TotalPrice = document.getElementById('TotalPrice');
	var NewPrice = document.getElementById('NewPrice');
//	Define variables:
	var prixopt = 0;
	var pricetva = 0;
	var totalpricetva = 0;
	var val = 0;
	var option_ids = "";
//	Get all options prices:
	for (i=0, n=document.form1.elements.length; i<n; i++)
	{
		if ((document.form1.elements[i].type == "checkbox") && (document.form1.elements[i].name == "seloption[]"))
		{
			if (document.form1.elements[i].checked === true)
			{
				option = document.form1.elements[i].value;
				valeur = option.split("|");
				t = parseFloat(valeur[0]);
				option_id = valeur[1];
				//t = Math.ceil(t);
				val += t;
				option_ids += option_id+',';
			}
		}
	}
//	Selected options:
	$("#option_ids").val(option_ids);
//	Options price
	options_price = val;
	options_price_taxes = (options_price/100)*vat;
	total_options = options_price + options_price_taxes;
	total_options = Math.floor(options_price + options_price_taxes);
	TotalOptions.innerHTML = format(total_options, 2, " ") + " &euro;";
//	prixopt = price + options_price;
//	TotalPrice.innerHTML = format(prixopt, 2, "") + " &euro;";

//	Price with options
	price_taxes = Math.floor((price/100)*vat);
	total_price = price + price_taxes;
//	alert(total_price);
	total = total_price + total_options;
	prixopt = Math.floor(total);
	TotalPrice.innerHTML = format(prixopt, 2, " ") + " &euro;";

//	Price without options
	pricenopt = Math.floor((price/100)*vat);
	total_pricenopt = price + pricenopt;
	prixnopt = Math.floor(total_pricenopt);
	NewPrice.innerHTML = format(prixnopt, 2, " ") + " &euro;";
}

/*	Go to FREVO	*/
function goto(url)
{
	window.location = url;
}
function goto2(url)
{
	var frais_gestion_percents = $("#frais_gestion_percents").val();
	var frais_gestion_ammount = $("#frais_gestion_ammount").val();
	var frais_remise_etat = $("#frais_remise_etat").val();
	var date_incidence = $("#date_incidence").val();
	var frais_livriaison = $("#frais_livriaison").val();
	if ( $("[name=condition]:checked").val() > 0 && $("[name=condition]:checked").val() < 6)
	{
		var etat_vehicule = $("[name=condition]:checked").val()
	} else {
		var etat_vehicule = 0;
	}
	window.location = url+'&frais_gestion_percents='+frais_gestion_percents+'&frais_gestion_ammount='+frais_gestion_ammount+'&frais_remise_etat='+frais_remise_etat+'&date_incidence='+date_incidence+'&frais_livriaison='+frais_livriaison+'&etat_vehicule='+etat_vehicule;
}

/*	Save/Restore functionality	*/
function ShowHide(id)
{
	var status = $("#"+id).css('display');

	if ( status == 'none')
	{
		$("#"+id).show("slow");
	}
	else if ( status == 'block')
	{
		$("#"+id).hide("slow");
	}
}

function add_vncodex()
{
	var car_info = $("#car_info").val();
	var natcode = $("#natcode").val();
	var option_ids = $("#option_ids").val();
	var reference = $("#reference").val();
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "add_vncodex", car_info: car_info, natcode: natcode, option_ids: option_ids, reference: reference },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function delete_vncodex(record_id)
{
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "delete_vncodex", record_id: record_id },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function add_vnvo()
{
	var car_info = $("#car_info").val();
	var natcode = $("#natcode").val();
	var option_ids = $("#option_ids").val();
	var reference = $("#reference").val();
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "add_vnvo", car_info: car_info, natcode: natcode, option_ids: option_ids, reference: reference },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function delete_vnvo(record_id)
{
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "delete_vnvo", record_id: record_id },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function add_frevo()
{
	var car_info = $("#car_info").val();
	var natcode = $("#natcode").val();
	var reference = $("#reference").val();
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "add_frevo", car_info: car_info, natcode: natcode, reference: reference },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function delete_frevo(record_id)
{
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "delete_frevo", record_id: record_id },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function add_vm_step1()
{
	var prival = $("#prival").val();
	var natcode = $("#natcode").val();
	var car_info = $("#car_info").val();
	var mileage = $("#mileage").val();
	var date_return = $("#date_return").val();
	var delai_previsionnel = $("#delai_previsionnel").val();
	var option_ids = $("#option_ids").val();
	var options_codes = $("#options_codes").val();
	var option_value = $("#option_value").val();
	var immatriculation = $("#immatriculation").val();
	var vm_nom = $("#vm_nom").val();
	var vm_prenom = $("#vm_prenom").val();

	$("#frevo_preloader2").css( "display", "block" );
    if(immatriculation != ''){
        if(vm_nom != ''){
                if(vm_prenom != ''){
                    $.get( ajax_url, { action: "add_vm_step1",
                            prival: prival,
                            natcode: natcode,
                            car_info: car_info,
                            mileage: mileage,
                            date_return: date_return,
                            delai_previsionnel: delai_previsionnel,
                            option_ids: option_ids,
                            options_codes: options_codes,
                            option_value: option_value,
                            immatriculation: immatriculation,
                            vm_nom: vm_nom,
                            vm_prenom: vm_prenom
                            },
                        function( data )
                        {
                            if ( data == "error" )
                            {
                                alert('error');
                                return false;
                            }
                            else
                            {
                                $("#frevo_preloader2").css( "display", "none" );
                                $(".book-vm").remove();
                                isset_valeur_marche = 'no';
                            }
                        }
                    );
                }else{
                    alert("Merci d'entrer un prénom pour la côte de marché");
                    $("#vm_prenom").addClass("error").focus();
                }
        }else{
            alert("Merci d'entrer un nom pour la côte de marché");
            $("#vm_nom").addClass("error").focus();
        }
    }else{
        alert("Merci d'entrer une immatriculation pour la côte de marché");
        $("#immatriculation").addClass("error").focus();
    }
}

function register_before_redirect_vm(url)
{
    add_vm_step2();
    window.open(url);
}

function add_vm_step2()
{
	var vm_print = $("#vm_print").val();
	var transaction_price = $("#transaction_price").val().replace(' ','');
	var transaction_price_pga = $("#transaction_price_pga").val().replace(' ','');
	var transaction_price_pga_zero = $("#transaction_price_pga_zero").val();
	var frais_fixes = $("#frais_fixes").val().replace(' ','');
	var frevo = $("#frevo").val().replace(' ','');
	var impact_delai = $("#impact_delai").val().replace(' ','');
	var marge = $("#marge").val().replace(' ','');
	var marge_base = $("#marge_base").val().replace(' ','');
	var reprise_price = $("#reprise_price").val().replace(' ','');
	var reprise_price_base = $("#reprise_price_base").val().replace(' ','');
	var average_selling_time = $("#average_selling_time").text();

	$("#frevo_preloader2").css( "display", "block" );
    if(vm_print != 0){
        $.get(
            ajax_url,
            {
                action: "add_vm_step2",
                transaction_price: transaction_price,
                transaction_price_pga: transaction_price_pga,
                transaction_price_pga_zero: transaction_price_pga_zero,
                frais_fixes: frais_fixes,
                frevo: frevo,
                impact_delai: impact_delai,
                marge: marge,
                marge_base: marge_base,
                reprise_price: reprise_price,
                reprise_price_base: reprise_price_base,
                average_selling_time: average_selling_time
            },
            function( data )
            {
                if ( data == "error" ) {
                    alert('error');
                    return false;
                } else {
                    $("#frevo_preloader2").css( "display", "none" );
                    $(".book-vm").remove();
                    $("#envoi_valeur").after(data);
                    isset_valeur_marche = 'no';
                }
            }
        );
    } else alert("Vous devez effectuer une côte de marché avant de pouvoir l'enregistrer");
}

function add_vm()
{
	var prival = $("#prival").val();
	var natcode = $("#natcode").val();
	var car_info = $("#car_info").val();
	var mileage = $("#mileage").val();
	var date_return = $("#date_return").val();
	var delai_previsionnel = $("#delai_previsionnel").val();
	var option_ids = $("#option_ids").val();
	var options_codes = $("#options_codes").val();
	var option_value = $("#option_value").val();
	var transaction_price = $("#transaction_price").val().replace(' ','');
	var transaction_price_pga = $("#transaction_price_pga").val().replace(' ','');
	var frais_fixes = $("#frais_fixes").val().replace(' ','');
	var frevo = $("#frevo").val().replace(' ','');
	var impact_delai = $("#impact_delai").val().replace(' ','');
	var marge = $("#marge").val().replace(' ','');
	var marge_base = $("#marge_base").val().replace(' ','');
	var reprise_price = $("#reprise_price").val().replace(' ','');
	var reprise_price_base = $("#reprise_price_base").val().replace(' ','');
	var average_selling_time = $("#average_selling_time").text();
	var immatriculation = $("#immatriculation").val();
	var vm_nom = $("#vm_nom").val();

	$("#frevo_preloader2").css( "display", "block" );
    if(transaction_price != 0){
        if(immatriculation != ''){
            if(vm_nom != ''){
                $.get( ajax_url, { action: "add_vm",
                        prival: prival,
                        natcode: natcode,
                        car_info: car_info,
                        mileage: mileage,
                        date_return: date_return,
                        delai_previsionnel: delai_previsionnel,
                        option_ids: option_ids,
                        options_codes: options_codes,
                        option_value: option_value,
                        transaction_price: transaction_price,
                        transaction_price_pga: transaction_price_pga,
                        frais_fixes: frais_fixes,
                        frevo: frevo,
                        impact_delai: impact_delai,
                        marge: marge,
                        marge_base: marge_base,
                        reprise_price: reprise_price,
                        reprise_price_base: reprise_price_base,
                        average_selling_time: average_selling_time,
                        immatriculation: immatriculation,
                        vm_nom: vm_nom
                        },
                    function( data )
                    {
                        if ( data == "error" )
                        {
                            alert('error');
                            return false;
                        }
                        else
                        {
                            $("#frevo_preloader2").css( "display", "none" );
                            $(".book-vm").remove();
                            $(".info-valeur").append(data);
                            isset_valeur_marche = 'no';
                        }
                    }
                );
            }else{
                alert("Merci d'entrer un nom pour la côte de marché");
                $("#vm_nom").addClass("error").focus();
            }
        }else{
            alert("Merci d'entrer une immatriculation pour la côte de marché");
            $("#immatriculation").addClass("error").focus();
        }
    }else alert("Vous devez effectuer une côte de marché avant de pouvoir l'enregistrer");
}

function delete_vm(record_id)
{
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "delete_vm", record_id: record_id },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved, #vm_notebook .frevo_book_saved").html(data);
			}
		}
	);
}

function add_vf()
{
	var km_origine = $("#km_origine").val();
	var km_tfc = $("#km_tfc").val();
	var date_mise = $("#date_mise").val();
	//var date_fin = $("#date_fin").val();
	var duree_contrat = $("#duree_contrat").val();
	var delai_livraison = $("#delai_livraison").val();
	var delai_revente = $("#delai_revente").val();
	var car_info = $("#car_info").val();
	var natcode = $("#natcode").val();
	var reference = $("#reference").val();
	var option_ids = $("#option_ids").val();
	var options_codes = $("#options_codes").val();
	var ajustement_trade = $("#ajustement1").val();
	var ajustement_retail = $("#ajustement2").val();
	var frais_remise_etat = $("#frais_remise_etat").val();

	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "add_vf",
		    km_origine: km_origine,
		    km_tfc: km_tfc,
		    date_mise: date_mise,
		    //date_fin: date_fin,
		    duree_contrat: duree_contrat,
		    delai_livraison: delai_livraison,
		    delai_revente: delai_revente,
		    car_info: car_info,
		    natcode: natcode,
		    reference: reference,
		    options_codes: options_codes,
		    option_ids: option_ids,
		    ajustement_trade: ajustement_trade,
		    ajustement_retail: ajustement_retail,
		    frais_remise_etat: frais_remise_etat
		    },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function delete_vf(record_id)
{
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "delete_vf", record_id: record_id },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function add_comp()
{
	var reference = $("#reference").val();
	if ( reference == "" )
	{
		alert('S\'il vous plaît, entrez référence.');
		return false;
	}
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "add_comp", reference: reference },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

function delete_comp(record_id,natcode)
{
	$("#frevo_preloader2").css( "display", "block" );
	$.get( ajax_url, { action: "delete_comp", record_id: record_id, natcode: natcode },
		function( data )
		{
			if ( data == "error" )
			{
				alert('error');
				return false;
			}
			else
			{
				$("#frevo_preloader2").css( "display", "none" );
				$("#frevo_book_saved").html(data);
			}
		}
	);
}

//	Web Services FreVO ETG Estimate functionality:
function LoadRanges()
{
	var xml_manufacturer = $("#xml_manufacturer").val();
	$.get( ajax_url, { action: "xml_ranges", xml_manufacturer: xml_manufacturer },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("select#xml_range").removeAttr("disabled");
				$("select#xml_range").html(data);
			}
		}
	);
	$("select#xml_model").attr("disabled","disabled");
	$("select#xml_modeldate").attr("disabled","disabled");
	$("select#xml_damagearea").attr("disabled","disabled");
	$("select#xml_part").attr("disabled","disabled");
	$("select#xml_defect").attr("disabled","disabled");
	$("select#xml_repair").attr("disabled","disabled");
	$("select#xml_repairs").attr("disabled","disabled");
}

function LoadModels()
{
	var xml_manufacturer = $("#xml_manufacturer").val();
	var xml_range = $("#xml_range").val();
	$.get( ajax_url, { action: "xml_models", xml_manufacturer: xml_manufacturer, xml_range: xml_range },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("select#xml_model").removeAttr("disabled");
				$("select#xml_model").html(data);
			}
		}
	);
	$("select#xml_modeldate").attr("disabled","disabled");
	$("select#xml_damagearea").attr("disabled","disabled");
	$("select#xml_part").attr("disabled","disabled");
	$("select#xml_defect").attr("disabled","disabled");
	$("select#xml_repair").attr("disabled","disabled");
	$("select#xml_repairs").attr("disabled","disabled");
}

function LoadModelDates()
{
	var xml_manufacturer = $("#xml_manufacturer").val();
	var xml_range = $("#xml_range").val();
	var xml_model = $("#xml_model").val();
	$.get( ajax_url, { action: "xml_modeldates", xml_manufacturer: xml_manufacturer, xml_range: xml_range, xml_model: xml_model },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("select#xml_modeldate").removeAttr("disabled");
				$("select#xml_modeldate").html(data);
			}
		}
	);
	$("select#xml_damagearea").attr("disabled","disabled");
	$("select#xml_part").attr("disabled","disabled");
	$("select#xml_defect").attr("disabled","disabled");
	$("select#xml_repair").attr("disabled","disabled");
	$("select#xml_repairs").attr("disabled","disabled");
}

function LoadDamageAreas()
{
	$("select#xml_damagearea").removeAttr("disabled");
	$("select#xml_part").attr("disabled","disabled");
	$("select#xml_defect").attr("disabled","disabled");
	$("select#xml_repair").attr("disabled","disabled");
	$("select#xml_repairs").attr("disabled","disabled");
}

function LoadParts()
{
	//var xml_modeldate = $("#xml_modeldate").val();
	var xml_modeldate = $("#natcode").val();
	var xml_damagearea = $("#xml_damagearea").val();
	$.get( ajax_url, { action: "xml_parts", xml_modeldate: xml_modeldate, xml_damagearea: xml_damagearea },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("select#xml_part").removeAttr("disabled");
				$("select#xml_part").html(data);
			}
		}
	);
	$("select#xml_defect").attr("disabled","disabled");
	$("select#xml_repair").attr("disabled","disabled");
	$("select#xml_repairs").attr("disabled","disabled");
}

function AskingPrice()
{
    var form = $("#readcp");
	var cp = $("input[name=cp]", form).val();
	var natcode = $("input[name=natcode]", form).val();
	var odometer = $("input[name=odometer]", form).val();
	var regDate = $("input[name=regDate]", form).val();
	var options_codes = $("input[name=options_codes]", form).val();
	var type_market = $("input[name=type_market]", form).val();
	$.get( ajax_url, { action: "xml_asking_price", regDate : regDate, odometer: odometer, cp: cp, natcode: natcode, options_codes: options_codes, type_market: type_market },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				// alert(data);
				$("#display_radar_form #readcp").hide();
				$("#display_radar_form").append(data);
			}
		}
	);
}

function LoadDefectTypes()
{
	//var xml_modeldate = $("#xml_modeldate").val();
	var xml_modeldate = $("#natcode").val();
	var xml_part = $("#xml_part").val();
	$.get( ajax_url, { action: "xml_defects", xml_modeldate: xml_modeldate, xml_part: xml_part },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("select#xml_defect").removeAttr("disabled");
				$("select#xml_defect").html(data);
			}
		}
	);
	$("select#xml_repair").attr("disabled","disabled");
	$("select#xml_repairs").attr("disabled","disabled");
}

function LoadRepairTypes()
{
	//var xml_modeldate = $("#xml_modeldate").val();
	var xml_modeldate = $("#natcode").val();
	var xml_part = $("#xml_part").val();
	var xml_defect = $("#xml_defect").val();
	$.get( ajax_url, { action: "xml_repairs", xml_modeldate: xml_modeldate, xml_part: xml_part, xml_defect: xml_defect },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("select#xml_repair").removeAttr("disabled");
				$("select#xml_repair").html(data);
			}
		}
	);
	$("select#xml_repairs").attr("disabled","disabled");
}

function LoadRepairs()
{
	var xml_repair = $("#xml_repair").val();
	$.get( ajax_url, { action: "xml_issmart", xml_repair: xml_repair },
		function( data )
		{
			if ( data == "error" )
			{
				return false;
			}
			else
			{
				$("select#xml_repairs").removeAttr("disabled");
				$("select#xml_repairs").html(data);
			}
		}
	);
	$("select#xml_repairs").removeAttr("disabled");
}

function GetEstimate()
{
	//var xml_modeldate = $("#xml_modeldate").val();
	var xml_modeldate = $("#natcode").val();
	if ( xml_modeldate == 0)
        {
                alert('Please, choose model date.');
        } else {
		$("#frevo_preloader").css( "display", "block" );
		//var xml_repairlines = 1;
		var xml_metallic = $("#xml_metallic").val();
		var xml_repairlabourrate = $("#th_mecanicien").val();
		var xml_panelrepairrate = $("#th_carrossier").val();
		var xml_refinishrepairrate = $("#th_peintre").val();
		var xml_vatrate = 19.6;
		var vm_url = $("#vm_url").val();
		//var xml_repair = $("#xml_repair").val();
		//var xml_part = $("#xml_part").val();
		//var string_part = $("#xml_part :selected").text();
		//var string_defect = $("#xml_defect :selected").text();
		//var string_repair = $("#xml_repair :selected").text();
		//$.get( ajax_url, { action: "xml_estimate", xml_modeldate: xml_modeldate, xml_repairlines: xml_repairlines, xml_metallic: xml_metallic, xml_repairlabourrate: xml_repairlabourrate, xml_panelrepairrate: xml_panelrepairrate, xml_refinishrepairrate: xml_refinishrepairrate, xml_vatrate: xml_vatrate, xml_repair: xml_repair, xml_part: xml_part, string_part: string_part, string_defect: string_defect, string_repair: string_repair },
		$.get( ajax_url, { action: "xml_estimate", xml_modeldate: xml_modeldate, xml_metallic: xml_metallic, xml_repairlabourrate: xml_repairlabourrate, xml_panelrepairrate: xml_panelrepairrate, xml_refinishrepairrate: xml_refinishrepairrate, xml_vatrate: xml_vatrate, vm_url: vm_url },
			function( data )
			{
				if ( data == "error" )
				{
					alert('no ajax response');
					return false;
				}
				else
				{
					$("#frevo_preloader").css( "display", "none" );
					$("#frevo_response").css( "display", "block" );
					$("#frevo_response").html(data);
				}
			}
		);
	}
}

function GetEstimate2(frevo_id)
{
	$("#frevo_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "xml_estimate2", frevo_id: frevo_id },
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("#frevo_preloader").css( "display", "none" );
				$("#frevo_response").css( "display", "block" );
				$("#frevo_response").html(data);
			}
		}
	);
}

function GetEstimateCart()
{
	if ($('#xml_repairs').val() == 0)
        {
                alert('Please, select all fields.');
        } else {
		$("#frevo_preloader").css( "display", "block" );
		//var xml_modeldate = $("#xml_modeldate").val();
		var xml_modeldate = $("#natcode").val();
		var xml_repairlines = 1;
		var xml_metallic = $("#xml_metallic").val();
		var xml_repairlabourrate = $("#th_mecanicien").val();
		var xml_panelrepairrate = $("#th_carrossier").val();
		var xml_refinishrepairrate = $("#th_peintre").val();
		var xml_vatrate = 19.6;
		var xml_repair = $("#xml_repair").val();
		var xml_part = $("#xml_part").val();
		var xml_repairs = $("#xml_repairs").val();
		var string_damagearea = $("#xml_damagearea :selected").text();
		var string_part = $("#xml_part :selected").text();
		var string_defect = $("#xml_defect :selected").text();
		var string_repair = $("#xml_repair :selected").text();
		$.get( ajax_url, { action: "xml_estimate_cart", xml_modeldate: xml_modeldate, xml_repairlines: xml_repairlines, xml_metallic: xml_metallic, xml_repairlabourrate: xml_repairlabourrate, xml_panelrepairrate: xml_panelrepairrate, xml_refinishrepairrate: xml_refinishrepairrate, xml_vatrate: xml_vatrate, xml_repair: xml_repair, xml_part: xml_part, xml_repairs: xml_repairs, string_damagearea: string_damagearea, string_part: string_part, string_defect: string_defect, string_repair: string_repair },
			function( data )
			{
				if ( data == "error" )
				{
					alert('no ajax response');
					return false;
				}
				else
				{
					$("#frevo_preloader").css( "display", "none" );
					$("#frevo_cart").html(data);
				}
			}
		);
	}

}

function RemovePart( array_id )
{
	$("#frevo_preloader").css( "display", "block" );
	$.get( ajax_url, { action: "xml_remove_part", array_id: array_id},
		function( data )
		{
			if ( data == "error" )
			{
				alert('no ajax response');
				return false;
			}
			else
			{
				$("#frevo_preloader").css( "display", "none" );
				$("#frevo_response").css( "display", "none" );
				$("#frevo_cart").html(data);
			}
		}
	);
}

function mktime() {
        // Get Unix timestamp for a date
        // *         example 1: mktime(14, 10, 2, 2, 1, 2008);
        // *         returns 1: 1201871402
        // *         example 2: mktime(0, 0, 0, 0, 1, 2008);
        // *         returns 2: 1196463600
        // *         example 3: make = mktime();
        // *         example 3: td = new Date();
        // *         example 3: real = Math.floor(td.getTime()/1000);
        // *         example 3: diff = (real - make);
        // *         results 3: diff < 5
        // *         example 4: mktime(0, 0, 0, 13, 1, 1997)
        // *         returns 4: 883609200
        // *         example 5: mktime(0, 0, 0, 1, 1, 1998)
        // *         returns 5: 883609200
        // *         example 6: mktime(0, 0, 0, 1, 1, 98)
        // *         returns 6: 883609200

        var no, ma = 0, mb = 0, i = 0, d = new Date(), argv = arguments, argc = argv.length;

        if (argc > 0){
                d.setHours(0,0,0); d.setDate(1); d.setMonth(1); d.setYear(1972);
        }

        var dateManip = {
                0: function(tt){ return d.setHours(tt); },
                1: function(tt){ return d.setMinutes(tt); },
                2: function(tt){ var set = d.setSeconds(tt); mb = d.getDate() - 1; return set; },
                3: function(tt){ var set = d.setMonth(parseInt(tt)-1); ma = d.getFullYear() - 1972; return set; },
                4: function(tt){ return d.setDate(tt+mb); },
                5: function(tt){ return d.setYear(tt+ma); }
        };

        for( i = 0; i < argc; i++ ){
                no = parseInt(argv[i]*1);
                if (isNaN(no)) {
                        return false;
                } else {
                        // arg is number, let's manipulate date object
                        if(!dateManip[i](no)){
                                // failed
                                return false;
                        }
                }
        }
        return Math.floor(d.getTime()/1000);
}


function CheckDureeContrat()
{
	var duree_contrat = $("#duree_contrat").val();
	if ( duree_contrat == "" || duree_contrat == 0 || duree_contrat == "0" )
	{
		alert("Durée du contrat (en mois).");
		$("#duree_contrat").val(7);
		return false;
	}
	else if ( duree_contrat < 7 || duree_contrat > 72 )
	{
		alert("L'âge du véhicule à la fin de la période de projection doit être compris entre 7 et 72 mois.");
		$("#duree_contrat").val(0);
		return false;
	} else {
		return true;
	}
}
/*
function CheckDureeContratDate()
{
	var date_mise = $("#date_mise").val();
	var duree_contrat = $("#duree_contrat").val();
	var date_fin = $("#date_fin").val();

	if ( check_date_pattern(date_mise) )
	{
		var dd = date_mise.substr(0,2);
		var mm = date_mise.substr(3,2);
		var yy = date_mise.substr(6,4);
	} else {
		var mm = date_mise.getMonth() + 1;
		var dd = date_mise.getDate();
		var yy = date_mise.getFullYear();
	}

	var date2 = mktime(0, 0, 0, mm, dd, yy);

	var minutes = 60;
	var hours = minutes*60;
	var days = hours*24;
	if ( mm == "01" ) { var months = days*31; }
	if ( mm == "02" ) { var months = days*28; }
	if ( mm == "03" ) { var months = days*31; }
	if ( mm == "04" ) { var months = days*30; }
	if ( mm == "05" ) { var months = days*31; }
	if ( mm == "06" ) { var months = days*30; }
	if ( mm == "07" ) { var months = days*31; }
	if ( mm == "08" ) { var months = days*31; }
	if ( mm == "09" ) { var months = days*30; }
	if ( mm == "10" ) { var months = days*31; }
	if ( mm == "11" ) { var months = days*30; }
	if ( mm == "12" ) { var months = days*31; }
	//alert(months);
	date_fin_unix = date2 + (duree_contrat*months);

	var date_fin_object = new Date(date_fin_unix*1000);
	var date_fin_month = date_fin_object.getMonth() + 1;
	var date_fin_day = date_fin_object.getDate();
	var date_fin_year = date_fin_object.getFullYear();

	if ( date_fin_month == "1" ) { date_fin_month = "01" ;}
	if ( date_fin_month == "2" ) { date_fin_month = "02" ;}
	if ( date_fin_month == "3" ) { date_fin_month = "03" ;}
	if ( date_fin_month == "4" ) { date_fin_month = "04" ;}
	if ( date_fin_month == "5" ) { date_fin_month = "05" ;}
	if ( date_fin_month == "6" ) { date_fin_month = "06" ;}
	if ( date_fin_month == "7" ) { date_fin_month = "07" ;}
	if ( date_fin_month == "8" ) { date_fin_month = "08" ;}
	if ( date_fin_month == "9" ) { date_fin_month = "09" ;}
	if ( date_fin_day == "1" ) { date_fin_day = "01" ;}
	if ( date_fin_day == "2" ) { date_fin_day = "02" ;}
	if ( date_fin_day == "3" ) { date_fin_day = "03" ;}
	if ( date_fin_day == "4" ) { date_fin_day = "04" ;}
	if ( date_fin_day == "5" ) { date_fin_day = "05" ;}
	if ( date_fin_day == "6" ) { date_fin_day = "06" ;}
	if ( date_fin_day == "7" ) { date_fin_day = "07" ;}
	if ( date_fin_day == "8" ) { date_fin_day = "08" ;}
	if ( date_fin_day == "9" ) { date_fin_day = "09" ;}

	$("#date_fin").val(dd+'/'+date_fin_month+'/'+date_fin_year);
}
*/
function CheckDelaiLivraison()
{
	var delai_livraison = $("#delai_livraison").val();
	if ( delai_livraison > 5 )
	{
		alert("Les délais prévisionnels de livraison ou de revente doivent être compris entre 0 et 5 mois.");
		$("#delai_livraison").val(0);
		return false;
	} else {
		return true;
	}
}

function CheckDelaiRevente()
{
	var delai_revente = $("#delai_revente").val();
	if ( delai_revente > 5 )
	{
		alert("Les délais prévisionnels de livraison ou de revente doivent être compris entre 0 et 5 mois.");
		$("#delai_revente").val(0);
		return false;
	} else {
		return true;
	}
}

function CheckKmOrigine()
{
	var km_origine = $("#km_origine").val();
	//if ( km_origine == "" || km_origine == 0 || km_origine == "0" )
	if ( km_origine == "" )
	{
		alert("Merci de renseigner le kilométrage d'origine.");
		$("#km_origine").val(0);
		return false;
	}
	else if ( km_origine > 200000 )
	{
		alert("Nous ne pouvons vous fournir de valeur de marché pour un kilométrage supérieur à 200 000 km.");
		$("#km_origine").val(0);
		return false;
	} else {
		return true;
	}
}

function CheckKmTFC()
{
	var km_tfc = $("#km_tfc").val();
	if ( km_tfc == "" || km_tfc == 0 || km_tfc == "0" )
	{
		alert("Merci de renseigner le kilométrage total fin de contrat.");
		//$("#km_tfc").val(0);
		return false;
	}
	else if ( km_tfc < 5000 || km_tfc > 200000 )
	{
		alert("Le kilométrage total du véhicule à la fin de la période de projection doit être compris entre 5 000 et 200 000 km.");
		//$("#km_tfc").val(0);
		return false;
	} else {
		return true;
	}
}


$(function(){

/*	-----------------------------------------------------------
*	VN - Stock - contacts - remove
*/
	$('a[id^="news"]').click(function(){
		var id = $(this).attr('title');
			$.get( ajax_url, { action: "count_downloads", id: id },
				function( data )
				{
					if ( data == "error" )
					{
						return false;
					}
					else
					{
						window.location.href = url;
					}
				}
			);
	});

	$.fn.delay = function(time, callback){
		// Empty function:
		jQuery.fx.step.delay = function(){};
		// Return meaningless animation, (will be added to queue)
		return this.animate({delay:1}, time, callback);
	}

/*	-----------------------------------------------------------
*	Partners popup
*/

//var popupStatus = 0;
var popupStatus = parseInt($("#partner_status").val());

//loading popup
function loadPopup(){
	//loads popup only if it is disabled
	if( popupStatus==0 ){
		$("#backgroundPopup").css({
			"opacity": "0.5"
		});
		$("#backgroundPopup").fadeIn("slow");
		$("#popupContact").fadeIn("slow");
		popupStatus = 1;
	}
}

//disabling popup
function disablePopup(){
	//disables popup only if it is enabled
	if(popupStatus==1){
		$("#backgroundPopup").fadeOut("slow");
		$("#popupContact").fadeOut("slow");
		popupStatus = 0;
	}
}

//centering popup
function centerPopup(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#popupContact").height();
	var popupWidth = $("#popupContact").width();
	//centering
	$("#popupContact").css({
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2
	});
	//only need force for IE6
	$("#backgroundPopup").css({
		"height": windowHeight,
		"width": windowWidth-2
	});
}

	//LOADING POPUP after 1 second
	$(".partner").delay(1000, function(){
		//centering with css
		centerPopup();
		//load popup
		loadPopup();
	});

	//CLOSING POPUP
	//Click the x event!
	$("#popupContactClose").click(function(){
		disablePopup();
	});
	//Click out event!
	$("#backgroundPopup").click(function(){
		disablePopup();
	});
	//Press Escape event!
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();
		}
	});

	//	Handle input fields where we need only integer:
	$("#duree_contrat, #km_origine, #km_tfc, #delai_revente, #delai_livraison").keypress(function digitsOnly(evt){
	//	code ASCII 0 to 9; code ascii "space" = 32; code ascii "+" = 43 use for international phone number; code ascii "backspace" = 08
		var key;
		if(evt.keyCode){key = evt.keyCode; } else{ key = evt.which; }
		return ((key >= '48') && (key <= '57') || (key == '08') );
	});

	$("#duree_contrat").blur(function(){
		CheckDureeContrat();
		//CheckDureeContratDate();
	});

	$("#delai_revente").blur(function(){
		CheckDelaiRevente();
	});

	$("#delai_livraison").blur(function(){
		CheckDelaiLivraison();
	});

	$("#km_origine").blur(function(){
		CheckKmOrigine();
	});

	$("#km_tfc").blur(function(){
		CheckKmTFC();
	});

	/* $("#search-results tr.result-row").on('click', function(){ */
	/*
    
    $("body").delegate('#search-results tr.result-row','click', function(){

		var info = $(this).first().children("td.hidden").html();

		info_array = info.split("|");
		var natcode = info_array[0];
		var car_info = info_array[1];
		// var url = webpath_http+"main.php?natcode="+natcode;
		var url = webpath_http+"valeur_de_marche.php?natcode="+natcode;

		add_comparateur(car_info,natcode,url);
	});

    */

    $("#vm_pole").change(function(){
        $.get(ajax_url,{action:'charge_companies', pole: $(this).val()},function(data){
            if(data != '') $("#vm_concession").empty().append(data);
        });
    });

});

/*	-----------------------------------------------------------
*	Adequatisation - filter
*/

$(document).ready(function() {
	
    $("div[title=adequatisation_filtre] #mid, div[title=adequatisation_filtre] #pid, div[title=adequatisation_filtre] #cid_nom").change(function(){
		var mid = $("#mid").val();
		var pid = $("#pid").val();
		var cid = $("#cid_nom").val();
		
        var offset = $("#offset").val();
		var sortby = $("#sortby").val();
		var desc = $("#desc").val();
        
        
		var url = 'adequatisation.php?mid='+mid+'&pid='+pid+'&cid='+cid+'&sortby='+sortby+'&desc='+desc+'&offset='+offset;
		window.location.href = url;
    });
    
});

/*
Transfert les données pour Google tag manager avec un OnChange
Paramètre : FIELD -> Nom du champs utilisé
*/
function push_select_data( field )
{
    // var input = $("#"+field).val();
    var data_text = $('#'+field+' option:selected').text();
    // console.log(data_text.replace(/ /g,""));
    dataLayer.push({
        field   : data_text,
        'event' : 'form_change_'+field
    });
}

$(function() {
    $("#s_date_rdv").datepicker($.datepicker.regional["fr"]);
    $("#s_date_rdv").datepicker( "option","beforeShowDay", disableSpecificWeekDays );
    
        // $( "#s_date_rdv" ).datepicker({ 
            // changeMonth: true,
            // changeYear: true
        // });
    
});

// 0 = Lundi, 1 = Mardi, 2 = Mercredi, 3 = Jeudi,
// 4 = Vendredi, 5 = Samedi, 6 = Dimanche
var daysToDisable = [0, 1];
function disableSpecificWeekDays(date) {
	var day = date.getDay();
	for (i = 0; i < daysToDisable.length; i++) {
		if ($.inArray(day, daysToDisable) != -1) {
			return [false];
		}
	}
	return [true];
}
