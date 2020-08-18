'use strict';

var canvas = document.getElementById('editing_canvas');
var canvas_context = canvas.getContext('2d');

function draw_on_canvas(source_image) {
    imageLoader(source_image.src)
}

function imageLoader(source) {

    let image = new Image();
    image.onload = function () {
        reset_canvas();
        set_canvas_size(image.width, image.height);
        canvas_context.drawImage(image, 0, 0, image.width, image.height);
    }
    image.src = source;
}

function reset_canvas() {
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
}

function remove_colors() {
    let image_data = canvas_context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = image_data.data;
    let length = pixels.length;

    for (let i = 0; i < length; i += 4) {
        let grey = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
        pixels[i] = pixels[i + 1] = pixels[i + 2] = grey;
    }

    canvas_context.putImageData(image_data, 0, 0);
}

function invert_colors() {
    canvas_context.globalCompositeOperation = 'difference';
    canvas_context.fillStyle = 'white';
    canvas_context.fillRect(0, 0, canvas.width, canvas.height);
}

function set_canvas_size(width, height) {
    canvas.width = width;
    canvas.height = height;
}

function rotate_canvas() {

    let canvas_copy = copy_canvas();
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);

    set_canvas_size(canvas_copy.height, canvas_copy.width);

    canvas_context.setTransform(0, 1, -1, 0, canvas_copy.height, 0); //Move axis to bottom left and origin to the top right
    canvas_context.drawImage(canvas_copy, 0, 0);
    canvas_context.setTransform(1, 0, 0, 1, 0, 0);
}

function copy_canvas() {
    let canvas_copy = document.createElement('canvas');
    canvas_copy.width = canvas.width;
    canvas_copy.height = canvas.height;
    let canvas_copy_context = canvas_copy.getContext('2d');
    canvas_copy_context.drawImage(canvas, 0, 0);
    return canvas_copy;
}