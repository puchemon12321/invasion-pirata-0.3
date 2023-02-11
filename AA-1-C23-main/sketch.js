const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls=[];
/*var arreglo = [1,2,3,4,5,6,7,8]
console.log(arreglo);
console.log(arreglo,length);
console.push(10);
console.push(500);
console.log(arreglo);
arreglo.pop();
console.log(arreglo);*/

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  boat = new boat (width,height-100, 200,200,-100);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i=0; i < balls.length;i++){
    showCannonBalls(balls[i], i);
  }
  cannon.display();
  //cannonBall.display();
  
  

}

  function keyReleased(){
 if(keyCode === DOWN_ARROW){
  //cannonBall.shot();
  balls[balls.length-1].shot()
 } 
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
     cannonBall = new CannonBall(cannon.x, cannon.y);
     balls.push(cannonBall);
     }
 }


function showCannonBalls(ball,index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height -50){
    Matter.World.remove(world, ball.body);
    balls.splice(index,1);
  }
}

