<?php
include('bdd.php');

$listePlanet = array();
$tagList = array();
$id = array();
$sat = $_GET['sat'];
$parent = $_GET['parent'];
if($sat==0){
    $listePlanet = getPlanetInfo($_GET['planet']); 
    $tagList = getTagsByAstre($_GET['planet']);
    $id = getAstreId($_GET['planet']);
}
else if($sat==1){
    $listePlanet = getSatInfo($_GET['planet']); 
    $tagList = getTagsBySat($_GET['planet']);
    $id = getSatId($_GET['planet']);
}

echo "<script>console.log($id[0])</script>"
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
                <div id ="connected" class="hidden">
                    <li><a href="user_space.php">Espace Personel</a></li>
                    <li><a href="#">Deconnexion</a></li>
                </div>
                <div id="disconnected" class="visible">
                    <li><a href="login.php">Connexion</a></li>
                    <li><a href="signin.php">S'enregistrer</a></li>
                </div>
            </ul>
        </nav>
        <form id="searchbar">
            <input type="search" placeholder="Recherche" id="search_input">
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
                if($sat == 0){
                $nom                = $listePlanet[0];
                $type               = $listePlanet[1];
                $diametre           = $listePlanet[2];
                $longueurJour       = $listePlanet[3];
                $periodeOrbital     = $listePlanet[4];
                $temperatureMoyenne = $listePlanet[5];
                $densite            = $listePlanet[6];
                $masse              = $listePlanet[7];
                $description        = $listePlanet[8];
                }
                else if($sat == 1){
                    $nom                = $listePlanet[0];
                    $diametre           = $listePlanet[1];
                    $periodeOrbital     = $listePlanet[2];
                    $temperatureMoyenne = $listePlanet[3];
                    $description        = $listePlanet[4];
                }

                echo "$description"
                ?>
            </p>
        </div>
        <div id="preview"></div>
        <div id="basic_info">
            
            <?php
        
        echo "<table>";
        if($sat == 0){echo "<tr><td>Type</td><td>$type</td></tr>";}
        echo "<tr><td>Diametre</td><td>$diametre KM</td></tr>";
        if($sat == 0){if(!empty($longueurJour))
        {
            echo "<tr><td>Longueur du jour</td><td>$longueurJour Hrs</td></tr>";
        }}
        echo "<tr><td>Temperature moyenne</td><td>$temperatureMoyenne K</td></tr>";
        if($sat == 0){if(!empty($longueurJour))
        {
            echo "<tr><td>Periode orbital</td><td>$periodeOrbital Days </td></tr>";
        }}
        if($sat == 1){echo "<tr><td>Periode orbital</td><td>$periodeOrbital Days </td></tr>";}
        if($sat == 0){echo "<tr><td>Masse</td><td>$masse </td></tr>";
        echo "<tr><td>Densite</td><td>$densite m3</td></tr>";}
        if($sat == 1){echo "<tr><td>Satellite de</td><td><a href='?planet=$parent&amp;sat=0&amp;parent=$parent'>$parent</a></td></tr>";}
        echo "</table>";
        echo "</div>";
    ?>
        </div>
    </div>
    <div id="interact">
        <div id="inter1">
            <h4 id="tag"><a href="#">Gestions des tags</a></h4>
            <div id="tag_content" class="hidden">
                <ul id="tagList">
                <?php 
                    for($i = 0; $i < count($tagList); $i++){
                        echo "<li>$tagList[$i]</li>";
                    }
                ?>
                <span id="newTag"></span>
                </ul>
                    <input id="tag1" type="search" placeholder="Ajouter un tag">
                    <button id="tag2" type="submit"><i class="fa fa-plus"></i></button>
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