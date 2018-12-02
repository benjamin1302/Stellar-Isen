<?php
include('bdd.php');

$listePlanet = array(array());

$listePlanet[0] = getPlanetInfo('Soleil');
$listePlanet[1] = getPlanetInfo('Venus');
$listePlanet[2] = getPlanetInfo('Mercury');
$listePlanet[3] = getPlanetInfo('Earth');
$listePlanet[4] = getPlanetInfo('Mars');
$listePlanet[5] = getPlanetInfo('Jupiter');
$listePlanet[6] = getPlanetInfo('Saturn');
$listePlanet[7] = getPlanetInfo('Uranus');
$listePlanet[8] = getPlanetInfo('Neptune');

$satList = array(array());

$satList[0] = getSat('Earth');
$satList[1] = getSat('Mars');
$satList[2] = getSat('Jupiter');
$satList[3] = getSat('Saturn');
$satList[4] = getSat('Uranus');
$satList[5] = getSat('Neptune');

$searchList = array(array());
?>


<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="ressources/images/logo.png">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Stellar'ISEN</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
        @import 'style.css';
    </style>

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
<!--Conteneur du rendu 3D-->
<div id='container'>
    <div id="selector">
        <ul>
        <div id="planet_title">Planètes</div>
        <?php
    for($i = 0; $i < count($listePlanet); $i++)
    {
        $nom                = $listePlanet[$i][0];
        $type               = $listePlanet[$i][1];
        $diametre           = $listePlanet[$i][2];
        $longueurJour       = $listePlanet[$i][3];
        $periodeOrbital     = $listePlanet[$i][4];
        $temperatureMoyenne = $listePlanet[$i][5];
        $densite            = $listePlanet[$i][6];
        $masse              = $listePlanet[$i][7];

        echo "<li><a $nom id='$nom'> $nom </a></li>";
        echo "<div id='planet_info_$nom' class='hidden'>";
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
        echo "<tr class='planet_button' ><td > <a  href='information.php?planet=$nom&amp;sat=0&amp;parent=$nom'><p>Plus d'informations </p></a> </td></tr>";


        echo "</table>";
        echo "</div>";
    }


    ?>
        </ul>
    </div>
    
    <div id="moon" class="hidden">
    <div id="moon_title">Lunes</div>
        <ul>
            
            <div id="moon_Earth" class="hidden">
            <?php
                    for($i = 0; $i < count($satList[0]); $i++){
                        $satellite = $satList[0][$i];
                        echo "<li><a href='information.php?planet=$satellite&amp;sat=1&amp;parent=Earth'>$satellite</a></li>";
                    } 
            ?>
                
            </div>
            <div id="moon_Mars" class="hidden">
            <?php
                    for($i = 0; $i < count($satList[1]); $i++){
                        $satellite = $satList[1][$i];
                        echo "<li><a href='information.php?planet=$satellite&amp;sat=1&amp;parent=Mars'>$satellite</a></li>";
                    } 
            ?>
            </div>
            <div id="moon_Jupiter" class="hidden">
            <?php
                    for($i = 0; $i < count($satList[2]); $i++){
                        $satellite = $satList[2][$i];
                        echo "<li><a href='information.php?planet=$satellite&amp;sat=1&amp;parent=Jupiter'>$satellite</a></li>";
                    } 
            ?>
            </div>
            <div id="moon_Saturn" class="hidden">
            <?php
                    for($i = 0; $i < count($satList[3]); $i++){
                        $satellite = $satList[3][$i];
                        echo "<li><a href='information.php?planet=$satellite&amp;sat=1&amp;parent=Saturn'>$satellite</a></li>";
                    } 
            ?>
            </div>
            <div id="moon_Uranus" class="hidden">
            <?php
                    for($i = 0; $i < count($satList[4]); $i++){
                        $satellite = $satList[4][$i];
                        echo "<li><a href='information.php?planet=$satellite&amp;sat=1&amp;parent=Uranus'>$satellite</a></li>";
                    } 
            ?>
            </div>
            <div id="moon_Neptune" class="hidden">
            <?php
                    for($i = 0; $i < count($satList[5]); $i++){
                        $satellite = $satList[5][$i];
                        echo "<li><a href='information.php?planet=$satellite&amp;sat=1&amp;parent=Neptune'>$satellite</a></li>";
                    } 
            ?>
            </div>




        </ul>
    </div>

    <div id="gui_container"></div>
</div>

<footer>
</footer>

<script src="lib/three.js"></script>
<script src="lib/OrbitControls.js"></script>
<script src="lib/Coordinates.js"></script>
<script src="lib/dat.gui.min.js"></script>
<script src="lib/stats.min.js"></script>
<script src="lib/threex.keyboardstate.js"></script>
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script src="solar-system.js"></script>
<script src="searchbar.js"></script>



</body>

</html>