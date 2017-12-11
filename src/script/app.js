'use strict';

// We wait for the Document Object Model to be loaded.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
//     https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily     ====> STOLEN :o
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(window).load(function () {
    window.scrollTo(0,0);
    disableScroll();
    var speed = 15;
    var particles = [];
    var body = $('#underNeath');
    var w = body.width();
    var h = body.height();

    var camera = new THREE.PerspectiveCamera(85, w / h, 1, 4000);
    var scene = new THREE.Scene();
    camera.position.z = 1000;
    scene.add(camera);
    var renderer = new THREE.CanvasRenderer();
    // renderer.setClearColorHex( 0x190C13, 1 );
    renderer.setSize(w, h);
    body.append(renderer.domElement);





    var toggle = document.getElementById('open_Curtain');

    toggle.addEventListener('click', function () {
        if (window.magHetLuikOpen == true) {
            var left = document.getElementById('left');
            var right = document.getElementById('right');
            var firstsection = document.getElementsByClassName('first_section');
            enableScroll();
            console.log('first section is ' + firstsection);

            if (left.style.transform == 'translateX(-100%)') {
                left.style.transform = 'translateX(0)';
                right.style.transform = 'translateX(0)';
                console.log("closed");
                disableScroll();
            }
            else {

                left.style.transform = 'translateX(-100%)';
                right.style.transform = 'translateX(100%)';
                console.log("open die space");
                $('#toggleText').fadeOut('fast');


            }
        }
        else {
            return false;
        }

    });


    function createParticles() {
        var particle, material;
        for (var zpos = -1000; zpos < 1000; zpos += 5) {
            material = new THREE.ParticleCanvasMaterial({
                color: 0xF7E4BE,
                program: function (c) {
                    c.beginPath();
                    c.arc(0, 0, .8, 0, Math.PI * 2, true);
                    c.fill();
                }
            });
            particle = new THREE.Particle(material);
            particle.position.x = Math.random() * 1000 - 500;
            particle.position.y = Math.random() * 1000 - 500;
            particle.position.z = zpos;
            particle.scale.x = particle.scale.y = 1;
            scene.add(particle);
            particles.push(particle);
        }
    }

    function update() {
        requestAnimationFrame(update);
        var particle;
        for (var i = 0; i < particles.length; i++) {

            particle = particles[i];
            particle.position.z += speed;
            if (particle.position.z > 1000) particle.position.z -= 2000;
        }
        renderer.render(scene, camera);
    }

});

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}


var particles = [];
var ctx = null;
var ctx2 = null;
var FULLCIRCLE = 2 * Math.PI;
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;

var color = 'white';


function loop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);


    var p = {
        x: Math.random() * ctx.canvas.width,
        y: Math.random() * ctx.canvas.height,
        s: Math.random() * 2
    };

    particles.push(p);
    if (particles.length >= 200) particles.shift();

    for (var i = 0; i < particles.length; i++) {
        var currentParticle = particles[i];
        ctx.beginPath();
        ctx2.beginPath();
        ctx.fillStyle = 'white';
        ctx2.fillStyle = 'white';
        ctx.arc(currentParticle.x, currentParticle.y, currentParticle.s, 0, FULLCIRCLE);
        ctx2.arc(currentParticle.x, currentParticle.y, currentParticle.s, 0, FULLCIRCLE);
        ctx.fill();
        ctx2.fill();
        currentParticle.s *= .95;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementsByClassName('curtain__panel');
    var canvas1 = canvas[0];
    var canvas2 = canvas[1];
    ctx = canvas1.getContext('2d'); // 2de renderen
    ctx2 = canvas2.getContext('2d');
    canvas1.width = window.innerWidth / 2;
    canvas1.height = window.innerHeight;
    canvas2.width = window.innerWidth / 2;
    canvas2.height = window.innerHeight;
    setInterval(loop, 1000 / 10);

});



