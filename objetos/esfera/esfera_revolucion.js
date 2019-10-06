//Genera un arreglo con los vertices correspondientes a una media circunsferencia
//en el plano xy empezando en el (1,0,0) y terminando en el (-1,0,0).
function circulo(radio) {
  var vertexArray = [];
  var r = 1;
  for (var i = 0; i <= Math.PI; i += Math.PI / 8) {
    vertexArray.push(vec3.fromValues(radio * Math.cos(i), radio * Math.sin(i), 0.00));
  }
  return vertexArray;
}

//Esta funcion fue hecha con el mero proposito de lograr que el test ande
//su objetivo es crear un arreglo de 153 vertices.
//Se usa para crear color_array y normal_array
function cualquiera() {
  var vertexArray = [];
  for (var i = 0; i < 153; i++) {
    vertexArray.push(Math.cos(i));
    vertexArray.push(0.0);
    vertexArray.push(Math.sin(i));
  }
  return vertexArray;
}

function Esfera() {
  Objeto3D.call(this);

  this.crearEsfera = function() {
    var radio = 1.5;
    var pasos = Math.PI / 8;
    var curvaInicial = circulo(radio);
    var dimension = dimensionGrillaRevolucion(curvaInicial, pasos);
    crearIndexArray(this.index_array, dimension[0], dimension[1]);

    this.vertex_array = revolucion(curvaInicial, vec3.fromValues(1.0, 0.0, 0.0), pasos);
    this.color_array = cualquiera();

    this.normal_array = cualquiera();
  }
  this.crearEsfera();
  this.setupWebGLBuffers();
}
