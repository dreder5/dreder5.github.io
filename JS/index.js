//document.getElementById('date').innerHTML = new Date().toDateString();
// this tells the html file to create a variable called date and sets it to the current date


//throw {name : "NotImplementedError", message : "ERROR"}; 


//let slideIndex = 0;
//showSlides();

//function showSlides() {
//    let i;
//    let slides = document.getElementsByClassName("mySlides");
//    for (i = 0; i < slides.length; i++) {
//        slides[i].style.display = "none";
//    }
//    slideIndex++;
//    if (slideIndex > slides.length) {
//        slideIndex = 1
//    }
//    slides[slideIndex - 1].style.display = "block";
//    setTimeout(showSlides, 4000); // Change image every 4 seconds
//}

////class backgroundCoordinates {
////    xPos = 0;
////    yPos = 0;
////    constructor(x=0,y=0) {
////        this.xPos = x;
////        this.yPos = y;
////    }
////}

////class backgroundGrid {
////    gridSystem = [10]
////    constructor() {
////        for (var i = 0; i < 10; i++) {
////            this.gridSystem[i] = new backgroundCoordinates(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
////        }
////        //this.gridSystem[0] = new backgroundCoordinates(window.innerWidth * .5, window.innerHeight * .5)
////    }
////}

////let backgroundPathing = new backgroundGrid();
////class backgroundParticle {
////    nextDestination = 0;
////    currentXacceleration = 0;
////    currentYacceleration = 0;
////    savedIndex = 0
////    constructor() {
////        this.nextDestination = new backgroundCoordinates(0, 0);
////    }
////    SetNextDestination() {
////        //this.nextDestination = backgroundPathing.gridSystem[0];
////        this.nextDestination = backgroundPathing.gridSystem[this.savedIndex = Math.floor(Math.random() * 10)];
////        console.log(this.nextDestination.xPos)
////        console.log(this.nextDestination.yPos)
////        CalculateXandYSpeed();
////    }
////}

////let particleEffect = new backgroundParticle();
////particleEffect.SetNextDestination();

////let particleCounter = 0;
////function UpdateParticle() {
////    let particleRef = document.getElementById("particle")
////    let xCalc = 0;
////    let yCalc = 0;

////    particleRef.style.top = particleRef.offsetTop + particleEffect.currentYacceleration + "px";
////    particleRef.style.left = particleRef.offsetLeft + particleEffect.currentXacceleration + "px";
////    let rectangle = particleRef.getBoundingClientRect();

////    // add a force stop here
////    if (particleCounter == 200 )
////    {
////        console.log("arrived");
////        particleCounter = 0;
////        setTimeout(UpdateParticle, Math.random() * 2000 + 1000)
////        particleEffect.SetNextDestination();
////    }
////    else {
////        setTimeout(UpdateParticle, 1)
////        particleCounter++;
////    }
////}

////function CalculateXandYSpeed() {
////    let particleRef = document.getElementById("particle")
////    let rectangle = particleRef.getBoundingClientRect();
////    let newY = particleEffect.nextDestination.yPos;
////    let newX = particleEffect.nextDestination.xPos;
////    particleEffect.currentXacceleration = (newX - rectangle.x) / 200;
////    particleEffect.currentYacceleration = (newY - rectangle.y) / 200;
////}

////window.onload = UpdateParticle();













let gridWidth = 300
let gridHeight = 169
// optimal resolution 

//let gridWidth = document.getElementById("raster").clientWidth; // screen pixels
//let gridHeight = document.getElementById("raster").clientHeight; // screen pixels


let rotationSpeed = .3


class Vertex {
    vertexData = []
    constructor(_x = 0, _y = 0, _z = 0, _w = 0) {
        this.vertexData[0] = _x;
        this.vertexData[1] = _y;
        this.vertexData[2] = _z;
        this.vertexData[3] = _w;
    }
}

class Matrix4x4 {
    _4x4Data = []
    constructor() {
        for (var i = 0; i < 16; i++) {
            this._4x4Data[i] = 0
        }
    }
}

let PyramidData = [
    // front triangle
    new Vertex(-1, -1, -1, 1, 0, 0), new Vertex(1, -1, -1, 1, 0, 0), new Vertex(0, 1, 0, 1, 0, 0),
    // back triangle
    new Vertex(-1, -1, 1, 1, 0, 0), new Vertex(1, -1, 1, 1, 0, 0), new Vertex(0, 1, 0, 1, 0, 0),
    // left triangle
    new Vertex(-1, -1, -1, 1, 0, 0), new Vertex(-1, -1, 1, 1, 0, 0), new Vertex(0, 1, 0, 1, 0, 0),
    // back triangle
    new Vertex(1, -1, -1, 1, 0, 0), new Vertex(1, -1, 1, 1, 0, 0), new Vertex(0, 1, 0, 1, 0, 0)
]



let viewMatrix = new Matrix4x4()
viewMatrix._4x4Data[0] = 1;
viewMatrix._4x4Data[5] = Math.cos(-18 * (Math.PI / 180));
viewMatrix._4x4Data[6] = -1 * Math.sin(-18 * (Math.PI / 180));
viewMatrix._4x4Data[9] = Math.sin(-18 * (Math.PI / 180));
viewMatrix._4x4Data[10] = Math.cos(-18 * (Math.PI / 180));
viewMatrix._4x4Data[14] = -1;




let projectionMatrix = new Matrix4x4()
projectionMatrix._4x4Data[5] = 1 / Math.tan(.5 * 90)
// not sure which [0] I like more
projectionMatrix._4x4Data[0] = projectionMatrix._4x4Data[5] * 1    
// or 
//projectionMatrix._4x4Data[0] = projectionMatrix._4x4Data[5] * (gridHeight /gridWidth)
projectionMatrix._4x4Data[10] = (10 / (10 - 0.1))
projectionMatrix._4x4Data[11] = 1
projectionMatrix._4x4Data[14] = ((-1 * (10 * 0.1)) / (10 - 0.1))


let PyramidWorldMatrix = new Matrix4x4()
PyramidWorldMatrix._4x4Data[0] = .5
PyramidWorldMatrix._4x4Data[5] = .5
PyramidWorldMatrix._4x4Data[10] = .5
PyramidWorldMatrix._4x4Data[12] = 0 // x
PyramidWorldMatrix._4x4Data[13] = 0 // y
PyramidWorldMatrix._4x4Data[14] = -1 // z
PyramidWorldMatrix._4x4Data[15] = .2





function ConvertNDCtoPixelX(_x) {
    return ((_x + 1) * (gridWidth / 2));
}
function ConvertNDCtoPixelY(_y) {
    return ((1 - _y) * (gridHeight / 2));
}





function VertexTime4X4(_v, matrix4x4) {
    let toReturn = new Vertex(0, 0, 0, 0)
    let temp = 0
    let counter = 0
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            temp += (_v.vertexData[i] * matrix4x4._4x4Data[counter])
            counter += 4
        }
        toReturn.vertexData[j] = temp
        temp = 0
        counter = j + 1
    }
    return toReturn
}




function RotateVertex(passedVertex) {
    //passedVertex.vertexData[0] += .001;

    let zRotationMatrix = [2]
    zRotationMatrix[0] = Math.cos(deltaTime * (rotationSpeed / deltaTime) * (Math.PI / 360))
    zRotationMatrix[1] = Math.sin(deltaTime * (rotationSpeed / deltaTime) * (Math.PI / 360))


    tempXA = passedVertex.vertexData[0] * zRotationMatrix[0]; // XA
    tempXB = passedVertex.vertexData[0] * zRotationMatrix[1]; // XB

    tempYD = passedVertex.vertexData[2] * zRotationMatrix[1]; // YD
    tempYE = passedVertex.vertexData[2] * zRotationMatrix[0]; // YE
    passedVertex.vertexData[0] = (tempXA - tempYD);
    passedVertex.vertexData[2] = (tempXB + tempYE);
    return passedVertex
}


let currentVertexShader = PyramidVertexShaderRotate

function PyramidVertexShaderRotate(vertex) {
    vertex = RotateVertex(vertex)


    w = VertexTime4X4(vertex, PyramidWorldMatrix)
    v = VertexTime4X4(w, viewMatrix)
    toReturn = VertexTime4X4(v, projectionMatrix)
    toReturn.vertexData[0] = (toReturn.vertexData[0] / toReturn.vertexData[3])
    toReturn.vertexData[1] = (toReturn.vertexData[1] / toReturn.vertexData[3])
    toReturn.vertexData[2] = (toReturn.vertexData[2] / toReturn.vertexData[3])
    return toReturn
}

// default shader

//function PyramidVertexShader(vertex) {
//    w = VertexTime4X4(vertex, PyramidWorldMatrix)
//    v = VertexTime4X4(w, viewMatrix)
//    toReturn = VertexTime4X4(v, projectionMatrix)
//    toReturn.vertexData[0] = (toReturn.vertexData[0] / toReturn.vertexData[3])
//    toReturn.vertexData[1] = (toReturn.vertexData[1] / toReturn.vertexData[3])
//    toReturn.vertexData[2] = (toReturn.vertexData[2] / toReturn.vertexData[3])
//    return toReturn
//}

function GridVertexShader(vertex) {
    return vertex
}


function drawGrid() {
    for (var i = 0; i < 44; i++) {

    }
}


function Parametric(x1, y1, x2, y2, color) {
    var cX = Math.abs(x2 - x1);
    var cY = Math.abs(y2 - y1);

    var tP = 0;
    if (cX > cY) {
        tP = cX;
    }
    else {
        tP = cY;
    }

    for (var i = 0; i < tP; i++) {
        var R = i / tP;
        var Rx = x1 + R * (x2 - x1);
        var Ry = y1 + R * (y2 - y1);
        var testX = Rx + .5;
        var testY = Ry + .5;
        if (testX < gridWidth && testX > 0 && testY < gridHeight && testY > 0) {
            fillPixel(Math.round(Rx + .5), Math.round(Ry + .5), color)
        }
    }
}




function DrawPyramid(color) {
    for (var i = 0; i < 12; i++) {
        if ((i % 3) == 0) {
            DrawTriangle(PyramidData[i], PyramidData[i+1], PyramidData[i+2],color)
        }
    }
}

// vertex 1 vertex 2 vertex 3 and color
function DrawTriangle(_v1, _v2, _v3, color) {
    _v1 = currentVertexShader(_v1)
    _v2 = currentVertexShader(_v2)
    _v3 = currentVertexShader(_v3)

    _v1.vertexData[0] = ConvertNDCtoPixelX(_v1.vertexData[0] / _v1.vertexData[3])
    _v1.vertexData[1] = ConvertNDCtoPixelY(_v1.vertexData[1] / _v1.vertexData[3])
    _v1.vertexData[2] = _v1.vertexData[2] / _v1.vertexData[3]
    _v2.vertexData[0] = ConvertNDCtoPixelX(_v2.vertexData[0] / _v2.vertexData[3])
    _v2.vertexData[1] = ConvertNDCtoPixelY(_v2.vertexData[1] / _v2.vertexData[3])
    _v2.vertexData[2] = _v2.vertexData[2] / _v2.vertexData[3]
    _v3.vertexData[0] = ConvertNDCtoPixelX(_v3.vertexData[0] / _v3.vertexData[3])
    _v3.vertexData[1] = ConvertNDCtoPixelY(_v3.vertexData[1] / _v3.vertexData[3])
    _v3.vertexData[2] = _v3.vertexData[2] / _v3.vertexData[3]

    Parametric(_v1.vertexData[0], _v1.vertexData[1], _v2.vertexData[0], _v2.vertexData[1], color)
    Parametric(_v2.vertexData[0], _v2.vertexData[1], _v3.vertexData[0], _v3.vertexData[1], color)
    Parametric(_v1.vertexData[0], _v1.vertexData[1], _v3.vertexData[0], _v3.vertexData[1], color)
}


var localRaster = document.getElementById("raster");
var localContext = localRaster.getContext("2d");
 
function clearRaster() {
    localContext.fillStyle = "black";
    localContext.fillRect(0, 0, 300, 169)
}
clearRaster();



// x location in raster, y location in raster, color to fill pixel
function fillPixel(x,y,color) {
    localContext.fillStyle = color;
    localContext.fillRect(x, y, 1, 1)
}




var onRepeat;
function pyramidRight() {
    onRepeat = setInterval(function () {
        if (PyramidWorldMatrix._4x4Data[12] < 1) {
            PyramidWorldMatrix._4x4Data[12] += .02
        }
    }, 50)
}
function pyramidLeft() {
    onRepeat = setInterval(function () {
        if (PyramidWorldMatrix._4x4Data[12] > -1) {
            PyramidWorldMatrix._4x4Data[12] -= .02 // y
        }
    }, 50)
}
function pyramidUp() {
    onRepeat = setInterval(function () {
        if (PyramidWorldMatrix._4x4Data[13] < 1) {
            PyramidWorldMatrix._4x4Data[13] += .02 // y
        }
    }, 50)
}
function pyramidDown() {
    onRepeat = setInterval(function () {
        if (PyramidWorldMatrix._4x4Data[13] > -1) {
            PyramidWorldMatrix._4x4Data[13] -= .02 // y
        }
    }, 50)
}

function pyramidIn() {
    onRepeat = setInterval(function () {
        if (PyramidWorldMatrix._4x4Data[14] < -.75) {
            PyramidWorldMatrix._4x4Data[14] += .02 // y
        }
    }, 50)
}
function pyramidOut() {
    onRepeat = setInterval(function () {
        if (PyramidWorldMatrix._4x4Data[14] > -1.25) {
            PyramidWorldMatrix._4x4Data[14] -= .02 // y
        }
    }, 50)
}

function ClearRepeat() {
    clearInterval(onRepeat)
}


let deltaTime = 0
function update() {
    clearRaster();
    deltaTime = deltaTime + 1;
    //currentVertexShader = PyramidVertexShader;
    DrawPyramid("green")
    setTimeout(update, 1); 
}


update();

