display_content()
add_tag()
generate()
fav()

function display_content(){
    var listen1 = document.getElementById('tag');
    var listen2 = document.getElementById('tag_content');

    listen1.onclick = function()
   {
		if(listen2.className=="hidden"){listen2.className = "visible"}
        else if(listen2.className=="visible"){listen2.className = "hidden"}
   }
}

function add_tag(){

    var text = ""
    var butt = document.getElementById("tag2")
    butt.onclick = function (){
        text = document.getElementById('tag1').value;
        $('<li>'+text+'</li>').insertAfter($('li:last-child'));
    }
}

function generate(){
    var doc = new jsPDF('p, pt');

    document.getElementById('pdf_gen').onclick = function () {
        
    doc.fromHTML($('#information').html(), 15, 15, {
        'width': 170
    });
    doc.save('astre.pdf');
};
}

function fav() {
    var butt=document.getElementById('favori');
    var icon = document.getElementById('fav_icon');
    butt.onclick = function (){
        if(icon.className == "fa fa-star-o"){
            icon.classList = "fa fa-star";
            butt.title = "Retirer des Favoris";
        }
        else if(icon.className == "fa fa-star"){
            icon.classList = "fa fa-star-o";
            butt.title = "Ajouter aux Favoris"
        }
    }
}