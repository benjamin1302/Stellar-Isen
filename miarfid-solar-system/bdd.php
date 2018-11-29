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
        $bdd = new PDO('mysql:host=localhost;dbname=StellarIsen;charset=utf8', 'root', 'benjamin');
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

        $sql =  "SELECT nom, type, diametre, longueurJour, periodeOrbital, temperatureMoyenne, densite, masse FROM astre where nom='$name'";
        foreach  ($bdd->query($sql) as $row) {
            $infoPlanet[0] = $row['nom'];
            $infoPlanet[1] = $row['type'];
            $infoPlanet[2] = $row['diametre'];
            $infoPlanet[3] = $row['longueurJour'];
            $infoPlanet[4] = $row['periodeOrbital'];
            $infoPlanet[5] = $row['temperatureMoyenne'];
            $infoPlanet[6] = $row['densite'];
            $infoPlanet[7] = $row['masse'];

        }

    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    return $infoPlanet;
}

function authentification( $user, $password)
{
    $bdd = connexionBDD();
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


?>
