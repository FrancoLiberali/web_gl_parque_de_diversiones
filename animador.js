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

var animados = [];
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
  loadShader("../../glsl/vertex_normal.glsl", function(code) {
    vs_normal_source = code;
    loadShader("../../glsl/fragment_normal.glsl", function(code) {
      fs_normal_source = code;
      loadShader("../../glsl/vertex_color.glsl", function(code) {
        vs_color_source = code;
        loadShader("../../glsl/fragment_color.glsl", function(code) {
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
  _.each(animados, function(animado) {
    animado.dibujar(mat4.create(), conEjes);
  })
  animate();
}

window.onload = loadVertexShader;

E = 69;
T = 84;
R = 82;
$('body').on("keydown", function(event) {
  if (event.keyCode == T) {
    test = !test;
  }

  if (event.keyCode == R) {
    rotate = !rotate;
  }

  if (event.keyCode == E) {
    conEjes = !conEjes;
  }
});
