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
camara = vec3.fromValues(-1.5, 0.0, 0.50);
foco = vec3.fromValues(100.0, 0.0, 0.0);

var camara0 = vec3.fromValues(0.0, 0.0, 0.05);
var foco0 = vec3.fromValues(100.0, 0.0, 0.0);

var camara1 = vec3.fromValues(0.0, 0.0, 0.05);
var foco1 = vec3.fromValues(10.0, 20.0, 0.0);

var camara2 = vec3.fromValues(0.0, 0.0, 0.05);
var foco2 = vec3.fromValues(-5.0, -15.0, 0.0);

var camara3 = vec3.fromValues(39.0, 0.0, 0.05);
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
var vs_texture_source = "";
var fs_texture_source = "";
var vs_piso_source = "";
var fs_piso_source = "";
var vs_map_source = "";
var fs_map_source = "";



function loadVertexShader() {
  loadShader("./glsl/nuevos/vertex_normal.glsl", function(code) {
    vs_normal_source = code;
    loadShader("./glsl/nuevos/fragment_normal.glsl", function(code) {
      fs_normal_source = code;
      loadShader("./glsl/nuevos/vertex_color.glsl", function(code) {
        vs_color_source = code;
        loadShader("./glsl/nuevos/fragment_color.glsl", function(code) {
          fs_color_source = code;
          loadShader("./glsl/nuevos/vertex_skybox.glsl", function(code) {
            vs_texture_source = code;
            loadShader("./glsl/nuevos/fragment_skybox.glsl", function(code) {
              fs_texture_source = code;
              loadShader("./glsl/nuevos/vertex_piso.glsl", function(code) {
                vs_piso_source = code;
                loadShader("./glsl/nuevos/fragment_piso.glsl", function(code) {
                  fs_piso_source = code;
                  loadShader("./glsl/nuevos/vertex_map.glsl", function(code) {
                    vs_map_source = code;
                    loadShader("./glsl/nuevos/fragment_map.glsl", function(code) {
                      fs_map_source = code;
                      initWebGL();
                    })
                  })
                })
              })
            })          
          })  
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
  vertexSkyboxShader = makeShader(vs_texture_source, gl.VERTEX_SHADER);
  fragmentSkyboxShader = makeShader(fs_texture_source, gl.FRAGMENT_SHADER);
  vertexPisoShader = makeShader(vs_piso_source, gl.VERTEX_SHADER);
  fragmentPisoShader = makeShader(fs_piso_source, gl.FRAGMENT_SHADER);
  vertexMapShader = makeShader(vs_map_source, gl.VERTEX_SHADER);
  fragmentMapShader = makeShader(fs_map_source, gl.FRAGMENT_SHADER);

  //create program
  glColorProgram = gl.createProgram();
  glNormalProgram = gl.createProgram();
  glSkyboxProgram = gl.createProgram();
  glPisoProgram = gl.createProgram();
  glMapProgram = gl.createProgram();

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

  // attach and link shaders to the program
  gl.attachShader(glSkyboxProgram, vertexSkyboxShader);
  gl.attachShader(glSkyboxProgram, fragmentSkyboxShader);
  gl.linkProgram(glSkyboxProgram);

  if (!gl.getProgramParameter(glSkyboxProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  // attach and link shaders to the program
  gl.attachShader(glPisoProgram, vertexPisoShader);
  gl.attachShader(glPisoProgram, fragmentPisoShader);
  gl.linkProgram(glPisoProgram);

  if (!gl.getProgramParameter(glPisoProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  // attach and link shaders to the program
  gl.attachShader(glMapProgram, vertexMapShader);
  gl.attachShader(glMapProgram, fragmentMapShader);
  gl.linkProgram(glMapProgram);

  if (!gl.getProgramParameter(glMapProgram, gl.LINK_STATUS)) {
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

function setupTexture(texture, uniformName, canal) {
  if (canal === 0){
    var samplerUniform0 = gl.getUniformLocation(glProgram, uniformName);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture[0]);
    gl.uniform1i(samplerUniform1, 0);
  }else if (canal === 1){
    var samplerUniform1 = gl.getUniformLocation(glProgram, uniformName);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture[1]);
    gl.uniform1i(samplerUniform1, 1);
  } else if (canal === 2){
    var samplerUniform2 = gl.getUniformLocation(glProgram, uniformName);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture[2]);
    gl.uniform1i(samplerUniform2, 2);
    
  }; 
  
}

function setupLight() {
  var lightWorldPositionLocation = gl.getUniformLocation(glProgram, "uLightPosition");
  var lightWorldPositionLocation1 = gl.getUniformLocation(glProgram, "uLightPosition1");
  var lightWorldPositionLocation2 = gl.getUniformLocation(glProgram, "uLightPosition2");
  var lightWorldPositionLocation3 = gl.getUniformLocation(glProgram, "uLightPosition3");
  var lightWorldPositionLocation4 = gl.getUniformLocation(glProgram, "uLightPosition4");
  var lightWorldPositionLocation5 = gl.getUniformLocation(glProgram, "uLightPosition5");
  var lightWorldPositionLocation6 = gl.getUniformLocation(glProgram, "uLightPosition6");
  var lightWorldPositionLocation7 = gl.getUniformLocation(glProgram, "uLightPosition7");
  var lightWorldPositionLocation8 = gl.getUniformLocation(glProgram, "uLightPosition8");

  var constantAmbient = gl.getUniformLocation(glProgram, "constantAmbient");
  var constantDiffuse = gl.getUniformLocation(glProgram, "constantDiffuse");
  var constantSpecular = gl.getUniformLocation(glProgram, "constantSpecular");
  var glossiness = gl.getUniformLocation(glProgram, "glossiness");

  gl.uniform1f(constantAmbient, app.Ambiente);
  gl.uniform1f(constantDiffuse, app.Difusa);
  gl.uniform1f(constantSpecular, app.Especular);
  gl.uniform1f(glossiness, app.Glossiness);

  gl.uniform3fv(lightWorldPositionLocation, [0.0, 0.0, 3.0]);
  gl.uniform3fv(lightWorldPositionLocation1, posicionFarol1);
  gl.uniform3fv(lightWorldPositionLocation2, posicionFarol2);
  gl.uniform3fv(lightWorldPositionLocation3, posicionFarol3);
  gl.uniform3fv(lightWorldPositionLocation4, posicionFarol4);
  gl.uniform3fv(lightWorldPositionLocation5, posicionFarol5);
  gl.uniform3fv(lightWorldPositionLocation6, posicionFarol6);
  gl.uniform3fv(lightWorldPositionLocation7, posicionFarol7);
  gl.uniform3fv(lightWorldPositionLocation8, posicionFarol8);

  var lightColorLocation = gl.getUniformLocation(glProgram, "uAmbientColor");
  var specularColorLocation = gl.getUniformLocation(glProgram, "uDirectionalColor");

  var sunColor = vec3.fromValues(0.593,0.833,1.000);
  var lightColor = vec3.fromValues(1.000,0.777,0.052);
  //sunColor = vec3.normalize(sunColor, sunColor);
  //sunColor = vec3.normalize(sunColor, sunColor);
  //lightColor = vec3.normalize(lightColor, lightColor);
  // set the light color
  gl.uniform3fv(lightColorLocation, sunColor);  // red light
  // set the specular color
  gl.uniform3fv(specularColorLocation, lightColor);  // red light
}

function setupVertexShaderMatrix(matrizModelado) {

  var modelMatrixUniform = gl.getUniformLocation(glProgram, "modelMatrix");
  var viewMatrixUniform = gl.getUniformLocation(glProgram, "viewMatrix");
  var projMatrixUniform = gl.getUniformLocation(glProgram, "projMatrix");
  var normalMatrixUniform = gl.getUniformLocation(glProgram, "normalMatrix");

  noiseScale = gl.getUniformLocation(glProgram, "noiseScale");


  var modelMatrixFinal = mat4.create();
  mat4.multiply(modelMatrixFinal, rotationMatrix, matrizModelado);

  mat4.identity(normalMatrix);
  mat4.multiply(normalMatrix, normalMatrix, modelMatrixFinal);
  mat4.invert(normalMatrix, normalMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrixFinal);
  gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
  gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
  gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);

}

function drawScene(trianglesVerticeBuffer, trianglesNormalBuffer, trianglesIndexBuffer, trianglesTextureBuffer, colorBuffer, matrizModelado, usarColor, usarTextura, usarMapa, texturas, light) {

  if (usarMapa){
    glProgram = glMapProgram;
    gl.useProgram(glProgram);

    vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
    
    var cameraLocation = gl.getUniformLocation(glProgram, "uCamaraPosition");
    gl.uniform3fv(cameraLocation, camara);

    setupTexture(texturas, "uSampler4", 0);

    gl.uniform1i(gl.getUniformLocation(glProgram, "light"), light);

    setupLight();

  }
  else if (usarColor) {
    glProgram = glColorProgram;
    gl.useProgram(glProgram);

    vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

    vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    var cameraLocation = gl.getUniformLocation(glProgram, "uCamaraPosition");
    gl.uniform3fv(cameraLocation, camara);

    gl.uniform1i(gl.getUniformLocation(glProgram, "light"), light);

    setupLight();
  

  } else if (texturas.length === 3){
    glProgram = glPisoProgram;
    gl.useProgram(glProgram);


    vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    vertexTextureAttribute = gl.getAttribLocation(glProgram, "aTextureCoord");
    gl.enableVertexAttribArray(vertexTextureAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTextureBuffer);
    gl.vertexAttribPointer(vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);

    setupTexture(texturas, "uSampler", 0);
    setupTexture(texturas, "uSampler1", 1);
    setupTexture(texturas, "uSampler2", 2);

    setupLight();

  }else if (usarTextura){
    glProgram = glSkyboxProgram;
    gl.useProgram(glProgram);

    vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    vertexTextureAttribute = gl.getAttribLocation(glProgram, "aTextureCoord");
    gl.enableVertexAttribArray(vertexTextureAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTextureBuffer);
    gl.vertexAttribPointer(vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);
    
    setupTexture(texturas, "uSampler0", 0);
    setupLight();
    gl.uniform1i(gl.getUniformLocation(glProgram, "light"), light);

  }  else {
    glProgram = glNormalProgram;
    gl.useProgram(glProgram);

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
  if(codigoCamara === 4){
    var tmp = camara;
    camara = animados[0].getPosicion();
    vec3.add(camara, camara, vec3.fromValues(0.0, 0.0, 0.8));
    var dir = vec3.create();
    dir = vec3.sub(dir, camara, tmp);
    vec3.add(foco, dir, camara);
  }
  viewMatrix = mat4.lookAt(viewMatrix, camara, foco, vec3.fromValues(0.0, 0.0, 1.0));
  _.each(animados, function(animado) {
    animado.animar();
    animado.dibujar(mat4.create(), conEjes);
  })
  animate();
}

window.onload = loadVertexShader();

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
    radio = 20;
    primeraPersona = false;
    camara0 = camara;
    foco0 = foco;

    camara = camara1;
    foco = foco1;
    girar = girarCamara;
  }
  if (codigo == 2){
    // camara orbital centrada en la silla
    radio = 13;
    camara1 = camara;
    foco1 = foco;

    camara = camara2;
    foco = foco2;
  }
  // camara orbital centrada en el origen
  if (codigo == 3){
    radio = 39;
    camara2 = camara;
    foco2 = foco;

    camara = camara3;
    foco = foco3;
  }
  if (codigo == 4){
    camara3 = camara;
    foco3 = foco;

    camara = animados[0].getPosicion();
    foco = vec3.fromValues(0.0, 0.0, 1.0);
  }
};

$('body').on("keydown", function(event) {

  if (event.keyCode == ESPACIO) {
    codigoCamara = codigoCamara + 1;
    if (codigoCamara > 4) codigoCamara = 0;
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

$('#my-canvas').mousemove(function(e){ 
  mouse.x = e.clientX || e.pageX; 
  mouse.y = e.clientY || e.pageY 
});
  
$('#my-canvas').mousedown(function(event){   
  isMouseDown = true;
  mouseO.x = mouse.x;
  mouseO.y = mouse.y;    
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
  giroX = mat4.fromRotation(giroX, -anguloX, ejeX);
  giroY = mat4.fromRotation(giroY, -anguloY, ejeY);
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

  var tmp = vec3.fromValues(radio * Math.cos(alfa) * Math.sin(beta), radio * Math.sin(alfa) * Math.sin(beta), radio * Math.cos(beta));
  
  //traslado al centro de rotacion
  vec3.add(tmp, tmp, foco);

  //evita que el la camara y el foco esten uno arriba del otro
  if(tmp[0] === foco[0] && tmp[1] === foco[1])
    return;

  //evita que el la camara este por debajo del piso
  if(tmp[2] < 0)
    tmp[2] = 0.05;

  camara = tmp;
};



function loadImages(callback) {
  var imagenes = [];  
  var urls = ["./objetos/tierra.jpg",
        "./objetos//tierraSeca.jpg",
        "./objetos/pasto.jpg",
      ];
  var imagesToLoad = urls.length;
     
  // Called each time an image finished loading.
  var onImageLoad = function() {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad == 0) {
      callback(imagenes);
      }
    };
     
  for (var ii = 0; ii < imagesToLoad; ++ii) {
    var image = loadImage(urls[ii], onImageLoad);
    imagenes.push(image);
  }
};

function loadImage(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
};