var renderer, scene, camera, mesh;
var texture_earth='ressources/images/textures/earth.jpg';
var texture_jupiter='ressources/images/textures/jupiter.jpg';
var texture_mars='ressources/images/textures/mars.jpg';
var texture_mercury='ressources/images/textures/mercury.jpg';
var texture_saturn='ressources/images/textures/saturn.jpg';
var texture_saturn_ring='ressources/images/textures/saturn_ring.jpg';
var texture_neptune='ressources/images/textures/neptune.jpg';
var texture_venus='ressources/images/textures/venus.jpg';
var texture_uranus='ressources/images/textures/uranus.jpg';

init();
animate();

function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer({alpha: true});

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
    scene.add(camera);
    
    // on créé un  cube au quel on définie un matériau puis on l’ajoute à la scène 
    var geometry = new THREE.SphereGeometry( 200, 15, 15 );
    var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(texture_earth) } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );

    // on effectue le rendu de la scène
    renderer.render( scene, camera );
}

function animate(){
    requestAnimationFrame( animate );
    mesh.rotation.y += 0.005;
    renderer.render( scene, camera );
}