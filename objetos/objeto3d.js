function Objeto3D() {
  // Si los buffers son nulos, el objeto actua solo como contenedor
  this.vertexBuffer = null;
  this.indexBuffer = null;
  this.normalBuffer = null;
  this.colorBuffer = null;

  this.vertex_array = [];
  this.index_array = [];
  this.normal_array = [];
  this.color_array = [];

  this.matrizModelado = mat4.create();
  this.matrizPadre;

  this.hijos = [];

  this.posicion = vec3.create(); // x,y,z
  this.ejeRotacion; // x,y,z
  this.anguloRotacion // angulo
  this.escala; // x,y,z

  this.setupWebGLBuffers = function() {
    // 1. Creamos un buffer para las posicioens dentro del pipeline.
    this.vertexBuffer = gl.createBuffer();
    // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
    // hemos creado.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    // 3. Cargamos datos de las posiciones en el buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex_array), gl.STATIC_DRAW);

    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_array), gl.STATIC_DRAW);

    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_array), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información de los índices
    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
    // Notar también que se usa un array de enteros en lugar de floats.
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.indexBuffer.number_vertex_point = this.index_array.length;
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_array), gl.STATIC_DRAW);
  }

  this.setGeometria = function(vertexArray, indexArray, normalArray) {
    this.vertex_array = vertexArray;
    this.index_array = indexArray;
    this.normal_array = normalArray;
  }

  this.setColor = function(colorArray) {
    this.color_array = colorArray;
  }

  this.dibujar = function(m) {

    var mat; // guardo la matriz de transformacion final que voy a usar para dibujar el objeto

    matrizPadre = m;


    // actualizar matrizModelado segun posicion, ejeRotacion,anguloRotacion y escala
    // matrizModelado =  matTraslacion * matRotacion * matEscalado;

    // calcular matriz final
    // mat = matrizPadre * matrizModelado

    if (this.vertexBuffer && this.indexBuffer && this.normalBuffer) {
      // dibujar la geometria del objeto, segun la tranformacion de "mat"
      drawScene(this.vertexBuffer, this.normalBuffer, this.indexBuffer, this.matrizModelado);

    }

    if (this.hijos.length > 0) {

      for (var i = 0; i < this.hijos.length; i++) {
        this.hijos[i].dibujar(mat);
      }
    }


  }

  this.transladar = function(x, y, z) {
    mat4.translate(this.matrizModelado, this.matrizModelado, [x, y, z]);
  }

  this.setPosicion = function(x, y, z) {
    // guarda la posicion
  }

  this.setRotacion = function(angulo, x, y, z) {
    // guarda la rotacion
  }

  this.setEscala = function(x, y, z) {
    // guarda la escala

  }

  this.agregarHijo = function(obj) {
    this.hijos.push(obj);
  }


  this.quitarHijo = function(obj) {

    // quitar obj de hijos;
  }

}
