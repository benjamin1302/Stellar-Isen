var renderer, scene, camera, mesh;
var planetRadius = 300;
var RingsSettings = [
    {
      radius: planetRadius * 2.6,
      thickness: .02,
      color: 0x685B50
    },
    {
      radius: planetRadius * 2.54,
      thickness: .12,
      color: 0x7D6B5F
    },
    {
      radius: planetRadius * 2.175,
      thickness: .28,
      color: 0x8F7C6D
    }
  ]


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
    var geometry = new THREE.SphereGeometry( planetRadius, 32, 32 );
    var name = document.getElementById('texture').textContent;

    function UrlExists(url)
    {
      var http = new XMLHttpRequest();
      http.open('HEAD', url, false);
      http.send();
      return http.status!=404;
    }
    if (UrlExists('ressources/images/textures/'+name+'.jpg')) {
    }
    else {
      name = 'Other'
    }

    var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('ressources/images/textures/'+name+'.jpg', new THREE.SphericalReflectionMapping()), overdraw: true } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    if (name == 'Saturn'){
        RingsSettings.forEach(ring => {
            var settings = {
              geometry: new THREE.RingGeometry(
                ring.radius - (
                  ring.radius *
                  ring.thickness
                ),
                ring.radius,
                64
              ),
              material: new THREE.MeshLambertMaterial({
                color: ring.color,
                side: THREE.DoubleSide
              })
            }
            var ring = new THREE.Mesh(
              settings.geometry,
              settings.material
            )
            ring.rotation.x = Math.PI / 2
            scene.add(ring)
          })
    }

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