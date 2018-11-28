var renderer, scene, camera, mesh;

init();
animate();

function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.antialias = true;

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( (window.innerWidth/10)*2, (window.innerHeight/10)*4 );
    renderer.domElement.id = 'canvas';
    document.getElementById('preview').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth*0.7 / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    window.addEventListener('resize',updateAspectRatio);
    
    // on créé la sphère et on lui applique une texture sous forme d’image
    var geometry = new THREE.SphereGeometry( 300, 32, 32 );
    var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('ressources/images/textures/earth.jpg', new THREE.SphericalReflectionMapping()), overdraw: true } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );
    }

function animate(){
    // on appel la fonction animate() récursivement à chaque frame
    requestAnimationFrame( animate );
    mesh.rotation.y += 0.01;
    // on effectue le rendu de la scène
    renderer.render( scene, camera );
}

function updateAspectRatio(){

	// Update aspect ratio when moving the window

	renderer.setSize( (window.innerWidth/10)*2, (window.innerHeight/10)*4  );
	camera.aspect = window.innerWidth*0.7 / window.innerHeight;
	camera.updateProjectionMatrix();

}