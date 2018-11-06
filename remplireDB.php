<?php


$json_source = '{"nom":"Adriana", "naissance":"1981-06-12"}';
$json = file_get_contents("solarsystem.json");

$json_data = json_decode($json, true);

$taille = count($json_data['planets']);
echo $json_data['planets'][0]["name"];
echo  $taille;

try
{
    $bdd = new PDO('mysql:host=localhost;dbname=StellarIsen;charset=utf8', 'root', 'benjamin');
}
catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

for ( $i = 0; $i < $taille; $i++)
{
    $name            = $json_data['planets'][$i]["name"];
    $diametre        = $json_data['planets'][$i]["diameter"];
    $longueurJour    = $json_data['planets'][$i]["lengthOfDay"];
    $periodOrbital   = $json_data['planets'][$i]["orbitalPeriod"];
    $inclinaison     = $json_data['planets'][$i]["orbitalInclination"];
    $temperatureA    = $json_data['planets'][$i]["meanTemperature"];
    $temperatureS    = $json_data['planets'][$i]["surfaceTemps"]["mean"];
    $masse           = $json_data['planets'][$i]["mass"];
    $density         = $json_data['planets'][$i]["density"];
    $tableauSatelite = $json_data['planets'][$i]['satellites'];

    $sql = "INSERT INTO astre (nom , type , diametre, longueurJour, periodeOrbital, temperatureMoyenne,temperatureSurfaceMoyenne, densite, masse)
VALUES ('John', 'Doe', 'john@example.com')";
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
        }
    }



}


?>
