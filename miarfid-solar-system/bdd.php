<?php
/**
 * Created by PhpStorm.
 * User: bdelbreuve
 * Date: 14/11/18
 * Time: 12:18
 */

function connexionBDD()
{
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=StellarIsen;charset=utf8', 'root', '');
        // set the PDO error mode to exception
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $bdd;
}

function getPlanetInfo( $name )
{
    $infoPlanet = array(array());
    try {
        $bdd = connexionBDD();
        // set the PDO error mode to exception

        $sql =  "SELECT nom, type, diametre, longueurJour, periodeOrbital, temperatureMoyenne, densite, masse, description FROM astre where nom='$name'";
        foreach  ($bdd->query($sql) as $row) {
            $infoPlanet[0] = $row['nom'];
            $infoPlanet[1] = $row['type'];
            $infoPlanet[2] = $row['diametre'];
            $infoPlanet[3] = $row['longueurJour'];
            $infoPlanet[4] = $row['periodeOrbital'];
            $infoPlanet[5] = $row['temperatureMoyenne'];
            $infoPlanet[6] = $row['densite'];
            $infoPlanet[7] = $row['masse'];
            $infoPlanet[8] = $row['description'];

        }

    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $infoPlanet;
}

function getSatInfo( $name )
{
    $infoSat = array(array());
    try {
        $bdd = connexionBDD();
        // set the PDO error mode to exception

        $sql =  "SELECT nom, diametre, periodeOrbital, temperatureMoyenne, description FROM `satellite` WHERE nom ='$name'";
        foreach  ($bdd->query($sql) as $row) {
            $infoSat[0] = $row['nom'];
            $infoSat[1] = $row['diametre'];
            $infoSat[2] = $row['periodeOrbital'];
            $infoSat[3] = $row['temperatureMoyenne'];
            $infoSat[4] = $row['description'];

        }

    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $infoSat;
}

function getSat( $name)
{
    $satList = array();
    $i = 0;
    try {
        $bdd = connexionBDD();
        // set the PDO error mode to exception

        $sql =  "SELECT s.nom FROM astre a, satellite s WHERE a.id = s.astreId AND a.nom='$name'";
        foreach  ($bdd->query($sql) as $row) {
            $satList[$i] = $row['nom'];
            $i++;
        }

    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $satList;
}

function getTagsbyAstre($name)
{
    $tagList = array();
    $i = 0;
    try {
        $bdd = connexionBDD();
        // set the PDO error mode to exception

        $sql =  "SELECT t.tag FROM astre a, tag t WHERE a.id = t.astreId AND a.nom='$name'";
        foreach  ($bdd->query($sql) as $row) {
            $tagList[$i] = $row['tag'];
            $i++;
        }

    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $tagList;
}

function getTagsbySat($name)
{
    $tagList = array();
    $i = 0;
    try {
        $bdd = connexionBDD();
        // set the PDO error mode to exception

        $sql =  "SELECT t.tag FROM satellite s, tag t WHERE s.id = t.satId AND s.nom='$name'";
        foreach  ($bdd->query($sql) as $row) {
            $tagList[$i] = $row['tag'];
            $i++;
        }

    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $tagList;
}

function getSearchList($name)
{
    $searchList = array(array());
    try {
        $bdd = connexionBDD();
        // set the PDO error mode to exception

        $sql =  "SELECT a.nom, t.tag FROM astre a, tag t WHERE a.id = t.astreId and t.tag='$name'";
        foreach  ($bdd->query($sql) as $row) {
            $searchList[0] = $row['nom'];
            $searchList[1] = $row['tag'];
        }

    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $searchList;
}

function authentification( $user, $password)
{
    $bdd = connexionBDD();
    if( !$bdd )
    {
        echo "<script>console.log( 'echec de conexion a la base de données (bdd.php) ' );</script>";
    }
    $sql =  "SELECT id, user FROM user where user='$user' and password='$password'";

    $res = $bdd->query($sql);
    if($res->fetchColumn() < 1)
    {
        return false;
    }

    $sql = "update user set online=true where user='$user' and password='$password'";
    if($bdd->query($sql))
    {
        echo "Update with sucess";
    }
    else
    {
        echo  "Update connection Failed";
        return false;
    }

    return true;
}

function inscription( $user, $passaword)
{
    $bdd = connexionBDD();
    if( !$bdd )
    {
        echo "<script>console.log( 'echec de conexion a la base de données (bdd.php) ' );</script>";
    }

    $sql = "insert into user(user,password) values('$user','$passaword')";
    if($bdd->query($sql))
    {
        echo "inscription reussi";
        echo "<script>console.log( 'conexion a la base de données (bdd.php) ' );</script>";
        return true;
    }
    else
    {
        echo "<script>console.log( 'echec conexion a la base de données (bdd.php) ' );</script>";
        echo  "inscription Failed";
        return false;
    }
}

//inscription("benji","benji");

?>
