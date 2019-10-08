function Cilindro(conTapa = false) {
  Objeto3D.call(this, conTapa);

  this.crearCilindro = function() {

    var circulo = new Circulo(1, 32);
    var recta = new RectaEnY(0, 1);
    var discretizacion = 1;

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
