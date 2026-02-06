var stars = [];
var nos = ["No ( :[ )", "Come onnnnn", "I know you want to",
    "This is so rude", "okay imm gonna cry now", "that is unfair!",
    "final warning", "3...", "2...", "1..."];

const WIDTH = 1920;
const HEIGHT = 912;

const fireworks = [];
let gravity;

let w = WIDTH / 2;
let h = (HEIGHT / 2) - 150;


let noButtonX = w + 70;
let noButtonY = h + 300;

let y = 0;
let indexNoButton = 0;

let askImg;
let acceptImg;

let rejectAudio;
let acceptAudio;
let startMusic;
let acceptMusic;
let yippie;

let accepted = false;
let yesButton;
let noButton;

// Load the image and create a p5.Image object.
function preload() {
    askImg = loadImage('/assets/ask.png');
    acceptImg = loadImage('/assets/acceptance.png');

    rejectAudio = loadSound('/assets/death.wav');
    acceptAudio = loadSound('/assets/yay.wav');

    startMusic = loadSound('/assets/a_letter.mp3');
    acceptMusic = loadSound('/assets/butterflies.mp3');

    yippie = loadSound('/assets/yippie.mp3');
}

function setup() {
    createCanvas(WIDTH, HEIGHT);

    startMusic.play();

    yesButton = createButton("yes!!!!!");
    noButton = createButton(nos[indexNoButton])
    noButton.mousePressed(rejection);

    yesButton.mousePressed(celebrate);

    for (var i = 0; i < 1000; i++) {
        stars[i] = new Star();
    }

    imageMode(CENTER);

}

function draw() {
    background(10, 7, 45);
    if (y == h) {
        yesButton.class('yesButton');
        if (indexNoButton != nos.length) {
            yesButton.position(w - 240, h + 300);
        } else {
            yesButton.position(w - 90, h + 300);
        }

        noButton.class('noButton');
        noButton.position(noButtonX, noButtonY);
    }

    for (var i = 0; i < stars.length; i++) {
        stars[i].draw();
    }
    if (!accepted) {
        image(askImg, floor(w), y);
    } else {
        image(acceptImg, floor(w), h);
    }
    if (y < (h)) {
        y += 1;
    }
}

function rejection() {
    noButtonX = floor((Math.random() * (WIDTH - 100)) + 1);
    noButtonY = floor((Math.random() * (HEIGHT - 100)) + 1);
    noButton.html(nos[indexNoButton += 1]);

    rejectAudio.play();

    if (indexNoButton == nos.length) {
        noButton.remove();
    }
}

function celebrate() {

    noButton.remove();
    yesButton.remove();
    acceptAudio.play();
    yippie.play();
    accepted = true;

    startMusic.stop();
    acceptMusic.play();
}

// star class //
class Star {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(0.25, 3);
        this.t = random(TAU);
    }

    draw() {
        this.t += 0.1;
        var scale = this.size + sin(this.t) * 2;
        noStroke();
        ellipse(this.x, this.y, scale, scale);
    }
}
