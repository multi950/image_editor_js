'use strict';

var canvas = document.getElementById('editing_canvas');
var canvas_context = canvas.getContext('2d');
var canvas_max_height = 800;

function draw_on_canvas(source_image) {
    imageLoader(source_image.src)
}

function imageLoader(source) {

    let image = new Image();
    image.onload = function () {
        reset_canvas();
        setCanvasSize(image.width, image.height);
        canvas_context.drawImage(image, 0, 0, image.width, image.height);
    }
    image.src = source;
}

function reset_canvas(){
    canvas.height = canvas_max_height;
    canvas.width = document.querySelector(".canvas_container").clientWidth;
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
}

function remove_colors() {
            let image_data = canvas_context.getImageData(0, 0, canvas.width, canvas.height);
            let pixels = image_data.data;
            let length = pixels.length;
                     
            for (let i = 0; i < length; i+= 4 ) {
                let grey = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
                pixels[i] = pixels[i+1] = pixels[i+2] = grey;
            }
             
            canvas_context.putImageData(image_data, 0, 0); 
}

function invert_colors(){
    canvas_context.globalCompositeOperation='difference';
    canvas_context.fillStyle='white';
    canvas_context.fillRect(0,0,canvas.width,canvas.height);
}

function setCanvasSize(width, height){
    canvas.width = width;
    canvas.height = height;
}