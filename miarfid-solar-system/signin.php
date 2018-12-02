<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="ressources/images/logo.png">
        <title>S'enregistrer</title>
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
                        <ul>
                            <li class="button"><a href="login.php">Se connecter</a></li>
                        </ul>
                    </nav>
        </header>

        <div id="formulary">
        <h1>Créez votre Compte</h1>
        <form method="post" action="inscription.php">
            <fieldset>
                <h2>Identifiants</h2>
                <label for="pseudo">Nom de Compte :</label>  
                <input type="text" name="pseudo" id="pseudo" placeholder="Votre Pseudonyme" minlength="3" required/>
                <br />
                <label for="pass">Votre mot de passe :</label>
                <input type="password" name="password1" id="password1" placeholder="Mot de Passe" minlength="4" required/>
                <br />
                <label for="pass">Confirmez votre mot de passe :</label>
                <input type="password" name="password2" id="password2" placeholder="Mot de Passe" minlength="4" required/>
            </fieldset>
            <br />
            <input type="submit" id="submit" value="Valider" />
        </form>
        </div>
        
        <footer>
            <p>Copyright © 2018 - StellarISEN </p>
        </footer>
    </body>
</html>