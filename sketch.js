var tower, towerImage;

var door,doorImage, doorGroup;

var climber, climberImage, climberGroup;

var ghost, ghostImage;

var invisibleBlock, invisibleBlockGroup;

var sound;

var gameState = "play";
function preload(){
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  //sound.loop();
  tower = createSprite(300,300,10,20);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
}

function draw(){
  background("white");
  
  if(gameState === "play"){
    
  
  if(tower.y>400){
    tower.y = 300;
  }
   
  if(keyDown("left_Arrow")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right_Arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5; 
  }
  ghost.velocityY = ghost.velocityY + 0.1;  
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){     ghost.destroy(); gameState = "end" 
  }
    
  spawnDoors();
  
  drawSprites();
  }
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);
  }
  
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    door.addImage(doorImage);
    climber.addImage(climberImage);
    door.x = Math.round(random(140,400));
    climber.x = door.x;
    door.velocityY = 1;
    climber.velocityY = 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    doorGroup.add(door);
    climberGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth += 1; 
    invisibleBlock = createSprite(200,15);           invisibleBlock.width = climber.width; invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}
