var mat4 = glMatrix.mat4;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;

var gl = null,
  canvas = null,

  glProgram = null,
  fragmentShader = null,
  vertexShader = null;

var vertexPositionAttribute = null,
  vertexNormalAttribute = null;

var modelMatrix = mat4.create();
var viewMatrix = mat4.create();
var projMatrix = mat4.create();
var normalMatrix = mat4.create();
var rotate_angle = -1.57078;

var animados = [];
var test = false;

function loadShader(url, callback) {

  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.onload = function(e) {
    callback(e.target.responseText);
  };
  req.send();
}

var vs_source = "";
var fs_source = "";

function loadVertexShader() {
  loadShader("../../glsl/vertex1.glsl", function(code) {
    vs_source = code;
    loadShader("../../glsl/fragment1.glsl", function(code) {
      fs_source = code;
      initWebGL();
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

  mat4.identity(modelMatrix);
  mat4.rotate(modelMatrix, modelMatrix, -1.57078, [1.0, 0.0, 0.0]);

  mat4.identity(viewMatrix);
  mat4.translate(viewMatrix, viewMatrix, [0.0, 0.0, -5.0]);
}


function initShaders() {

  //compile shaders
  vertexShader = makeShader(vs_source, gl.VERTEX_SHADER);
  fragmentShader = makeShader(fs_source, gl.FRAGMENT_SHADER);

  //create program
  glProgram = gl.createProgram();

  //attach and link shaders to the program
  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);
  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  //use program
  gl.useProgram(glProgram);
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
  mat4.multiply(modelMatrixFinal, modelMatrix, matrizModelado)
  gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrixFinal);
  gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
  gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
  gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);
}

function drawScene(trianglesVerticeBuffer, trianglesNormalBuffer, trianglesIndexBuffer, matrizModelado) {

  setupVertexShaderMatrix(matrizModelado);

  vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexNormalAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
  if (test) {
    gl.drawElements(gl.LINE_STRIP, trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
  } else {
    gl.drawElements(gl.TRIANGLE_STRIP, trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
  }
}

function animate() {

  rotate_angle += 0.01;
  mat4.identity(modelMatrix);
  mat4.rotate(modelMatrix, modelMatrix, rotate_angle, [1.0, 0.0, 1.0]);


  mat4.identity(normalMatrix);
  mat4.multiply(normalMatrix, viewMatrix, modelMatrix);
  mat4.invert(normalMatrix, normalMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

}

function tick() {

  requestAnimationFrame(tick);
  _.each(animados, function(animado) {
    animado.dibujar();
  })
  animate();
}

window.onload = loadVertexShader;

$('body').on("keydown", function(event) {
  if (event.keyCode == 84) {
    test = !test;
  }
});
