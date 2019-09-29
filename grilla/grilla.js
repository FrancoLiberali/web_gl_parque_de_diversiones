//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//
// OBJETO VERTEX-GRID
// Definimos un constructor para el objeto VertexGrid
function VertexGrid(_rows, _cols) {
  this.cols = _cols;
  this.rows = _rows;
  this.index_buffer = null;

  this.position_buffer = null;
  this.normal_buffer = null;
  this.color_buffer = null;

  this.trianglesVerticeBuffer = null,
  this.trianglesNormalBuffer = null,
  this.trianglesIndexBuffer = null;


  this.createIndexBuffer = function() {

    // A partir de conocer las de la grilla
    // se genera el index buffer correspondiente para renderizar la grilla utilizando
    // triangle-strip

    this.index_buffer = [];
    for (var i = 0; i < this.rows - 1; i++) {
      this.index_buffer.push(i * this.cols);
      for (var j = 0; j < this.cols - 1; j++) {

        // lleno el buffer de indices del quad
        this.index_buffer.push(i * this.cols + j);
        this.index_buffer.push((i + 1) * this.cols + j);
        this.index_buffer.push(i * this.cols + j + 1);
        this.index_buffer.push((i + 1) * this.cols + j + 1);
      }
      this.index_buffer.push((i + 1) * this.cols + this.cols - 1);
    }
  }

  // Esta función inicializa el position_buffer y el color buffer de forma de
  // crear un plano de color gris que se extiende sobre el plano XY, con Z=0
  // El plano se genera centrado en el origen.
  // El propósito de esta función es a modo de ejemplo de como inicializar y cargar
  // los buffers de las posiciones y el color para cada vértice.
  this.createUniformPlaneGrid = function() {

    this.position_buffer = [];
    this.normal_buffer = [];
    this.color_buffer = [];

    for (var i = 0.0; i < this.rows; i++) {
      for (var j = 0.0; j < this.cols; j++) {

        // Para cada vértice definimos su posición
        // como coordenada (x, y, z=0)
        this.position_buffer.push(i - (this.rows - 1.0) / 2.0);
        this.position_buffer.push(j - (this.rows - 1) / 2.0);
        this.position_buffer.push(0);

        // Para cada vértice definimos su normal
        // como coordenada (x=0, y=0, z=1)
        this.normal_buffer.push(0.0);
        this.normal_buffer.push(0.0);
        this.normal_buffer.push(1.0);

        // Para cada vértice definimos su color
        this.color_buffer.push(1.0 / this.rows * i);
        this.color_buffer.push(0.2);
        this.color_buffer.push(1.0 / this.cols * j);

      };
    };
  }

  // ACTIVIDAD 2.
  // Crear alguna otra función similar a la anterior createUniformPlaneGrid()
  // que cree una superficie en donde la altura ya no sea z=0 sino que tenga aluna forma
  // o part�n en particular.


  // Esta función crea e incializa los buffers dentro del pipeline para luego
  // utlizarlos a la hora de renderizar.
  this.setupWebGLBuffers = function() {

    // 1. Creamos un buffer para las posicioens dentro del pipeline.
    this.trianglesVerticeBuffer = gl.createBuffer();
    // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
    // hemos creado.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVerticeBuffer);
    // 3. Cargamos datos de las posiciones en el buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

    this.trianglesNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la informaci�n del color
    this.webgl_color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información de los índices
    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
    // Notar también que se usa un array de enteros en lugar de floats.
    this.trianglesIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.trianglesIndexBuffer);
    this.trianglesIndexBuffer.number_vertex_point = this.index_buffer.length;
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
  }

  this.dibujar = function() {
    drawScene(this.trianglesVerticeBuffer, this.trianglesNormalBuffer, this.trianglesIndexBuffer);
  }
}
