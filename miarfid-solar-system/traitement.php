<html>
<head>
    <link rel="shortcut icon" href="ressources/images/logo.png">
    <title>Authentification</title>
</head>

<body>

<?php
/*
Page: connexion.php
*/

include('bdd.php');

// à mettre tout en haut du fichier .php, cette fonction propre à PHP servira à maintenir la $_SESSION
if(isset($_POST['submit'])) { // si le bouton "Connexion" est appuyé
    // on vérifie que le champ "Pseudo" n'est pas vide
    echo "<script>console.log( 'Bonjour' );</script>";
    // empty vérifie à la fois si le champ est vide et si le champ existe belle et bien (is set)
    if(empty($_POST['pseudo'])) {
        echo "Le champ Pseudo est vide.";
    } else {
        // on vérifie maintenant si le champ "Mot de passe" n'est pas vide"
        if(empty($_POST['password'])) {
            echo "<script>console.log( 'Champ password vide' );</script>";
        } else {
            // les champs sont bien posté et pas vide, on sécurise les données entrées par le membre:
            $pseudo = $_POST['pseudo'];
            $password = $_POST['password'];

            if(authentification($pseudo, $password))
            {
                $message="'$pseudo' vous etes maintenant connecté'";
                echo "<script>console.log( $message );</script>";
                session_start();

                $_SESSION['pseudo'] = $_POST['pseudo'];
                $_SESSION['password'] = $_POST['password'];

                echo "<p> $message ,vous allez etre rediriger vers la page d'acceuil</p>";
                echo "<script>alert( 'Connexion reussi' );</script>";
                sleep(5);
                header ('location: http://127.0.0.1/Stellar-Isen/miarfid-solar-system/index.php');
            }
            else{
                $message="Mot de passe ou pseudo invalide";
                echo "<script>console.log( $message );</script>";
                echo "<p> $message </p>";
                echo "</p>Cliquez <a href=\"./login.php\">ici</a> pour revenir à la page de connexion</p>";

            }

        }
    }
}
?>

<footer>
    <p>Copyright © 2018 - StellarISEN </p>
</footer>
</body>
</html>
