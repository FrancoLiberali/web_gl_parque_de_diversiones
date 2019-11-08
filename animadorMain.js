var mat4 = glMatrix.mat4;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;

var gl = null,
  canvas = null,

  glProgram = null,
  glNormalProgram = null,
  glColorProgram = null,
  fragmentNormalShader = null,
  fragmentColorShader = null,
  vertexColorShader = null,
  vertexNormalShader = null;

var vertexPositionAttribute = null,
  vertexNormalAttribute = null,
  vertexColorAttribute = null;

var rotationMatrix = mat4.create();
var viewMatrix = mat4.create();
var projMatrix = mat4.create();
var normalMatrix = mat4.create();
var rotate_angle = 0;

//camaras
var vista = mat4.create();
mat4.identity(vista);
var camara = vec3.fromValues(0.0, 0.0, 0.0);
var foco = vec3.fromValues(100.0, 0.0, 0.0);

var camara0 = vec3.fromValues(0.0, 0.0, 0.0);
var foco0 = vec3.fromValues(100.0, 0.0, 0.0);

var camara1 = vec3.fromValues(0.0, 0.0, 0.0);
var foco1 = vec3.fromValues(10.0, 50.0, 0.0);

var camara2 = vec3.fromValues(0.0, 0.0, 0.0);
var foco2 = vec3.fromValues(-5.0, -15.0, 0.0);

var camara3 = vec3.fromValues(100.0, 0.0, 0.0);
var foco3 = vec3.fromValues(0.0, 0.0, 0.0);

// matriz de giro sobre el eje x (foco) 
var giroX = mat4.create();
// matriz de giro sobre el eje y (foco)
var giroY = mat4.create();
// direccion que va desde la camara al foco
var eje = vec3.create();
eje = vec3.sub(eje, foco, camara);
// eje x relativo al eje
var ejeX = vec3.create();
// eje y relativo al eje
var ejeY = vec3.create();
// vector donde se guarda la direccion a la cual moverse (izq/der) relativa al eje
var lado = vec3.create();

//funcion de giro
var girar = girarFoco;
var codigoCamara = 0;
var primeraPersona = true;
var velocidadRotacion = 0.01;
var velocidad = 0.5;
//radio de para las vistas orbitales
var radio = 15;
// "diferencial" del angulos de giro sobre el eje x
var alfa = 0;
// "diferencial" del angulos de giro sobre el eje y
var beta = 0;




NORMAL_HACIA_ARRIBA = vec3.fromValues(0, 0, 1);

var animados = [];
var iniciarObjectos3D = function() {};

var test = false;
var rotate = false;
var conEjes = false;

function loadShader(url, callback) {

  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.onload = function(e) {
    callback(e.target.responseText);
  };
  req.send();
}

var vs_normal_source = "";
var fs_normal_source = "";
var vs_color_source = "";
var fs_color_source = "";

function loadVertexShader() {
  loadShader("./glsl/vertex_normal.glsl", function(code) {
    vs_normal_source = code;
    loadShader("./glsl/fragment_normal.glsl", function(code) {
      fs_normal_source = code;
      loadShader("./glsl/vertex_color.glsl", function(code) {
        vs_color_source = code;
        loadShader("./glsl/fragment_color.glsl", function(code) {
          fs_color_source = code;
          initWebGL();
        })
      })
    })
  })
};

function initWebGL() {

  canvas = document.getElementById("my-canvas");

  try {
    gl = canvas.getContext("webgl");
  } catch (e) {
    alert("Error: Your browser does not appear to support WebGL.");
  }

  if (gl) {
    setupWebGL();
    initShaders();
    iniciarObjectos3D();
    tick();
  } else {
    alert("Error: Your browser does not appear to support WebGL.");
  }

}


function setupWebGL() {
  gl.enable(gl.DEPTH_TEST);
  //set the clear color
  gl.clearColor(0.1, 0.1, 0.2, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.viewport(0, 0, canvas.width, canvas.height);

  // Matrix de Proyeccion Perspectiva

  mat4.perspective(projMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);

  mat4.identity(rotationMatrix);

  mat4.identity(viewMatrix);
  mat4.translate(viewMatrix, viewMatrix, [0.0, 0.0, -5.0]);
}


function initShaders() {

  //compile shaders
  vertexNormalShader = makeShader(vs_normal_source, gl.VERTEX_SHADER);
  fragmentNormalShader = makeShader(fs_normal_source, gl.FRAGMENT_SHADER);
  vertexColorShader = makeShader(vs_color_source, gl.VERTEX_SHADER);
  fragmentColorShader = makeShader(fs_color_source, gl.FRAGMENT_SHADER);

  //create program
  glColorProgram = gl.createProgram();
  glNormalProgram = gl.createProgram();

  // attach and link shaders to the program
  gl.attachShader(glNormalProgram, vertexNormalShader);
  gl.attachShader(glNormalProgram, fragmentNormalShader);
  gl.linkProgram(glNormalProgram);

  if (!gl.getProgramParameter(glNormalProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  // attach and link shaders to the program
  gl.attachShader(glColorProgram, vertexColorShader);
  gl.attachShader(glColorProgram, fragmentColorShader);
  gl.linkProgram(glColorProgram);

  if (!gl.getProgramParameter(glColorProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  //use program
  glProgram = glColorProgram;
  gl.useProgram(glColorProgram);
}

function makeShader(src, type) {
  //compile the vertex shader
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
  }
  return shader;
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function setupVertexShaderMatrix(matrizModelado) {

  var modelMatrixUniform = gl.getUniformLocation(glProgram, "modelMatrix");
  var viewMatrixUniform = gl.getUniformLocation(glProgram, "viewMatrix");
  var projMatrixUniform = gl.getUniformLocation(glProgram, "projMatrix");
  var normalMatrixUniform = gl.getUniformLocation(glProgram, "normalMatrix");

  var modelMatrixFinal = mat4.create();
  mat4.multiply(modelMatrixFinal, rotationMatrix, matrizModelado);

  mat4.identity(normalMatrix);
  mat4.multiply(normalMatrix, viewMatrix, modelMatrixFinal);
  mat4.invert(normalMatrix, normalMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrixFinal);
  gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
  gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
  gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);
}

function drawScene(trianglesVerticeBuffer, trianglesNormalBuffer, trianglesIndexBuffer, colorBuffer, matrizModelado, colors) {

  if (colors) {
    glProgram = glColorProgram;
    gl.useProgram(glProgram);

    vertexColorAttribute = gl.getAttribLocation(glColorProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
  } else {
    glProgram = glNormalProgram;
    gl.useProgram(glNormalProgram);

    vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  }

  setupVertexShaderMatrix(matrizModelado);

  vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
  if (test) {
    gl.drawElements(gl.LINE_STRIP, trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
  } else {
    gl.drawElements(gl.TRIANGLE_STRIP, trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
  }
}

function animate() {
  if (rotate) {
    rotate_angle += 0.01;
    mat4.identity(rotationMatrix);
    mat4.rotate(rotationMatrix, rotationMatrix, rotate_angle, [1.0, 0.0, 1.0]);
  }
}

function tick() {

  requestAnimationFrame(tick);
  if(isMouseDown) girar();
  mat4.lookAt(vista, camara, foco, vec3.fromValues(0.0, 0.0, 1.0));
  _.each(animados, function(animado) {
    animado.animar();
    animado.dibujar(vista, conEjes);
  })
  animate();
}

window.onload = loadVertexShader;

E = 69;
Q = 81;
T = 84;
R = 82;
W = 87;
S = 83;
A = 65;
D = 68;
L = 76;

ESPACIO = 32;


function cambiarCamara(codigo){
  // camara primera persona
  if (codigo == 0){
    primeraPersona = true;
    camara2 = camara;
    foco2 = foco;

    camara = camara0;
    foco = foco0;
    girar = girarFoco;
  }
  // camara orbital centrada en montaña rusa
  if (codigo == 1){
    radio = 15;
    primeraPersona = false;
    camara0 = camara;
    foco0 = foco;

    camara = camara1;
    foco = foco1;
    girar = girarCamara;
  }
  if (codigo == 2){
    // camara orbital centrada en la silla
    camara1 = camara;
    foco1 = foco;

    camara = camara2;
    foco = foco2;
  }
  // camara orbital centrada en el origen
  if (codigo == 3){
    radio = 70;
    camara2 = camara;
    foco2 = foco;

    camara = camara3;
    foco = foco3;
  }
  if (codigo == 4){
    
  }
};

$('body').on("keydown", function(event) {

  if (event.keyCode == ESPACIO) {
    codigoCamara = codigoCamara + 1;
    if (codigoCamara > 3) codigoCamara = 0;
    cambiarCamara(codigoCamara);
  }

  if (event.keyCode == T) {
    test = !test;
  }

  if (event.keyCode == R) {
    rotate = !rotate;
  }

  if (event.keyCode == L) {
    conEjes = !conEjes;
  }
  if (event.keyCode == W && primeraPersona) {
    vec3.normalize(eje, eje);
    vec3.scale(eje, eje, velocidad)
    vec3.add(camara, camara, eje); 
  }
  if (event.keyCode == S && primeraPersona) {
    vec3.normalize(eje, eje);
    vec3.scale(eje, eje, velocidad)
    vec3.sub(camara, camara, eje); 
  }
  if (event.keyCode == A && primeraPersona) {
    vec3.cross(lado, NORMAL_HACIA_ARRIBA, eje);
    vec3.normalize(lado, lado);
    vec3.scale(lado, lado, velocidad)
    vec3.add(camara, camara, lado); 
  }
  if (event.keyCode == D && primeraPersona) {
    vec3.cross(lado, eje, NORMAL_HACIA_ARRIBA);
    vec3.normalize(lado, lado);
    vec3.scale(lado, lado, velocidad)
    vec3.add(camara, camara, lado); 
  }
  if (event.keyCode == Q) {
    vec3.add(camara, camara, vec3.fromValues(0.0, 0.0, velocidad));
  }
  if (event.keyCode == E) {
    vec3.sub(camara, camara, vec3.fromValues(0.0, 0.0, velocidad));
  }
 
});

var isMouseDown = false;
var mouse = {x: 0, y: 0};
var mouseO = {x: 0, y: 0};


$('body').mousemove(function(e){ 
  mouse.x = e.clientX || e.pageX; 
  mouse.y = e.clientY || e.pageY 
});
  
$('body').mousedown(function(event){   
  isMouseDown = true;        
});

$('body').mouseup(function(event){
  isMouseDown = false;    
});

function girarFoco(){
  var anguloX = Math.atan((mouse.x - mouseO.x)*velocidadRotacion);
  var anguloY = Math.atan((mouse.y - mouseO.y)*velocidadRotacion);
  mouseO.x = mouse.x;
  mouseO.y = mouse.y; 
  eje = vec3.sub(eje, foco, camara);
  vec3.cross(ejeY, eje, NORMAL_HACIA_ARRIBA);
  vec3.normalize(ejeY, ejeY);
  vec3.cross(ejeX, ejeY, eje);
  vec3.normalize(ejeX, ejeX);
  //eje = vec3.nomrmalize(eje, eje);
  giroX = mat4.fromRotation(giroX, anguloX, ejeX);
  giroY = mat4.fromRotation(giroY, anguloY, vec3.fromValues(0.0, 1.0, 0.0));
  foco = vec3.transformMat4(foco, foco, giroX);
  foco = vec3.transformMat4(foco, foco, giroY);
};

function girarCamara(){

  alfa = alfa + (mouse.x - mouseO.x) * velocidadRotacion;
  beta = beta + (mouse.y - mouseO.y) * velocidadRotacion;
  
  mouseO.x = mouse.x;
  mouseO.y = mouse.y;

  if (beta<0) beta=0;
  if (beta>Math.PI) beta=Math.PI;

  camara = vec3.fromValues(radio * Math.cos(alfa) * Math.sin(beta), radio * Math.sin(alfa) * Math.sin(beta), radio * Math.cos(beta));
  
  //traslado al centro de rotacion
  vec3.add(camara, camara, foco);
};