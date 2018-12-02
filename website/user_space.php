<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="ressources/images/logo.png">
        <title>Espace Utilisateur</title>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <style>
            @import 'style.css';
        </style>
    </head>
    
    <body>
        <header id="topnav">
            <a href="index.php"><img src="ressources/images/logo.png" alt="Logo du site" class="logo"/></a>
                    <nav role='navigation'>
                        <li><a href="#">Deconnexion</a></li>
                    </nav>
        </header>

        <div id="formulary">
        <h1>Informations Personelles</h1>
        <!--Nom de fichier de traitement back à modifier-->
        <form method="post" action="authentification">
            <input type="text" name="pseudo" id="pseudo" placeholder="Votre Pseudonyme" minlength="3" required/><input type="submit" id="submit" value="Changer le pseudonyme" />
            <br />
            <input type="password" name="password" id="password" placeholder="Mot de Passe" minlength="4" required/><input type="submit" id="submit" value="Changer le mot de passe" />
            <br />
        </form>
        </div>

        <div id="favori_list">
            <h1>Liste de favoris</h1>
            <ul>
                <?php 
                ?>
                <li>Nom de l'astre/satellite à afficher</li>
            </ul>
        </div>
        
        <footer>
            <p>Copyright © 2018 - StellarISEN </p>
        </footer>
    </body>
</html>