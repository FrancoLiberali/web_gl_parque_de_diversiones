function Cilindro(conTapa = false, conEjes, largo = 1) {
  Objeto3D.call(this, conTapa, conEjes);

  this.crearCilindro = function() {

    var circulo = new Circulo(0.251, 32);
    var recta = new RectaEnY(0, largo);
    var discretizacion = 0.01;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      circulo,
      recta,
      discretizacion,
      this.conTapa,
    );
  }
  this.crearCilindro();
  this.setupWebGLBuffers();
}
