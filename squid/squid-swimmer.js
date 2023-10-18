/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314 -- Oct 2023
/////////////////////////////////////////////////////////////////////////////////////////

console.log('Felix Wilton - Oct 2023');

var paused = false;

var deg2rad = Math.PI/180;

var squidMotion = new Motion(squidSetMatrices);

//Squid visual definitions
var squidBusy = false;
var numOfArms = 8;
var numOfTentacles = 2;
var squidSize = .25;
var head, cone, fin;
var headFrame, coneFrame, finFrame, armUFrame, armLFrame, tentUFrame, tentLFrame, tentEFrame;
var upperArms = [];
var lowerArms = [];
var upperTentacles = [];
var lowerTentacles = [];
var tentacleEnds = [];
//Squid physics definitions
var squidPos = [0,0,0]; // units
var squidVel = [0,0,0]; // units/second
var squidAccel = [0,0,0]; // units/second^2
var squidPropel = 0; // units/second^2 in the y direction
var squidDrag = 0.1; // 1/second opposing velocity
var squidGrav = -3; // units/second^2 in the y direction

var squidAnimTimer = 0.0;
var squidAnimLength = 1.5;

//Bubble definitions
var maxBubbleHeight = 30;
var bubbleSpeed = 0.15;
var bubbleSpawnRadius = 40;
var bubblesPerSecond = 5;
var bubbleTimer = 0.0;

//Coin definitions
var collectedCoins = 0;
var coinPickUpRadius = 3;
var coinsPerSecond = 1;
var coinTimer = 0.0;
var maxCoinX = -40;
var coinYRange = 30;
var coinSpeed = -0.1;



// SETUP RENDERER & SCENE

var canvas = document.getElementById('canvas');
var camera;
var light;
var ambientLight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setClearColor(0x031757);     // set background colour
canvas.appendChild(renderer.domElement);

//////////////////////////////////////////////////////////
//  initCamera():   SETUP CAMERA
//////////////////////////////////////////////////////////

function initCamera() {
    var cameraFov = 30;
    camera = new THREE.PerspectiveCamera(cameraFov,1,0.1,1000); 
    camera.position.set(0,0,80);
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(0,0,0)
    scene.add(camera);
    var controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;
    controls.autoRotate = false;
};

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
}

////////////////////////////////////////////////////////////////////////	
// init():  setup up scene
////////////////////////////////////////////////////////////////////////	

function init() {
    console.log('init called');
    if (paused) {
      pausePanel.style.display = 'block';
    }
    paused = false;

    resetSimulation();

    initCamera();
    startIdleAnimation();
    initLights();
    initSquid();

    window.addEventListener('resize',resize);
    resize();
};

////////////////////////////////////////////////////////////////////////
// startIdleAnimation():  idle animation for squid
////////////////////////////////////////////////////////////////////////

function startIdleAnimation() {
    squidBusy = false;
    // keyframes for squid swim:    name, time, [propel, thetaZ, thetaArmU, thetaArmL, thetaTentU, thetaTentL]
    squidMotion = new Motion(squidSetMatrices);
    squidMotion.addKeyFrame(new Keyframe('idle1',         0.0, [0, 0, 8, -10, 0, -5]));
    squidMotion.addKeyFrame(new Keyframe('idle2',         1.0, [0, 0, 3, -3, 5, -4]));
    squidMotion.addKeyFrame(new Keyframe('idle1',         2.0, [0, 0, 8, -10, 0, -5]));
}

////////////////////////////////////////////////////////////////////////
// startPumpAnimation():  switch from idle animation to pump animation
////////////////////////////////////////////////////////////////////////
function startPumpAnimation() {
  squidMotion = new Motion(squidSetMatrices);
  squidMotion.addKeyFrame(new Keyframe('rest',            0.0,    [0, 0, 8, -10, 0, -5]));
  squidMotion.addKeyFrame(new Keyframe('begin0A',         0.1,    [0, 0, 10, -15, -5, 2]));
  squidMotion.addKeyFrame(new Keyframe('beginA',          0.103,  [-5, 0, 10, -15, -5, 2]));
  squidMotion.addKeyFrame(new Keyframe('prime',           0.6,    [0, 0, 45, 10, 5, -3]));
  squidMotion.addKeyFrame(new Keyframe('pumpA',           0.603,  [60, 0, 45, 10, 5, -2]));
  squidMotion.addKeyFrame(new Keyframe('pump',            .93,    [0, 0, -5, -5, -3, -3]));
  squidMotion.addKeyFrame(new Keyframe('glide',           1.3,    [0, 0, 0, 5, 3, 5]));
  squidMotion.addKeyFrame(new Keyframe('rest',            1.51,   [0, 0, 8, -10, 0, -5]));
  squidMotion.addKeyFrame(new Keyframe('reset',           1.52,   [0, 0, 8, -10, 0, -5]));
}

///////////////////////////////////////////////////////////////////////////////////////
// squidSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function squidSetMatrices(avars) {
  //avars = [propel, thetaZ, thetaArmU, thetaArmL, thetaTentU, thetaTentL]
  var xPosition = squidPos[0];
  var yPosition = squidPos[1];
  var zPosition = squidPos[2];
  
  squidPropel = avars[0];
  var thetaZ = avars[1]*deg2rad;
  var thetaArmU = avars[2]*deg2rad;
  var thetaArmL = avars[3]*deg2rad;
  var thetaTentU = avars[4]*deg2rad;
  var thetaTentL = avars[5]*deg2rad;

  //ThetaY slowly increasing with local time
  var thetaY = 0.0003*Date.now();;

  // If time is past squidAnimTimer, return to idle animation
  if (squidBusy && squidAnimTimer < squidMotion.currTime) {
    squidBusy = false;
    startIdleAnimation();
  }
  
  var M =  new THREE.Matrix4();
  
    ////////////// Head and body
  headFrame.matrix.identity();
  headFrame.matrix.multiply(M.makeTranslation(xPosition,yPosition,zPosition)); 
  headFrame.matrix.multiply(M.makeScale(squidSize,squidSize,squidSize)); 
  headFrame.matrix.multiply(M.makeRotationY(thetaY));  
  headFrame.matrix.multiply(M.makeRotationZ(thetaZ));   
  
  head.matrix.copy(headFrame.matrix);
  head.matrix.multiply(M.makeTranslation(0,3,0));

  coneFrame.matrix.copy(headFrame.matrix);
  coneFrame.matrix.multiply(M.makeTranslation(0,6,0));
  cone.matrix.copy(coneFrame.matrix);
  cone.matrix.multiply(M.makeTranslation(0,6,0));

  finFrame.matrix.copy(coneFrame.matrix);
  finFrame.matrix.multiply(M.makeTranslation(0,12,0));
  fin.matrix.copy(finFrame.matrix);
  fin.matrix.multiply(M.makeScale(6,6,1));
  fin.matrix.multiply(M.makeRotationZ(45*deg2rad));

  //Arms
  var r = 1.5;
  for (var i = 0; i < numOfArms; i++) {
    var radialOffset = 360/numOfArms*deg2rad*i;
    var upperArm = upperArms[i];
    var lowerArm = lowerArms[i];
    armUFrame.matrix.copy(headFrame.matrix);
    armUFrame.matrix.multiply(M.makeRotationY(radialOffset));
    armUFrame.matrix.multiply(M.makeTranslation(r, 0, 0));
    armUFrame.matrix.multiply(M.makeRotationZ(thetaArmU));
    upperArm.matrix.copy(armUFrame.matrix);
    upperArm.matrix.multiply(M.makeTranslation(0,-3,0));

    armLFrame.matrix.copy(armUFrame.matrix);
    armLFrame.matrix.multiply(M.makeTranslation(0,-6,0));
    armLFrame.matrix.multiply(M.makeRotationZ(thetaArmL));
    lowerArm.matrix.copy(armLFrame.matrix);
    lowerArm.matrix.multiply(M.makeTranslation(0,-3,0));

    upperArm.updateMatrixWorld();
    lowerArm.updateMatrixWorld();
}

//Tentacles
var r = 1.5;
for (var i = 0; i < numOfTentacles; i++) {
  var radialOffset = 360/numOfTentacles*deg2rad*i + 30*deg2rad;
  var upperTentacle = upperTentacles[i];
  var lowerTentacle = lowerTentacles[i];
  var tentacleEnd = tentacleEnds[i];
  tentUFrame.matrix.copy(headFrame.matrix);
  tentUFrame.matrix.multiply(M.makeRotationY(radialOffset));
  tentUFrame.matrix.multiply(M.makeTranslation(r, 0, 0));
  tentUFrame.matrix.multiply(M.makeRotationZ(thetaTentU));
  upperTentacle.matrix.copy(tentUFrame.matrix);
  upperTentacle.matrix.multiply(M.makeTranslation(0,-4,0));

  tentLFrame.matrix.copy(tentUFrame.matrix);
  tentLFrame.matrix.multiply(M.makeTranslation(0,-8,0));
  tentLFrame.matrix.multiply(M.makeRotationZ(thetaTentL));
  lowerTentacle.matrix.copy(tentLFrame.matrix);
  lowerTentacle.matrix.multiply(M.makeTranslation(0,-4,0));

  tentEFrame.matrix.copy(tentLFrame.matrix);
  tentEFrame.matrix.multiply(M.makeTranslation(0,-8,0));
  tentacleEnd.matrix.copy(tentEFrame.matrix)
  tentacleEnd.matrix.multiply(M.makeScale(0.5,4,1.5));

  upperTentacle.updateMatrixWorld();
  lowerTentacle.updateMatrixWorld();
  tentacleEnd.updateMatrixWorld();
}

  head.updateMatrixWorld();
  cone.updateMatrixWorld();
  fin.updateMatrixWorld();

  headFrame.updateMatrixWorld();
  coneFrame.updateMatrixWorld();
  finFrame.updateMatrixWorld();
  armUFrame.updateMatrixWorld();
  armLFrame.updateMatrixWorld();
}

/////////////////////////////////////	
// initLights():  SETUP LIGHTS
/////////////////////////////////////	

function initLights() {
    light = new THREE.PointLight(0xffffff);
    light.position.set(-10,10,5);
    scene.add(light);
    ambientLight = new THREE.AmbientLight(0x000d6e);
    scene.add(ambientLight);
}

/////////////////////////////////////////////////////////////////////////////////////
//  initSquid():  define all geometry associated with the squid
/////////////////////////////////////////////////////////////////////////////////////

function initSquid() {
  var squidMaterial = new THREE.MeshLambertMaterial( {color: 0xc95918} );
  var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
  var coneGeometry = new THREE.CylinderGeometry( 0.0, 2, 12, 20, 4 );  //parameters --  radiusTop, radiusBot, height, radialSegments, heightSegments
  var headGeometry = new THREE.CylinderGeometry( 2, 2, 6, 20, 4 );  // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
  var armGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 6, 8, 2 );  // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
  var tentacleGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 8, 8, 2 );  // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
  
  head = new THREE.Mesh( headGeometry, squidMaterial );  scene.add( head );
  cone = new THREE.Mesh( coneGeometry, squidMaterial );  scene.add( cone );
  fin = new THREE.Mesh( boxGeometry, squidMaterial );  scene.add( fin );
  
  for (var i = 0; i < numOfArms; i++) {
    var upperArm = new THREE.Mesh(armGeometry, squidMaterial);scene.add(upperArm);upperArm.matrixAutoUpdate = false; 
    var lowerArm = new THREE.Mesh(armGeometry, squidMaterial);scene.add(lowerArm);lowerArm.matrixAutoUpdate = false; 
    upperArms.push(upperArm);
    lowerArms.push(lowerArm);
}

for (var i = 0; i < numOfTentacles; i++) {
  var upperTentacle = new THREE.Mesh(tentacleGeometry, squidMaterial);scene.add(upperTentacle);upperTentacle.matrixAutoUpdate = false; 
  var lowerTentacle = new THREE.Mesh(tentacleGeometry, squidMaterial);scene.add(lowerTentacle);lowerTentacle.matrixAutoUpdate = false; 
  var tentacleEnd = new THREE.Mesh(boxGeometry, squidMaterial);scene.add(tentacleEnd);tentacleEnd.matrixAutoUpdate = false; 
  upperTentacles.push(upperTentacle);
  lowerTentacles.push(lowerTentacle);
  tentacleEnds.push(tentacleEnd);
}
  var l = 0.000001;
  headFrame   = new THREE.AxesHelper(l);   scene.add(headFrame);
  coneFrame   = new THREE.AxesHelper(l) ;   scene.add(coneFrame);
  finFrame   = new THREE.AxesHelper(l) ;   scene.add(finFrame);
  armUFrame   = new THREE.AxesHelper(l) ;   scene.add(armUFrame);
  armLFrame   = new THREE.AxesHelper(l) ;   scene.add(armLFrame);
  tentUFrame   = new THREE.AxesHelper(l) ;   scene.add(tentUFrame);
  tentLFrame   = new THREE.AxesHelper(l) ;   scene.add(tentLFrame);
  tentEFrame   = new THREE.AxesHelper(l) ;   scene.add(tentEFrame);


  head.matrixAutoUpdate = false;  
  cone.matrixAutoUpdate = false;  
  fin.matrixAutoUpdate = false;  

  headFrame.matrixAutoUpdate = false;  
  coneFrame.matrixAutoUpdate = false;
  finFrame.matrixAutoUpdate = false;
  armUFrame.matrixAutoUpdate = false;
  armLFrame.matrixAutoUpdate = false;
  tentUFrame.matrixAutoUpdate = false;
  tentLFrame.matrixAutoUpdate = false;
  tentEFrame.matrixAutoUpdate = false;
}

/////////////////////////////////////////////////////////////////////////////////////
//  Bubbles
/////////////////////////////////////////////////////////////////////////////////////

var bubbleMaterial = new THREE.MeshBasicMaterial({ color: 0x3a82b5 });
var bubbles = [];
var bubbleSeeds = [];

function spawnBubble() {
    var radiusRanges = [0.01, 0.2];

    var bubbleSeed = Math.random();
    var bubbleRadius = bubbleSeed * (radiusRanges[1] - radiusRanges[0]) + radiusRanges[0];
    var bubbleGeometry = new THREE.SphereGeometry(bubbleRadius, 16, 16);
    var bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    var spawnTheta = Math.random() * 2 * Math.PI;
    var spawnRadius = Math.random() * bubbleSpawnRadius;
    bubble.position.set(
      spawnRadius * Math.cos(spawnTheta), // X position within the spawn radius
        -1*maxBubbleHeight,                    // Start below the visible area
        spawnRadius * Math.sin(spawnTheta)  // Z position within the spawn radius
    );
    scene.add(bubble);
    bubbles.push(bubble);
    bubbleSeeds.push(bubbleSeed);
}

/////////////////////////////////////////////////////////////////////////////////////
//  Coins
/////////////////////////////////////////////////////////////////////////////////////

var coinMaterial = new THREE.MeshBasicMaterial({ color: 0xf9f900 });
var coinGeometry = new THREE.SphereGeometry(0.5, 16, 16);
var coins = [];

function spawnCoin() {
    var coinY = (Math.random() -0.5) * 2 * coinYRange;
    var coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.position.set(-1*maxCoinX, coinY, 0);
    scene.add(coin);
    coins.push(coin);
}

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == "P".charCodeAt()) {   // P
      paused = !paused;
    } else if (keyCode == " ".charCodeAt()) {   // space
      // If squid is not busy, set it busy and begin a pump animation
      if (!squidBusy) {
        squidBusy = true;
        squidAnimTimer = squidAnimLength;
        startPumpAnimation();
      }
    } else if (keyCode == "R".charCodeAt()) {   // R
      resetSimulation();
    } 
};

///////////////////////////////////////////////////////////////////////////////////////
// PHYSICS
///////////////////////////////////////////////////////////////////////////////////////
function physicsUpdate(dt) {
  // Update squid accel
  for (let i = 0; i < 3; i++) {
    squidAccel[i] = -1 * squidDrag * squidVel[i];
  }
  squidAccel[1] += squidGrav + squidPropel;

  // Update squid velocity
  for (let i = 0; i < 3; i++) {
    squidVel[i] += squidAccel[i] * dt;
  }

  // Update squid position
  for (let i = 0; i < 3; i++) {
    squidPos[i] += squidVel[i] * dt;
  }

  // Spawn bubbles if time is greater than bubbleTimer
  bubbleTimer += dt;
  if (bubbleTimer > 1/bubblesPerSecond) {
    spawnBubble();
    bubbleTimer = 0.0;
  }
  // Update bubbles
  for (var i = 0; i < bubbles.length; i++) {
    var bubble = bubbles[i];
    bubble.position.y += bubbleSpeed * bubbleSeeds[i];
    if (bubble.position.y > maxBubbleHeight) {
      scene.remove(bubble);
      bubbles.splice(i, 1);
      bubbleSeeds.splice(i, 1);
    }
  }

  // Spawn coins if time is greater than coinTimer
  coinTimer += dt;
  if (coinTimer > 1/coinsPerSecond) {
    spawnCoin();
    coinTimer = 0.0;
  }
  // Update coins
  for (var i = 0; i < coins.length; i++) {
    var coin = coins[i];
    coin.position.x += coinSpeed;
    if (coin.position.x < maxCoinX) {
      scene.remove(coin);
      coins.splice(i, 1);
  }
  // Check if squid is close enough to pick up coin
  var coinDistance = Math.sqrt(Math.pow(coin.position.x - squidPos[0], 2) + Math.pow(coin.position.y - squidPos[1], 2) + Math.pow(coin.position.z - squidPos[2], 2));
  if (coinDistance < coinPickUpRadius) {
    scene.remove(coin);
    coins.splice(i, 1);
    collectedCoins++;
    document.getElementById("coinCount").textContent = "Coins collected: " + collectedCoins;
  }
}

}

function resetSimulation() {
  collectedCoins = 0;
  document.getElementById("coinCount").textContent = "Coins collected: " + collectedCoins;
  // delete all coins
  for (var i = 0; i < coins.length; i++) {
    var coin = coins[i];
    scene.remove(coin);
  }

  squidPos = [0,5,0];
  squidVel = [0,5,0];
  squidAccel = [0,0,0];
  squidPropel = 0;
  startIdleAnimation();
  paused = false;
}


///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK:    This is the main animation loop
///////////////////////////////////////////////////////////////////////////////////////

function update() {
    var dt=0.02;
    if (!paused) {
      squidMotion.timestep(dt);
      physicsUpdate(dt)
    }

    if (paused) {
      pausePanel.style.display = 'block';
    } else {
      pausePanel.style.display = 'none';
    }
    
	  renderer.render(scene, camera);
    requestAnimationFrame(update);      // requests the next update call;  this creates a loop
}

init();
update();

