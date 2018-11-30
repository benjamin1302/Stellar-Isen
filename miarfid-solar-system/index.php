<?php
include('bdd.php');

$listePlanet = array(array());

$listePlanet[0] = getPlanetInfo('Soleil');
$listePlanet[1] = getPlanetInfo('Venus');
$listePlanet[2] = getPlanetInfo('Mercury');
$listePlanet[3] = getPlanetInfo('Mars');
$listePlanet[4] = getPlanetInfo('Earth');
$listePlanet[5] = getPlanetInfo('Jupiter');
$listePlanet[6] = getPlanetInfo('Saturn');
$listePlanet[7] = getPlanetInfo('Uranus');
$listePlanet[8] = getPlanetInfo('Neptune');
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
        echo "<tr class='planet_button' ><td > <a  href='information.php?planet=$nom'><p>Plus d'informations </p></a> </td></tr>";


        echo "</table>";
        echo "</div>";
    }


    ?>
        </ul>
    </div>
    
    <div id="moon" class="hidden">
        <ul>
            <div id="moon_title">Lunes</div>
            <div id="moon_Earth" class="hidden">
                <li><a href="information.php">Lune</a></li>
            </div>
            <div id="moon_Mars" class="hidden">
                <li><a href="information.php">Deimos</a></li>
                <li><a href="information.php">Phobos</a></li>
            </div>
            <div id="moon_Jupiter" class="hidden">
                <li><a href="information.php">Callisto</a></li>
                <li><a href="information.php">Ganymède</a></li>
                <li><a href="information.php">Europe</a></li>
                <li><a href="information.php">Io</a></li>
            </div>
            <div id="moon_Saturn" class="hidden">
                <li><a href="information.php">Dioné</a></li>
                <li><a href="information.php">Encelade</a></li>
                <li><a href="information.php">Hyperion</a></li>
                <li><a href="information.php">Japet</a></li>
                <li><a href="information.php">Mimas</a></li>
                <li><a href="information.php">Pheobé</a></li>
                <li><a href="information.php">Rhéa</a></li>
                <li><a href="information.php">Tethys</a></li>
                <li><a href="information.php">Titan</a></li>
            </div>
            <div id="moon_Uranus" class="hidden">
                <li><a href="information.php">Ariel</a></li>
                <li><a href="information.php">Puck</a></li>
                <li><a href="information.php">Miranda</a></li>
                <li><a href="information.php">Obéron</a></li>
                <li><a href="information.php">Titania</a></li>
                <li><a href="information.php">Umbriel</a></li>
            </div>
            <div id="moon_Neptune" class="hidden">
                <li><a href="information.php">Néréide</a></li>
                <li><a href="information.php">Triton</a></li>
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

<script src="solar-system.js"></script>



</body>

</html>