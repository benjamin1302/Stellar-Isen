<?php
include('bdd.php');

$listePlanet = array();
$listePlanet = getPlanetInfo($_GET['planet'])
?>

<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="ressources/images/logo.png">
    <!--Implémenter le nom de l'astre etudié à la place du mot information-->
    <title>Stellar'ISEN : Information</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
        @import 'style.css';
    </style>
    <script type="text/javascript" src="jspdf.min.js"></script>
</head>

<body>
    <header id="topnav">
        <a href="index.php"><img src="ressources/images/logo.png" alt="Logo du site" class="logo" /></a>
        <nav role='navigation'>
            <ul>
                <li><a href="#">Espace Personel</a></li>
                <div class="login_status">
                    <li><a href="login.php">Connexion</a></li>
                    <li><a href="signin.php">S'enregistrer</a></li>
                    <li><a href="#">Deconnexion</a></li>
                </div>
            </ul>
        </nav>
        <form id="searchbar">
            <input type="search" placeholder="Recherche">
            <button type="submit"><i class="fa fa-check"></i></button>
            <ul id="result" class="hidden">
        
            </ul>
        </form>
    </header>

    <div id="information">
        <!--Inserer dans le titre, le nom de l'astre à la place du texte ecrit-->
        <h1 id="astre"><span id="texture"><?php echo "$listePlanet[0]"?></span><button id="favori" title="Ajouter aux Favoris"><i id="fav_icon" class="fa fa-star-o"></i></button></h1>
        <div id="content">
            <h3>Texte Descriptif</h3>
            <p>
                <?php 
                $nom                = $listePlanet[0];
                $type               = $listePlanet[1];
                $diametre           = $listePlanet[2];
                $longueurJour       = $listePlanet[3];
                $periodeOrbital     = $listePlanet[4];
                $temperatureMoyenne = $listePlanet[5];
                $densite            = $listePlanet[6];
                $masse              = $listePlanet[7];
                $description        = $listePlanet[8];

                echo "$description"
                ?>
            </p>
        </div>
        <div id="preview"></div>
        <div id="basic_info">
            
            <?php
        
        echo "<table>";
        echo "<tr><td>Type</td><td>$type</td></tr>";
        echo "<tr><td>Diametre</td><td>$diametre KM</td></tr>";
        if(!empty($longueurJour))
        {
            echo "<tr><td>Longueur du jour</td><td>$longueurJour Hrs</td></tr>";
        }
        echo "<tr><td>Temperature moyenne</td><td>$temperatureMoyenne K</td></tr>";
        if(!empty($longueurJour))
        {
            echo "<tr><td>Periode orbital</td><td>$periodeOrbital Days </td></tr>";
        }
        echo "<tr><td>Masse</td><td>$masse </td></tr>";
        echo "<tr><td>Densite</td><td>$densite m3</td></tr>";
        echo "</table>";
        echo "</div>";
    ?>
        </div>
    </div>
    <div id="interact">
        <div id="inter1">
            <h4 id="tag"><a href="#">Gestions des tags</a></h4>
            <div id="tag_content" class="hidden">
                <ul>
                    <!--Inserer à la place de cette item de liste d'exemple, les tags de bases-->
                    <li><?php echo "$listePlanet[0]"?></li>
                </ul>
                <form>
                    <input id="tag1" type="search" placeholder="Ajouter un tag">
                    <button id="tag2" type="submit"><i class="fa fa-plus"></i></button>
                </form>
            </div>
        </div>
        <div id="inter2">
            <h4 id="pdf_gen"><a href="#">Télécharger la page</a></h4>
            <div id="pdf_content" class="hidden">
                    <button id="pdf_gen">Télécharger la page en PDF</button>
            </div>
        </div>
    </div>
    <div id="editor"></div>

    <footer>
        <p>Copyright © 2018 - StellarISEN </p>
    </footer>

    <script src="lib/three.js"></script>
    <script src="test.js"></script>
    <script src="interactions.js"></script>
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="searchbar.js"></script>
    

</body>

</html>