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

        if( $password1 != $password2)
            echo "<script>alert( 'Les mots de passe ne correspondent pas' );</script>";

        echo "<script>console.log( 'Bonjour' );</script>";
        if(inscription($pseudo, $password1))
        {
            echo "<script>console.log( 'Inscription reussi' );</script>";
            echo "<p> Inscription reussi  ,Cliquez <a href=\"./signin.php\">ici</a> pour aller à la page de connexion</p>";
        }
        else
        {
            echo "<script>console.log( 'Inscription echoue' );</script>";
            echo "<p> Echec de l'inscription  ,Cliquez <a href=\"./signin.php\">ici</a> pour retourner à la page d'inscription</p>";
        }
    }
}

?>

<footer>
    <p>Copyright © 2018 - StellarISEN </p>
</footer>
</body>
</html>


