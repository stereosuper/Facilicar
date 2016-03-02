function getTaxe(){ return 0.2; }

function pricer_step_1_js()
{ 
    var ladate=new Date()
    var s_year = $("#s_year").val();
    if( s_year == ladate.getFullYear() ){ s_year = ladate.getFullYear()-1; }
    
    var s_brand = $("#s_brand").val();
    var s_model = $("#s_model").val();
    var s_provenance = $("#s_provenance").val();
    var s_landing = $("#s_landing").val();
    
    if ( s_year != 0 && s_year != '' ) {
        if ( s_brand != 0 && s_brand != '') {
            if ( s_model != 0 && s_model != '') {
                                      
                    $("#v-content").css( "display", "none" );
                    $("#preloader").css( "display", "block" );
                    
                    var returner = false;
                    var action = 'action=pricer_step_1_ajax';
                    
                    $.ajax({
                        url: ajax_url+'?'+action+'&s_year='+s_year+'&s_brand='+s_brand+'&s_model='+s_model+'&s_provenance='+encodeURIComponent(s_provenance)+'&s_landing='+s_landing,
                        success: function( data )
                            {
                                dataLayer.push({
                                    'event': 'form_submit_1'
                                });
                                
                                // alert(data);
                                $("#preloader").css( "display", "none" );
                                if ( data == "error" ) {
                                    returner = false;
                                    
                                } else {
                                    
                                    $("#pricer_id").val(parseInt(data));
                                    returner = true;
                                    
                                }
                            },
                        async:false
                    });
                    
                    return returner;

            } else {
                dataLayer.push({
                    'message': 'Veuillez sélectionner un modèle',
                    'champ': 's_model',
                    'event': 'error'
                });
                
                $("#s_year").attr("class","form-valid");
                $("#s_brand").attr("class","form-valid");
                $("#s_model").attr("class","form-error");
                $(".mess-error").removeClass("hide").html("Merci de sélectionner les champs en rouge : Modèle");
                // $("#s_model").focus();
                return false; 
            }
        } else {
            dataLayer.push({
                'message': 'Veuillez sélectionner une marque',
                'champ': 's_brand',
                'event': 'error'
            });
            
            $("#s_year").attr("class","form-valid");
            $("#s_brand").attr("class","form-error");
            $("#s_model").attr("class","form-error");
            $(".mess-error").removeClass("hide").html("Merci de sélectionner les champs en rouge : Marque | Modèle");
            // $("#s_brand").focus();
            return false;
        }
    } else {
        dataLayer.push({
            'message': 'Veuillez sélectionner une année',
            'champ': 's_year',
            'event': 'error'
        });
        
        $("#s_year").attr("class","form-error");
        $("#s_brand").attr("class","form-error");
        $("#s_model").attr("class","form-error");
        $(".mess-error").removeClass("hide").html("Merci de sélectionner les champs en rouge : Année | Marque | Modèle");

        return false;
    }
}

function pricer_step_2_js()
{
    var ladate=new Date()
    var s_year = $("#s_year").val();
    if( s_year == ladate.getFullYear() ){ s_year = ladate.getFullYear()-1; }
    var s_engine = $("#s_engine").val();
    var s_motorisation = $("#s_motorisation").val();
    var s_finition = $("#s_finition").val();
    var s_km = $("#s_km").val();
    var pricer_id = $("#pricer_id").val();
    
    
    /* Recuperation du natcode */
    // var info = $("td.hidden").html();
    // var info_array = info.split("|");
    // var natcode = info_array[0];
    // alert(pricer_id);
    
    var s_natcode = $("#s_natcode").val();
    
    // alert(s_natcode);
    
    if ( s_engine != 0 ) {
        if ( s_motorisation != 0 ) {
            if ( s_finition != '0') {
                if ( s_km != 0){
                    if ( pricer_id != 0){
                        if ( s_natcode != 0){
                             
                            /* VERSION AVEC ENREGISTREMENT APRES LA PAGE*/
                            $("#v-content").css( "display", "none" );
                            $("#preloader").css( "display", "block" );
                            
                            var returner = false;
                            var action = 'action=pricer_step_2_ajax'; 
                            
                            $.ajax({
                                url: ajax_url+'?'+action+'&s_year='+s_year+'&s_engine='+s_engine+'&s_motorisation='+s_motorisation+'&s_finition='+s_finition+'&s_km='+s_km+'&pricer_id='+pricer_id+'&s_natcode='+s_natcode,
                                success: function( data )
                                    {
                                        
                                        dataLayer.push({
                                            'event': 'form_submit_2'
                                        });
                                            
                                        // alert(data);
                                        $("#preloader").css( "display", "none" );
                                        if ( data == "error" ) {
                                            returner = false;
                                            
                                        } else {
                                            // $("#pricer_id").val(parseInt(data));
                                            returner = true;
                                            
                                        }
                                    },
                                async:false
                            });
                            
                            return returner;
                             
                            
                            /* VERSION AVEC ENREGISTREMENT DANS LA PAGE*/
                            // $("#v-content").css( "display", "none" );
                            // $("#preloader").css( "display", "block" );

                            // $.get( 
                                // ajax_url,
                                // { action: "pricer_step_2a_ajax", s_year: s_year, s_engine: s_engine, s_motorisation: s_motorisation, s_finition: s_finition, s_km: s_km, pricer_id: pricer_id, s_natcode: s_natcode },
                                // function( data )
                                // {
                                    // $("#preloader").css( "display", "none" );
                                    // if ( data == "error" ) {
                                    
                                        // return false;
                                    // } else {
                                    
                                        // $(".pricer_step_2a").css( "display", "none" );
                                        // $("#v-content").css( "display", "block" );
                                        // $("div#v-content").html(data);
                                        // return true;
                                    // }
                                // }
                            // );
                            
                            
                            /* VERSION AVEC ENREGISTREMENT DANS LA PAGE*/
                            // $.ajax({
                                // url: ajax_url+'?'+action+'&s_engine='+s_engine+'&s_motorisation='+s_motorisation+'&s_finition='+s_finition+'&s_km='+s_km+'&pricer_id='+pricer_id+'&s_natcode='+s_natcode,
                                // success: function( data )
                                    // {
                                        // $("#preloader").css( "display", "none" );
                                        // if ( data == "error" ) {
                                        
                                            // returner = false;
                                            // alert('erreur');
                                            
                                        // } else {

                                            // $("#v-content").css( "display", "block" );
                                            // $("div#v-content").html(data);
                                            // returner = true;
                                        // }
                                    // },
                                // async:false
                            // });
                    
                            // return returner;
                        } else {
                            connsole.log('Erreur sur la variable s_natcode.');
                            return false;
                        }      
                    } else {
                        connsole.log('Erreur sur la variable pricer_id.');
                        return false;
                    }    
                } else {
                    dataLayer.push({
                        'message': 'Veuillez sélectionner un kilométrage',
                        'champ': 's_km',
                        'event': 'error'
                    });
                                
                    $("#s_engine").attr("class","form-valid");
                    $("#s_motorisation").attr("class","form-valid");
                    $("#s_finition").attr("class","form-valid");
                    $("#s_km").attr("class","form-error");
                    $(".mess-error").removeClass("hide").html("Merci de sélectionner les champs en rouge : Kilométrage");
                    return false;
                }
            } else {
                dataLayer.push({
                    'message': 'Veuillez sélectionner une finition',
                    'champ': 's_finition',
                    'event': 'error'
                });

                $("#s_engine").attr("class","form-valid");
                $("#s_motorisation").attr("class","form-valid");
                $("#s_finition").attr("class","form-error");
                $("#s_km").attr("class","form-error");
                $(".mess-error").removeClass("hide").html("Merci de sélectionner les champs en rouge : Finition | Kilométrage");
                return false;
            }
        } else {
            dataLayer.push({
                'message': 'Veuillez sélectionner une version',
                'champ': 's_motorisation',
                'event': 'error'
            });

            $("#s_engine").attr("class","form-valid");
            $("#s_motorisation").attr("class","form-error");
            $("#s_finition").attr("class","form-error");
            $("#s_km").attr("class","form-error");
            $(".mess-error").removeClass("hide").html("Merci de sélectionner les champs en rouge : Version | Finition | Kilométrage");
            return false;
        }
    } else {
        dataLayer.push({
            'message': 'Veuillez sélectionner une énergie',
            'champ': 's_engine',
            'event': 'error'
        });
        
        $("#s_engine").attr("class","form-error");
        $("#s_motorisation").attr("class","form-error");
        $("#s_finition").attr("class","form-error");
        $("#s_km").attr("class","form-error");
        $(".mess-error").removeClass("hide").html("Merci de sélectionner les champs en rouge : Energie | Version | Finition | Kilométrage");
        
        return false;
    }
}

function pricer_step_3_js()
{
    // var s_nom = $("#s_nom").val();
    var s_cp = $("#s_cp").val();
    var s_email = $("#s_email").val();
    var s_telephone = $("#s_telephone").val();
    var s_km = $("#s_km").val();
    var s_natcode = $("#s_natcode").val();
    
    var ladate=new Date()
    var s_year = $("#s_year").val();
    if( s_year == ladate.getFullYear() ){ s_year = ladate.getFullYear()-1; }
    
    var pricer_id = $("#pricer_id").val();
    
    // if ( s_nom != ''){
    // console.log(s_telephone);
    if ( s_email != '' && validate_email(s_email) && s_email != 'Votre e-mail *' 
        && s_telephone != "" && validate_phone(s_telephone) && s_telephone != 'Numéro de téléphone portable *'   
        && s_cp != '' && validate_cp(s_cp) && s_cp != 'Code postal *'  
        ){
                    // $("#v-content").css( "display", "none" );
                    $("#preloader").css( "display", "block" );

                    var returner = false;
                    var action = 'action=pricer_step_3_ajax';
                    
                    $.ajax({
                        url: ajax_url+'?'+action+'&s_cp='+s_cp+'&s_email='+s_email+'&s_telephone='+s_telephone+'&s_km='+s_km+'&s_natcode='+s_natcode+'&s_year='+s_year+'&pricer_id='+pricer_id,
                        success: function( data )
                            {
                                
                                dataLayer.push({
                                    'event': 'form_submit_3'
                                });
                                
                                // alert(data);
                                $("#preloader").css( "display", "none" );
                                if ( data == "error" ) {
                                    returner = false;
                                } else {
                                    returner = true;
                                }
                            },
                        async:false
                    });
                    
                    return returner;
    } else {
        
        var data = 'Merci de compléter les champs en rouge : ';
        if( s_email != '' && s_email != 'Votre e-mail *' && validate_email(s_email) ){ 
            $("#s_email").attr("class","form-valid");  
        } else {
            dataLayer.push({
                'message': 'Veuillez saisir un email valide',
                'champ': 's_email',
                'event': 'error'
            });    
            $("#s_email").attr("class","form-error"); 
            data += "Email | ";
        }
        
        if( s_telephone != '' && s_telephone != 'Numéro de téléphone portable *' && validate_phone(s_telephone) ){ 
            $("#s_telephone").attr("class","form-valid");  
        } else { 
            dataLayer.push({
                'message': 'Veuillez saisir un numéro de portable valide',
                'champ': 's_telephone',
                'event': 'error'
            });
            $("#s_telephone").attr("class","form-error"); 
            data += "Numéro de portable | ";
        }
        
        if( s_cp != '' && s_cp != 'Code postal *' && validate_cp(s_cp) ){ 
            $("#s_cp").attr("class","form-valid");  
        } else { 
           dataLayer.push({
                'message': 'Veuillez saisir un code postal valide',
                'champ': 's_cp',
                'event': 'error'
            });
           $("#s_cp").attr("class","form-error"); 
           data += "Code postal";
        }
        
        $(".mess-error").removeClass("hide").html(data);
         
        return false;
    }
        
    // } else {
        // alert('Veuillez saisir un nom.');
        // $("#mileage").focus();
        // return false;
    // }
}

/*
function pricer_step_4_js()
{
    var s_veh_type = $("input[name='s_veh_type']:checked").val();
    
	// VN
	var s_brand = $("#s_brand").val();
    var s_model = $("#s_model").val();
    var s_budget = $("#s_budget").val();
	
	// VO
    var s_delai_vn = $("#s_delai_vn").val();
    var s_delai_vo = $("#s_delai_vo").val();
	var s_type = [];
	$("input:checkbox[name=s_type]:checked").each(function(){
		s_type.push($(this).val());
	});

    var pricer_id = $("#pricer_id").val();

    if( !s_veh_type ){ s_veh_type = 0; }

        var returner = false;
        var action = 'action=pricer_step_4_ajax';
         
        $.ajax({
            url: ajax_url+'?'+action+'&s_brand='+s_brand+'&s_model='+s_model+'&s_budget='+s_budget+'&pricer_id='+pricer_id+'&s_veh_type='+s_veh_type+'&s_delai_vn='+s_delai_vn+'&s_type='+s_type+'&s_delai_vo='+s_delai_vo,
            success: function( data )
                {
                    $("#preloader").css( "display", "none" );
                    if ( data == "error" ) {
                        returner = false;
                    } else {
                        returner = true; 
                    }
                },
            async:false
        });
        
        return returner;

}
*/

function pricer_step_4_js()
{

    var s_agence = $("#s_agence").val();
    var s_date_rdv = $("#s_date_rdv").val();
    var s_heure = $("#s_heure").val();
    var s_nom = $("#s_nom").val();
    var s_prenom = $("#s_prenom").val();

	var pricer_id = $("#pricer_id").val();
    
    if ( s_agence != 0 && s_date_rdv != "" && s_date_rdv != "Sélectionner une date" && s_heure != "" ){
        var returner = false;
        var action = 'action=pricer_step_4_ajax';
         
        $.ajax({
            url: ajax_url+'?'+action+'&s_agence='+s_agence+'&s_date_rdv='+s_date_rdv+'&s_heure='+s_heure+'&s_prenom='+s_prenom+'&s_nom='+s_nom+'&pricer_id='+pricer_id,
            success: function( data )
                {
                    dataLayer.push({
                        'event': 'form_submit_4'
                    });
                    
                    $("#preloader").css( "display", "none" );
                    if ( data == "error" ) {
                        returner = false;
                    } else {
                        returner = true;
                    }
                },
            async:false
        });
        
        return returner;

    } else {
        
        var data = 'Merci de compléter les champs en rouge : ';
        if( s_agence != 0 ){ 
            $("#s_agence").attr("class","form-valid");  
        } else { 
            dataLayer.push({
                'message': 'Veuillez sélectionner une agence',
                'champ': 's_agence',
                'event': 'error'
            }); 
            $("#s_agence").attr("class","form-error"); 
            data += "Agence | ";
        }
        
        if( s_date_rdv != '' && s_date_rdv != 'Sélectionner une date' ){ 
            $("#s_date_rdv").attr("class","form-valid");  
        } else { 
            dataLayer.push({
                'message': 'Veuillez sélectionner une date',
                'champ': 's_date_rdv',
                'event': 'error'
            });             
            $("#s_date_rdv").attr("class","form-error"); 
            data += "Date du RDV | ";
        }
        
        if( s_heure != '' ){ 
            $("#s_heure").attr("class","form-valid");  
        } else { 
            dataLayer.push({
                'message': 'Veuillez sélectionner une heure',
                'champ': 's_heure',
                'event': 'error'
            }); 
            $("#s_heure").attr("class","form-error"); 
            data += "Heure du RDV";
        }
        
        // if( s_nom != '' && s_nom != 'Votre nom' ){ 
            // $("#s_nom").attr("class","form-valid");  
        // } else { 
            // $("#s_nom").attr("class","form-error"); 
            // data += "Veuillez saisir votre nom<br />";
        // } 
        
        // if( s_prenom != '' && s_prenom != 'Votre prénom' ){ 
            // $("#s_prenom").attr("class","form-valid");  
        // } else { 
            // $("#s_prenom").attr("class","form-error"); 
            // data += "Veuillez saisir votre prénom<br />";
        // }
        
        $(".mess-error").removeClass("hide").html(data);
        
        return false;
    }
}

function affiche_info_agence()
{
    var s_agence = $("#s_agence").val();

    if ( s_agence != 0 ) {

        $("#result_agence").css( "display", "none" );

        $.get( 
            ajax_url,
            { action: "affiche_info_agence", s_agence: s_agence },
            function( data )
            {
                if ( data == "error" ) {
                
                    return false;
                } else {
                    $("#result_agence").css( "display", "block" );
                    $("#result_agence").html(data);
                    return true;
                }
            }
        );
                            
    } else {
        return false;
    }
}

