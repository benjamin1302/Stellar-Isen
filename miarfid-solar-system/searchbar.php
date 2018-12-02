<?php
include('bdd.php');

$text = $_POST['search_input'];

$searchList = array(array());

$searchList = getSearchList($text);

for($i = 0; $i < count($searchList[0]); $i++)
            {
                for($j = 0; $j < count($searchList[1]); $j++)
                {
                    echo "<li>$searchList[0][$i] : $searchList[1][$j]</li>";
                }
            }

?>