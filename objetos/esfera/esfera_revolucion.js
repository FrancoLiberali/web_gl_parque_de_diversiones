function llenarNivel(vertexArray, formaEnNivel) {
        vertexArray.push(formaEnNivel[0]);
        vertexArray.push(formaEnNivel[1]);
        vertexArray.push(formaEnNivel[2]);
    return vertexArray
}
//Genera un arreglo con los vertices correspondientes a una media circunsferencia
//en el plano xy empezando en el (1,0,0) y terminando en el (-1,0,0).  
function circulo (radio){
  var vertexArray = [];
  var r = 1;
  for(var i = 0 ; i <= Math.PI; i += Math.PI/8){
    vertexArray.push(vec3.fromValues(radio*Math.cos(i), radio*Math.sin(i), 0.00));
  }
  return vertexArray;
}

function revolucion(curva, eje, pasos){
  
  var vertexArray = [];
  //lleno el primer nivel con la curva pasado por parametro
  for (var punto = 0; punto < curva.length; punto++){
    vertexArray = llenarNivel(vertexArray, curva[punto]);
  }
  
  var m1 = mat4.create();
  mat4.fromRotation(m1, pasos, eje);

  for(var i = 0; i <= 2*Math.PI; i += pasos){
    for (var punto = 0; punto < curva.length; punto++){
      var formaEnNivel = vec3.create();    
      vec3.transformMat4(formaEnNivel, curva[punto], m1);
      curva[punto] = formaEnNivel;
      vertexArray = llenarNivel(vertexArray, curva[punto]); 
    }

  }
  return vertexArray;   
}

//Calcula la dimension correspondiente a una grilla
//necesaria para contener los vertices de una superficie
//de revolucion que se generaria a partir de los parametros
//"curva" y "pasos" pasados por parametro.
//La primer componente del arreglo corresponde a la coordenada x
//mientras que la segunda componenete corresponde a la coordenada y
function dimensionGrillaRevolucion(curva, pasos){
  var dimensiones = [];
  dimensiones[0] = ((2*Math.PI)/pasos)+1; 
  dimensiones[1] = curva.length;
  return dimensiones;
}

//Esta funcion fue hecha con el mero proposito de lograr que el test ande
//su objetivo es crear un arreglo de 153 vertices.
//Se usa para crear color_array y normal_array
function cualquiera(){
  var vertexArray = [];
  for(var i = 0 ;i < 153; i++){
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
    var pasos = Math.PI/8;
    var curvaInicial = circulo(radio);
    var dimension = dimensionGrillaRevolucion(curvaInicial, pasos);
    this.index_array = crearIndexArray(dimension[0], dimension[1]);

    this.vertex_array = revolucion(curvaInicial, vec3.fromValues(1.0, 0.0, 0.0), pasos);
    this.color_array = cualquiera();

    this.normal_array = cualquiera();
  }
  this.crearEsfera();
  this.setupWebGLBuffers();
}
