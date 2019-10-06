function Cilindro() {
  Objeto3D.call(this);

  this.crearCilindro = function() {
    var superficieInicial = new Circulo(1, 16).puntos;

    var recta = new RectaEnY(0, 1);
    var discretizacion = 1;

    barrido(this.vertex_array, this.index_array, superficieInicial, recta, discretizacion);

    // aun no se usa, se esta pintando según las normales
    this.color_array = [];

    this.normal_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      1.0, 1.0, 0.0,
      1.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
    ];
  }
  this.crearCilindro();
  this.setupWebGLBuffers();
}
