var dog, hdog, database, foodS, foodStock;
var dogS;
function preload()
{
  hdog = loadImage("images/dogImg1.png");
  dog = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock)
  dogS = createSprite(250,150);
  dogS.addImage("img",dog);
  dogS.scale = 0.15;
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogS.addImage("img",hdog);
  }
  if(keyWentUp(UP_ARROW)){
    dogS.addImage("img",dog);
  }
  drawSprites();
  //add styles here
  fill(255);
  textSize(18);
  text("NOTE:- Press UP_ARROW key to feed the dog milk!!",40,30);
  text("Food Remaining: "+ foodS,170,250);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({food:x})
}