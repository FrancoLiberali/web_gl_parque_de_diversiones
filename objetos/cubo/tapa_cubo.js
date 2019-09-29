function TapaCubo() {
  Objeto3D.call(this);

  this.crearTapaCubo = function() {
    this.index_array = crearIndexArray(2, 2);

    this.vertex_array = [
      0.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
      1.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
    ];

    this.color_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];

    this.normal_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];
  }
  this.crearTapaCubo();
  this.setupWebGLBuffers();
}
