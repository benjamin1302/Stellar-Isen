// Global vars

var renderer,scene,camera;
var cameraControls;
var far=10000;
var near = 0.001;
var cam, bgScene, bgCam	;
var text2;


var sprite;

var geoSol,geoMerc,geoVen,geoearth,geomoon,geoMar,geoJup,geoSat,geoSatRings,geoUra,geoUraRings,geoNep;

var keyboard = new THREEx.KeyboardState();
var axisHelper;
var i;
var days = 0;
var years = 0;
var theta = 0;
var tamScale = 1;
var posScale = 1;
var timeScale = 1;
var positions;

var orbit = new THREE.Object3D();

var scale_factor = 0.1; // Avoids Z-buffer precision problems

var scaled = false;

// Planet vars

var sol = new THREE.Object3D();
var mercury;
var venus;
var earth;
var mars;
var jupiter;
var saturn;
var saturnRings;
var uranus;
var neptune;



// Planets data

// Radious: Thousands of km 

var 	 sol_rad 	 = scale_factor*1392/100;
var mercury_rad	 = scale_factor*2.49;
var    venus_rad 	 = scale_factor*6;
var   earth_rad 	 = scale_factor*6.3;
var     moon_rad 	 = scale_factor*1.7;
var    mars_rad 	 = scale_factor*3.38;
var  jupiter_rad 	 = scale_factor*69.9;
var  saturn_rad	 = scale_factor*58.2;
var satRings_rad_max = scale_factor*(58.2+120);
var satRings_rad_min = scale_factor*(58.2+6.63);
var    uranus_rad 	 = scale_factor*25.3;
var uraRings_rad_max = scale_factor*(25.3+98);
var uraRings_rad_min = scale_factor*(25.3+38);
var  neptune_rad 	 = scale_factor*24.62;

var 	 sol_tam 	 = sol_rad;
var mercury_tam	 = mercury_rad;
var    venus_tam 	 = venus_rad;
var   earth_tam 	 = earth_rad;
var     moon_tam 	 = moon_rad;
var    mars_tam 	 = mars_rad;
var  jupiter_tam 	 = jupiter_rad;
var  saturn_tam	 = saturn_rad;
var satRings_tam_max = satRings_rad_max;
var satRings_tam_min = satRings_rad_min;
var    uranus_tam 	 = uranus_rad;
var uraRings_tam_max = uraRings_rad_max;
var uraRings_tam_min = uraRings_rad_min;
var  neptune_tam 	 = neptune_rad;



// Major axis == Distance to the sun. In thousand of km.

var mercury_ejeM =  scale_factor*57.909;
var    venus_ejeM =  scale_factor*108.208;
var   earth_ejeM =  scale_factor*149.597;
var     moon_ejeM =  scale_factor*10.384399;
var    mars_ejeM =  scale_factor*227.936;
var  jupiter_ejeM =  scale_factor*778.412;
var  saturn_ejeM =  scale_factor*1426.725;
var    uranus_ejeM =  scale_factor*2870.972;
var  neptune_ejeM =  scale_factor*4498.252;

// Orbits obliquity. In rads.

var mercury_obli =  1/360*2*Math.PI*7;
var    venus_obli =  1/360*2*Math.PI*3.39;
var   earth_obli =  1/360*2*Math.PI*0;
var     moon_obli =  1/360*2*Math.PI*5.14;
var    mars_obli =  1/360*2*Math.PI*1.85;
var  jupiter_obli =  1/360*2*Math.PI*1.305;
var  saturn_obli =  1/360*2*Math.PI*2.48;
var    uranus_obli =  1/360*2*Math.PI*0.769;
var  neptune_obli =  1/360*2*Math.PI*1.769;



// Orbits data: Major axis, minor axis and excentricity.

var mercury_a = mercury_ejeM;
var mercury_e =0.205;
var mercury_b = mercury_a*Math.sqrt(1-mercury_e*mercury_e);
var mercury_theta = 0;

var venus_a = venus_ejeM;
var venus_e = 0.0067;
var venus_b = venus_a*Math.sqrt(1-venus_e*venus_e);
var venus_theta = 0;

var earth_a = earth_ejeM;
var earth_e = 0.0167;
var earth_b = earth_a*Math.sqrt(1-earth_e*earth_e);
var earth_theta = 0;


var moon_a =moon_ejeM;
var moon_e = 0.0549;
var moon_b = moon_a*Math.sqrt(1-moon_e*moon_e);
var moon_theta = 0;

var mars_a = mars_ejeM;
var mars_e = 0.093;
var mars_b = mars_a*Math.sqrt(1-mars_e*mars_e);
var mars_theta = 0;


var jupiter_a = jupiter_ejeM;
var jupiter_e = 0.0483;
var jupiter_b = jupiter_a*Math.sqrt(1-jupiter_e*jupiter_e);
var jupiter_theta = 0;


var saturn_a =saturn_ejeM;
var saturn_e = 0.0541;
var saturn_b = saturn_a*Math.sqrt(1-saturn_e*saturn_e);
var saturn_theta = 0;



var uranus_a = uranus_ejeM;
var uranus_e = 0.0471;
var uranus_b = uranus_a*Math.sqrt(1-uranus_e*uranus_e);
var uranus_theta = 0;


var neptune_a = neptune_ejeM;
var neptune_e = 0.0085;
var neptune_b = neptune_a*Math.sqrt(1-neptune_e*neptune_e);
var neptune_theta = 0;

// Rotation periods (days)
var mercury_rot = 58.64;
var venus_rot	= -243;
var earth_rot	= 0.99;
var moon_rot	= 0.3781;
var mars_rot	=1.025;
var jupiter_rot	=0.413;
var saturn_rot	=0.444;
var uranus_rot	=-0.718;
var neptune_rot	=0.671;


//Orbital periods (years)
var mercury_per = 0.240  ;
var    venus_per = 0.615  ;
var   earth_per = 1      ;
var     moon_per = 0.074  ;
var    mars_per = 1.88   ;
var  jupiter_per = 11.86  ;
var  saturn_per = 29.447 ;
var    uranus_per = 84.016 ;
var  neptune_per = 64.7913;


function init (){

	renderer = new THREE.WebGLRenderer();
	renderer.antialias = true;
	console.log(window.innerHeight-150);
	renderer.setSize(window.innerWidth-200,window.innerHeight-150);
	renderer.setClearColor(new THREE.Color(0x000000),1.0);



	days = 0;
	i=0;
	document.getElementById('container').appendChild(renderer.domElement);

	

	text2 = document.createElement('div');
	text2.id="days";
	text2.style.position = 'absolute';
	text2.style.width = 180;
	text2.style.height = 40;
	text2.style.color="#FFFFFF";
	
	
	text2.style.top = 85 + '%';
	text2.style.right = 1 + '%';
	document.body.appendChild(text2);

	//Instancia la escena
	scene = new THREE.Scene();


	var aspectRatio = window.innerWidth/window.innerHeight;
	camera = new THREE.PerspectiveCamera(/*fovy*/60, /*razonaspecto*/aspectRatio,/*cerca*/ near,/*lejos*/far);
	
	// Positioning the camera
	camera.position.set(scale_factor*450,scale_factor*50,scale_factor*450);
	// Setting the point of interes
	camera.lookAt(new THREE.Vector3(0,0,0));
	

	// Instanciation of the camera controls
	cameraControls = new THREE.OrbitControls(camera,renderer.domElement);
	
	// Orbitational center
	cameraControls.target.set(0,0,0);
	cameraControls.maxDistance = far/4;
	
	// Register resize callback
	window.addEventListener('resize',updateAspectRatio);

	// Lighting
	var lightAmbient = new THREE.AmbientLight( 0x404040);  // Ambient light
	scene.add(lightAmbient)

	var light = new THREE.PointLight(0xFFFFFF,3); // Point light (sun)
	light.position.set(0,0,0);
	scene.add(light);

	// Enable shadows
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;


	// Stats
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '10px';
    stats.domElement.style.left = '10px';
    //document.body.appendChild(stats.domElement);



}


// Scene description
function loadScene(){

	// Load the texture cube (some fancy stars)
	var urls = ["textures/backgroundcube.png", "textures/backgroundcube.png",
	"textures/backgroundcube.png", "textures/backgroundcube.png",
	"textures/backgroundcube.png", "textures/backgroundcube.png",];

	var sceneBackground = THREE.ImageUtils.loadTextureCube(urls);
	sceneBackground.format = THREE.RGBFormat;



	// Room (our universe)

	var shader = THREE.ShaderLib.cube;
	shader.uniforms.tCube.value = sceneBackground;

	var wallsMaterial = new THREE.ShaderMaterial({
		fragmentShader:shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var room = new THREE.Mesh(new THREE.BoxGeometry(far,far,far),wallsMaterial);

	scene.add(room);


	// Load and configure textures

	// Sun
	var texSol = new THREE.ImageUtils.loadTexture("textures/sunmap.jpg");
	texSol.repeat.set(1,1);
	texSol.magFilter = THREE.LinearFilter; 
	texSol.minFilter = THREE.LinearFilter; 


	// Mercury
	var texMerc = new THREE.ImageUtils.loadTexture("textures/mercurymap.jpg");
	texMerc.repeat.set(1,1);
	texMerc.magFilter = THREE.LinearFilter;
	texMerc.minFilter = THREE.LinearFilter;





	// Venus
	var texVen = new THREE.ImageUtils.loadTexture("textures/venusmap.jpg");
	texVen.repeat.set(1,1);
	texVen.magFilter = THREE.LinearFilter;
	texVen.minFilter = THREE.LinearFilter;



	// Earth
	var texEarth = new THREE.ImageUtils.loadTexture("textures/earthmap1k.jpg");
	texEarth.repeat.set(1,1);
	texEarth.magFilter = THREE.LinearFilter; 
	texEarth.minFilter = THREE.LinearFilter; 



	//Moon
	var texLun = new THREE.ImageUtils.loadTexture("textures/moonmap1k.jpg");
	texLun.repeat.set(1,1);
	texLun.magFilter = THREE.LinearFilter; 
	texLun.minFilter = THREE.LinearFilter; 



	// Mars
	var texMar = new THREE.ImageUtils.loadTexture("textures/marsmap1k.jpg");
	texMar.repeat.set(1,1);
	texMar.magFilter = THREE.LinearFilter;
	texMar.minFilter = THREE.LinearFilter;



	// Jupiter
	var texJup= new THREE.ImageUtils.loadTexture("textures/jupitermap.jpg");
	texJup.repeat.set(1,1);
	texJup.magFilter = THREE.LinearFilter; 
	texJup.minFilter = THREE.LinearFilter; 



	// Saturn
	var texSat = new THREE.ImageUtils.loadTexture("textures/saturnmap.jpg");
	texSat.repeat.set(1,1);
	texSat.magFilter = THREE.LinearFilter; 
	texSat.minFilter = THREE.LinearFilter; 


	// Saturn rings
	var texSatRings = new THREE.ImageUtils.loadTexture("textures/saturnringcolor.jpg");
	texSatRings.repeat.set(1,1);
	texSatRings.magFilter = THREE.LinearFilter; 
	texSatRings.minFilter = THREE.LinearFilter; 
	
	var texSatRingsAlpha = THREE.ImageUtils.loadTexture( "textures/saturnringpatternrot.gif" );
	texSatRingsAlpha.repeat.set(1,1);
	texSatRingsAlpha.magFilter = THREE.LinearFilter; //Píxel menor que texel
	texSatRingsAlpha.minFilter = THREE.LinearFilter; //Texel menor que píxel

	// Uranus
	var texUra = new THREE.ImageUtils.loadTexture("textures/uranusmap.jpg");
	texUra.repeat.set(1,1);
	texUra.magFilter = THREE.LinearFilter; 
	texUra.minFilter = THREE.LinearFilter; 


	// Uranus rings 
	var texUraRings = new THREE.ImageUtils.loadTexture("textures/uranusringcolour.jpg");
	texUraRings.repeat.set(1,1);
	texUraRings.magFilter = THREE.LinearFilter; 
	texUraRings.minFilter = THREE.LinearFilter; 


	var texUraRingsAlpha = THREE.ImageUtils.loadTexture( "textures/uranusringtrans.gif" );
	texUraRingsAlpha.repeat.set(1,1);
	texUraRingsAlpha.magFilter = THREE.LinearFilter; 
	texUraRingsAlpha.minFilter = THREE.LinearFilter; 


	// Neptune
	var texNep = new THREE.ImageUtils.loadTexture("textures/neptunemap.jpg");
	texNep.repeat.set(1,1);
	texNep.magFilter = THREE.LinearFilter; 
	texNep.minFilter = THREE.LinearFilter; 

	// Create the materials
	var materialSol		 = new THREE.MeshBasicMaterial({ ambient:0xFFF300, side: THREE.Frontside,map: texSol});
	var materialmercury = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texMerc});
	var materialVenus 	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texVen});
	var materialearth	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texEarth});
	var materialmoon 	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texLun});
	var materialmars 	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texMar});
	var materialJupiter	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF,  side: THREE.BothSides,  map: texJup});
	var materialsaturn	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texSat});
	var materialsaturnRings = new THREE.MeshLambertMaterial({ambient         : 0xFFFFFF,
		transparent     : true,
		alphaTest       : 0.05,
		shininess       : 100,
		opacity         : 1, 
		shading         : THREE.SmoothShading ,
		map 			: texSatRings,
		alphaMap        : texSatRingsAlpha,
	});
	
	var materialuranus	 = new THREE.MeshLambertMaterial({ambient:0xFFFFFF, map: texUra});
	var materialuranusRings = new THREE.MeshLambertMaterial({ambient         : 0xFFFFFF,
		transparent     : true,
		alphaTest       : 0.05,
		shininess       : 100,
		opacity         : 0.5,
		shading         : THREE.SmoothShading,
		map 			: texUraRings,
		alphaMap        : texUraRingsAlpha
	});
	materialuranusRings.side= THREE.DoubleSide;	
	var materialneptune	 = new THREE.MeshLambertMaterial({ambient:0xFFFFFF, map: texNep});

	// Create the sun: Trivial approach -> Shining sprite

	geoSol = new THREE.SphereGeometry(sol_tam, 32,32 );
	sol = new THREE.Mesh(geoSol,materialSol);
	
	var spriteMaterial = new THREE.SpriteMaterial( 
	{ 
		map: new THREE.ImageUtils.loadTexture( 'textures/lensflare.png' ), 
		useScreenCoordinates: true,
		color: 0xFFF300, transparent: true, blending: THREE.AdditiveBlending,
		scaleByViewport:true
	});
	sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(9*sol_tam, 9*sol_tam,9*sol_tam);
		scene.add(sprite); // this centers the glow at the mesh



	// Create the planets objects


	geoMerc = new THREE.SphereGeometry(mercury_tam, 32,32 );
	mercury = new THREE.Mesh(geoMerc,materialmercury);
	mercury.position.x = mercury_a;


	geoVen = new THREE.SphereGeometry(venus_tam, 32,32 );
	venus = new THREE.Mesh(geoVen,materialVenus);
	venus.position.x = venus_a;


	geoearth = new THREE.SphereGeometry(earth_tam, 32,32 );
	earth = new THREE.Mesh(geoearth,materialearth);
	earth.position.x = earth_a;

	geomoon = new THREE.SphereGeometry(moon_tam, 32,32 );
	moon = new THREE.Mesh(geomoon,materialmoon);
	moon.position.x = earth_a +moon_a;

	geoMar = new THREE.SphereGeometry(mars_tam, 32,32 );
	mars = new THREE.Mesh(geoMar,materialmars);
	mars.position.x = mars_a;


	geoJup = new THREE.SphereGeometry(jupiter_tam, 32,32 );
	jupiter = new THREE.Mesh(geoJup,materialJupiter);
	jupiter.position.x = jupiter_a;

	geoSat= new THREE.SphereGeometry(saturn_tam, 32,32 );
	saturn = new THREE.Mesh(geoSat,materialsaturn);
	saturn.position.x = saturn_a;
	saturn.position.z = saturn_a;

	var geoSatRings =  new THREE.TorusGeometry(satRings_tam_max , satRings_tam_min, 2, 70 );
	saturnRings = new THREE.Mesh(geoSatRings,materialsaturnRings);
	saturnRings.position.x = saturn_a;
	saturnRings.rotation.x = Math.PI/2.2;



	geoUra = new THREE.SphereGeometry(uranus_tam, 32,32 );
	uranus = new THREE.Mesh(geoUra,materialuranus);
	uranus.position.x = uranus_a;

	geoUraRings =  new THREE.TorusGeometry(uraRings_tam_max , uraRings_tam_min, 2, 70 );
	uranusRings = new THREE.Mesh(geoUraRings,materialuranusRings);
	uranusRings.position.x =uranus_a;


	geoNep= new THREE.SphereGeometry(neptune_tam, 32,32 );
	neptune = new THREE.Mesh(geoNep,materialneptune);
	neptune.position.x = neptune_a;


	// Shadow configuration: Only between the earth and the moon (style decision)

	mercury.receiveShadow = false;
	venus.receiveShadow = false;
	earth.receiveShadow = true;
	moon.receiveShadow = true;
	mars.receiveShadow = false;
	jupiter.receiveShadow = false;
	saturn.receiveShadow = false;
	saturnRings.receiveShadow = false;
	uranus.receiveShadow = false;
	uranusRings.receiveShadow = false;
	neptune.receiveShadow = false;
	mercury.castShadow = false;
	venus.castShadow = false;
	earth.castShadow = true;
	moon.castShadow = true;
	mars.castShadow = false;
	jupiter.castShadow = false;
	saturn.castShadow = false;
	saturnRings.castShadow = false;
	uranus.castShadow = false;
	uranusRings.castShadow = false;
	neptune.castShadow = false;

	// Add the objects to the scene

	scene.add(mercury);
	scene.add(venus);
	scene.add(earth);
	scene.add(moon);
	scene.add(mars);
	scene.add(jupiter);
	scene.add(saturn);
	scene.add(saturnRings);
	scene.add(uranus);
	scene.add(uranusRings);
	scene.add(neptune);





	// Earth / moon shadows

	var earthLight = new THREE.SpotLight(0xAA0000,1);
	earthLight.position.set(0,0,0);		
	earthLight.target = earth;
	earthLight.angle = Math.PI/2;
	earthLight.shadowCameraNear = 0.1;
	earthLight.shadowCameraFar = 500;
	//earthLight.shadowCameraVisible = true;
	earthLight.castShadow = true;
	earthLight.shadowMapWidth = 1024;
	earthLight.shadowMapHeight = 1024 	;	
	earthLight.shadowDarkness = 0.7;

	var moonLight = new THREE.SpotLight(0xAA0000,1);
	moonLight.position.set(0,0,0);			
	moonLight.target = moon;
	moonLight.angle = Math.PI/2;
	moonLight.shadowCameraNear = 0.1;
	moonLight.shadowCameraFar = 500;
	//moonLight.shadowCameraVisible = true;
	moonLight.castShadow = true;
	moonLight.shadowMapWidth = 1024;
	moonLight.shadowMapHeight = 1024 	;	
	moonLight.shadowDarkness = 0.7;


	scene.add(earthLight);
	scene.add(moonLight);



    // Configure orbits

	// Colours
	var mercurymat = new THREE.LineBasicMaterial({color: 0xBEBA99,}); //Gris/beige
	var    venusmat = new THREE.LineBasicMaterial({color: 0xFFF300,}); //Amarillo
	var   earthmat = new THREE.LineBasicMaterial({color: 0x15FF00,}); //Verde
	var    marsmat = new THREE.LineBasicMaterial({color: 0xFF0000,}); //Rojo
	var  jupitermat = new THREE.LineBasicMaterial({color: 0xFF9A00,}); //Naranja
	var  saturnmat = new THREE.LineBasicMaterial({color: 0xF0D1A1,}); //Marron muy claro
	var    uranusmat = new THREE.LineBasicMaterial({color: 0x060F69,}); //Azul oscuro
	var  neptunemat = new THREE.LineBasicMaterial({color: 0x30BBFF,}); //Azul brillante
	
	
	// Geometries
	var mercury_orbit = new THREE.Geometry();
	var    venus_orbit = new THREE.Geometry();
	var   earth_orbit = new THREE.Geometry();
	var     moon_orbit = new THREE.Geometry();
	var    mars_orbit = new THREE.Geometry();
	var  jupiter_orbit = new THREE.Geometry();
	var  saturn_orbit = new THREE.Geometry();
	var    uranus_orbit = new THREE.Geometry();
	var  neptune_orbit = new THREE.Geometry();
	
	
	// Compute each orbit: Polar coordinates
	
	for(var theta = 0;  theta <= 2*Math.PI;  theta+=Math.PI/365){
		mercury_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(mercury_a*mercury_a)+ Math.sin(theta)*Math.sin(theta)/(mercury_b*mercury_b))) * Math.cos(theta),
			Math.sin(mercury_obli+theta),		
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(mercury_a*mercury_a)+ Math.sin(theta)*Math.sin(theta)/(mercury_b*mercury_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta <= 2*Math.PI;  theta+=Math.PI /365){
		venus_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(venus_a*venus_a)+ Math.sin(theta)*Math.sin(theta)/(venus_b*venus_b))) * Math.cos(theta),
			Math.sin(venus_obli+theta),		
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(venus_a*venus_a)+ Math.sin(theta)*Math.sin(theta)/(venus_b*venus_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI /365){
		earth_orbit.vertices.push(new THREE.Vector3( 1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(earth_a*earth_a)+ Math.sin(theta)*Math.sin(theta)/(earth_b*earth_b))) * Math.cos(theta),
			Math.sin(earth_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(earth_a*earth_a)+ Math.sin(theta)*Math.sin(theta)/(earth_b*earth_b))) * Math.sin(theta)));  
	}
	
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		mars_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(mars_a*mars_a)+ Math.sin(theta)*Math.sin(theta)/(mars_b*mars_b))) * Math.cos(theta),
			Math.sin(theta+mars_obli),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(mars_a*mars_a)+ Math.sin(theta)*Math.sin(theta)/(mars_b*mars_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		jupiter_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(jupiter_a*jupiter_a)+ Math.sin(theta)*Math.sin(theta)/(jupiter_b*jupiter_b))) * Math.cos(theta),
			Math.sin(jupiter_obli+theta), 
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(jupiter_a*jupiter_a)+ Math.sin(theta)*Math.sin(theta)/(jupiter_b*jupiter_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		saturn_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(saturn_a*saturn_a)+ Math.sin(theta)*Math.sin(theta)/(saturn_b*saturn_b))) * Math.cos(theta),
			Math.sin(saturn_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(saturn_a*saturn_a)+ Math.sin(theta)*Math.sin(theta)/(saturn_b*saturn_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		uranus_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(uranus_a*uranus_a)+ Math.sin(theta)*Math.sin(theta)/(uranus_b*uranus_b))) * Math.cos(theta),
			Math.sin(uranus_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(uranus_a*uranus_a)+ Math.sin(theta)*Math.sin(theta)/(uranus_b*uranus_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI /365){
		neptune_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(neptune_a*neptune_a)+ Math.sin(theta)*Math.sin(theta)/(neptune_b*neptune_b))) * Math.cos(theta),
			Math.sin(neptune_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(neptune_a*neptune_a)+ Math.sin(theta)*Math.sin(theta)/(neptune_b*neptune_b))) * Math.sin(theta)));  
	}
	
	// Add the orbits to the scene

	orbit.add(new THREE.Line(mercury_orbit,mercurymat));
	orbit.add(new THREE.Line(venus_orbit,   venusmat));
	orbit.add(new THREE.Line(earth_orbit,  earthmat));
	orbit.add(new THREE.Line(mars_orbit,   marsmat));
	orbit.add(new THREE.Line(jupiter_orbit, jupitermat));
	orbit.add(new THREE.Line(saturn_orbit, saturnmat));
	orbit.add(new THREE.Line(uranus_orbit,   uranusmat));
	orbit.add(new THREE.Line(neptune_orbit, neptunemat));
	
	
	
	
	// Axis
	
	axisHelper = new THREE.AxisHelper(far);
	axisHelper.visible=false;
	orbit.visible=false;
	
	scene.add(axisHelper);
	scene.add(orbit);

}

var todayDate = Date.now();
var angle = 0;

// Update function

function update(){



	// Camera update
	cameraControls.update();


	// Menu controllers

	switch (effectController.focus){

		case "Sun" :
		if(effectController.follow) camera.position.set(sol.position.x + 4*sol_tam,sol.position.y+sol_tam,sol.position.z+4*sol_tam);
		camera.lookAt(sol.position);
		break;

		case "Mercury" :
		if(effectController.follow) camera.position.set(mercury.position.x + 4*mercury_tam,mercury.position.y+mercury_tam,mercury.position.z+4*mercury_tam);
		camera.lookAt(mercury.position);
		break;


		case "Venus" :
		if(effectController.follow) camera.position.set(venus.position.x + 4*venus_tam,venus.position.y+venus_tam,mercury.position.z+4*venus_tam);
		camera.lookAt(venus.position);
		break;


		case "Earth" :
		if(effectController.follow) camera.position.set(earth.position.x + 4*earth_tam,earth.position.y+earth_tam,earth.position.z+4*earth_tam);
		camera.lookAt(earth.position);
		break;
		case "Moon" :
		if(effectController.follow)
			camera.position.set(moon.position.x + 4*moon_tam,moon.position.y+moon_tam,moon.position.z+4*moon_tam);
			camera.lookAt(moon.position);
		break;
		case "Mars" :
		if(effectController.follow) camera.position.set(mars.position.x + 4*mars_tam,mars.position.y+mars_tam,mars.position.z+4*mars_tam);
		camera.lookAt(mars.position);
		break;
		case "Jupiter" :
		if(effectController.follow) camera.position.set(jupiter.position.x + 4*jupiter_tam,jupiter.position.y+jupiter_tam,jupiter.position.z+4*jupiter_tam);
		camera.lookAt(jupiter.position);
		break;

		case "Saturn" :
		if(effectController.follow) camera.position.set(saturn.position.x + 4*saturn_tam,saturn.position.y+saturn_tam,saturn.position.z+4*saturn_tam);
		camera.lookAt(saturn.position);
		break;

		case "Uranus" :
		if(effectController.follow) camera.position.set(uranus.position.x + 20*uranus_tam,uranus.position.y+uranus_tam,uranus.position.z+20*uranus_tam);
		camera.lookAt(uranus.position);
		break;

		case "Neptune" :
		if(effectController.follow) camera.position.set(neptune.position.x + 4*neptune_tam,neptune.position.y,neptune.position.z+4*neptune_tam);
		camera.lookAt(neptune.position);
		break;
		default :

		break;


	}


	// Computation of the semi-axis of the ellipses of the orbits

	mercury_a  	 = mercury_ejeM;
	venus_a     	 =    venus_ejeM;
	earth_a 		 =   earth_ejeM;
	moon_a 			 =     moon_ejeM;
	mars_a   		 =    mars_ejeM;
	jupiter_a 		 =  jupiter_ejeM;
	saturn_a 		 =  saturn_ejeM;
	neptune_a 		 =  neptune_ejeM;
	uranus_a 	 	 =    uranus_ejeM;


	mercury_b = mercury_a*Math.sqrt(1-mercury_e*mercury_e);
	venus_b = venus_a*Math.sqrt(1-venus_e*venus_e);
	earth_b = earth_a*Math.sqrt(1-earth_e*earth_e);
	moon_b = moon_a*Math.sqrt(1-moon_e*moon_e);
	mars_b = mars_a*Math.sqrt(1-mars_e*mars_e);
	jupiter_b = jupiter_a*Math.sqrt(1-jupiter_e*jupiter_e);
	saturn_b = saturn_a*Math.sqrt(1-saturn_e*saturn_e);
	neptune_b = neptune_a*Math.sqrt(1-neptune_e*neptune_e);
	uranus_b = uranus_a*Math.sqrt(1-uranus_e*uranus_e);



	// Translation movements

	mercury.position.x =1 /(Math.sqrt(Math.cos(mercury_theta)*Math.cos(mercury_theta)/(mercury_a*mercury_a)+ Math.sin(mercury_theta)*Math.sin(mercury_theta)/(mercury_b*mercury_b))) * Math.cos(mercury_theta);
	mercury.position.z =  1 /(Math.sqrt(Math.cos(mercury_theta)*Math.cos(mercury_theta)/(mercury_a*mercury_a)+ Math.sin(mercury_theta)*Math.sin(mercury_theta)/(mercury_b*mercury_b))) * Math.sin(mercury_theta);
    mercury.position.y  = Math.sin(mercury_obli+mercury_theta);// Math.cos( vz )*c;

    venus.position.x =1 /(Math.sqrt(Math.cos(venus_theta)*Math.cos(venus_theta)/(venus_a*venus_a)+ Math.sin(venus_theta)*Math.sin(venus_theta)/(venus_b*venus_b))) * Math.cos(venus_theta);
    venus.position.z =  1 /(Math.sqrt(Math.cos(venus_theta)*Math.cos(venus_theta)/(venus_a*venus_a)+ Math.sin(venus_theta)*Math.sin(venus_theta)/(venus_b*venus_b))) * Math.sin(venus_theta);
    venus.position.y  =Math.sin(venus_obli+venus_theta);// Math.cos( vz )*c;

    earth.position.x =1 /(Math.sqrt(Math.cos(earth_theta)*Math.cos(earth_theta)/(earth_a*earth_a)+ Math.sin(earth_theta)*Math.sin(earth_theta)/(earth_b*earth_b))) * Math.cos(earth_theta);
    earth.position.z =  1 /(Math.sqrt(Math.cos(earth_theta)*Math.cos(earth_theta)/(earth_a*earth_a)+ Math.sin(earth_theta)*Math.sin(earth_theta)/(earth_b*earth_b))) * Math.sin(earth_theta);
    earth.position.y  =Math.sin(earth_obli+earth_theta);// Math.cos( vz )*c;

    moon.position.x =earth.position.x + 1 /(Math.sqrt(Math.cos(moon_theta)*Math.cos(moon_theta)/(moon_a*moon_a)+ Math.sin(moon_theta)*Math.sin(moon_theta)/(moon_b*moon_b))) * Math.cos(moon_theta);
    moon.position.z =  earth.position.z + 1 /(Math.sqrt(Math.cos(moon_theta)*Math.cos(moon_theta)/(moon_a*moon_a)+ Math.sin(moon_theta)*Math.sin(moon_theta)/(moon_b*moon_b))) * Math.sin(moon_theta);
    moon.position.y  = earth.position.y + Math.sin(moon_obli+moon_theta);// Math.cos( vz )*c;

    mars.position.x =1 /(Math.sqrt(Math.cos(mars_theta)*Math.cos(mars_theta)/(mars_a*mars_a)+ Math.sin(mars_theta)*Math.sin(mars_theta)/(mars_b*mars_b))) * Math.cos(mars_theta);
    mars.position.z =  1 /(Math.sqrt(Math.cos(mars_theta)*Math.cos(mars_theta)/(mars_a*mars_a)+ Math.sin(mars_theta)*Math.sin(mars_theta)/(mars_b*mars_b))) * Math.sin(mars_theta);
    mars.position.y  = Math.sin(mars_obli+mars_theta);// Math.cos( vz )*c;

    jupiter.position.x =1 /(Math.sqrt(Math.cos(jupiter_theta)*Math.cos(jupiter_theta)/(jupiter_a*jupiter_a)+ Math.sin(jupiter_theta)*Math.sin(jupiter_theta)/(jupiter_b*jupiter_b))) * Math.cos(jupiter_theta);
    jupiter.position.z =  1 /(Math.sqrt(Math.cos(jupiter_theta)*Math.cos(jupiter_theta)/(jupiter_a*jupiter_a)+ Math.sin(jupiter_theta)*Math.sin(jupiter_theta)/(jupiter_b*jupiter_b))) * Math.sin(jupiter_theta);
    jupiter.position.y  = Math.sin(jupiter_obli+jupiter_theta);// Math.cos( vz )*c;

    saturn.position.x =1 /(Math.sqrt(Math.cos(saturn_theta)*Math.cos(saturn_theta)/(saturn_a*saturn_a)+ Math.sin(saturn_theta)*Math.sin(saturn_theta)/(saturn_b*saturn_b))) * Math.cos(saturn_theta);
    saturn.position.z =  1 /(Math.sqrt(Math.cos(saturn_theta)*Math.cos(saturn_theta)/(saturn_a*saturn_a)+ Math.sin(saturn_theta)*Math.sin(saturn_theta)/(saturn_b*saturn_b))) * Math.sin(saturn_theta);
    saturn.position.y  = Math.sin(saturn_obli+saturn_theta);// Math.cos( vz )*c;

    saturnRings.position.x =saturn.position.x;
    saturnRings.position.y =saturn.position.y;
    saturnRings.position.z =saturn.position.z;


    uranusRings.position.x =uranus.position.x;
    uranusRings.position.y =uranus.position.y;
    uranusRings.position.z =uranus.position.z;

    uranus.position.x =1 /(Math.sqrt(Math.cos(uranus_theta)*Math.cos(uranus_theta)/(uranus_a*uranus_a)+ Math.sin(uranus_theta)*Math.sin(uranus_theta)/(uranus_b*uranus_b))) * Math.cos(uranus_theta);
    uranus.position.z =  1 /(Math.sqrt(Math.cos(uranus_theta)*Math.cos(uranus_theta)/(uranus_a*uranus_a)+ Math.sin(uranus_theta)*Math.sin(uranus_theta)/(uranus_b*uranus_b))) * Math.sin(uranus_theta);
    uranus.position.y  = Math.sin(uranus_obli+uranus_theta);// Math.cos( vz )*c;


    neptune.position.x =1 /(Math.sqrt(Math.cos(neptune_theta)*Math.cos(neptune_theta)/(neptune_a*neptune_a)+ Math.sin(neptune_theta)*Math.sin(neptune_theta)/(neptune_b*neptune_b))) * Math.cos(neptune_theta);
    neptune.position.z =  1 /(Math.sqrt(Math.cos(neptune_theta)*Math.cos(neptune_theta)/(neptune_a*neptune_a)+ Math.sin(neptune_theta)*Math.sin(neptune_theta)/(neptune_b*neptune_b))) * Math.sin(neptune_theta);
    neptune.position.y  = Math.sin(neptune_obli+neptune_theta);// Math.cos( vz )*c;





    var today = Date.now();

    // Take into account the time
    timeScale = effectController.timeScale;
    days+=(today-todayDate)*timeScale;
    years=days/365;



	// Rotation movements


	mercury.rotation.y+=(2*Math.PI/mercury_rot*(today-todayDate))* timeScale;
	venus.rotation.y   +=(2*Math.PI/venus_rot*(today-todayDate)	)* timeScale;
	earth.rotation.y  +=(2*Math.PI/earth_rot*(today-todayDate))* timeScale;
	moon.rotation.y    +=(2*Math.PI/moon_rot*(today-todayDate)	)* timeScale;
	mars.rotation.y   +=(2*Math.PI/mars_rot*(today-todayDate)	)* timeScale;
	jupiter.rotation.y +=(2*Math.PI/jupiter_rot*(today-todayDate))* timeScale;
	saturn.rotation.y +=(2*Math.PI/saturn_rot*(today-todayDate))* timeScale;
	uranus.rotation.y   +=(2*Math.PI/uranus_rot*(today-todayDate)	)* timeScale;
	neptune.rotation.y +=(2*Math.PI/neptune_rot*(today-todayDate))* timeScale;



	// Translation movements
	mercury_theta +=Math.PI*2/mercury_per /365*timeScale*(today-todayDate);
	venus_theta    +=Math.PI*2/   venus_per /365*timeScale*(today-todayDate);
	earth_theta   +=Math.PI*2/  earth_per /365*timeScale*(today-todayDate);
	moon_theta     +=  Math.PI*2/    moon_per /365*timeScale*(today-todayDate);
	mars_theta    +=Math.PI*2/   mars_per /365*timeScale*(today-todayDate);
	jupiter_theta  +=Math.PI*2/ jupiter_per /365*timeScale*(today-todayDate);
	saturn_theta  +=Math.PI*2/ saturn_per /365*timeScale*(today-todayDate);
	uranus_theta  +=Math.PI*2/   uranus_per /365*timeScale*(today-todayDate);
	neptune_theta    +=Math.PI*2/ neptune_per /365*timeScale*(today-todayDate);


	// Days and years counter

	text2.innerHTML = 'Days (earthly): '+parseFloat(days).toFixed(1)+'<br> Years (earthly): ' + parseFloat(years).toFixed(2);

	// Stats
	stats.update();
	todayDate = today;
}

function render(){
	update();
	requestAnimationFrame(render);
	renderer.render(scene,camera);

}

function updateAspectRatio(){

	// Update aspect ratio when moving the window

	renderer.setSize( window.innerWidth-200, window.innerHeight-150 );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

}




function setupGui(){



	effectController = {
        timeScale: 0.0001,
        focus:'false',
        follow : false,
        drawAxes : false,
        drawOrbits : false

    };

	/*var gui = new dat.GUI();
    gui.domElement.id = 'gui_container';
    //gui_container.appendChild(gui.domElement);
	var h = gui.addFolder("System controls");
	h.add(effectController, "follow").name("Follow planet");

	h.add(effectController, "timeScale", 0.0000,1,0.0001).name("Time control");


	h.add(effectController, "drawOrbits").name("Show orbits").onChange(function(value){
		if(effectController.drawOrbits == true)
			orbit.visible=true;
		else 	orbit.visible=false;
	});*/

}

function focus()
{
   var oA1 = document.getElementById('Soleil');
   var oA2 = document.getElementById('Mercury');
   var oA3 = document.getElementById('Venus');
   var oA4 = document.getElementById('Earth');
   var oA5 = document.getElementById('Mars');
   var oA6 = document.getElementById('Jupiter');
   var oA7 = document.getElementById('Saturn');
   var oA8 = document.getElementById('Uranus');
   var oA9 = document.getElementById('Neptune');

   var i1 = document.getElementById("planet_info_Soleil");
   var i2 = document.getElementById("planet_info_Mercury");
   var i3 = document.getElementById("planet_info_Venus");
   var i4 = document.getElementById("planet_info_Earth");
   var i5 = document.getElementById("planet_info_Mars");
   var i6 = document.getElementById("planet_info_Jupiter");
   var i7 = document.getElementById("planet_info_Saturn");
   var i8 = document.getElementById("planet_info_Uranus");
   var i9 = document.getElementById("planet_info_Neptune");

   var l0 = document.getElementById("moon");
   var l1 = document.getElementById("moon_Earth");
   var l2 = document.getElementById("moon_Mars");
   var l3 = document.getElementById("moon_Jupiter");
   var l4 = document.getElementById("moon_Saturn");
   var l5 = document.getElementById("moon_Uranus");
   var l6 = document.getElementById("moon_Neptune");

   oA1.onclick = function()
   {

		if(i1.className=="hidden"){
			i1.className = "visible";
		}
		else if(i1.className=="visible"){
			i1.className = "hidden"; 
		}
		i2.className = "hidden"
		i3.className = "hidden"
		i4.className = "hidden"
		i5.className = "hidden"
		i6.className = "hidden"
		i7.className = "hidden"
		i8.className = "hidden"
		i9.className = "hidden"
		l0.className = "hidden"
		
		camera.position.set(scale_factor*450,scale_factor*50,scale_factor*450);
		camera.lookAt(sol.position);
   };

   oA2.onclick = function()
   {
	   	i1.className = "hidden"
		   if(i2.className=="hidden"){
			   i2.className = "visible"; 
			}
		   else if(i2.className=="visible"){
			   i2.className = "hidden"; 
			}
		i3.className = "hidden"
		i4.className = "hidden"
		i5.className = "hidden"
		i6.className = "hidden"
		i7.className = "hidden"
		i8.className = "hidden"
		i9.className = "hidden"
		l0.className = "hidden"
		camera.position.set(mercury.position.x + 4*mercury_tam,mercury.position.y+mercury_tam,mercury.position.z+4*mercury_tam);
		camera.lookAt(mercury.position);
   };

   oA3.onclick = function()
   {
	   	i1.className = "hidden"
		i2.className = "hidden"
		if(i3.className=="hidden"){
			i3.className = "visible"; 
		}
		else if(i3.className=="visible"){
			i3.className = "hidden"; 
		}
		i4.className = "hidden"
		i5.className = "hidden"
		i6.className = "hidden"
		i7.className = "hidden"
		i8.className = "hidden"
		i9.className = "hidden"
		l0.className = "hidden"
		camera.position.set(venus.position.x + 4*venus_tam,venus.position.y+venus_tam,mercury.position.z+4*venus_tam);
		camera.lookAt(venus.position);
   };

   oA4.onclick = function()
   {	
	   	i1.className = "hidden"
		i2.className = "hidden"
		i3.className = "hidden"
		if(i4.className=="hidden"){
			i4.className = "visible"; 
			l0.className = "visible"; 
		}
		else if(i4.className=="visible"){
			i4.className = "hidden"; 
			l0.className = "hidden"; 
		}
		i5.className = "hidden"
		i6.className = "hidden"
		i7.className = "hidden"
		i8.className = "hidden"
		i9.className = "hidden"
		if (l0.className == "visible"){
			l1.className = "visible"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		else if (l0.className == "hidden"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		camera.position.set(earth.position.x + 4*earth_tam,earth.position.y+earth_tam,earth.position.z+4*earth_tam);
		camera.lookAt(earth.position);
   };

   oA5.onclick = function()
   {
	   	i1.className = "hidden"
		i2.className = "hidden"
		i3.className = "hidden"
		i4.className = "hidden"
		if(i5.className=="hidden"){
			i5.className = "visible"; 
			l0.className = "visible"; 

		}
		else if(i5.className=="visible"){i5.className = "hidden"; l0.className = "hidden";}
		i6.className = "hidden"
		i7.className = "hidden"
		i8.className = "hidden"
		i9.className = "hidden"
		if (l0.className == "visible"){
			l1.className = "hidden"
			l2.className = "visible"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		else if (l0.className == "hidden"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		camera.position.set(mars.position.x + 4*mars_tam,mars.position.y+mars_tam,mars.position.z+4*mars_tam);
		camera.lookAt(mars.position);
   };

   oA6.onclick = function()
   {
	   	i1.className = "hidden"
		i2.className = "hidden"
		i3.className = "hidden"
		i4.className = "hidden"
		i5.className = "hidden"
		if(i6.className=="hidden"){
			i6.className = "visible"; 
			l0.className = "visible"; 

		}
		else if(i6.className=="visible"){
			i6.className = "hidden"; 
			l0.className = "hidden"; 
		}
		i7.className = "hidden"
		i8.className = "hidden"
		i9.className = "hidden"
		if (l0.className == "visible"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "visible"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		else if (l0.className == "hidden"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		camera.position.set(jupiter.position.x + 4*jupiter_tam,jupiter.position.y+jupiter_tam,jupiter.position.z+4*jupiter_tam);
		camera.lookAt(jupiter.position);
   };

   oA7.onclick = function()
   {	
	   	i1.className = "hidden"
		i2.className = "hidden"
		i3.className = "hidden"
		i4.className = "hidden"
		i5.className = "hidden"
		i6.className = "hidden"
		if(i7.className=="hidden"){
			i7.className = "visible"; 
			l0.className = "visible"; 
		}
		else if(i7.className=="visible"){
			i7.className = "hidden"; 
			l0.className = "hidden"; 
		}
		i8.className = "hidden"
		i9.className = "hidden"
		if (l0.className == "visible"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "visible"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		else if (l0.className == "hidden"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		camera.position.set(saturn.position.x + 4*saturn_tam,saturn.position.y+saturn_tam,saturn.position.z+4*saturn_tam);
		camera.lookAt(saturn.position);
   };

   oA8.onclick = function()
   {
	   	i1.className = "hidden"
		i2.className = "hidden"
		i3.className = "hidden"
		i4.className = "hidden"
		i5.className = "hidden"
		i6.className = "hidden"
		i7.className = "hidden"
		if(i8.className=="hidden"){
			i8.className = "visible"; 
			l0.className = "visible"; 
		}
		else if(i8.className=="visible"){
			i8.className = "hidden"; 
			l0.className = "hidden"; 
		}
		i9.className = "hidden"
		if (l0.className == "visible"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "visible"
			l6.className = "hidden"
		}
		else if (l0.className == "hidden"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		camera.position.set(uranus.position.x + 20*uranus_tam,uranus.position.y+uranus_tam,uranus.position.z+20*uranus_tam);
		camera.lookAt(uranus.position);
   };

   oA9.onclick = function()
   {
	   	i1.className = "hidden"
		i2.className = "hidden"
		i3.className = "hidden"
		i4.className = "hidden"
		i5.className = "hidden"
		i6.className = "hidden"
		i7.className = "hidden"
		i8.className = "hidden"
		if(i9.className=="hidden"){
			i9.className = "visible"; 
			l0.className = "visible"; 
		}
		else if(i9.className=="visible"){
			i9.className = "hidden"; 
		}
		if (l0.className == "visible"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "visible"
		}
		else if (l0.className == "hidden"){
			l1.className = "hidden"
			l2.className = "hidden"
			l3.className = "hidden"
			l4.className = "hidden"
			l5.className = "hidden"
			l6.className = "hidden"
		}
		camera.position.set(neptune.position.x + 4*neptune_tam,neptune.position.y,neptune.position.z+4*neptune_tam);
		camera.lookAt(neptune.position);
   };
}
window.onload = focus;


//Call all functions


init(); 
setupGui();
loadScene();
render();

