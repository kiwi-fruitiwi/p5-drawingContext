/**
 *  @author kiwi
 *  @date 2022.04.23
 *
 *  exploring glow, shadow, and blur using drawingContext
 *      2 lines glow → https://youtu.be/iIWH3IUYHzM
 *          shadow is just dark glow on light background
 */
let font
let instructions
let img

let dc
let milk

function preload() {
    font = loadFont('data/consola.ttf')
    img = loadImage('rocco.png')
}


function setup() {
    let cnv = createCanvas(640, 360)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    imageMode(CENTER)

    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3,4,5] → no function
        z → freeze sketch</pre>`)

    img.resize(0, 300)
    dc = drawingContext
    milk = color(207, 7, 99)
    // noLoop()
}


function draw() {
    background(234, 34, 24)

    sceneRectGlow()
    sceneCardGlow()

    displayDebugCorner()
}


function resetDcShadow() {
    dc.shadowBlur = 0
    dc.shadowOffsetY = 0
    dc.shadowOffsetX = 0
}


function sceneCardGlow() {
    glow(16, milk, 20)

    const offset = 5
    dc.shadowOffsetX = map(mouseX, 0, width, -offset, offset)
    dc.shadowOffsetY = map(mouseY, 0, height, offset, -offset)

    image(img, width*3/4, height/2)
    resetDcShadow()
}


function sceneRectGlow() {
    rectMode(CENTER)
    glow(16, milk, 20)

    const offset = 5
    dc.shadowOffsetX = map(mouseX, 0, width, offset, -offset)
    dc.shadowOffsetY = map(mouseY, 0, height, offset, -offset)

    rect(width/4, height/2, 120, 120, 20)
    resetDcShadow()
}


function glow(shadowBlur, color, weight) {
    noFill()
    stroke(milk)
    strokeWeight(weight)

    dc.shadowBlur = shadowBlur
    dc.shadowColor = color
}


/** 🧹 shows debugging info using text() 🧹 */
function displayDebugCorner() {
    const LEFT_MARGIN = 10
    const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
    const LINE_SPACING = 2
    const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
    fill(0, 0, 100, 100) /* white */
    strokeWeight(0)

    text(`frameCount: ${frameCount}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT)
    text(`frameRate: ${frameRate().toFixed(1)}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET)
}


function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
}