list_request();

function list_request(){
    var input = document.getElementById('search_input');
    var list = document.getElementById('result')

    input.onkeyup = function (){
        var text = input.value;
        if (text != ""){
            list.className = 'visible';
            list.innerHTML = "<?php $searchList = getSearchList("+text+")?>";
        }
        else if (text == ""){
            list.className = 'hidden';
        }
    }
}