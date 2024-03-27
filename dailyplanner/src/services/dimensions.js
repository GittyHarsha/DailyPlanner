
let body = document.body;
let client_width = body.clientWidth-20;
let client_height = body.clientHeight-20;

let figma_width = 842;
let figma_height = 595;
let font_base = 16;
function w(x) {
    return (x * client_width) / (figma_width *font_base) +'rem'
}

function h(x) {
    return (x * client_height) /( figma_height *font_base) + 'rem'
}

export {w, h};