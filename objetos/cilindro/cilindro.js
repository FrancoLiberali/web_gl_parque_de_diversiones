function Cilindro() {
  Objeto3D.call(this);

  this.crearCilindro = function() {
    var circulo = new Circulo(1, 16);
    var superficieInicial = circulo.puntos;
    var normalInicial = circulo.normales;

    var recta = new RectaEnY(0, 1);
    var discretizacion = 1;

    barrido(this.vertex_array, this.index_array, this.normal_array, superficieInicial, normalInicial, recta, discretizacion);
  }
  this.crearCilindro();
  this.setupWebGLBuffers();
}
