<?php

$erreurMail = '';

$mail = isset($_POST['email']) ? strip_tags(stripslashes($_POST['email'])) : '';

$mailto = 'audrey@autopink.com';

if(isset($_POST['submit'])){

 	if(empty($mail)){
 		$erreurMail = 'Le champ Email est obligatoire';
 		$status = "erreur"; 
 	}else{
 		if(!preg_match('/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i', $mail)){
 			$erreurMail = "L'adresse email est invalide";
 			$status = "erreur";
 		}
 	}

 	if($status == ''){

 		$subject = "Demande newsletter Facilicar";
 		$headers = 'From: <' . $mail . '>' . "\r\n" .
 				   'Reply-To: ' . $mail . "\r\n";
 		$content = 'Adresse e-mail: ' . $mail . "\r\n";

        $sent = mail($mailto, $subject, $content, $headers);

 		if($sent){
 			$status = 'succes';
 		}else{ 
 			$status = 'erreur'; 	
 			$erreurEnvoi = "Nous sommes désolés, une erreur est survenue. Veuillez réessayer!";
 		}
 	}
}

?>

<!DOCTYPE html>
<!--[if lt IE 9]> <html class='landing no-js lt-ie9 lt-ie10'> <![endif]-->
<!--[if IE 9]> <html class="landing no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html class='landing no-js'> <!--<![endif]-->

	<head>
	  	<meta charset="utf-8">
	  	<title>Achat et vente de véhicule sur internet - Facilicar</title>
	  	
	  	<!--[if IE]> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> <![endif]-->
	  	<meta name="viewport" content="width=device-width,initial-scale=1">
	  	<meta name="description" content="Achetez ou vendez votre voiture de façon plus simple, plus sûr et plus rapide avec Facilicar.com">
		
		<link rel="stylesheet" href="css/libs/normalize.css">
	  	<link rel="stylesheet" href="css/style.css">
		
		<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
		<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
		<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
		<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
		<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
		<link rel="manifest" href="/manifest.json">
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="/mstile-144x144.png">
		<meta name="theme-color" content="#ffffff">

		<script src="js/libs/modernizr.js" type="text/javascript"></script>
	</head>

	<body>
		<section id="content-landing">
			<div class="container">
				<div class="logo-big"></div>
				<h1><span>Ici, prochainement,</span> achetez ou vendez votre belle voiture&nbsp;!</h1>
				<p>Inscrivez-vous pour être prévenu de la mise en ligne de facilicar.com :</p>
				
				<?php if($status == 'succes'){ ?>

					<p>Merci, votre demande a bien été envoyée.</p>

				<?php }else{ ?>

					<?php if($status == 'erreur'){
						echo "<p><b>Oups! Nous n'avons pas pu envoyer votre demande:/b><br/>";
						if($erreurMail != '') echo $erreurMail .'<br/>';
						if($erreurEnvoi != '') echo $erreurEnvoi;
						echo '</p>';
					} ?>
					
					<form id='formContact' action="#" method="POST">
						<input id="email" name="email" type="text" placeholder="Votre adresse email"><!--
						--><button type='submit' name='submit' id='submit' form='formContact' class="button-arrow button-primary bg-primary"><span class="arrow-button">›</span><span class="txt-button">Envoyer</span><span class="txt-hover-button" data-hover="Envoyer"></span></button>
					</form>

				<?php } ?>
			</div>
		</section>

		<!-- jQuery -->
		<script src="js/libs/jquery-1.11.3.min.js" type="text/javascript"></script>
		<!-- Tweens -->
		<script src="js/libs/greensock/TweenMax.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/TimelineMax.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/plugins/BezierPlugin.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/plugins/CSSRulePlugin.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/plugins/ScrollToPlugin.min.js" type="text/javascript"></script>
		<!-- imgLiquid -->
		<script src="js/libs/imgLiquid-min.js" type="text/javascript"></script>
		<!-- Cookie -->
		<script src="js/libs/js.cookie.js" type="text/javascript"></script>
		<!-- Scripts custom -->
		<script src="js/script.js" type="text/javascript"></script>
	</body>
</html>
