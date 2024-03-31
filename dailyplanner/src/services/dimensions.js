
let body = document.body;
let client_width = body.clientWidth-20;
let client_height = body.clientHeight-20;

let figma_width = 842;
let figma_height = 595;
let font_base = 16;
function w(x) {
    return (x * 100) / (figma_width ) +'vw'
}

function h(x) {
    return (x * 100) /( figma_height) + 'vh'
}

export {w, h};