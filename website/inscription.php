<html>
<head>
    <link rel="shortcut icon" href="ressources/images/logo.png">
    <title>Inscription</title>
</head>

<body>

<?php

include('bdd.php');

if(empty($_POST['pseudo'])) {
    echo "Le champ Pseudo est vide.";
    echo "<script>console.log( 'Pseudo vide' );</script>";
} else {
    // on vérifie maintenant si le champ "Mot de passe" n'est pas vide"
    if(empty($_POST['password1'] || empty($_POST['password2']) )) {
        echo "<p> echec de l'inscription  ,Cliquez <a href=\"./signin.php\">ici</a> pour retourner à la page d'inscription</p>";
    } else {
        // les champs sont bien posté et pas vide, on sécurise les données entrées par le membre:
        $pseudo = $_POST['pseudo'];
        $password1 = $_POST['password1'];
        $password2 = $_POST['password2'];
        $bdd = connexionBDD();
        if( !$bdd )
        {
            echo "<script>console.log( 'echec de conexion a la base de données (bdd.php) ' );</script>";
        }
    
        $sql =  "SELECT id FROM usr where user='$pseudo'";
        
        $res = $bdd->query($sql);
        if($res->fetchColumn() > 0 )
        {
            echo "<p> User deja existant  ,Cliquez <a href=\"./signin.php\">ici</a> pour retourner à la page d'inscription</p>";
            return 0;
        }
        elseif( $password1 != $password2)
        {
            echo "<script>alert( 'Les mots de passe ne correspondent pas' );</script>";
            echo "<p> Echec de l'inscription  ,Cliquez <a href=\"./signin.php\">ici</a> pour retourner à la page d'inscription</p>";
            echo "<script>console.log( 'Bonjour' );</script>";
            return 0;
        }
        elseif(inscription($pseudo, $password1))
        {
            echo "<script>console.log( 'Inscription reussi' );</script>";
            header ('location: http://127.0.0.1/Stellar-Isen/website/index.php');
        }
        else
        {
            echo "<script>console.log( 'Inscription echoue' );</script>";
            echo "<p> Echec de l'inscription  ,Cliquez <a href=\"./login.php\">ici</a> pour retourner à la page d'inscription</p>";
        }
    }
}

?>

<footer>
    <p>Copyright © 2018 - StellarISEN </p>
</footer>
</body>
</html>


