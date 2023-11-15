objectDetector= "";
img = "";
objects = [];
status = "";
function preload()
{
img = loadImage('dog_cat.jpg');
}
function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado: dectetando objetos";
}
function draw()
{
    image(video,0, 0, 380, 380)
    if(status != "")
    {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
}

    for (let i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Estado: objetos detectados";
      document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: " + objects.length;
      fill(r, g, b);
      let percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    image(img, 0, 0, 640, 420);
    fill("#ff0000");
    textSize(20)
    text("Dog", 30, 40);
    noFill()
    stroke("#ff0000")
    rect(40, 50, 300, 410);
    fill("#0000ff");
    text("Cat", 320, 40);
    noFill()
    stroke("#0000ff")
    rect(300, 50, 270, 410);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
 }
 function modelLoaded() {
    console.log("¡Modelo cargado!");
    objectDetector.detect(video, gotResult);
 }

