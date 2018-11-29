<?php


$json = file_get_contents("systemeSolaire.json");

$json_data = json_decode($json, true);

$taille = count($json_data['planets']);

echo $taille;


try
{
    $bdd = new PDO('mysql:host=localhost;dbname=StellarIsen;charset=utf8', 'root', 'benjamin');
    // set the PDO error mode to exception
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sql = "INSERT INTO astre (nom , type , diametre, longueurJour, periodeOrbital, temperatureMoyenne) VALUES ('Soleil', 'Etoile', 1391016, null ,null , 5778)";
    echo $sql . "\n";
    if ($bdd->exec($sql)) {
        echo "New record astre 'sun' created successfully" . "\n";
    }
    else
    {
        echo "Error insert sun". "\n" ;
    }
    for ( $i = 0; $i < $taille; $i++)
    {
        $name            = $json_data['planets'][$i]["name"];
        $diametre        = $json_data['planets'][$i]["diameter"];
        $longueurJour    = $json_data['planets'][$i]["lengthOfDay"];
        $periodOrbital   = $json_data['planets'][$i]["orbitalPeriod"];
        $inclinaison     = $json_data['planets'][$i]["orbitalInclination"];
        $temperatureA    = $json_data['planets'][$i]["meanTemperature"];
        $masse           = $json_data['planets'][$i]["mass"];
        $density         = $json_data['planets'][$i]["density"];
        $tableauSatelite = $json_data['planets'][$i]['satellites'];

        echo "test";
        $sql = "INSERT INTO astre (nom , type , diametre, longueurJour, periodeOrbital, temperatureMoyenne) VALUES ('$name', 'planet', $diametre, $longueurJour, $periodOrbital, $temperatureA)";
        echo $sql . "\n";
        if ($bdd->exec($sql)) {
            echo "New record astre $name created successfully" . "\n";
        }
        else
        {
            echo "Error update $name". "\n" ;
        }

        if (count($tableauSatelite) != 0 )
        {
            for ( $u = 0 ; $u < count($tableauSatelite) ; $u++)
            {
                $astreId            = $i + 1;
                $nameSat            = $json_data['planets'][$i]['satellites'][$u]['name'];
                $diametreSat        = $json_data['planets'][$i]["satellites"][$u]['diameter'];
                $periodOrbitalSat   = $json_data['planets'][$i]['satellites'][$u]["orbitalPeriod"];
                $inclinaisonSat     = $json_data['planets'][$i]['satellites'][$u]["orbitalInclination"];
                $temperatureSSat    = $json_data['planets'][$i]['satellites'][$u]["surfaceTemps"]["mean"];
                $masseSat           = $json_data['planets'][$i]['satellites'][$u]["mass"];

                $sql = "INSERT INTO satellite (astreId, nom ,diametre, periodeOrbital, temperatureMoyenne) VALUES ($astreId, '$nameSat', $diametreSat, $periodOrbitalSat, $temperatureSSat)";

                if ($bdd->exec($sql))
                {
                    echo "New record satellite $nameSat  created successfully" . "\n";
                }
                else
                {
                    echo "Error: " . $sql . "\n" . $bdd->error;
                }

            }
        }



    }

}
catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

function updateDensity( )
{
    $json = file_get_contents("systemeSolaire.json");

    $json_data = json_decode($json, true);

    $taille = count($json_data['planets']);

    try {
        $bdd = new PDO('mysql:host=localhost;dbname=StellarIsen;charset=utf8', 'root', 'benjamin');
        // set the PDO error mode to exception
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        for ($i = 0; $i < $taille; $i++) {
            $masse = $json_data['planets'][$i]["mass"];
            $density = $json_data['planets'][$i]["density"];
            $id = $json_data['planets'][$i]['id'] + 1;

            $sql = "UPDATE astre set masse='$masse' , densite='$density' where id=$id";

            if ($bdd->exec($sql)) {
                echo "Update successfull" . "\n";
            } else {
                echo "Error update $id" . "\n";
            }
        }
    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }
}

updateDensity();


?>



