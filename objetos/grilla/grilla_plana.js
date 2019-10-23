function GrillaPlana(_rows, _cols) {
  Objeto3D.call(this);
  this.cols = _cols;
  this.rows = _rows;

  // Esta función inicializa el vertex_array y el color buffer de forma de
  // crear un plano de color gris que se extiende sobre el plano XY, con Z=0
  // El plano se genera centrado en el origen.
  // El propósito de esta función es a modo de ejemplo de como inicializar y cargar
  // los buffers de las posiciones y el color para cada vértice.
  this.crearGrillaPlana = function() {
    crearIndexArray(this.index_array, this.rows, this.cols);

    for (var i = 0.0; i < this.rows; i++) {
      for (var j = 0.0; j < this.cols; j++) {

        // Para cada vértice definimos su posición
        // como coordenada (x, y, z=0)
        this.vertex_array.push(i - (this.rows - 1.0) / 2.0);
        this.vertex_array.push(j - (this.rows - 1) / 2.0);
        this.vertex_array.push(0);

        // Para cada vértice definimos su normal
        // como coordenada (x=0, y=0, z=1)
        this.normal_array.push(0.0);
        this.normal_array.push(0.0);
        this.normal_array.push(1.0);

        // Para cada vértice definimos su color
        this.color_array.push(1.0 / this.rows * i);
        this.color_array.push(0.2);
        this.color_array.push(1.0 / this.cols * j);

      };
    };
  }
  this.crearGrillaPlana();
  this.setupWebGLBuffers();
}
